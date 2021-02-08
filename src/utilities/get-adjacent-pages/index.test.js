import getAdjacentPages from './index';
const needle = { url: '/webpack' };
describe('getAdjacentPages', () => {
  it('returns only next page', () => {
    const pages = [needle, { url: '/webpack-doc' }];
    const { previous, next } = getAdjacentPages(pages, needle, 'url');
    expect(previous).toBeUndefined();
    expect(next).toEqual({ url: '/webpack-doc' });
  });
  it('retuns only previous page', () => {
    const pages = [{ url: '/webpack-doc' }, needle];
    const { previous, next } = getAdjacentPages(pages, needle, 'url');
    expect(next).toBeUndefined();
    expect(previous).toEqual({ url: '/webpack-doc' });
  });
  it('returns both previous and next pages', () => {
    const pages = [
      { url: '/previous-webpack' },
      needle,
      { url: '/next-webpack' },
    ];
    const { previous, next } = getAdjacentPages(pages, needle, 'url');
    expect(next).toEqual({ url: '/next-webpack' });
    expect(previous).toEqual({ url: '/previous-webpack' });
  });
});
