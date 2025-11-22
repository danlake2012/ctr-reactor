import SecureGate from '../Gate';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { key: string };
}

export default async function SecureAdminPage({ params }: PageProps) {
  // Allow multiple comma-separated secrets for convenience.
  const secretEnv = process.env.ADMIN_SECRET || process.env.NEXT_PUBLIC_ADMIN_SECRET || '';
  const allowed = secretEnv.split(',').map(s => s.trim()).filter(Boolean);

  // If no secret configured, deny access
  if (allowed.length === 0) {
    console.warn('[secure] ADMIN_SECRET not configured; access denied');
    notFound();
  }

  // decode URI component as URL encoding may be used for special chars or spaces
  const keyParam = decodeURIComponent(params.key || '').trim();
  console.debug('[secure] server route requested with params.key=', params.key, 'keyParam=', keyParam, 'allowedCount=', allowed.length);

  if (!allowed.includes(keyParam)) {
    // For security, return a 404 so the existence of admin page is hidden
    console.warn(`[secure] Provided key param did not match any allowed secrets (decoded): "${keyParam}"`);
    notFound();
  }

  // Check IP allowlist if set
  const ipAllowlist = (process.env.ADMIN_IP_ALLOWLIST || '').split(',').map(i => i.trim()).filter(Boolean);
  if (ipAllowlist.length > 0) {
  const hdr = await headers();
  const forwarded = String(hdr.get('x-forwarded-for') || hdr.get('x-real-ip') || hdr.get('cf-connecting-ip') || '');
  const clientIp = forwarded.split(',').map((s: string) => s.trim())[0] || '';
    if (clientIp && !ipAllowlist.includes(clientIp)) {
      // Deny if IP not in allowlist
      console.warn(`[secure] Client IP ${clientIp} not included in ADMIN_IP_ALLOWLIST`);
      notFound();
    }
  }

  const requireSupabase = (process.env.ADMIN_REQUIRE_SUPABASE_SESSION || '').toLowerCase() === 'true';
  const requirePassword = Boolean(process.env.ADMIN_PASSWORD);
  console.debug('[secure] requireSupabase=', requireSupabase, 'requirePassword=', requirePassword, 'ipAllowlistCount=', ipAllowlist.length);

  // Render a client-side gate that can require Supabase session or password
  return <SecureGate requireSupabase={requireSupabase} requirePassword={requirePassword} />;
}
