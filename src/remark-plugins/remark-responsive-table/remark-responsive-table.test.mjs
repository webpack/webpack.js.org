import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkResponsiveTable from './remark-responsive-table.mjs';
describe('responsive table', () => {
  const processor = remark()
    .use(require('remark-gfm'))
    .use(remarkResponsiveTable)
    .use(remarkHtml);
  it('should add data-th', () => {
    processor.process(
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
  it('should handle empty thead', () => {
    processor.process(
      `
| | bar |
| --- | --- |
| baz |  |
| sam | chen |
      `,
      (error, { contents }) => {
        expect(error).toBeNull();
        expect(contents).toMatchSnapshot();
      }
    );
  });
});
