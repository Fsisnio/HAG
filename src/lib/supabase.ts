import { createClient, SupabaseClient } from '@supabase/supabase-js';

const normalizeSupabaseUrl = (url: string) => {
  const trimmed = (url || '').trim();
  if (!trimmed) return '';
  try {
    const parsed = new URL(trimmed);
    if (parsed.hostname.endsWith('.supabase.co')) {
      return parsed.origin;
    }
    return `${parsed.origin}${parsed.pathname.replace(/\/rest\/v1.*$/i, '')}`.replace(/\/+$/, '');
  } catch {
    return trimmed.replace(/\/+$/, '').replace(/\/rest\/v1.*$/i, '');
  }
};

export const supabaseUrl = normalizeSupabaseUrl(
  process.env.REACT_APP_SUPABASE_URL || process.env.SUPABASE_URL || ''
);
export const supabaseAnonKey =
  process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
