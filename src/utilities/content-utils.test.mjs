import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect } from "@jest/globals";
import {
  extractPages,
  extractSections,
  findInContent,
  flattenContent,
  getPageDescription,
  getPageTitle,
} from "./content-utils.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const content = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./fixtures/content.json"), "utf8"),
);

describe("findInContent", () => {
  it("should find home page", () => {
    const page = findInContent(content, (item) => item.url === "/");
    expect(page.title).toBe("webpack");
  });
});

describe("getPageDescription", () => {
  it("should return undefined for non-exist page", () => {
    const description = getPageDescription(content, "/xyz");
    expect(description).toBeUndefined();
  });

  it("should return empty for printable page", () => {
    const description = getPageDescription(content, "/printable/");
    expect(description).toBe("");
  });

  it("should return description for get-started", () => {
    const description = getPageDescription(content, "/guides/getting-started/");
    expect(description).toBe(
      "Learn how to bundle a JavaScript application with webpack 5.",
    );
  });
});

describe("getPageTitle", () => {
  it("should return default title for non-exist page", () => {
    const title = getPageTitle(content, "/xzy");
    expect(title).toBe("webpack");
  });

  it("should return title for printable page", () => {
    const title = getPageTitle(content, "/printable/");
    expect(title).toBe("Combined printable page | webpack");
  });

  it("should return title for get-started", () => {
    const title = getPageTitle(content, "/guides/getting-started/");
    expect(title).toBe("Getting Started | webpack");
  });
});

describe("flattenContent", () => {
  it("should return a flat array of leaf nodes", () => {
    const tree = {
      children: [
        { title: "A" },
        {
          children: [{ title: "B" }, { children: [{ title: "C" }] }],
        },
        { title: "D" },
      ],
    };
    const flatArray = flattenContent(tree);
    expect(flatArray).toEqual([
      { title: "A" },
      { title: "B" },
      { title: "C" },
      { title: "D" },
    ]);
  });
});

describe("extractSections", () => {
  it("should return array of immediate items having directory property", () => {
    const tree = {
      children: [
        { title: "A", type: "file" },
        {
          title: "B",
          type: "directory",
          children: [
            { title: "C", type: "file" },
            { title: "D ", type: "directory", children: [{ title: "E" }] },
          ],
        },
        { title: "F", type: "file" },
      ],
    };
    const sections = extractSections(tree);
    expect(sections).toEqual([
      {
        title: "B",
        type: "directory",
        children: [
          { title: "C", type: "file" },
          { title: "D ", type: "directory", children: [{ title: "E" }] },
        ],
      },
    ]);
  });
});

describe("extractPages", () => {
  it("should return array of leaf items having file property", () => {
    const tree = {
      children: [
        { title: "A", type: "file", extension: ".md" },
        {
          title: "B",
          type: "directory",
          children: [
            { title: "C", type: "file", extension: ".mdx" },
            {
              title: "D",
              type: "directory",
              children: [{ title: "E", type: "file", extension: ".md" }],
            },
          ],
        },
        { title: "F", type: "file", extension: ".mdx" },
      ],
    };

    const pages = extractPages(tree);
    expect(pages).toEqual([
      { title: "A", type: "file", extension: ".md" },
      { title: "C", type: "file", extension: ".mdx" },
      { title: "E", type: "file", extension: ".md" },
      { title: "F", type: "file", extension: ".mdx" },
    ]);
  });
});
