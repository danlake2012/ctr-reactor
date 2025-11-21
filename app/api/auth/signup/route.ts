import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { hasSupabase, supabase } from '@/lib/supabaseClient';
import * as sqlite from '@/lib/sqlite';

type SignupBody = {
  name?: string | null;
  email?: string | null;
  password?: string | null;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SignupBody;
    const { name = null, email, password } = body || {};

    if (!email || !password) {
      return NextResponse.json({ ok: false, message: 'Email and password required' }, { status: 400 });
    }

    // Basic validation (email format)
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ ok: false, message: 'Invalid email' }, { status: 400 });
    }

  // Hash the password using scrypt (avoid adding a native dependency here).
  // Format: scrypt$<salt>$<derivedHex>
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto.scryptSync(password, salt, 64).toString('hex');
  const passwordHash = `scrypt$${salt}$${derived}`;

  // Prepare a session token to return to the client. We will store only a hash of it.
    const sessionToken = crypto.randomBytes(48).toString('hex');

    // Default session expiry (in ms) — 7 days
    const maxAgeSeconds = Number(process.env.SESSION_MAX_AGE || 60 * 60 * 24 * 7);
  // session expiry will be handled when a session row is created by the login flow

    // If Supabase is configured, insert into Postgres via Supabase client
    if (hasSupabase && supabase) {
      // Create user in users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert({ email, password_hash: passwordHash, name })
        .select('id, email, name, avatar_url, is_verified, created_at')
        .maybeSingle();

      if (userError) {
        console.error('Supabase insert user error', userError);
        return NextResponse.json({ ok: false, message: 'Failed to create user' }, { status: 500 });
      }

      // NOTE: storing session token hashes into Postgres bytea requires passing binary data.
      // To keep this route safe and simple across environments, we return the raw token and
      // leave session persistence to the login flow. You can extend this to insert into
      // `sessions` using server-side SQL and `digest($1, 'sha256')`.

      return NextResponse.json(
        { ok: true, user: userData, sessionToken },
        { status: 201 }
      );
    }

    // Fallback: use local SQLite helper (if available). This will create the user and a session.
    try {
      const u = sqlite.createUser(name, email, password);

      // createSession in sqlite expects (userId, token, maxAgeSeconds)
      // sqlite.createUser returns an object with `id` for created user (numeric)
  const createdUser = u as { id: number; email: string; name?: string };
  const userId = createdUser.id;
      try {
        sqlite.createSession(userId, sessionToken, maxAgeSeconds);
      } catch (sErr) {
        console.warn('Failed to create SQLite session', sErr);
      }

      return NextResponse.json({ ok: true, user: u, sessionToken }, { status: 201 });
    } catch (sqliteErr) {
      console.error('SQLite signup error', sqliteErr);
      return NextResponse.json({ ok: false, message: 'Auth provider not configured' }, { status: 500 });
    }
  } catch (err) {
    console.error('Signup route error', err);
    return NextResponse.json({ ok: false, message: 'Bad request' }, { status: 400 });
  }
}
