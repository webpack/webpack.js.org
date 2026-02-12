import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const BASE_URL = "https://webpack.js.org";

function escapeXml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function extractPubDate(node) {
  const name = node.name || "";

  // 1. Filename pattern YYYY-MM-DD-*
  const filenameDateMatch = name.match(/^(\d{4}-\d{2}-\d{2})-/);
  if (filenameDateMatch) {
    const d = new Date(filenameDateMatch[1]);
    if (!Number.isNaN(d.getTime())) return d;
  }

  // 2. Parse from title (YYYY-MM-DD)
  const title = node.title || "";
  const titleDateMatch = title.match(/\((\d{4}-\d{2}-\d{2})\)/);
  if (titleDateMatch) {
    const d = new Date(titleDateMatch[1]);
    if (!Number.isNaN(d.getTime())) return d;
  }

  // 3. Fallback: file mtime
  const filePath = path.resolve(ROOT, node.path);
  try {
    const stat = fs.statSync(filePath);
    return stat.mtime;
  } catch {
    return new Date();
  }
}

function formatRfc2822(date) {
  return date.toUTCString();
}

function main() {
  const contentPath = path.resolve(ROOT, "src/_content.json");
  const contentTree = JSON.parse(fs.readFileSync(contentPath, "utf8"));

  const blogSection = contentTree.children?.find(
    (child) => child.name === "blog" && child.type === "directory",
  );

  if (!blogSection?.children) {
    console.error("generate-rss: blog section not found in content tree");
    process.exit(1);
  }

  const posts = blogSection.children
    .filter(
      (child) =>
        child.type === "file" &&
        (child.extension === ".mdx" || child.extension === ".md") &&
        child.name !== "index" &&
        child.name !== "printable" &&
        child.url !== "/blog/",
    )
    .map((node) => ({
      title: node.title || "Untitled",
      link: `${BASE_URL}${node.url}`,
      pubDate: extractPubDate(node),
      description: node.description || node.title || "Untitled",
    }))
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  const lastBuildDate = formatRfc2822(new Date());

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>webpack Blog</title>
    <link>${BASE_URL}/blog/</link>
    <description>Announcements and updates from the webpack team</description>
    <language>en</language>
    <lastBuildDate>${escapeXml(lastBuildDate)}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${posts
  .map(
    (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(post.link)}</link>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${escapeXml(formatRfc2822(post.pubDate))}</pubDate>
      <guid isPermaLink="true">${escapeXml(post.link)}</guid>
    </item>`,
  )
  .join("\n")}
  </channel>
</rss>
`;

  const distPath = path.resolve(ROOT, "dist/feed.xml");
  fs.writeFileSync(distPath, xml, "utf8");
  console.log(`Successfully generated RSS feed at ${distPath}`);
}

main();
