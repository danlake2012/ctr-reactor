import dynamic from 'next/dynamic';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
// Dynamically import client-side gate guard
const SecureGate = dynamic(() => import('../Gate'), { ssr: false });

interface PageProps {
  params: { key: string };
}

export default async function SecureAdminPage({ params }: PageProps) {
  // Allow multiple comma-separated secrets for convenience.
  const secretEnv = process.env.ADMIN_SECRET || process.env.NEXT_PUBLIC_ADMIN_SECRET || '';
  const allowed = secretEnv.split(',').map(s => s.trim()).filter(Boolean);

  // If no secret configured, deny access
  if (allowed.length === 0) {
    notFound();
  }

  // decode URI component as URL encoding may be used for special chars or spaces
  const keyParam = decodeURIComponent(params.key || '').trim();

  if (!allowed.includes(keyParam)) {
    // For security, return a 404 so the existence of admin page is hidden
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
      notFound();
    }
  }

  const requireSupabase = (process.env.ADMIN_REQUIRE_SUPABASE_SESSION || '').toLowerCase() === 'true';
  const requirePassword = Boolean(process.env.ADMIN_PASSWORD);

  // Render a client-side gate that can require Supabase session or password
  return <SecureGate requireSupabase={requireSupabase} requirePassword={requirePassword} />;
}
