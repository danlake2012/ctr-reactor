import { NextResponse } from 'next/server';
import { deleteSession } from '../../../../lib/sqlite';

const COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'session';

export async function POST(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
    const token = match ? match[1] : null;
    if (token) {
      deleteSession(token);
    }

    const secureFlag = process.env.NODE_ENV === 'production' ? '; Secure' : '';
    const clear = `${COOKIE_NAME}=; Path=/; HttpOnly; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax${secureFlag}`;

    return NextResponse.json({ ok: true }, { status: 200, headers: { 'Set-Cookie': clear } });
  } catch (err) {
    console.error('Logout error', err);
    return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 });
  }
}
