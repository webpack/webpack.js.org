import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkSlug from "../remark-slug/index.mjs";
import Plugin from "./index.mjs";

describe("customize blockquote", () => {
  it("should add id", () => {
    remark()
      .use(remarkSlug)
      .use(Plugin)
      .use(remarkHtml)
      .process(
        `
## hello world

this is me.
`,
        (err, { value: contents }) => {
          expect(err).toBeUndefined();
          expect(contents).toMatchSnapshot();
        },
      );
  });
});
