---
title: remark-loader
source: https://raw.githubusercontent.com/webpack-contrib/remark-loader/master/README.md
edit: https://github.com/webpack-contrib/remark-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/remark-loader
translators:
  - fikyair
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![cover][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



通过 `remark` 加载 markdown。

## 用法 $#usage$

只需将 loader 添加到您的配置中，并设置 options。

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

下面是 [`remark` plugins](https://github.com/wooorm/remark/blob/master/doc/plugins.md) 的完整列表。

我们不再支持任何 `react` 的特殊功能。
如果您对在 JSX 中使用 Markdown 感兴趣，请参阅很棒的 [MDX](https://mdxjs.com/) 项目。

## Options $#options$

|                     Name                      |    Type     | Default | Description              |
| :-------------------------------------------: | :---------: | :-----: | :----------------------- |
|     **[`remarkOptions`](#remarkoptions)**     | `{Object}`  |  `{}`   | Remark options           |
| **[`removeFrontMatter`](#removefrontmatter)** | `{Boolean}` | `true`  | Remove removeFrontMatter |

### remarkOptions $#remarkoptions$

|            Name             |          Type          |   Default   | Description                                                                                       |
| :-------------------------: | :--------------------: | :---------: | :------------------------------------------------------------------------------------------------ |
|  **[`plugins`](#plugins)**  | `Array<String\|Array>` |    `[]`     | Allows to connect [`remark` plugins](https://github.com/wooorm/remark/blob/master/doc/plugins.md) |
| **[`settings`](#settings)** |       `{Object}`       | `undefined` | Remark settings                                                                                   |
|     **[`data`](#data)**     |       `{Object}`       | `undefined` | Information available to all plugins                                                              |

#### plugins $#plugins$

Type: `Array<String|Array>`
Default: `[]`

可以和 [`remark` plugins](https://github.com/wooorm/remark/blob/master/doc/plugins.md) 一起使用

##### String $#string$

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

##### Array $#array$

如果需要为插件指定 options，可以使用数组传递插件，其中第二个参数就是将要设置的 options。

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

#### settings $#settings$

Type: `Object`
Default: `undefined`

将 [`remark-stringify` options](https://github.com/remarkjs/remark/tree/main/packages/remark-stringify#options) 选项和 [`remark-parse` options](https://github.com/remarkjs/remark/tree/main/packages/remark-parse#options) 选项传递给 `remark`。

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

#### data $#data$

Type: `Object`
Default: `undefined`

使用所有插件通用的配置 [`remark`](https://github.com/unifiedjs/unified#processordatakey-value)。
配置信息存储在内存中的键值存储中。

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

### removeFrontMatter $#removefrontmatter$

Type: `Boolean`
Default: `true`

默认情况下，refortmatter 是被移除的。
如果要覆盖这个配置，需要在插件中添加 `remark-frontmatter`，并设置 `removeFrontMatter` 为 `false`。

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

## 启发 $#inspiration$

这个项目收到了以下开源作品的启发：

- [`react-markdown-loader`](https://github.com/javiercf/react-markdown-loader)
- [`marksy`](https://github.com/cerebral/marksy)

## 示例 $#examples$

### Markdown 转为 HTML $#markdown-to-html$

要获得 html，需要在 remark 插件中添加 [`remark-html`](https://github.com/wooorm/remark-html)，并在 `webpack.config` 中添加 [`html-loader`](/loaders/html-loader/)。

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

### Markdown 转为 Markdown $#markdown-to-markdown$

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

## 贡献 $#contributing$

如果您还没有贡献代码，请花点时间阅读我们的贡献指南。

[CONTRIBUTING](https://github.com/webpack-contrib/remark-loader/blob/master/.github/CONTRIBUTING.md)

## License $#license$

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
