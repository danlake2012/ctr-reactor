import type { NextApiRequest, NextApiResponse } from 'next';
import { hasSupabase, supabase } from '@/lib/supabaseClient';
import * as sqlite from '@/lib/sqlite';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ ok: false, error: 'Method not allowed' });
  try {
    console.debug('[pages api] /api/secure/admin-exists-legacy called', { host: req.headers.host });
    const adminPassword = process.env.ADMIN_PASSWORD || '';
    if (process.env.NODE_ENV !== 'development' && adminPassword) {
      const provided = String(req.headers['x-admin-password'] || '');
      if (!provided || provided !== adminPassword) {
        return res.status(403).json({ ok: false, error: 'Forbidden' });
      }
    }

    const adminEmail = (process.env.ADMIN_EMAIL || '').trim();
    const configured = Boolean(adminEmail);
    let exists = false;
    let backend: 'supabase' | 'sqlite' | 'none' = 'none';

    if (!configured) return res.status(200).json({ ok: true, configured: false, exists: false, backend });

    if (hasSupabase && supabase) {
      try {
        const { data, error } = await supabase.from('users').select('id').eq('email', adminEmail).maybeSingle();
        if (!error && data) {
          exists = true;
          backend = 'supabase';
        }
      } catch (err) {
        console.warn('Supabase admin check error (pages)', err);
      }
    }

    if (!exists) {
      try {
        const found = sqlite.findUserByEmail(adminEmail);
        if (found) {
          exists = true;
          backend = 'sqlite';
        }
      } catch (err) {
        console.warn('SQLite admin check error (pages)', err);
      }
    }

    return res.status(200).json({ ok: true, configured, exists, backend });
  } catch (err) {
    console.error('pages admin exists error', err);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
}
