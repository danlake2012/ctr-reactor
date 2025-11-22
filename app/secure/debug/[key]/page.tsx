import DebugClient from '../DebugClient';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { key: string };
}

export default async function SecureDebugPage({ params }: PageProps) {
  const secretEnv = process.env.ADMIN_SECRET || process.env.NEXT_PUBLIC_ADMIN_SECRET || '';
  const allowed = secretEnv.split(',').map((s) => s.trim()).filter(Boolean);

  // allow in development without secret to ease debugging
  const isDev = (process.env.NODE_ENV || '').toLowerCase() === 'development';

  const keyParam = String(params?.key || '').trim();
  console.debug('[secure debug] params.key=', params?.key, 'keyParam=', keyParam, 'allowed=', allowed.join(','), 'isDev=', isDev);
  if (!isDev && !allowed.includes(keyParam)) {
    console.warn(`[secure debug] Provided key did not match any allowed secrets`);
    notFound();
  }

  // Compute the same booleans as the /api/secure/status route server-side to show status
  const ipAllowlist = (process.env.ADMIN_IP_ALLOWLIST || '').split(',').map(s => s.trim()).filter(Boolean);
  const requireSupabase = (process.env.ADMIN_REQUIRE_SUPABASE_SESSION || '').toLowerCase() === 'true';
  const requirePassword = Boolean(process.env.ADMIN_PASSWORD);
  const secretSet = allowed.length > 0;

  return (
    <div className="min-h-screen bg-background text-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Secure Debug Page</h1>
        <p className="mb-2 text-slate-300">Server-side diagnostics (computed on the server):</p>
        <ul className="mb-6 list-disc pl-6 text-slate-200">
          <li>secretSet: {String(secretSet)}</li>
          <li>allowedCount: {allowed.length}</li>
          <li>ipAllowlistCount: {ipAllowlist.length}</li>
          <li>requireSupabase: {String(requireSupabase)}</li>
          <li>requirePassword: {String(requirePassword)}</li>
        </ul>

        <p className="mb-4 text-slate-300">Client-side fetches (shows the behavior from the browser):</p>
        <DebugClient />
      </div>
    </div>
  );
}
