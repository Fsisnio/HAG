/**
 * Vercel expose souvent SUPABASE_URL / SUPABASE_ANON_KEY.
 * Create React App n'injecte dans le front que les variables REACT_APP_*.
 * On recopie les noms Vercel avant le build.
 */
if (process.env.SUPABASE_URL && !process.env.REACT_APP_SUPABASE_URL) {
  process.env.REACT_APP_SUPABASE_URL = process.env.SUPABASE_URL;
}
if (process.env.SUPABASE_ANON_KEY && !process.env.REACT_APP_SUPABASE_ANON_KEY) {
  process.env.REACT_APP_SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
}

const { spawnSync } = require('child_process');
const result = spawnSync('react-scripts', ['build'], {
  stdio: 'inherit',
  shell: true,
  env: process.env
});
process.exit(result.status ?? 1);
