import {
  findInContent,
  getPageTitle,
  getPageDescription,
} from './content-utils.js';
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

describe('getPageTitle', () => {
  it('should return default title for non-exist page', () => {
    const title = getPageTitle(content, '/xzy');
    expect(title).toBe('webpack');
  });

  it('should return title for printable page', () => {
    const title = getPageTitle(content, '/printable/');
    expect(title).toBe('Combined printable page | webpack');
  });

  it('should return title for get-started', () => {
    const title = getPageTitle(content, '/guides/getting-started/');
    expect(title).toBe('Getting Started | webpack');
  });
});
