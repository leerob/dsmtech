# 🚀 dsmtech.io

> The best tech companies and startups in the Greater Des Moines area.

An end-to-end [Bun](https://bun.com) project with **zero runtime dependencies** that ships as a fully static site:

- `src/companies.ts` — the dataset (typed)
- `src/page.ts` — renders the page to plain HTML with template strings
- `src/build.ts` — writes the static site to `dist/` (HTML, open-data JSON, assets)
- `src/dev.ts` — tiny local server for development only
- `public/styles.css` — hand-written modern CSS: `light-dark()`, `oklch`, `color-mix()`, native nesting, container queries (size + scroll-state), `:has()`, popover with `@starting-style`, CSS counters
- `public/app.js` — ~100 lines of vanilla JS for search, filtering, sorting, shareable URL state, and view transitions

## Develop

```bash
bun run dev      # hot-reloading dev server at http://localhost:3000
bun run build    # render the static site to dist/
bun run preview  # build, then serve dist/ exactly as deployed
bun run check    # typecheck
```

## Deploy

The output in `dist/` is plain static files and deploys anywhere. `vercel.json`
configures Vercel to build with `bun run build` and serve `dist/`.

## Add or fix a company

1. Edit [`src/companies.ts`](src/companies.ts)
2. Add a 400×400 JPEG logo to `public/logos/` (lowercased name, spaces → underscores)
3. Open a pull request
