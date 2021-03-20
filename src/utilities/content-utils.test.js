import { findInContent, getPageDescription } from './content-utils.js';
import content from './fixtures/content.json';
describe('findInContent', () => {
  it('should find home page', () => {
    const page = findInContent(content, (item) => item.url === '/');
    expect(page.title).toBe('webpack');
  });
});
describe('getPageDescription', () => {
  it('should return undefined for non-exist page', () => {
    const description = getPageDescription(content, '/xyz');
    expect(description).toBeUndefined();
  });
  it('should return empty for printable page', () => {
    const description = getPageDescription(content, '/printable/');
    expect(description).toBe('');
  });
  it('should return description for get-started', () => {
    const description = getPageDescription(content, '/guides/getting-started/');
    expect(description).toBe(
      'Learn how to bundle a JavaScript application with webpack 5.'
    );
  });
});
