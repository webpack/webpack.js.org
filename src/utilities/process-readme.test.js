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

});
