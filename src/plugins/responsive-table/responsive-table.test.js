import remark from 'remark';
describe('responsive table', () => {
  it('should add data-th', () => {
    remark()
      .use(require('remark-gfm'))
      .use(require('./responsive-table.js'))
      .use(require('remark-html'))
      .process(
        `
| foo | bar |
| --- | --- |
| baz |  |
| sam | chen |
      `,
        (error, { contents }) => {
          expect(error).toBeNull();
          expect(contents).toContain('data-th="foo"');
          expect(contents).toContain('data-th="bar"');
          expect(contents).toContain('-');
          expect(contents).toMatchSnapshot();
        }
      );
  });
});
