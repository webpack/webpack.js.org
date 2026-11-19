// Writes dist/llms.txt and dist/llms-full.txt (https://llmstxt.org/) from the
// content tree, so AI agents and search tools can find every page and read the
// documentation as plain Markdown without rendering the site.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");

export const BASE_URL = "https://webpack.js.org";

// Sections in the order an agent new to webpack should read them; `optional`
// ones are listed under "## Optional", which llms.txt readers may skip.
export const SECTIONS = [
  { name: "concepts", title: "Concepts" },
  { name: "guides", title: "Guides" },
  { name: "configuration", title: "Configuration" },
  { name: "api", title: "API" },
  { name: "plugins", title: "Plugins" },
  { name: "loaders", title: "Loaders" },
  { name: "migrate", title: "Migrate" },
  { name: "blog", title: "Blog", optional: true },
  { name: "contribute", title: "Contribute", optional: true },
];

// Built-in features that are easy to miss when an agent only knows
// loader-and-plugin era webpack.
export const HIGHLIGHTS = [
  ["Native CSS", "/guides/native-css/"],
  ["Native HTML", "/guides/native-html/"],
  [
    "Built-in CSS, HTML, JavaScript, JSON and SVG minification",
    "/configuration/optimization/#optimizationminimize",
  ],
  ["TypeScript", "/guides/typescript/"],
  ["Modern web platform features", "/guides/modern-web-platform/"],
  ["Asset modules", "/guides/asset-modules/"],
  ["Module Federation", "/concepts/module-federation/"],
];

const isPage = (node) =>
  node.type === "file" &&
  (node.extension === ".mdx" || node.extension === ".md") &&
  !node.name.startsWith("_") &&
  node.name !== "printable.mdx" &&
  !node.url?.includes("/printable");

/**
 * @param {object} node content tree node
 * @returns {object[]} every page below `node`, index first, then by `sort` and title
 */
export function collectPages(node) {
  const pages = [];
  const walk = (current) => {
    if (isPage(current)) pages.push(current);
    for (const child of current.children || []) walk(child);
  };
  walk(node);
  return pages.toSorted((a, b) => {
    const aIndex = a.name === "index.mdx" ? 0 : 1;
    const bIndex = b.name === "index.mdx" ? 0 : 1;
    if (aIndex !== bIndex) return aIndex - bIndex;
    const sort = (a.sort ?? 0) - (b.sort ?? 0);
    if (sort !== 0) return sort;
    return (a.title || "").localeCompare(b.title || "");
  });
}

const oneLine = (text) => (text || "").replaceAll(/\s+/g, " ").trim();

const link = (page) => {
  const description = oneLine(page.description);
  return `- [${oneLine(page.title) || page.url}](${BASE_URL}${page.url})${
    description ? `: ${description}` : ""
  }`;
};

const sectionPages = (tree, section) => {
  const directory = tree.children?.find(
    (child) => child.type === "directory" && child.name === section.name,
  );
  if (!directory) return [];
  const pages = collectPages(directory);
  // Newest posts first, the blog index aside.
  return section.name === "blog"
    ? pages.toSorted((a, b) =>
        a.name === "index.mdx"
          ? -1
          : b.name === "index.mdx"
            ? 1
            : b.name.localeCompare(a.name),
      )
    : pages;
};

/**
 * @param {object} tree the content tree (src/_content.json)
 * @returns {string} llms.txt
 */
export function buildLlmsTxt(tree) {
  const home = tree.children?.find((child) => child.url === "/");
  const lines = [
    "# webpack",
    "",
    `> ${oneLine(home?.description) || "webpack is a static module bundler for modern JavaScript applications."}`,
    "",
    "webpack 5 bundles JavaScript, CSS, HTML, JSON, WebAssembly and assets into optimized files for browsers, Node.js, Deno, Bun and other runtimes. CSS and HTML are built in: no css-loader, style-loader, mini-css-extract-plugin, html-loader or html-webpack-plugin is needed, and production builds minify JavaScript, CSS and HTML out of the box, with opt-in JSON and SVG minification.",
    "",
    `The whole documentation as one Markdown file: ${BASE_URL}/llms-full.txt`,
    "",
    "Key built-in features:",
    "",
    ...HIGHLIGHTS.map(([title, url]) => `- [${title}](${BASE_URL}${url})`),
  ];

  const topLevel = (tree.children || []).filter(
    (child) => isPage(child) && child.url !== "/",
  );
  const optional = [];
  for (const section of SECTIONS) {
    const pages = sectionPages(tree, section);
    if (pages.length === 0) continue;
    if (section.optional) {
      optional.push(...pages);
      continue;
    }
    lines.push("", `## ${section.title}`, "", ...pages.map(link));
  }
  if (topLevel.length > 0) {
    lines.push("", "## Other", "", ...topLevel.map(link));
  }
  if (optional.length > 0) {
    lines.push("", "## Optional", "", ...optional.map(link));
  }
  return `${lines.join("\n")}\n`;
}

/**
 * @param {string} source an .mdx page
 * @returns {string} its Markdown body, without front matter and MDX imports
 */
export function toMarkdown(source) {
  let body = source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
  // Drop `import`/`export` lines outside code fences, which only wire MDX.
  let inFence = false;
  body = body
    .split("\n")
    .filter((line) => {
      if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
      return inFence || !/^(import|export) .+/.test(line);
    })
    .join("\n");
  return body.trim();
}

/**
 * @param {object} tree the content tree
 * @param {(page: object) => string} read reads a page's source
 * @returns {string} llms-full.txt
 */
export function buildLlmsFullTxt(tree, read) {
  const parts = [
    "# webpack documentation",
    "",
    `> The full webpack documentation from ${BASE_URL}, one page after another. The index of pages is at ${BASE_URL}/llms.txt.`,
  ];
  for (const section of SECTIONS) {
    if (section.optional) continue;
    for (const page of sectionPages(tree, section)) {
      const body = toMarkdown(read(page));
      if (!body) continue;
      parts.push(
        "",
        "---",
        "",
        `# ${oneLine(page.title)}`,
        "",
        `Source: ${BASE_URL}${page.url}`,
        "",
        body,
      );
    }
  }
  return `${parts.join("\n")}\n`;
}

function main() {
  const tree = JSON.parse(
    fs.readFileSync(path.resolve(ROOT, "src/_content.json"), "utf8"),
  );
  const dist = path.resolve(ROOT, "dist");
  fs.mkdirSync(dist, { recursive: true });
  fs.writeFileSync(path.join(dist, "llms.txt"), buildLlmsTxt(tree), "utf8");
  fs.writeFileSync(
    path.join(dist, "llms-full.txt"),
    buildLlmsFullTxt(tree, (page) =>
      fs.readFileSync(path.resolve(ROOT, page.path), "utf8"),
    ),
    "utf8",
  );
  console.log(`Successfully generated llms.txt and llms-full.txt in ${dist}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
