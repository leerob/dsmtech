import type { Category, Company } from './companies.ts';

const SITE_URL = 'https://dsmtech.io';
const REPO_URL = 'https://github.com/leerob/dsmtech';
const TITLE =
  'dsmtech – The best tech companies and startups in the Greater Des Moines area.';
const DESCRIPTION =
  'An open, information-dense directory of tech companies and startups in Des Moines, Iowa — with direct links to their careers pages.';

/** Escape text for safe interpolation into HTML text and double-quoted attributes. */
const esc = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

/** "Kum and Go" -> "/logos/kum_and_go.jpg" (matches the files in public/logos). */
const logoPath = (name: string): string =>
  `/logos/${name.replaceAll(' ', '_').toLowerCase()}.jpg`;

const collator = new Intl.Collator('en', { sensitivity: 'base' });
const byName = (a: Company, b: Company): number => collator.compare(a.name, b.name);

// ---- icons ----

/* Monochrome brand marks (Simple Icons path data), drawn with currentColor. */
const MARKS = {
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  x: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z',
  instagram:
    'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a5.885 5.885 0 0 0 1.384 2.126A5.868 5.868 0 0 0 4.14 23.37c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 0 0 2.126-1.384 5.86 5.86 0 0 0 1.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 0 0-1.384-2.126A5.847 5.847 0 0 0 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 0 1-.899 1.382 3.744 3.744 0 0 1-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 0 1-1.379-.899 3.644 3.644 0 0 1-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0z',
  facebook:
    'M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0',
  github:
    'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'
} as const;

/* Stroked UI icons (Lucide-style path data). */
const STROKES = {
  arrow: 'M7 17 17 7M8 7h9v9',
  search: 'M21 21l-4.35-4.35M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  close: 'M18 6 6 18M6 6l12 12'
} as const;

/**
 * Each icon is defined once in an SVG sprite and referenced with <use>, so a
 * social link costs a few bytes per row instead of repeating the full path.
 */
const Sprite = `<svg class="sprite" aria-hidden="true"><defs>
${Object.entries(MARKS)
  .map(([id, d]) => `  <symbol id="i-${id}" viewBox="0 0 24 24"><path d="${d}"/></symbol>`)
  .join('\n')}
${Object.entries(STROKES)
  .map(([id, d]) => `  <symbol id="i-${id}" viewBox="0 0 24 24"><path d="${d}"/></symbol>`)
  .join('\n')}
</defs></svg>`;

const mark = (name: keyof typeof MARKS): string =>
  `<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><use href="#i-${name}"/></svg>`;

const stroked = (name: keyof typeof STROKES): string =>
  `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><use href="#i-${name}"/></svg>`;

const ICON_ARROW = stroked('arrow');
const ICON_SEARCH = stroked('search');
const ICON_CLOSE = stroked('close');

// ---- company data helpers ----

interface SocialLink {
  label: string;
  href: string;
  svg: string;
}

const socialLinks = (c: Company): SocialLink[] => {
  const links: SocialLink[] = [];
  if (c.linkedin)
    links.push({
      label: 'LinkedIn',
      href: `https://www.linkedin.com/company/${c.linkedin}`,
      svg: mark('linkedin')
    });
  if (c.twitter)
    links.push({ label: 'X', href: `https://x.com/${c.twitter}`, svg: mark('x') });
  if (c.instagram)
    links.push({
      label: 'Instagram',
      href: `https://www.instagram.com/${c.instagram}`,
      svg: mark('instagram')
    });
  if (c.facebook)
    links.push({
      label: 'Facebook',
      href: `https://www.facebook.com/${c.facebook}`,
      svg: mark('facebook')
    });
  return links;
};

interface Stats {
  total: number;
  cities: number;
  countBy: (category: Category) => number;
}

const getStats = (companies: Company[]): Stats => ({
  total: companies.length,
  cities: new Set(companies.map((c) => c.city)).size,
  countBy: (category) => companies.filter((c) => c.category === category).length
});

