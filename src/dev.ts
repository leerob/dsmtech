/**
 * Local server — NOT used in production (the site deploys as static files).
 *
 *   bun run dev        # render on every request + live reload in the browser
 *   bun run preview    # serve the built dist/ folder as-is
 *
 * Live reload is ~15 lines of platform code, no tooling: `bun --hot`
 * re-evaluates this module whenever anything in src/ changes, fs.watch
 * covers public/, and each change pings every open tab over a
 * server-sent-events stream to refresh itself.
 */

import type { Serve } from 'bun';
import { watch, type FSWatcher } from 'node:fs';
import { COMPANIES } from './companies.ts';
import { renderPage } from './page.ts';

const ROOT = new URL('../', import.meta.url);
const SERVE_DIST = Bun.argv.includes('--dist');
const FILES = new URL(SERVE_DIST ? 'dist/' : 'public/', ROOT);

// ---- live reload (dev only) ----

// State survives `bun --hot` re-evaluations by living on globalThis.
const g = globalThis as typeof globalThis & {
  devTabs?: Set<ReadableStreamDefaultController>;
  devGeneration?: number;
  devWatcher?: FSWatcher;
};

const tabs = (g.devTabs ??= new Set());
const reloadTabs = () => {
  for (const tab of tabs) {
    try {
      tab.enqueue('data: reload\n\n');
    } catch {
      tabs.delete(tab);
    }
  }
};

// A re-evaluation of this module *is* the "src/ changed" signal.
g.devGeneration = (g.devGeneration ?? 0) + 1;
if (g.devGeneration > 1) reloadTabs();

g.devWatcher?.close();
if (!SERVE_DIST)
  g.devWatcher = watch(new URL('public/', ROOT), { recursive: true }, reloadTabs);

const RELOADER = `<script>new EventSource('/~dev').onmessage = () => location.reload()</script>`;

const events = (): Response => {
  let tab: ReadableStreamDefaultController;
  return new Response(
    new ReadableStream({
      start(controller) {
        tabs.add((tab = controller));
      },
      cancel() {
        tabs.delete(tab);
      }
    }),
    { headers: { 'content-type': 'text/event-stream' } }
  );
};

// ---- server ----

const html = (body: string) =>
  new Response(body, { headers: { 'content-type': 'text/html; charset=utf-8' } });

const notFound = () => new Response('Not Found', { status: 404 });

/** Unmatched paths are files from public/ (dev) or dist/ (preview). */
const files = async (req: Request): Promise<Response> => {
  const pathname = decodeURIComponent(new URL(req.url).pathname);
  if (pathname.includes('..')) return notFound();
  const file = Bun.file(new URL(`.${pathname === '/' ? '/index.html' : pathname}`, FILES));
  return (await file.exists()) ? new Response(file) : notFound();
};

const STATIC_ROUTES: Serve.Routes<undefined, string> = {
  // Mirrors the /about -> / redirect configured in vercel.json.
  '/about': Response.redirect('/', 301),
  '/*': files
};

const server = Bun.serve({
  port: Number(Bun.env.PORT ?? 3000),

  // Preview serves only what `bun run build` wrote; dev renders the page and
  // the JSON from source on every request, and adds the live-reload stream.
  routes: SERVE_DIST
    ? STATIC_ROUTES
    : {
        ...STATIC_ROUTES,
        '/': () => html(renderPage(COMPANIES).replace('</body>', `${RELOADER}</body>`)),
        '/api/companies.json': () => Response.json(COMPANIES),
        '/~dev': events
      }
});

if (g.devGeneration === 1)
  console.log(
    `dsmtech ${SERVE_DIST ? '(dist preview)' : '(dev)'} at ${server.url} — ${COMPANIES.length} companies`
  );
