import { notFound } from 'next/navigation';

export default function SecureCheckPage() {
  // Only available in development locally
  if (process.env.NODE_ENV !== 'development') {
    notFound();
  }

  const secretEnv = process.env.ADMIN_SECRET || process.env.NEXT_PUBLIC_ADMIN_SECRET || '';
  const allowed = secretEnv.split(',').map(s => s.trim()).filter(Boolean);
  const passwordSet = Boolean(process.env.ADMIN_PASSWORD);
  const requireSupabase = (process.env.ADMIN_REQUIRE_SUPABASE_SESSION || '').toLowerCase() === 'true';
  const ipAllowlist = (process.env.ADMIN_IP_ALLOWLIST || '').split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center text-slate-100 p-4">
      <div className="max-w-xl w-full bg-blue-panel p-6 rounded-lg border border-blue-primary/40">
        <h2 className="text-xl font-bold text-blue-accent mb-4">Secure Admin Check (development only)</h2>
        <ul className="space-y-2 text-sm">
          <li>Admin Secret Set: <span className="font-mono">{allowed.length > 0 ? 'Yes' : 'No'}</span></li>
          <li>Number of Secrets Allowed: <span className="font-mono">{allowed.length}</span></li>
          <li>Admin Password Configured: <span className="font-mono">{passwordSet ? 'Yes' : 'No'}</span></li>
          <li>Require Supabase Session: <span className="font-mono">{requireSupabase ? 'Yes' : 'No'}</span></li>
          <li>IP Allowlist Count: <span className="font-mono">{ipAllowlist.length}</span></li>
        </ul>
        <p className="text-xs text-slate-400 mt-4">This page does not show sensitive values and is only intended for local troubleshooting.</p>
      </div>
    </div>
  )
}
