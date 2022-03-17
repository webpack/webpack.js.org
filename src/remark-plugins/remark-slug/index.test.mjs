import { remark } from 'remark';
import remarkHtml from 'remark-html';
import Plugin from './index.mjs';
describe('remark slug', () => {
  it('should add id', () => {
    remark()
      .use(Plugin)
      .use(remarkHtml)
      .process(
        `## hello world

this is me.
`,
        function (err, { value: contents }) {
          expect(err).toBeNull();
          expect(contents).toMatchSnapshot();
        }
      );
  });
});
