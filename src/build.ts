/**
 * Static site generator for dsmtech.io — zero runtime dependencies.
 *
 *   bun run build
 *
 * Renders the full site into `dist/`:
 *
 *   dist/index.html           server-rendered page (pretty-printed data table)
 *   dist/api/companies.json   the dataset as open data
 *   dist/...                  everything in public/ (styles, script, logos, favicon)
 */

import { cp, mkdir, rm } from 'node:fs/promises';
import { COMPANIES } from './companies.ts';
import { renderPage } from './page.ts';

const ROOT = new URL('../', import.meta.url);
const DIST = new URL('dist/', ROOT);

const started = performance.now();

await rm(DIST, { recursive: true, force: true });
await mkdir(new URL('api/', DIST), { recursive: true });
await cp(new URL('public/', ROOT), DIST, { recursive: true });

await Bun.write(new URL('index.html', DIST), renderPage(COMPANIES));
await Bun.write(
  new URL('api/companies.json', DIST),
  JSON.stringify(COMPANIES, null, 2) + '\n'
);

console.log(
  `built ${COMPANIES.length} companies -> dist/ in ${(performance.now() - started).toFixed(0)}ms`
);
