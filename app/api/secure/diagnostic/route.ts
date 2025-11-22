import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const key = url.searchParams.get('key') || undefined;
    const passwordHeader = req.headers.get('x-admin-password') || '';
    const adminPassword = process.env.ADMIN_PASSWORD || '';

    // Require admin password to run diagnostics on production
    if (process.env.NODE_ENV !== 'development' && (!adminPassword || passwordHeader !== adminPassword)) {
      return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
    }

    const secretEnv = process.env.ADMIN_SECRET || process.env.NEXT_PUBLIC_ADMIN_SECRET || '';
    const allowed = secretEnv.split(',').map(s => s.trim()).filter(Boolean);
    const matches = key ? allowed.includes(decodeURIComponent(key).trim()) : null;
    const requireSupabase = (process.env.ADMIN_REQUIRE_SUPABASE_SESSION || '').toLowerCase() === 'true';
    const ipAllowlist = (process.env.ADMIN_IP_ALLOWLIST || '').split(',').map(s => s.trim()).filter(Boolean);

    // Collect forwarded IP if possible
    const forwarded = String(
      req.headers.get('x-forwarded-for') ||
      req.headers.get('x-real-ip') ||
      req.headers.get('cf-connecting-ip') ||
      ''
    );
    const clientIp = forwarded ? forwarded.split(',').map((s: string) => s.trim())[0] : '';

    return NextResponse.json({
      ok: true,
      secretSet: allowed.length > 0,
      allowedCount: allowed.length,
      keyMatches: matches,
      requireSupabase,
      ipAllowlistCount: ipAllowlist.length,
      clientIp: clientIp || null,
    });
  } catch (err) {
    console.error('diagnostic error', err);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
