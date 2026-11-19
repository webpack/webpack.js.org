import {
  buildLlmsFullTxt,
  buildLlmsTxt,
  collectPages,
  toMarkdown,
} from "./generate-llms-txt.mjs";

const page = (directory, name, extra = {}) => ({
  type: "file",
  extension: ".mdx",
  name,
  path: `src/content/${directory}/${name}`,
  url:
    name === "index.mdx"
      ? `/${directory}/`
      : `/${directory}/${name.replace(/\.mdx$/, "")}/`,
  ...extra,
});

const tree = {
  type: "directory",
  name: "content",
  children: [
    page("", "index.mdx", { url: "/", description: "The home page." }),
    page("", "glossary.mdx", { url: "/glossary/", title: "Glossary" }),
    {
      type: "directory",
      name: "guides",
      children: [
        page("guides", "native-css.mdx", {
          title: "Native CSS",
          description: "Bundle CSS\nwithout loaders.",
          sort: 2,
        }),
        page("guides", "index.mdx", { title: "Guides", sort: -1 }),
        page("guides", "printable.mdx", { title: "Printable" }),
        page("guides", "getting-started.mdx", {
          title: "Getting Started",
          sort: 1,
        }),
      ],
    },
    {
      type: "directory",
      name: "blog",
      children: [
        page("blog", "2026-01-01-old.mdx", { title: "Old" }),
        page("blog", "2026-11-16-new.mdx", { title: "New" }),
      ],
    },
  ],
};

describe("generate-llms-txt", () => {
  it("orders a section's pages index first, then by sort, and skips printable pages", () => {
    const guides = tree.children.find((child) => child.name === "guides");
    expect(collectPages(guides).map((node) => node.title)).toEqual([
      "Guides",
      "Getting Started",
      "Native CSS",
    ]);
  });

  it("lists every page with its absolute URL and one-line description", () => {
    const text = buildLlmsTxt(tree);
    expect(text.startsWith("# webpack\n\n> The home page.\n")).toBe(true);
    expect(text).toContain(
      "- [Native CSS](https://webpack.js.org/guides/native-css/): Bundle CSS without loaders.",
    );
    expect(text).toContain(
      "## Other\n\n- [Glossary](https://webpack.js.org/glossary/)",
    );
    expect(text).not.toContain("printable");
    // The blog is optional, newest first.
    expect(text.indexOf("[New]")).toBeLessThan(text.indexOf("[Old]"));
    expect(text.indexOf("## Optional")).toBeLessThan(text.indexOf("[New]"));
  });

  it("strips front matter and MDX imports but keeps code samples", () => {
    const source = [
      "---",
      "title: Native CSS",
      "---",
      'import Badge from "./Badge";',
      "",
      "Text.",
      "",
      "```js",
      'import path from "node:path";',
      "export default {};",
      "```",
    ].join("\n");
    expect(toMarkdown(source)).toBe(
      [
        "Text.",
        "",
        "```js",
        'import path from "node:path";',
        "export default {};",
        "```",
      ].join("\n"),
    );
  });

  it("concatenates the non-optional pages with their source URL", () => {
    const text = buildLlmsFullTxt(
      tree,
      (node) => `---\nx: 1\n---\n${node.title} body`,
    );
    expect(text).toContain(
      "# Native CSS\n\nSource: https://webpack.js.org/guides/native-css/\n\nNative CSS body",
    );
    expect(text).not.toContain("Old body");
  });
});
