"use client";

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

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