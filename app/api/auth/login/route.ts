import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { hasSupabase, supabase } from '@/lib/supabaseClient';
import * as sqlite from '@/lib/sqlite';

type LoginBody = { email?: string | null; password?: string | null };

type SupabaseUser = { id: string; email: string; password_hash?: string; name?: string | null; avatar_url?: string | null };
type SqliteUser = { id: number; email: string; name?: string | null };

function buildSessionCookie(name: string, token: string, maxAgeSeconds: number) {
  const secure = process.env.NODE_ENV === 'production' ? 'Secure; ' : '';
  // HttpOnly, SameSite=Lax, Path=/
  return `${name}=${token}; HttpOnly; ${secure}Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax`;
}

function buildAdminCookie(maxAgeSeconds: number) {
  const secure = process.env.NODE_ENV === 'production' ? 'Secure; ' : '';
  // is_admin cookie is HttpOnly and indicates the session belongs to the configured admin
  return `is_admin=1; HttpOnly; ${secure}Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax`;
}

async function verifyPasswordHash(password: string, hash: string): Promise<boolean> {
  if (!hash) return false;
  try {
    if (hash.startsWith('scrypt$')) {
      const parts = hash.split('$');
      if (parts.length !== 3) return false;
      const salt = parts[1];
      const derived = parts[2];
      const check = crypto.scryptSync(password, salt, 64).toString('hex');
      return crypto.timingSafeEqual(Buffer.from(check, 'hex'), Buffer.from(derived, 'hex'));
    }

    // Unsupported hash format here — return false so callers can fallback to sqlite.verifyPassword if available
    return false;
  } catch (err) {
    console.error('verifyPasswordHash error', err);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LoginBody;
    const { email, password } = body || {};

    if (!email || !password) {
      return NextResponse.json({ ok: false, message: 'Email and password required' }, { status: 400 });
    }

    // basic email format
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ ok: false, message: 'Invalid email' }, { status: 400 });
    }

    const maxAgeSeconds = Number(process.env.SESSION_MAX_AGE || 60 * 60 * 24 * 7);
    const sessionToken = crypto.randomBytes(48).toString('hex');
    const expiresAt = new Date(Date.now() + maxAgeSeconds * 1000).toISOString();

    // Try Supabase first
    if (hasSupabase && supabase) {
      const { data: user, error } = await supabase
        .from('users')
        .select('id, email, password_hash, name, avatar_url')
        .eq('email', email)
        .maybeSingle();

      if (error || !user) {
        return NextResponse.json({ ok: false, message: 'Invalid email or password' }, { status: 401 });
      }

  const passwordHash: string | undefined = (user as SupabaseUser).password_hash;
  const valid = await verifyPasswordHash(password, passwordHash || '');
      if (!valid) {
        return NextResponse.json({ ok: false, message: 'Invalid email or password' }, { status: 401 });
      }

      // store session token hash in DB (digest with sha256)
      try {
        const tokenHash = crypto.createHash('sha256').update(sessionToken).digest(); // Buffer
        const { error: sessErr } = await supabase
          .from('sessions')
          .insert({ token_hash: tokenHash, user_id: user.id, expires_at: expiresAt });
        if (sessErr) console.warn('Failed to persist session in supabase', sessErr);
      } catch (e) {
        console.warn('Session insert warning', e);
      }

      const res = NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name, avatar_url: user.avatar_url } }, { status: 200 });
      const cookieName = process.env.SESSION_COOKIE_NAME || 'session_token';
      res.headers.set('Set-Cookie', buildSessionCookie(cookieName, sessionToken, maxAgeSeconds));
      // if this login matches the configured admin email, also set a short admin indicator cookie
      try {
        const adminEmail = process.env.ADMIN_EMAIL;
        if (adminEmail && String(adminEmail).toLowerCase() === String(user.email).toLowerCase()) {
          res.headers.append('Set-Cookie', buildAdminCookie(maxAgeSeconds));
        }
      } catch (e) {
        // swallow errors here, cookie is optional
        console.warn('Admin cookie set error', e);
      }
      return res;
    }

    // Fallback to local SQLite helper
    try {
      const userRow = sqlite.findUserByEmail(email);
      if (!userRow) return NextResponse.json({ ok: false, message: 'Invalid email or password' }, { status: 401 });

      // sqlite.verifyPassword handles bcrypt-based hashes (internal implementation)
      const ok = sqlite.verifyPassword(email, password);
      if (!ok) return NextResponse.json({ ok: false, message: 'Invalid email or password' }, { status: 401 });

      // create session in sqlite (implementation handles token hashing and expiry)
      try {
        sqlite.createSession(userRow.id, sessionToken, maxAgeSeconds);
      } catch (e) {
        console.warn('Failed to create sqlite session', e);
      }

  const row = userRow as SqliteUser;
  const res = NextResponse.json({ ok: true, user: { id: row.id, email: row.email, name: row.name } }, { status: 200 });
      const cookieName = process.env.SESSION_COOKIE_NAME || 'session_token';
      res.headers.set('Set-Cookie', buildSessionCookie(cookieName, sessionToken, maxAgeSeconds));
      try {
        const adminEmail = process.env.ADMIN_EMAIL;
        if (adminEmail && String(adminEmail).toLowerCase() === String(row.email).toLowerCase()) {
          res.headers.append('Set-Cookie', buildAdminCookie(maxAgeSeconds));
        }
      } catch (e) {
        console.warn('Admin cookie set error', e);
      }
      return res;
    } catch (e) {
      console.error('Login sqlite error', e);
      return NextResponse.json({ ok: false, message: 'Auth provider not configured' }, { status: 500 });
    }
  } catch (err) {
    console.error('Login route error', err);
    return NextResponse.json({ ok: false, message: 'Bad request' }, { status: 400 });
  }
}
