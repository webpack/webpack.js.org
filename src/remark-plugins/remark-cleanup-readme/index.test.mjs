import mdx from '@mdx-js/mdx';
import CleanupReadme from './index.mjs';
describe('cleanup readme', () => {
  it('should clean up div[align="center"] block without paragraph', () => {
    const mdxText = `
<div align="center">
  <a href="https://github.com/babel/babel">
    <img src="https://rawgit.com/babel/logo/master/babel.svg" alt="Babel logo" width="200" height="200" />
  </a>
  <a href="https://github.com/webpack/webpack">
    <img src="https://webpack.js.org/assets/icon-square-big.svg" alt="webpack logo" width="200" height="200" />
  </a>
</div>
`;
    const html = mdx.sync(mdxText, {
      remarkPlugins: [CleanupReadme],
    });
    expect(html).toMatchSnapshot();
  });

  it('should clean up div[align="center"] block with paragraph', () => {
    const mdxText = `
<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" hspace="10"
      src="https://cdn.rawgit.com/webpack/media/e7485eb2/logo/icon.svg" />
  </a>
  <h1>Imagemin Webpack</h1>
  <p>
    Plugin and Loader for <a href="http://webpack.js.org/">webpack</a> to optimize (compress) all images using <a href="https://github.com/imagemin/imagemin">imagemin</a>.
    Do not worry about size of images, now they are always optimized/compressed.
  </p>
</div>
    `;
    const html = mdx.sync(mdxText, {
      remarkPlugins: [CleanupReadme],
    });
    expect(html).toMatchSnapshot();
  });

  it('should clean up nested div[align="center"] block ', () => {
    // see https://github.com/webpack-contrib/postcss-loader/blob/master/README.md
    const mdxText = `
<div align="center">
  <img
    width="180"
    height="180"
    hspace="10"
    alt="PostCSS Logo"
    src="https://api.postcss.org/logo.svg" />
  <a href="https://github.com/webpack/webpack">
    <img
      width="200"
      height="200"
      hspace="10"
      src="https://cdn.rawgit.com/webpack/media/e7485eb2/logo/icon.svg" />
  </a>
  <div align="center">
    <a href="https://evilmartians.com/?utm_source=postcss">
      <img
        src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg"
        alt="Sponsored by Evil Martians"
        width="236"
        height="54"
        vspace="10" />
    </a>
  </div>
</div>
        `;
    const html = mdx.sync(mdxText, {
      remarkPlugins: [CleanupReadme],
    });
    expect(html).toMatchSnapshot();
  });
});
