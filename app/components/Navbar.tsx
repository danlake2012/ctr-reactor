 'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import LoginModal from './LoginModal';
import AvatarDropdown from './AvatarDropdown';
import SignUpModal from './SignUpModal';
import ForgotPasswordModal from './ForgotPasswordModal';
import { supabase, hasSupabase } from '../../lib/supabaseClient';
import { useUserStore } from '../store/useUserStore';

type ModalType = 'none' | 'login' | 'signup' | 'forgot';
type User = { id?: string; email?: string; name?: string; avatar_url?: string; };

export default function Navbar() {
  const [modalType, setModalType] = useState<ModalType>('none');

  const openModal = (t: ModalType) => setModalType(t);
  const closeModal = () => setModalType('none');
  const useSqlite = process.env.NEXT_PUBLIC_USE_SQLITE === 'true';
  const user = useUserStore((s) => s.user);

  useEffect(() => {
    // hydrate user from server session when using SQLite sessions
    if (!useSqlite) return;
    (async () => {
      try {
        const res = await fetch('/api/auth/sql/me');
        if (!res.ok) return;
        const data = await res.json().catch(() => ({}));
        if (data?.ok && data.user) {
          useUserStore.getState().setUser({ id: data.user.id, email: data.user.email });
        }
      } catch (err) {
        console.error('Failed to hydrate user', err);
      }
    })();
  }, [useSqlite]);

  const handleLogin = async (email: string, password: string) => {
    // If client requests SQLite auth, call the server-side SQLite endpoints
    if (useSqlite) {
      try {
        const res = await fetch('/api/auth/sql/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.message || 'Invalid credentials');
        }
        const data = await res.json();
        useUserStore.getState().setUser({ email: data.email });
        closeModal();
        return;
      } catch (err) {
        console.error('SQLite login failed', err);
        throw err;
      }
    }

    // Prefer Supabase auth when configured
    if (hasSupabase && supabase) {
      const supResp = await supabase.auth.signInWithPassword({ email, password });
      const supTyped = supResp as unknown as { error?: { message?: string }; user?: { id?: string; email?: string } };
      if (supTyped.error) {
        console.error('Supabase login error', supTyped.error);
        throw new Error(supTyped.error.message || 'Login failed');
      }
      const user = supTyped.user;
      useUserStore.getState().setUser({ id: user?.id, email: user?.email });
      closeModal();
      return;
    }

    // Fallback to demo API route
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || 'Invalid credentials');
      }

      const data = await res.json();
      console.log('Login success', data);
      useUserStore.getState().setUser({ email: data.email });
      closeModal();
    } catch (err) {
      console.error('Login failed', err);
      throw err;
    }
  };

  const handleSignup = async (name: string, email: string, password: string) => {
    if (useSqlite) {
      try {
        const res = await fetch('/api/auth/sql/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.message || 'Signup failed');
        }
        const data = await res.json();
        useUserStore.getState().setUser({ email: data.user?.email });
        closeModal();
        return;
      } catch (err) {
        console.error('SQLite signup failed', err);
        throw err;
      }
    }

    if (hasSupabase && supabase) {
      const supResp = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } });
      const supTyped = supResp as unknown as { error?: { message?: string }; user?: { email?: string } };
      if (supTyped.error) {
        console.error('Supabase signup error', supTyped.error);
        throw new Error(supTyped.error.message || 'Signup failed');
      }
      const user = supTyped.user;
      useUserStore.getState().setUser({ email: user?.email });
      closeModal();
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || 'Signup failed');
      }
      const data = await res.json();
      console.log('Signup success', data);
      alert('Account created (demo) — you can now log in');
      closeModal();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleForgot = async (email: string) => {
    if (useSqlite) {
      try {
        const res = await fetch('/api/auth/sql/forgot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.message || 'Forgot password failed');
        }
        alert(`If this email exists, a reset link was sent (demo)`);
        closeModal();
        return;
      } catch (err) {
        console.error('SQLite forgot failed', err);
        throw err;
      }
    }

    if (hasSupabase && supabase) {
      const supResp = await supabase.auth.resetPasswordForEmail(email);
      const supTyped = supResp as unknown as { error?: { message?: string } };
      if (supTyped.error) {
        console.error('Supabase forgot error', supTyped.error);
        throw new Error(supTyped.error.message || 'Forgot password failed');
      }
      alert('If this email exists, a reset link was sent (via Supabase)');
      closeModal();
      return;
    }

    try {
      const res = await fetch('/api/auth/forgot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || 'Forgot password failed');
      }
      alert(`If this email exists, a reset link was sent (demo)`);
      closeModal();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const isAnyModalOpen = modalType !== 'none';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-blue-primary/30">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
            <div className="text-4xl drop-shadow-[0_0_12px_var(--blue-glow-55)]">⚡</div>
            <h1 className="text-2xl md:text-3xl font-bold text-blue-accent tracking-[0.2em] uppercase drop-shadow-[0_0_12px_var(--blue-glow)]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              CTR Reactor
            </h1>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/support"
              className="text-(--text-secondary) hover:text-blue-accent transition-colors duration-200 font-medium tracking-widest uppercase text-sm"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              Support
            </Link>
            <div className="text-(--text-secondary) opacity-50 cursor-not-allowed font-medium tracking-widest uppercase text-sm">
              Blog
            </div>
            <Link
              href="/pricing"
              className="text-(--text-secondary) hover:text-blue-accent transition-colors duration-200 font-medium tracking-widest uppercase text-sm"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              Pricing
            </Link>
          </div>

          {/* Auth Buttons & Avatar */}
          <div className="flex items-center gap-3">
            <AvatarDropdown modalOpen={isAnyModalOpen} />
            {user ? (
              <>
                <span className="text-sm text-slate-200 mr-2">{(user as User)?.email || 'Logged in'}</span>
                <button
                  onClick={async () => {
                    try {
                      await fetch('/api/auth/sql/logout', { method: 'POST' });
                    } catch (err) {
                      console.error('Logout failed', err);
                    }
                    useUserStore.getState().clearUser();
                  }}
                  className="bg-transparent hover:bg-blue-primary/20 text-blue-accent border border-blue-primary/40 hover:border-blue-accent font-medium py-2 px-4 rounded-lg transition-all duration-200 tracking-widest uppercase text-sm"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => openModal('login')}
                  className="bg-transparent hover:bg-blue-primary/20 text-blue-accent border border-blue-primary/40 hover:border-blue-accent font-medium py-2 px-4 rounded-lg transition-all duration-200 tracking-widest uppercase text-sm"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  LOGIN
                </button>
                <button
                  onClick={() => openModal('signup')}
                  className="bg-white text-black font-bold py-2 px-4 rounded-lg transition-colors tracking-widest uppercase text-sm shadow-lg hover:shadow-xl"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  SIGN UP
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 pt-4 border-t border-blue-primary/20">
          <div className="flex justify-center gap-4 items-center">
            <Link
              href="/support"
              className="text-(--text-secondary) hover:text-blue-accent transition-colors duration-200 font-medium tracking-widest uppercase text-xs"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              Support
            </Link>
            <div className="text-(--text-secondary) opacity-50 cursor-not-allowed font-medium tracking-widest uppercase text-xs">
              Blog
            </div>
            <Link
              href="/pricing"
              className="text-(--text-secondary) hover:text-blue-accent transition-colors duration-200 font-medium tracking-widest uppercase text-xs"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              Pricing
            </Link>
            <AvatarDropdown modalOpen={isAnyModalOpen} />
            <button
              onClick={() => openModal('login')}
              className="bg-transparent hover:bg-blue-primary/20 text-blue-accent border border-blue-primary/40 hover:border-blue-accent font-medium py-1 px-3 rounded text-xs tracking-widest uppercase"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              LOGIN
            </button>
            <button
              onClick={() => openModal('signup')}
              className="bg-white text-black font-bold py-1 px-3 rounded text-xs tracking-widest uppercase shadow-lg"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              SIGN UP
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <LoginModal
        isOpen={modalType === 'login'}
        onClose={closeModal}
        onLogin={handleLogin}
        onOpenForgot={() => openModal('forgot')}
      />

      <SignUpModal
        isOpen={modalType === 'signup'}
        onClose={closeModal}
        onSignup={handleSignup}
      />

      <ForgotPasswordModal
        isOpen={modalType === 'forgot'}
        onClose={closeModal}
        onSubmit={handleForgot}
      />
    </nav>
  );
}