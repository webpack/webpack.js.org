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
});
