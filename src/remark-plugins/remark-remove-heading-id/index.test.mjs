import { remark } from 'remark';
import remarkHtml from 'remark-html';
import Plugin from './index.mjs';
import remarkSlug from '../remark-slug/index.mjs';
describe('customize blockquote', () => {
  it('should add id', () => {
    remark()
      .use(remarkSlug)
      .use(Plugin)
      .use(remarkHtml)
      .process(
        `
## hello world

this is me.
`,
        function (err, { value: contents }) {
          expect(err).toBeNull();
          expect(contents).toMatchSnapshot();
        }
      );
  });
});
