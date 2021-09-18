import { describe, expect } from '@jest/globals';

import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import remarkResponsiveTable from './remark-responsive-table.mjs';
describe('responsive table', () => {
  const processor = remark()
    .use(remarkGfm)
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
      (error, { value: contents }) => {
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
      (error, { value: contents }) => {
        expect(error).toBeNull();
        expect(contents).toMatchSnapshot();
      }
    );
  });
});
