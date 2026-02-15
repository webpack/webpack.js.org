import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Feed } from "feed";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const BASE_URL = "https://webpack.js.org";

function extractPubDate(node) {
  const name = node.name || "";

  const filenameDateMatch = name.match(/^(\d{4}-\d{2}-\d{2})-/);
  if (filenameDateMatch) {
    const date = new Date(filenameDateMatch[1]);
    if (!Number.isNaN(date.getTime())) return date;
  }

  const title = node.title || "";
  const titleDateMatch = title.match(/\((\d{4}-\d{2}-\d{2})\)/);
  if (titleDateMatch) {
    const date = new Date(titleDateMatch[1]);
    if (!Number.isNaN(date.getTime())) return date;
  }

  const filePath = path.resolve(ROOT, node.path);
  try {
    const stat = fs.statSync(filePath);
    return stat.mtime;
  } catch {
    return new Date();
  }
}

function main() {
  const contentPath = path.resolve(ROOT, "src/_content.json");
  const contentTree = JSON.parse(fs.readFileSync(contentPath, "utf8"));

  const blogSection = contentTree.children?.find(
    (child) => child.name === "blog" && child.type === "directory",
  );

  if (!blogSection?.children) {
    throw new Error("generate-rss: blog section not found in content tree");
  }

  const posts = blogSection.children
    .filter(
      (child) =>
        child.type === "file" &&
        (child.extension === ".mdx" || child.extension === ".md") &&
        child.name !== "index.mdx" &&
        child.name !== "index.md" &&
        child.name !== "printable.mdx" &&
        child.name !== "printable.md" &&
        child.url !== "/blog/" &&
        !child.url?.includes("/printable"),
    )
    .map((node) => ({
      title: node.title || "Untitled",
      link: `${BASE_URL}${node.url}`,
      date: extractPubDate(node),
      description: node.description || node.title || "Untitled",
    }))
    .toSorted((a, b) => b.date.getTime() - a.date.getTime());

  const feed = new Feed({
    title: "webpack Blog",
    description: "Announcements and updates from the webpack team",
    id: `${BASE_URL}/blog/`,
    link: `${BASE_URL}/blog/`,
    language: "en",
    updated: new Date(),
    feedLinks: {
      rss: `${BASE_URL}/feed.xml`,
    },
  });

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      link: post.link,
      description: post.description,
      date: post.date,
      id: post.link,
    });
  }

  const distPath = path.resolve(ROOT, "dist/feed.xml");
  fs.writeFileSync(distPath, feed.rss2(), "utf8");
  console.log(`Successfully generated RSS feed at ${distPath}`);
}

main();
