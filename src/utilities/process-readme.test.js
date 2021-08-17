const processReadme = require('./process-readme');
describe('processReadme', () => {
  const url =
    'https://raw.githubusercontent.com/webpack/html-loader/master/README.md';
  it('links with the site', () => {
    const options = { source: url };
    const loaderMDData =
      '- [file-loader](https://github.com/webpack/file-loader)';
    const pluginMDData =
      '- [eslint-webpack-plugin](https://github.com/webpack-contrib/eslint-webpack-plugin)';
    expect(processReadme(loaderMDData, options)).toEqual(
      '- [file-loader](/loaders/file-loader/)'
    );
    expect(processReadme(pluginMDData, options)).toEqual(
      '- [eslint-webpack-plugin](/plugins/eslint-webpack-plugin/)'
    );
  });
  it('links without the site', () => {
    const options = { source: url };
    const loaderMDData =
      '- [extract-loader](https://github.com/peerigon/extract-loader)';
    const pluginMDData =
      '- [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)';
    expect(processReadme(loaderMDData, options)).toEqual(
      '- [extract-loader](https://github.com/peerigon/extract-loader)'
    );
    expect(processReadme(pluginMDData, options)).toEqual(
      '- [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)'
    );
  });

  it('should clean up div[align="center"] block with paragraph', () => {
    const loaderMDData = `
<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" hspace="10"
      src="https://cdn.rawgit.com/webpack/media/e7485eb2/logo/icon.svg">
  </a>
  <h1>Imagemin Webpack</h1>
  <p>
    Plugin and Loader for <a href="http://webpack.js.org/">webpack</a> to optimize (compress) all images using <a href="https://github.com/imagemin/imagemin">imagemin</a>.
    Do not worry about size of images, now they are always optimized/compressed.
  </p>
</div>`;
    expect(processReadme(loaderMDData))
      .toEqual(`Plugin and Loader for <a href="http://webpack.js.org/">webpack</a> to optimize (compress) all images using <a href="https://github.com/imagemin/imagemin">imagemin</a>.
    Do not worry about size of images, now they are always optimized/compressed.`);
  });

  it('should clean up div[align="center"] block without paragraph', () => {
    const loaderMDData = `
<div align="center">
  <a href="https://github.com/babel/babel">
    <img src="https://rawgit.com/babel/logo/master/babel.svg" alt="Babel logo" width="200" height="200">
  </a>
  <a href="https://github.com/webpack/webpack">
    <img src="https://webpack.js.org/assets/icon-square-big.svg" alt="webpack logo" width="200" height="200">
  </a>
</div>`;
    expect(processReadme(loaderMDData)).toEqual('');
  });
});
