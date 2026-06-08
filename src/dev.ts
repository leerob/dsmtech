/**
 * Local server — NOT used in production (the site deploys as static files).
 *
 *   bun run dev        # render on every request + hot reload (bun --hot)
 *   bun run preview    # serve the built dist/ folder as-is
 */

import { COMPANIES } from './companies.ts';
import { renderPage } from './page.ts';

const ROOT = new URL('../', import.meta.url);
const SERVE_DIST = Bun.argv.includes('--dist');
const FILES = new URL(SERVE_DIST ? 'dist/' : 'public/', ROOT);

const html = (body: string) =>
  new Response(body, { headers: { 'content-type': 'text/html; charset=utf-8' } });

const server = Bun.serve({
  port: Number(Bun.env.PORT ?? 3000),

  routes: {
    // Mirrors the /about -> / redirect configured in vercel.json.
    '/about': new Response(null, { status: 301, headers: { location: '/' } })
  },

  async fetch(req) {
    const pathname = decodeURIComponent(new URL(req.url).pathname);
    if (pathname.includes('..')) return new Response('Not Found', { status: 404 });

    if (pathname === '/' && !SERVE_DIST) return html(renderPage(COMPANIES));
    if (pathname === '/api/companies.json' && !SERVE_DIST)
      return Response.json(COMPANIES);

    const file = Bun.file(new URL(`.${pathname === '/' ? '/index.html' : pathname}`, FILES));
    if (await file.exists()) return new Response(file);
    return new Response('Not Found', { status: 404 });
  }
});

console.log(
  `dsmtech ${SERVE_DIST ? '(dist preview)' : '(dev)'} at ${server.url} — ${COMPANIES.length} companies`
);
