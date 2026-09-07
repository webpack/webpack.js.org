import processReadme from "./process-readme.mjs";

describe("processReadme", () => {
  const url =
    "https://raw.githubusercontent.com/webpack/html-loader/master/README.md";

  it("links with the site", () => {
    const options = { source: url };
    const loaderMDData =
      "- [file-loader](https://github.com/webpack/file-loader)";
    const pluginMDData =
      "- [eslint-webpack-plugin](https://github.com/webpack-contrib/eslint-webpack-plugin)";
    expect(processReadme(loaderMDData, options)).toBe(
      "- [file-loader](/loaders/file-loader/)",
    );
    expect(processReadme(pluginMDData, options)).toBe(
      "- [eslint-webpack-plugin](/plugins/eslint-webpack-plugin/)",
    );
  });

  it("keeps the github link when the site builds no page for the package", () => {
    const options = {
      source: url,
      loaders: ["webpack/css-loader"],
      plugins: ["webpack/stylelint-webpack-plugin"],
    };
    const renamedPluginMDData =
      "- [lint-webpack-plugin](https://github.com/webpack/lint-webpack-plugin)";
    const renamedLoaderMDData =
      "- [sass-loader](https://github.com/webpack/sass-loader)";

    expect(processReadme(renamedPluginMDData, options)).toBe(
      renamedPluginMDData,
    );
    expect(processReadme(renamedLoaderMDData, options)).toBe(
      renamedLoaderMDData,
    );
  });

  it("links a package the site has a page for under its current owner", () => {
    const options = {
      source: url,
      loaders: ["webpack/css-loader"],
      plugins: ["webpack/copy-webpack-plugin"],
    };

    expect(
      processReadme(
        "- [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin)",
        options,
      ),
    ).toBe("- [copy-webpack-plugin](/plugins/copy-webpack-plugin/)");
    expect(
      processReadme(
        "- [css-loader](https://github.com/webpack/css-loader)",
        options,
      ),
    ).toBe("- [css-loader](/loaders/css-loader/)");
  });

  it("links without the site", () => {
    const options = { source: url };
    const loaderMDData =
      "- [extract-loader](https://github.com/peerigon/extract-loader)";
    const pluginMDData =
      "- [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)";
    expect(processReadme(loaderMDData, options)).toBe(
      "- [extract-loader](https://github.com/peerigon/extract-loader)",
    );
    expect(processReadme(pluginMDData, options)).toBe(
      "- [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)",
    );
  });

  it("rewrite relative url", () => {
    const options = {
      source:
        "https://raw.githubusercontent.com/webpack/postcss-loader/main/README.md",
    };
    const loaderMDData =
      "See the file [`./src/config.d.ts`](./src/config.d.ts).";
    expect(processReadme(loaderMDData, options)).toBe(
      "See the file [`https://github.com/webpack/postcss-loader/main/src/config.d.ts`](https://github.com/webpack/postcss-loader/main/src/config.d.ts).",
    );
  });

  it("should preserve comments inside code blocks", () => {
    const options = {
      source:
        "https://raw.githubusercontent.com/webpack/postcss-loader/main/README.md",
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
