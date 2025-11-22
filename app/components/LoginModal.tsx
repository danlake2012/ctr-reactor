"use client";

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { signInWithOAuth, isOAuthAvailable } from '@/lib/oauth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onOpenForgot?: () => void;
}

export default function LoginModal({ isOpen, onClose, onLogin, onOpenForgot }: LoginModalProps) {
  console.log('LoginModal render - isOpen:', isOpen, 'onClose:', typeof onClose, 'onLogin:', typeof onLogin);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [oAuthLoading, setOAuthLoading] = useState<string | null>(null);
  const oAuthAvailable = isOAuthAvailable();
  // Portal container ref
  const portalElRef = useRef<HTMLDivElement | null>(null);

  // Create portal container and append to body on mount
  useEffect(() => {
    if (!portalElRef.current) {
      const el = document.createElement('div');
      el.setAttribute('id', 'login-modal-root');
      portalElRef.current = el;
      document.body.appendChild(el);
    }

    return () => {
      if (portalElRef.current && portalElRef.current.parentNode) {
        portalElRef.current.parentNode.removeChild(portalElRef.current);
        portalElRef.current = null;
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await onLogin(email, password);
      onClose();
    } catch {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'facebook') => {
    setOAuthLoading(provider);
    setError('');
    
    try {
      await signInWithOAuth(provider);
      // User will be redirected to OAuth provider, so no need to close modal
    } catch (err) {
      setError(`Failed to sign in with ${provider === 'google' ? 'Google' : 'Facebook'}`);
      setOAuthLoading(null);
    }
  };

  if (!isOpen) {
    console.log('LoginModal: isOpen is false, returning null');
    return null;
  }

  console.log('LoginModal: isOpen is true, rendering modal');

  const modalContent = (
    <div
      className="modal-backdrop fixed inset-0 flex items-center justify-center p-6"
      onClick={() => {
        console.log('Backdrop clicked - closing modal');
        onClose();
      }}
    >
      <div
        className="modal-menu w-full max-w-md max-h-[90vh] overflow-auto rounded-xl p-6 relative shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200"
        // allow CSS var to handle z-index
        style={{ background: 'linear-gradient(180deg, rgba(8,18,32,0.98), rgba(4,10,18,0.95))', border: '1px solid rgba(56,120,255,0.12)' }}
        onClick={(e) => {
          console.log('Modal content clicked - preventing close');
          e.stopPropagation();
        }}
      >
        {/* Close button */}
        <button
          onClick={() => {
            console.log('Close button clicked');
            onClose();
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-blue-accent mb-2 tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            LOGIN
          </h2>
          <p className="text-slate-300 text-sm">
            Access your CTR Reactor account
          </p>
        </div>

  {/* Form */}
  <form id="login-form" onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          {/* OAuth buttons */}
          {oAuthAvailable && (
            <div className="space-y-3">
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
                  <span className="px-2 bg-blue-panel-dark text-slate-400">Or continue with email</span>
                </div>
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-blue-panel-dark border border-blue-primary/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:ring-1 focus:ring-blue-accent transition-colors"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-blue-panel-dark border border-blue-primary/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:ring-1 focus:ring-blue-accent transition-colors"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-accent hover:bg-blue-bright disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3 px-6 rounded-lg transition-colors tracking-widest uppercase"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
        </form>

        {/* Footer (duplicate submit for visibility) */}
        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm mb-3">
            Don&apos;t have an account?{' '}
            <button className="text-blue-accent hover:text-blue-bright transition-colors">
              Sign up
            </button>
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => {
                // trigger the form submit programmatically
                const form = document.getElementById('login-form') as HTMLFormElement | null;
                if (form) form.requestSubmit();
              }}
              className="bg-white hover:bg-slate-100 text-black font-bold py-2 px-6 rounded-lg transition-colors tracking-widest uppercase text-sm"
            >
              SIGN IN
            </button>

            <button
              type="button"
              onClick={() => {
                if (typeof onOpenForgot === 'function') {
                  onOpenForgot();
                }
              }}
              className="text-slate-400 hover:text-blue-accent text-sm mt-0 transition-colors"
            >
              Forgot password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Render into portal container if available
  if (portalElRef.current) {
    return createPortal(modalContent, portalElRef.current);
  }

  // Fallback (shouldn't usually happen since this is a client component)
  return modalContent;
}