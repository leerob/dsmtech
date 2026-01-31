import { watch } from "fs";
import { copyFile, mkdir, readdir } from "fs/promises";
import { dirname, join } from "path";
import { COMPANIES } from "./app/companies";

const isDevMode = process.argv.includes("--dev");

const distDir = "dist";
const publicDir = "public";
const stylesPath = "src/styles.css";
const aboutPath = "src/about.html";

const formatFilePath = (name: string) => name.replace(/ /g, "_").toLowerCase();

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const ensureDir = async (path: string) => {
  await mkdir(path, { recursive: true });
};

const copyDir = async (src: string, dest: string) => {
  await ensureDir(dest);
  const entries = await readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(sourcePath, destPath);
    } else if (entry.isFile()) {
      await copyFile(sourcePath, destPath);
    }
  }
};

const copyFileIfExists = async (src: string, dest: string) => {
  const file = Bun.file(src);
  if (!(await file.exists())) return;
  await ensureDir(dirname(dest));
  await copyFile(src, dest);
};

const renderSocial = (company: typeof COMPANIES[number]) => {
  const socials = [
    {
      label: "IG",
      value: company.instagram,
      href: (handle: string) => `https://www.instagram.com/${handle}`
    },
    {
      label: "TW",
      value: company.twitter,
      href: (handle: string) => `https://www.twitter.com/${handle}`
    },
    {
      label: "FB",
      value: company.facebook,
      href: (handle: string) => `https://www.facebook.com/${handle}`
    },
    {
      label: "IN",
      value: company.linkedin,
      href: (handle: string) => `https://www.linkedin.com/company/${handle}`
    }
  ];

  return socials
    .map((social) => {
      if (!social.value) {
        return `<span class="pill pill-muted">${social.label}</span>`;
      }

      const href = escapeHtml(social.href(social.value));
      return `<a class="pill" href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(
        `${company.name} ${social.label}`
      )}">${social.label}</a>`;
    })
    .join("");
};

const categoryClass = (category: string) => {
  const value = category.toLowerCase();
  if (value === "public") return "tag tag-public";
  if (value === "private") return "tag tag-private";
  return "tag tag-startup";
};

const renderRows = () => {
  const sorted = [...COMPANIES].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return sorted
    .map((company, index) => {
      const logo = `/logos/${formatFilePath(company.name)}.jpg`;
      const careers = company.careers
        ? `<a href="${escapeHtml(company.careers)}" target="_blank" rel="noopener noreferrer">open</a>`
        : `<span class="muted">-</span>`;

      return `<tr>
  <td class="col-index">${index + 1}</td>
  <td class="col-name">
    <div class="company">
      <img src="${logo}" alt="${escapeHtml(company.name)} logo" loading="lazy" />
      <div class="company-name">${escapeHtml(company.name)}</div>
    </div>
  </td>
  <td class="col-city">${escapeHtml(company.city)}</td>
  <td class="col-type"><span class="${categoryClass(
    company.category
  )}">${escapeHtml(company.category)}</span></td>
  <td class="col-desc">${escapeHtml(company.description)}</td>
  <td class="col-social">${renderSocial(company)}</td>
  <td class="col-jobs">${careers}</td>
</tr>`;
    })
    .join("");
};

const getStats = () => {
  const totals = {
    Public: 0,
    Private: 0,
    Startup: 0
  };

  for (const company of COMPANIES) {
    totals[company.category as keyof typeof totals] += 1;
  }

  const cities = new Set(COMPANIES.map((company) => company.city));

  return {
    total: COMPANIES.length,
    publicCount: totals.Public,
    privateCount: totals.Private,
    startupCount: totals.Startup,
    cities: cities.size
  };
};

const renderPage = ({
  title,
  description,
  body,
  activePath
}: {
  title: string;
  description: string;
  body: string;
  activePath: "home" | "about";
}) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#f6f5f0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="/opengraph-image.jpg" />
  <link rel="icon" href="/favicon.ico" />
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <div class="sheet">
    <header class="toolbar">
      <div class="brand">DSMTECH</div>
      <nav class="nav">
        <a class="nav-link ${activePath === "home" ? "is-active" : ""}" href="/">Directory</a>
        <a class="nav-link ${activePath === "about" ? "is-active" : ""}" href="/about/">About</a>
        <a class="nav-link" href="https://github.com/leerob/dsmtech" target="_blank" rel="noopener noreferrer">GitHub</a>
      </nav>
      <div class="meta">Greater Des Moines tech index</div>
    </header>
    <main class="main">
      ${body}
    </main>
    <footer class="footer">
      <div>Data source: <a href="https://github.com/leerob/dsmtech" target="_blank" rel="noopener noreferrer">github.com/leerob/dsmtech</a></div>
      <div>Built with Bun, static HTML and CSS.</div>
    </footer>
  </div>
