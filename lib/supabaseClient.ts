import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Export a client; if env vars are missing this will still return a client but
// calls will fail — callers should check for the presence of the env vars.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const hasSupabase = Boolean(supabaseUrl && supabaseAnonKey);
