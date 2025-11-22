import { supabase, hasSupabase } from './supabaseClient';

export type OAuthProvider = 'google' | 'facebook';

/**
 * Sign in with OAuth provider (Google or Facebook)
 * Redirects to the provider's OAuth flow
 */
export async function signInWithOAuth(provider: OAuthProvider) {
  if (!hasSupabase || !supabase) {
    throw new Error('Supabase is not configured. OAuth requires Supabase.');
  }

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        // Optional: request specific scopes
        // scopes: 'email profile',
      },
    });

    if (error) throw error;
    
    // The user will be redirected to the OAuth provider
    // After auth, they'll be redirected back to /auth/callback
    return data;
  } catch (err) {
    console.error(`OAuth sign-in error (${provider}):`, err);
    throw err;
  }
}

/**
 * Check if OAuth providers are configured
 * (This is a client-side check; actual configuration is in Supabase dashboard)
 */
export function isOAuthAvailable(): boolean {
  return hasSupabase;
}
