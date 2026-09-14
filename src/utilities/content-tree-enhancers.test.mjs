import fs from "node:fs";
import os from "node:os";
import path from "node:path";
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect } from "@jest/globals";
import { enhance, restructure } from "./content-tree-enhancers.mjs";

describe("restructure", () => {
  it("applies filter result back to children array", () => {
    const originalChildren = [
      {
        type: "directory",
        path: "src/content/guides",
        title: "Guides",
      },
      {
        type: "directory",
        path: "src/content/api",
        title: "API",
      },
    ];

    const root = {
      type: "directory",
      path: "src/content",
      children: originalChildren,
    };

    restructure(root, { dir: "src/content" });

    // Filter creates a new array; restructure must assign that result back.
    expect(root.children).not.toBe(originalChildren);
    expect(root.children).toHaveLength(2);
  });

  it("sorts children after restructuring", () => {
    const root = {
      type: "directory",
      path: "src/content",
      children: [
        {
          type: "directory",
          path: "src/content/guides",
          title: "Guides",
          sort: 20,
        },
        {
          type: "directory",
          path: "src/content/api",
          title: "API",
          sort: 10,
        },
      ],
    };

    restructure(root, { dir: "src/content" });

    expect(root.children.map((item) => item.title)).toEqual(["API", "Guides"]);
  });

  it("keeps blog roadmaps below the releases, newest first", () => {
    const post = (name, date, title) => ({
      type: "file",
      path: `src/content/blog/${name}`,
      name,
      date,
      title,
    });

    const root = {
      type: "directory",
      path: "src/content/blog",
      children: [
        post("2026-02-04-roadmap-2026.mdx", "2026-02-04", "Roadmap 2026"),
        post("2020-12-08-roadmap-2021.mdx", "2020-12-08", "Roadmap 2021"),
        post("2026-02-03-webpack-5-105.mdx", "2026-02-03", "Webpack 5.105"),
        post("2026-09-14-webpack-5-111.mdx", "2026-09-14", "Webpack 5.111"),
        {
          type: "file",
          path: "src/content/blog/index.mdx",
          name: "index.mdx",
          title: "Blog",
        },
      ],
    };

    restructure(root, { dir: "src/content" });

    expect(root.children.map((item) => item.title)).toEqual([
      "Blog",
      "Webpack 5.111",
      "Webpack 5.105",
      "Roadmap 2026",
      "Roadmap 2021",
    ]);
  });
});

describe("enhance", () => {
  const createBlogTree = (body) => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "webpack-blog-"));
    const blogDir = path.join(root, "blog");
    fs.mkdirSync(blogDir);
    const filePath = path.join(blogDir, "example.mdx");
    fs.writeFileSync(filePath, `---\ntitle: Example\n---\n\n${body}`);

    return {
      root,
      tree: {
        type: "file",
        path: filePath,
        extension: ".mdx",
        name: "example.mdx",
      },
    };
  };

  it("does not append an ellipsis to an untruncated blog teaser", () => {
    const { root, tree } = createBlogTree("Short body.");

    enhance(tree, { dir: root });

    expect(tree.teaser).toBe("Short body.");
  });

  it("appends an ellipsis when the blog teaser is truncated", () => {
    const { root, tree } = createBlogTree(
      ["First line.", "Second line.", "Third line.", "Fourth line."].join("\n"),
    );

    enhance(tree, { dir: root });

    expect(tree.teaser).toBe("First line. Second line. Third line....");
  });

  it("skips MDX imports and JSX so the teaser reads as prose", () => {
    const { root, tree } = createBlogTree(
      [
        'import banner from "../../assets/blog/banner.png";',
        "",
        '<img src={banner} alt="banner" />',
        "",
        "Webpack 5.110 is out.",
      ].join("\n"),
    );

    enhance(tree, { dir: root });

    expect(tree.teaser).toBe("Webpack 5.110 is out.");
  });

  it("leaves an empty teaser empty instead of a bare ellipsis", () => {
    const { root, tree } = createBlogTree("");

    enhance(tree, { dir: root });

    expect(tree.teaser).toBe("");
  });
});
