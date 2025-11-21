import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { findUserByEmail, verifyPassword, createSession } from '../../../../../lib/sqlite';
import { isRateLimited } from '../../../../../lib/rateLimit';

const COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'session';
const MAX_AGE = parseInt(process.env.SESSION_MAX_AGE || '604800', 10); // default 7 days

function validateEmail(email: string) {
  return typeof email === 'string' && /\S+@\S+\.\S+/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body || {};
    if (!email || !password) return NextResponse.json({ ok: false, message: 'Email and password required' }, { status: 400 });
    if (!validateEmail(email)) return NextResponse.json({ ok: false, message: 'Invalid email' }, { status: 400 });
    if (typeof password !== 'string' || password.length < 8) return NextResponse.json({ ok: false, message: 'Password must be 8+ characters' }, { status: 400 });

    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const rl = isRateLimited(`login:${ip}:${email}`, 8, 60 * 1000);
    if (rl.limited) return NextResponse.json({ ok: false, message: 'Too many attempts, try again later' }, { status: 429 });

    const user = findUserByEmail(email);
    if (!user) return NextResponse.json({ ok: false, message: 'Invalid credentials' }, { status: 401 });

    const ok = verifyPassword(email, password);
    if (!ok) return NextResponse.json({ ok: false, message: 'Invalid credentials' }, { status: 401 });

  // create session
    const token = crypto.randomBytes(32).toString('hex');
    createSession(user.id, token, MAX_AGE);

    const secureFlag = process.env.NODE_ENV === 'production' ? '; Secure' : '';
    const cookie = `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Max-Age=${MAX_AGE}; SameSite=Lax${secureFlag}`;

    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email } }, { status: 200, headers: { 'Set-Cookie': cookie } });
  } catch (err) {
    console.error('SQLite login error', err);
    return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 });
  }
}
