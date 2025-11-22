import { NextResponse } from 'next/server';
import { hasSupabase, supabase } from '@/lib/supabaseClient';
import * as sqlite from '@/lib/sqlite';

export async function GET(req: Request) {
  try {
    console.debug('[app api] /api/secure/admin-exists called', {
      forwarded: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || req.headers.get('cf-connecting-ip') || null,
      host: req.headers.get('host'),
      env: process.env.VERCEL_ENV || process.env.NODE_ENV || null,
    });
    const adminPassword = process.env.ADMIN_PASSWORD || '';
    // In production, require admin password via header to run this check
    if (process.env.NODE_ENV !== 'development' && adminPassword) {
      const provided = String(req.headers.get('x-admin-password') || '');
      if (!provided || provided !== adminPassword) {
        return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
      }
    }

    const adminEmail = (process.env.ADMIN_EMAIL || '').trim();
    const configured = Boolean(adminEmail);
    let exists = false;
    let backend: 'supabase' | 'sqlite' | 'none' = 'none';

    if (!configured) {
      return NextResponse.json({ ok: true, configured: false, exists: false, backend }, { status: 200 });
    }

    if (hasSupabase && supabase) {
      try {
        const { data, error } = await supabase.from('users').select('id').eq('email', adminEmail).maybeSingle();
        if (!error && data) {
          exists = true;
          backend = 'supabase';
        }
      } catch (err) {
        console.warn('Supabase admin check error', err);
      }
    }

    // If supabase didn't find it, check sqlite fallback
    if (!exists) {
      try {
        const found = sqlite.findUserByEmail(adminEmail);
        if (found) {
          exists = true;
          backend = 'sqlite';
        }
      } catch (err) {
        console.warn('SQLite admin check error', err);
      }
    }

    return NextResponse.json({ ok: true, configured, exists, backend }, { status: 200 });
  } catch (err) {
    console.error('admin exists route error', err);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
