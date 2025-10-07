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
        'https://raw.githubusercontent.com/webpack/postcss-loader/master/README.md',
    };
    const loaderMDData =
      'See the file [`./src/config.d.ts`](./src/config.d.ts).';
    expect(processReadme(loaderMDData, options)).toEqual(
      'See the file [`https://github.com/webpack/postcss/blob/master/src/config.d.ts`](https://github.com/webpack/postcss-loader/blob/master/src/config.d.ts).'
    );
  });

  it('should preserve comments inside code blocks', () => {
    const options = {
      source:
        'https://raw.githubusercontent.com/webpack/postcss-loader/master/README.md',
    };
    const loaderMDData = `
    <!-- some comment that should be dropped -->
    ### Disable url resolving using the \`<!-- webpackIgnore: true -->\` comment

    \`\`\`html
    <!-- Disabled url handling for the src attribute -->
    <!-- webpackIgnore: true -->
    <img src="image.png" />

    <!-- Disabled url handling for the src and srcset attributes -->
    <!-- webpackIgnore: true -->
    <img
      srcset="image.png 480w, image.png 768w"
      src="image.png"
      alt="Elva dressed as a fairy"
    />

    <!-- Disabled url handling for the content attribute -->
    <!-- webpackIgnore: true -->
    <meta itemprop="image" content="./image.png" />

    <!-- Disabled url handling for the href attribute -->
    <!-- webpackIgnore: true -->
    <link rel="icon" type="image/png" sizes="192x192" href="./image.png" />
    \`\`\`
    `;
    expect(processReadme(loaderMDData, options)).toMatchSnapshot();
  });
});
