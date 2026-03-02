import { execSync } from 'node:child_process';

export function setup() {
  console.log('[global-setup] Building site for integration tests...');
  execSync('pnpm astro build', { stdio: 'pipe', timeout: 120000 });
  console.log('[global-setup] Build complete.');
}
