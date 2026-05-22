import fs from "node:fs";
import os from "node:os";
import path from "node:path";
// eslint-disable-next-line import/no-extraneous-dependencies
import { afterEach, describe, expect } from "@jest/globals";
import { restructure } from "./content-tree-enhancers.mjs";

describe("restructure", () => {
  const tempDirectories = [];

  afterEach(() => {
    for (const directory of tempDirectories.splice(0)) {
      fs.rmSync(directory, { force: true, recursive: true });
    }
  });

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

  it("encodes non-ASCII anchor ids", () => {
    const directory = fs.mkdtempSync(
      path.join(os.tmpdir(), "content-tree-enhancers-"),
    );
    tempDirectories.push(directory);

    const file = path.join(directory, "getting-started.mdx");
    fs.writeFileSync(
      file,
      `---
title: Getting Started
---

## الإعداد الأساسي
`,
    );

    const page = {
      type: "file",
      path: file,
      name: "getting-started.mdx",
      extension: ".mdx",
    };

    restructure(page, { dir: directory });

    expect(page.anchors[0].id).toBe(encodeURI("الإعداد-الأساسي"));
  });
});
