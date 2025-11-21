import { NextResponse } from 'next/server';
import { findUserByEmail, setResetToken } from '../../../../../lib/sqlite';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body || {};
    if (!email) return NextResponse.json({ ok: false, message: 'Email required' }, { status: 400 });

    const user = findUserByEmail(email);
    if (!user) return NextResponse.json({ ok: true, message: 'If the email exists, a reset link will be sent' }, { status: 200 });

    const token = crypto.randomBytes(24).toString('hex');
    const expiry = Date.now() + 1000 * 60 * 60; // 1 hour
    setResetToken(email, token, expiry);
    console.log('Reset token (demo) for', email, token);
    return NextResponse.json({ ok: true, message: 'If the email exists, a reset link will be sent' }, { status: 200 });
  } catch (err) {
    console.error('SQLite forgot error', err);
    return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 });
  }
}
