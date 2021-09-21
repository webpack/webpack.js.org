import { remark } from 'remark';
import remarkHtml from 'remark-html';
import Plugin from './index.mjs';
describe('customize blockquote', () => {
  it('should transform W> into aside of warning', () => {
    remark()
      .use(Plugin, {
        mapping: {
          'W>': 'warning',
        },
      })
      .use(remarkHtml)
      .process(
        `
W> hello world
`,
        function (err, { value: contents }) {
          expect(err).toBeNull();
          expect(contents).toContain('<aside class="warning"');
          expect(contents).toContain('<h6 class="warning__prefix"');
          expect(contents).toContain('warning');
          expect(contents).toMatchSnapshot();
        }
      );
  });
});
