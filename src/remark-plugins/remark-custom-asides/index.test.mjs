import {remark} from 'remark';
describe('customize blockquote', () => {
  it('should transform W> into aside of warning', () => {
    remark()
      .use(require('./index.js'), {
        mapping: {
          'W>': 'warning',
        },
      })
      .use(require('remark-html'))
      .process(
        `
W> hello world
`,
        function (err, { contents }) {
          expect(err).toBeNull();
          expect(contents).toContain('<aside class="warning"');
          expect(contents).toContain('<h6 class="warning__prefix"');
          expect(contents).toContain('warning');
          expect(contents).toMatchSnapshot();
        }
      );
  });
});
