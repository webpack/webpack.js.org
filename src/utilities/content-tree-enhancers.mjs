import fs from "node:fs";
import path from "node:path";
import frontMatter from "front-matter";
import { remark } from "remark";
import emoji from "remark-emoji";
import extractAnchors from "remark-extract-anchors";
import frontmatter from "remark-frontmatter";
import gfm from "remark-gfm";
import remarkHtml from "remark-html";
import slug from "../../src/remark-plugins/remark-slug/index.mjs";
import remarkRemoveHeadingId from "../remark-plugins/remark-remove-heading-id/index.mjs";

export const enhance = (tree, options) => {
  // Normalize everything to forward slashes for cross-platform consistency
  const dir = path
    .normalize(options.dir)
    .replaceAll("\\", "/")
    .replace(/^\.\//, "");

  const normalizedPath = tree.path.replaceAll("\\", "/");

  tree.url = normalizedPath
    // delete `.mdx` extensions
    .replace(tree.extension, "")
    // delete source content directory
    .replace(dir, "")
    // remove `index` for root urls
    .replace(/\/index$/, "")
    // replace empty strings with `/`
    .replace(/^$/, "/")
    // delete trailing dots for node
    .replaceAll(/^(\.)/g, "")
    // add trailing slash if missing
    .replace(/\/?$/, "/");

  if (tree.type === "file") {
    const anchors = [];
    const content = fs.readFileSync(tree.path, "utf8");
    const { attributes, body } = frontMatter(content);

    // remove underscore from fetched files
    if (tree.name[0] === "_") {
      tree.name = tree.name.replace("_", "");
      tree.url = tree.url.replace("_", "");
    }

    remark()
      .use(slug)
      .use(frontmatter)
      .use(gfm)
      .use(emoji)
      .use(extractAnchors, { anchors, levels: 3 })
      .use(remarkRemoveHeadingId)
      .use(remarkHtml)
      .process(content, (err) => {
        if (err) {
          throw err;
        }
      });

    tree.anchors = anchors;

    const dateRegex = /\((\d{4}-\d{2}-\d{2})\)/;
    const match = attributes.title ? attributes.title.match(dateRegex) : null;
    if (match) {
      [, tree.date] = match;
    } else {
      const fileMatch = tree.name.match(/^(\d{4}-\d{2}-\d{2})/);
      if (fileMatch) {
        [, tree.date] = fileMatch;
      }
    }

    const isBlogItem = normalizedPath.includes("/blog/");
    if (isBlogItem) {
      const teaser = (body || "")
        .split("\n")
        .filter((line) => line.trim() && !line.trim().startsWith("#"))
        .slice(0, 3)
        .join(" ")
        .replaceAll(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Strip markdown links but keep text
        .slice(0, 240);
      tree.teaser = `${teaser}...`;
    }

    Object.assign(
      tree,
      {
        path: normalizedPath,
      },
      attributes,
    );
  }
};

export const filter = () => true;

export const sort = (a, b) => {
  const aPath = (a.path || "").toLowerCase();
  const bPath = (b.path || "").toLowerCase();

  // Blog specific sorting: Index at top, then newest first
  if (aPath.includes("/blog/") && bPath.includes("/blog/")) {
    if (a.name === "index.mdx" || a.url === "/blog/") return -1;
    if (b.name === "index.mdx" || b.url === "/blog/") return 1;

    // Blog specific sorting: Index at top, then newest first by date
    if (a.date && b.date) {
      if (a.date > b.date) return -1;
      if (a.date < b.date) return 1;
    }

    // Backup: Use manual sort property
    if (a.sort !== undefined && b.sort !== undefined) {
      return b.sort - a.sort;
    }
  }

  const group1 = (a.group || "").toLowerCase();
  const group2 = (b.group || "").toLowerCase();

  if (group1 < group2) return -1;
  if (group1 > group2) return 1;

  if (a.sort !== undefined && b.sort !== undefined) {
    return a.sort - b.sort;
  } else if (a.sort !== undefined) {
    return -1;
  } else if (b.sort !== undefined) {
    return 1;
  }

  const aTitle = (a.title || "").toLowerCase();
  const bTitle = (b.title || "").toLowerCase();
  if (aTitle < bTitle) return -1;
  if (aTitle > bTitle) return 1;

  return 0;
};

export function restructure(item, options) {
  enhance(item, options);

  if (item.children) {
    for (const child of item.children) restructure(child, options);

    item.children = item.children.filter(filter);
    item.children.sort(sort);
  }

  return item;
}
