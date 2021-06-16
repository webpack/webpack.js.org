---
title: remark-loader
source: https://raw.githubusercontent.com/webpack-contrib/remark-loader/master/README.md
edit: https://github.com/webpack-contrib/remark-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/remark-loader
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![cover][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



Load markdown through `remark`.

## Usage {#usage}

Simply add the loader to your configuration, and pass options.

```js
import md from "markdown-file.md";
console.log(md);
```

**webpack.config.js**

```js
import RemarkHTML from "remark-html";

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: "html-loader",
          },
          {
            loader: "remark-loader",
            options: {
              remarkOptions: {
                plugins: [RemarkHTML],
              },
            },
          },
        ],
      },
    ],
  },
};
```

Here's the full list of [`remark` plugins](https://github.com/wooorm/remark/blob/master/doc/plugins.md).

We no longer support any `react` specific features.
Please see the wonderful [MDX](https://mdxjs.com/) project if you're interested in mixing JSX with Markdown.

## Options {#options}

|                     Name                      |    Type     | Default | Description              |
| :-------------------------------------------: | :---------: | :-----: | :----------------------- |
|     **[`remarkOptions`](#remarkoptions)**     | `{Object}`  |  `{}`   | Remark options           |
| **[`removeFrontMatter`](#removefrontmatter)** | `{Boolean}` | `true`  | Remove removeFrontMatter |

### remarkOptions {#remarkoptions}

|            Name             |          Type          |   Default   | Description                                                                                       |
| :-------------------------: | :--------------------: | :---------: | :------------------------------------------------------------------------------------------------ |
|  **[`plugins`](#plugins)**  | `Array<String\|Array>` |    `[]`     | Allows to connect [`remark` plugins](https://github.com/wooorm/remark/blob/master/doc/plugins.md) |
| **[`settings`](#settings)** |       `{Object}`       | `undefined` | Remark settings                                                                                   |
|     **[`data`](#data)**     |       `{Object}`       | `undefined` | Information available to all plugins                                                              |

#### plugins {#plugins}

Type: `Array<String|Array>`
Default: `[]`

Allows to connect [`remark` plugins](https://github.com/wooorm/remark/blob/master/doc/plugins.md)

##### String {#string}

**webpack.config.js**

```js
import RemarkFrontmatter from "remark-frontmatter";

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: "remark-loader",
            options: {
              remarkOptions: {
                plugins: [RemarkFrontmatter],
              },
            },
          },
        ],
      },
    ],
  },
};
```

##### Array {#array}

If need to specify options for the plugin, can pass the plugin using an array, where the second argument will be options.

**webpack.config.js**

```js
import RemarkFrontmatter from "remark-frontmatter";
import RemarkBookmarks from "remark-bookmarks";

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: "remark-loader",
            options: {
              remarkOptions: {
                plugins: [
                  RemarkFrontmatter,
                  [
                    RemarkBookmarks,
                    {
                      bookmarks: {
                        npm: "https://npmjs.com/package/remark-bookmarks",
                      },
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },
};
```

#### settings {#settings}

Type: `Object`
Default: `undefined`

Pass [`remark-stringify` options](https://github.com/remarkjs/remark/tree/main/packages/remark-stringify#options) and [`remark-parse` options](https://github.com/remarkjs/remark/tree/main/packages/remark-parse#options) options to the `remark`.

**webpack.config.js**

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: "remark-loader",
            options: {
              remarkOptions: {
                settings: {
                  bullet: "+",
                  listItemIndent: "1",
                },
              },
            },
          },
        ],
      },
    ],
  },
};
```

#### data {#data}

Type: `Object`
Default: `undefined`

Configure the [`remark`](https://github.com/unifiedjs/unified#processordatakey-value) with information available to all plugins.
Information is stored in an in-memory key-value store.

**webpack.config.js**

```js
function examplePluginUsingData() {
  console.log(this.data);
  // { alpha: 'bravo', charlie: 'delta' }
}

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: "remark-loader",
            options: {
              remarkOptions: {
                plugins: [examplePluginUsingData],
                data: {
                  alpha: "bravo",
                  charlie: "delta",
                },
              },
            },
          },
        ],
      },
    ],
  },
};
```

### removeFrontMatter {#removefrontmatter}

Type: `Boolean`
Default: `true`

By default, the frontMatter is removed.
To override this behavior, set `removeFrontMatter` to `false` and add `remark-frontmatter` to plugins.

**webpack.config.js**

```js
import RemarkFrontmatter from "remark-frontmatter";

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: "remark-loader",
            options: {
              removeFrontMatter: false,
              remarkOptions: {
                plugins: [RemarkFrontmatter],
              },
            },
          },
        ],
      },
    ],
  },
};
```

## Inspiration {#inspiration}

This project was inspired the following open source work:

- [`react-markdown-loader`](https://github.com/javiercf/react-markdown-loader)
- [`marksy`](https://github.com/cerebral/marksy)

## Examples {#examples}

### Markdown to HTML {#markdown-to-html}

To get html, need to add [`remark-html`](https://github.com/wooorm/remark-html) to the remark plugins and add [`html-loader`](/loaders/html-loader/) to the `webpack.config`

```js
import md from "markdown-file.md";
console.log(md);
```

**webpack.config.js**

```js
import RemarkHTML from "remark-html";

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: "html-loader",
          },
          {
            loader: "remark-loader",
            options: {
              remarkOptions: {
                plugins: [RemarkHTML],
              },
            },
          },
        ],
      },
    ],
  },
};
```

### Markdown to Markdown {#markdown-to-markdown}

**index.js**

```js
import md from "markdown-file.md";
console.log(md);
```

**webpack.config.js**

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: "remark-loader",
          },
        ],
      },
    ],
  },
};
```

## Contributing {#contributing}

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](https://github.com/webpack-contrib/remark-loader/blob/master/.github/CONTRIBUTING.md)

## License {#license}

[MIT](https://github.com/webpack-contrib/remark-loader/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/remark-loader.svg
[npm-url]: https://npmjs.com/package/remark-loader
[node]: https://img.shields.io/node/v/remark-loader.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/webpack-contrib/remark-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/remark-loader
[tests]: https://github.com/webpack-contrib/remark-loader/workflows/remark-loader/badge.svg
[tests-url]: https://github.com/webpack-contrib/remark-loader/actions
[cover]: https://codecov.io/gh/webpack-contrib/remark-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/remark-loader
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=remark-loader
[size-url]: https://packagephobia.now.sh/result?p=remark-loader
