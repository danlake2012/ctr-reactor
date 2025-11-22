import { NextResponse } from 'next/server';

function buildAdminCookie(maxAgeSeconds: number) {
  const secure = process.env.NODE_ENV === 'production' ? 'Secure; ' : '';
  return `is_admin=1; HttpOnly; ${secure}Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax`;
}

export async function GET(req: Request) {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD || '';
    if (!adminPassword) {
      return NextResponse.json({ ok: false, error: 'Admin password not configured' }, { status: 403 });
    }

    const provided = String(req.headers.get('x-admin-password') || '');
    if (!provided || provided !== adminPassword) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Set admin cookie and redirect to /admin
    const maxAgeSeconds = Number(process.env.SESSION_MAX_AGE || 60 * 60);
    const res = NextResponse.redirect(new URL('/admin', req.url));
    res.headers.append('Set-Cookie', buildAdminCookie(maxAgeSeconds));
    return res;
  } catch (err) {
    console.error('emergency admin route error', err);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
