// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect } from "@jest/globals";
import { restructure } from "./content-tree-enhancers.mjs";

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
