import processReadme from './process-readme.mjs';
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
  it('rewrite relative url', () => {
    const options = {
      source:
        'https://raw.githubusercontent.com/webpack-contrib/postcss-loader/master/README.md',
    };
    const loaderMDData =
      'See the file [`./src/config.d.ts`](./src/config.d.ts).';
    expect(processReadme(loaderMDData, options)).toEqual(
      'See the file [`https://github.com/webpack-contrib/postcss-loader/blob/master/src/config.d.ts`](https://github.com/webpack-contrib/postcss-loader/blob/master/src/config.d.ts).'
    );
  });
});
