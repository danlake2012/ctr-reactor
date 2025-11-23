"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { signInWithOAuth, isOAuthAvailable } from '@/lib/oauth';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignup: (name: string, email: string, password: string) => void;
}

export default function SignUpModal({ isOpen, onClose, onSignup }: SignUpModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [oAuthLoading, setOAuthLoading] = useState<string | null>(null);
  const [portalEl, setPortalEl] = useState<HTMLDivElement | null>(null);
  const oAuthAvailable = isOAuthAvailable();

  useEffect(() => {
    const el = document.createElement('div');
    el.setAttribute('id', 'signup-modal-root');
    document.body.appendChild(el);
    // Defer setState to avoid synchronous setState inside effect
    const t = setTimeout(() => setPortalEl(el), 0);
    return () => {
      clearTimeout(t);
      if (el.parentNode) el.parentNode.removeChild(el);
      // defer clearing as well
      setTimeout(() => setPortalEl(null), 0);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    try {
      await onSignup(name, email, password);
    } catch (err) {
      console.error(err);
      setError('Signup failed');
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'facebook') => {
    setOAuthLoading(provider);
    setError('');
    
    try {
      await signInWithOAuth(provider);
      // User will be redirected to OAuth provider
    } catch {
      setError(`Failed to sign in with ${provider === 'google' ? 'Google' : 'Facebook'}`);
      setOAuthLoading(null);
    }
  };

  if (!isOpen) return null;

  const content = (
    <div className="modal-backdrop fixed inset-0 flex items-center justify-center p-6" onClick={onClose}>
      <div className="modal-menu w-full max-w-md rounded-xl p-6 relative shadow-2xl" style={{ background: 'linear-gradient(180deg, rgba(6,12,24,0.98), rgba(8,14,26,0.95))', border: '1px solid rgba(56,120,255,0.08)' }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X size={20} /></button>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>Create Account</h3>
          <p className="text-slate-300 text-sm">Join CTR Reactor</p>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4"><p className="text-red-400 text-sm text-center">{error}</p></div>}

        {/* OAuth buttons */}
        {oAuthAvailable && (
          <div className="space-y-3 mb-4">
            <button
              type="button"
              onClick={() => handleOAuthSignIn('google')}
              disabled={oAuthLoading !== null}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors border border-gray-300"
            >
              {oAuthLoading === 'google' ? (
                <span className="text-sm">Connecting...</span>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleOAuthSignIn('facebook')}
              disabled={oAuthLoading !== null}
              className="w-full flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#166FE5] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {oAuthLoading === 'facebook' ? (
                <span className="text-sm">Connecting...</span>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Continue with Facebook</span>
                </>
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-blue-panel-dark text-slate-400">Or sign up with email</span>
              </div>
            </div>
          </div>
        )}

        <form id="signup-form" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Full Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 rounded bg-blue-panel-dark border border-blue-primary/20 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 rounded bg-blue-panel-dark border border-blue-primary/20 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 rounded bg-blue-panel-dark border border-blue-primary/20 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Confirm Password</label>
            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required className="w-full px-3 py-2 rounded bg-blue-panel-dark border border-blue-primary/20 text-white" />
          </div>

          <button type="submit" className="w-full bg-white text-black font-bold py-3 px-4 rounded-lg">Create Account</button>
        </form>
      </div>
    </div>
  );

  // Render into portal container after mount; if portal isn't ready just return content.
  if (portalEl) return createPortal(content, portalEl);
  return content;
}
