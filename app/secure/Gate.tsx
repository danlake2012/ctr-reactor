'use client';

import { useState, useEffect } from 'react';
import { supabase, hasSupabase } from '../../lib/supabaseClient';
import Admin from '../admin/page';
import Link from 'next/link';

interface GateProps {
  requireSupabase?: boolean;
  requirePassword?: boolean;
}

export default function SecureGate({ requireSupabase = false, requirePassword = false }: GateProps) {
  const [validated, setValidated] = useState(false);
  const [sessionOk, setSessionOk] = useState(!requireSupabase);
  const [checkingSession, setCheckingSession] = useState(requireSupabase);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    if (requireSupabase && hasSupabase && supabase) {
      (async () => {
        try {
          const { data } = await supabase.auth.getSession();
          if (mounted) setSessionOk(Boolean(data?.session));
        } catch (err) {
          console.warn('Error checking supabase session', err);
        } finally {
          if (mounted) setCheckingSession(false);
        }
      })();
    } else {
      setCheckingSession(false);
    }
    return () => { mounted = false };
  }, [requireSupabase]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const r = await fetch('/api/secure/validate-password', { method: 'POST', body: JSON.stringify({ password }), headers: { 'Content-Type': 'application/json' } });
      const json = await r.json();
      if (json.ok) setValidated(true);
      else setError('Invalid password');
    } catch (err) {
      setError('Server error');
      console.error(err);
    }
  }

  if (checkingSession) {
    return <div className="min-h-[200px] flex items-center justify-center text-slate-300">Checking session...</div>
  }

  if (requireSupabase && !sessionOk) {
    return (
      <div className="min-h-60 flex flex-col items-center justify-center gap-4 text-slate-300">
        <div>Please sign in with Supabase to access the admin panel.</div>
  <Link className="text-blue-accent hover:text-blue-bright underline" href="/">Go to login</Link>
      </div>
    );
  }

  if (requirePassword && !validated) {
    return (
      <div className="min-h-72 flex flex-col items-center justify-center">
        <h3 className="text-xl text-blue-accent mb-2">Admin Password Required</h3>
        <form onSubmit={handlePasswordSubmit} className="space-y-3 w-full max-w-sm">
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full px-3 py-2 rounded bg-blue-panel-dark border border-blue-primary/20 text-white" placeholder="Enter admin password" />
          <div className="flex gap-3">
            <button type="button" onClick={() => setPassword('')} className="flex-1 bg-slate-600 text-white py-2 rounded">Clear</button>
            <button type="submit" className="flex-1 bg-blue-accent text-black py-2 rounded">Validate</button>
          </div>
          {error && <div className="text-red-400">{error}</div>}
        </form>
      </div>
    )
  }

  // All checks passed, show Admin dashboard
  return <Admin />;
}
