/**
 * Client Supabase optionnel.
 * Renseignez REACT_APP_SUPABASE_URL et REACT_APP_SUPABASE_ANON_KEY
 * pour activer la persistance distante des votes.
 */
export const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
export const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
