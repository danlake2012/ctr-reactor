'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';

export default function AuthCallback() {
  const [message, setMessage] = useState('Verifying your email...');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      if (!supabase) {
        setMessage('Authentication service is not available.');
        return;
      }

      try {
        // First, try to handle the auth callback from URL hash (Supabase default)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const type = hashParams.get('type');

        if (accessToken && refreshToken && type === 'signup') {
          // Handle hash-based callback
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });

          if (sessionError) {
            console.error('Session set error:', sessionError);
            setMessage('Email verification failed. Please try signing up again.');
          } else {
            setMessage('Email verified successfully! Redirecting...');
            setTimeout(() => {
              router.push('/');
            }, 2000);
          }
          return;
        }

        // Fallback: check for existing session
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Auth callback error:', error);
          setMessage('There was an error verifying your email. Please try again.');
          return;
        }

        if (data.session) {
          setMessage('Email verified successfully! Redirecting...');
          setTimeout(() => {
            router.push('/');
          }, 2000);
        } else {
          // Try query parameters as fallback
          const code = searchParams.get('code');

          if (code) {
            const { error: sessionError } = await supabase.auth.exchangeCodeForSession(code);
            if (sessionError) {
              console.error('Code exchange error:', sessionError);
              setMessage('Email verification failed. Please try signing up again.');
            } else {
              setMessage('Email verified successfully! Redirecting...');
              setTimeout(() => {
                router.push('/');
              }, 2000);
            }
          } else {
            setMessage('Email verification link is invalid or has expired.');
          }
        }
      } catch (err) {
        console.error('Unexpected error in auth callback:', err);
        setMessage('An unexpected error occurred. Please try again.');
      }
    };

    handleAuthCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Email Verification</h1>
          <p className="text-gray-600">{message}</p>
          {message.includes('successfully') && (
            <div className="mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}