const jsonLd = (companies: Company[]): string => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Tech companies and startups in the Greater Des Moines area',
    description: DESCRIPTION,
    url: SITE_URL,
    numberOfItems: companies.length,
    itemListElement: companies.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Organization',
        name: c.name,
        description: c.description.trim(),
        logo: `${SITE_URL}${logoPath(c.name)}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: c.city,
          addressRegion: 'IA',
          addressCountry: 'US'
        },
        sameAs: socialLinks(c).map((l) => l.href)
      }
    }))
  };
  // `<` must not appear inside an inline <script>.
  return JSON.stringify(data).replaceAll('<', '\\u003c');
};

// ---- table cells ----

const CompanyCell = (c: Company, index: number): string =>
  `<td class="c-company">
    <div class="org">
      <img src="${esc(logoPath(c.name))}" alt="" width="28" height="28" loading="${index < 12 ? 'eager' : 'lazy'}" decoding="async">
      <span class="name">${esc(c.name)}</span>
    </div>
  </td>`;

const TypeBadge = (category: Category): string =>
  `<span class="badge" data-category="${category}">${category}</span>`;

const SocialCell = (c: Company): string => {
  const links = socialLinks(c);
  if (links.length === 0) return '<span class="dim">—</span>';
  return links
    .map(
      (l) =>
        `<a class="social" href="${esc(l.href)}" target="_blank" rel="noopener noreferrer" title="${esc(`${c.name} on ${l.label}`)}" aria-label="${esc(`${c.name} on ${l.label}`)}">${l.svg}</a>`
    )
    .join('');
};

const CareersCell = (c: Company): string =>
  c.careers
    ? `<a class="jobs" href="${esc(c.careers)}" target="_blank" rel="noopener noreferrer">Jobs${ICON_ARROW}</a>`
    : '<span class="dim">—</span>';

const CompanyRow = (c: Company, index: number): string =>
  `<tr class="co" data-name="${esc(c.name)}" data-category="${c.category}" data-city="${esc(c.city)}">
  <td class="c-index" aria-hidden="true"></td>
  ${CompanyCell(c, index)}
  <td class="c-desc">${esc(c.description.trim())}</td>
  <td class="c-type">${TypeBadge(c.category)}</td>
  <td class="c-city">${esc(c.city)}</td>
  <td class="c-social">${SocialCell(c)}</td>
  <td class="c-careers">${CareersCell(c)}</td>
</tr>`;

// ---- page sections ----

const Head = (companies: Company[]): string =>
  `<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <title>${esc(TITLE)}</title>
  <meta name="description" content="${esc(DESCRIPTION)}">
  <link rel="canonical" href="${SITE_URL}">
  <link rel="icon" href="/favicon.ico" sizes="32x32">
  <link rel="stylesheet" href="/styles.css">
  <script type="module" src="/app.js"></script>
  <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f4f3f1">
  <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#121417">
  <meta property="og:title" content="${esc(TITLE)}">
  <meta property="og:description" content="${esc(DESCRIPTION)}">
  <meta property="og:url" content="${SITE_URL}">
  <meta property="og:site_name" content="dsmtech">
  <meta property="og:locale" content="en_US">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${SITE_URL}/opengraph-image.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(TITLE)}">
  <meta name="twitter:description" content="${esc(DESCRIPTION)}">
  <meta name="twitter:image" content="${SITE_URL}/opengraph-image.jpg">
  <script type="application/ld+json">${jsonLd(companies)}</script>