</body>
</html>`;
};

async function build() {
  const styles = await Bun.file(stylesPath).text();
  const aboutContent = await Bun.file(aboutPath).text();

  const stats = getStats();
  const buildDate = new Date().toISOString().slice(0, 10);

  const summary = `<section class="summary">
  <div class="stat">
    <div class="stat-label">Total</div>
    <div class="stat-value">${stats.total}</div>
  </div>
  <div class="stat">
    <div class="stat-label">Public</div>
    <div class="stat-value">${stats.publicCount}</div>
  </div>
  <div class="stat">
    <div class="stat-label">Private</div>
    <div class="stat-value">${stats.privateCount}</div>
  </div>
  <div class="stat">
    <div class="stat-label">Startup</div>
    <div class="stat-value">${stats.startupCount}</div>
  </div>
  <div class="stat">
    <div class="stat-label">Cities</div>
    <div class="stat-value">${stats.cities}</div>
  </div>
  <div class="stat">
    <div class="stat-label">Build</div>
    <div class="stat-value">${buildDate}</div>
  </div>
</section>`;

  const intro = `<section class="intro">
  <div>
    <h1>DSMTECH</h1>
    <p>Dense, spreadsheet-style directory of tech companies and startups in the Greater Des Moines area.</p>
  </div>
  <div class="legend">
    <span class="tag tag-public">Public</span>
    <span class="tag tag-private">Private</span>
    <span class="tag tag-startup">Startup</span>
  </div>
</section>`;

  const table = `<section class="table-wrap">
  <table class="sheet-table">
    <thead>
      <tr>
        <th class="col-index">#</th>
        <th class="col-name">Company</th>
        <th class="col-city">City</th>
        <th class="col-type">Type</th>
        <th class="col-desc">Summary</th>
        <th class="col-social">Social</th>
        <th class="col-jobs">Jobs</th>
      </tr>
    </thead>
    <tbody>
      ${renderRows()}
    </tbody>
  </table>
</section>`;

  const homeBody = `${intro}${summary}${table}`;

  const homePage = renderPage({
    title: "dsmtech directory",
    description:
      "A dense, spreadsheet-style directory of tech companies and startups in Greater Des Moines.",
    body: homeBody,
    activePath: "home"
  });

  const aboutBody = `<section class="content">${aboutContent}</section>`;

  const aboutPage = renderPage({
    title: "about dsmtech",
    description:
      "Background on the dsmtech directory and how it started in Des Moines.",
    body: aboutBody,
    activePath: "about"
  });

  await ensureDir(distDir);
  await ensureDir(join(distDir, "about"));

  await Bun.write(join(distDir, "styles.css"), styles);
  await Bun.write(join(distDir, "index.html"), homePage);
  await Bun.write(join(distDir, "about", "index.html"), aboutPage);

  await copyDir(join(publicDir, "logos"), join(distDir, "logos"));
  await copyFileIfExists(join("app", "favicon.ico"), join(distDir, "favicon.ico"));
  await copyFileIfExists(
    join("app", "opengraph-image.jpg"),
    join(distDir, "opengraph-image.jpg")
  );

  console.log(
    `Build complete: ${stats.total} companies, output in ${distDir}/`
  );
}

async function startDevServer() {
  const server = Bun.serve({
    port: 3000,
    async fetch(req) {
      const url = new URL(req.url);
      let path = url.pathname;

      if (path === "/") path = "/index.html";
      if (path.endsWith("/")) path = `${path}index.html`;

      const hasExtension = path.includes(".");
      const resolved = hasExtension ? path : `${path}/index.html`;
      const sanitized = resolved.replace(/^\/+/, "");
      const filePath = join(distDir, sanitized);

      const file = Bun.file(filePath);
      if (!(await file.exists())) {
        return new Response("Not Found", { status: 404 });
      }

      let contentType = "text/html";
      if (path.endsWith(".css")) contentType = "text/css";
      else if (path.endsWith(".js")) contentType = "application/javascript";
      else if (path.endsWith(".svg")) contentType = "image/svg+xml";
      else if (path.endsWith(".woff2")) contentType = "font/woff2";
      else if (path.endsWith(".png")) contentType = "image/png";
      else if (path.endsWith(".jpg") || path.endsWith(".jpeg"))
        contentType = "image/jpeg";
      else if (path.endsWith(".ico")) contentType = "image/x-icon";

      return new Response(file, {
        headers: { "Content-Type": contentType }
      });
    }
  });

  console.log(`Dev server running at http://localhost:${server.port}`);

  const watcher = watch(".", { recursive: true }, async (event, filename) => {
    if (
      filename &&
      !filename.startsWith("dist") &&
      !filename.startsWith("node_modules") &&
      !filename.startsWith(".git")
    ) {
      console.log(`File changed: ${filename}`);
      await build();
    }
  });

  process.on("SIGINT", () => {
    console.log("\nShutting down...");
    watcher.close();
    process.exit(0);
  });
}

await build();

if (isDevMode) {
  await startDevServer();
}
