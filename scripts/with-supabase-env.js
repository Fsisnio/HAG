/**
 * Vercel expose souvent SUPABASE_URL / SUPABASE_ANON_KEY.
 * Create React App n'injecte dans le front que les variables REACT_APP_*.
 */
if (process.env.SUPABASE_URL && !process.env.REACT_APP_SUPABASE_URL) {
  process.env.REACT_APP_SUPABASE_URL = process.env.SUPABASE_URL;
}
if (process.env.SUPABASE_ANON_KEY && !process.env.REACT_APP_SUPABASE_ANON_KEY) {
  process.env.REACT_APP_SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
}

const command = process.argv[2] || 'build';
const { spawnSync } = require('child_process');
const result = spawnSync('react-scripts', [command], {
  stdio: 'inherit',
  shell: true,
  env: process.env
});
process.exit(result.status ?? 1);