</head>`;

const SkipLink = `<a class="skip" href="#companies">Skip to companies table</a>`;

const Header = `<header class="site-header">
    <div class="wrap bar">
      <a class="wordmark" href="/">dsm<span>tech</span></a>
      <nav class="site-nav" aria-label="Site">
        <button type="button" class="navlink" popovertarget="about">About</button>
        <a class="navlink" href="${REPO_URL}" target="_blank" rel="noopener noreferrer">${mark('github')}GitHub</a>
      </nav>
    </div>
  </header>`;

const Segment = (value: string, label: string, count: number, checked = false): string => `
        <label class="seg">
          <input type="radio" name="type" value="${value}"${checked ? ' checked' : ''}>
          <span>${label}</span><span class="n">${count}</span>
        </label>`;

const SegmentedFilter = (stats: Stats): string =>
  `<fieldset class="segmented">
            <legend class="sr-only">Filter by company type</legend>${Segment('', 'All', stats.total, true)}${Segment('Startup', 'Startups', stats.countBy('Startup'))}${Segment('Private', 'Private', stats.countBy('Private'))}${Segment('Public', 'Public', stats.countBy('Public'))}
          </fieldset>`;

const Toolbar = (stats: Stats): string =>
  `<section class="toolbar" aria-label="Search and filter">
    <div class="wrap">
      <hgroup class="intro">
        <h1>The tech companies &amp; startups of Greater Des Moines</h1>
        <p>${stats.total} companies across ${stats.cities} metro cities — community-maintained, with direct links to careers pages.</p>
      </hgroup>
      <search>
        <form id="filters" autocomplete="off">
          <label class="search-box">
            ${ICON_SEARCH}
            <input type="search" id="q" name="q" placeholder="Search companies, products, cities…" spellcheck="false" autocapitalize="off">
            <kbd>/</kbd>
          </label>
          ${SegmentedFilter(stats)}
          <p class="hits"><output id="count" form="filters">${stats.total}</output>&hairsp;/&hairsp;${stats.total} shown</p>
        </form>
      </search>
    </div>
  </section>`;

const CompaniesTable = (companies: Company[]): string =>
  `<main class="sheet">
    <table class="companies" id="companies">
      <caption class="sr-only">Tech companies in the Greater Des Moines area</caption>
      <colgroup>
        <col class="w-index"><col class="w-company"><col class="w-desc"><col class="w-type"><col class="w-city"><col class="w-social"><col class="w-careers">
      </colgroup>
      <thead>
        <tr>
          <th scope="col" class="c-index" aria-hidden="true">#</th>
          <th scope="col" aria-sort="ascending"><button type="button" data-sort="name">Company</button></th>
          <th scope="col">Description</th>
          <th scope="col"><button type="button" data-sort="category">Type</button></th>
          <th scope="col"><button type="button" data-sort="city">HQ</button></th>
          <th scope="col">Social</th>
          <th scope="col" class="c-careers">Careers</th>
        </tr>
      </thead>
      <tbody>
${companies.map(CompanyRow).join('\n')}
        <tr class="empty">
          <td colspan="7">
            <p>No companies match your search.</p>
            <button type="button" id="reset">Clear filters</button>
          </td>
        </tr>
      </tbody>
    </table>
  </main>`;

const Footer = (stats: Stats): string =>
  `<footer class="site-footer">
    <div class="wrap bar">
      <p>Maintained by the community — <a href="${REPO_URL}" target="_blank" rel="noopener noreferrer">add or fix a company</a></p>
      <p class="meta"><a href="/api/companies.json">api</a> · ${stats.total} companies · ${stats.cities} cities · zero dependencies, built with Bun</p>
    </div>
  </footer>`;

const AboutDialog = (total: number): string =>
  `<aside id="about" popover aria-labelledby="about-title">
    <header>
      <h2 id="about-title">About dsmtech</h2>
      <button type="button" class="close" popovertarget="about" popovertargetaction="hide" aria-label="Close">${ICON_CLOSE}</button>
    </header>
    <p>
      When <a href="https://leerob.io" target="_blank" rel="noopener noreferrer">Lee Robinson</a>
      set out to find a new job as a developer in the Des Moines area, he researched companies
      and made pros/cons lists — and realized there was no central hub listing the tech
      companies and jobs in the greater DSM area.
    </p>
    <p>
      So he built dsmtech.io — the easiest way to find tech companies and jobs in Des Moines.
      It started as a list of 15 companies; today it tracks ${total} across the metro and has
      helped people all over Iowa land tech jobs. dsmtech was featured in
      <a href="https://innovationia.com/2019/01/03/dsmtech-io-launches-for-tech-job-seekers-scouting-des-moines/" target="_blank" rel="noopener noreferrer">Innovation Iowa</a>.
    </p>
    <p>
      See something incorrect, or know a company that belongs here? Edit
      <code>src/companies.ts</code> and <a href="${REPO_URL}" target="_blank" rel="noopener noreferrer">open a pull request</a>.
    </p>
    <footer>open data · <a href="/api/companies.json">/api/companies.json</a> · built with Bun</footer>
  </aside>`;

export function renderPage(companies: Company[]): string {
  const sorted = [...companies].sort(byName);
  const stats = getStats(sorted);

  return `<!doctype html>
<html lang="en">
${Head(sorted)}
<body>
  ${Sprite}
  ${SkipLink}

  ${Header}

  ${Toolbar(stats)}

  ${CompaniesTable(sorted)}

  ${Footer(stats)}

  ${AboutDialog(stats.total)}
</body>
</html>
`;
}
