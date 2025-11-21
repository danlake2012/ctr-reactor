import { NextResponse } from 'next/server';
import { findSession, getUserById } from '../../../../../lib/sqlite';

const COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'session';

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
    const token = match ? match[1] : null;
    if (!token) return NextResponse.json({ ok: false, user: null }, { status: 200 });

    const session = findSession(token);
    if (!session) return NextResponse.json({ ok: false, user: null }, { status: 200 });

    const user = getUserById(session.user_id);
    if (!user) return NextResponse.json({ ok: false, user: null }, { status: 200 });

    return NextResponse.json({ ok: true, user }, { status: 200 });
  } catch (err) {
    console.error('Me endpoint error', err);
    return NextResponse.json({ ok: false, user: null }, { status: 500 });
  }
}
