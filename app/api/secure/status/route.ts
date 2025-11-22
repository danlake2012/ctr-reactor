import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const secretEnv = process.env.ADMIN_SECRET || process.env.NEXT_PUBLIC_ADMIN_SECRET || '';
    const allowed = secretEnv.split(',').map(s => s.trim()).filter(Boolean);
    const ipAllowlist = (process.env.ADMIN_IP_ALLOWLIST || '').split(',').map(s => s.trim()).filter(Boolean);
    const requireSupabase = (process.env.ADMIN_REQUIRE_SUPABASE_SESSION || '').toLowerCase() === 'true';
    const requirePassword = Boolean(process.env.ADMIN_PASSWORD);

    return NextResponse.json({
      ok: true,
      secretSet: allowed.length > 0,
      allowedCount: allowed.length,
      ipAllowlistSet: ipAllowlist.length > 0,
      ipAllowlistCount: ipAllowlist.length,
      requireSupabase,
      requirePassword,
    });
  } catch (err) {
    console.error('secure status error', err);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
