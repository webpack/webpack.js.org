---
title: html-loader
source: https://raw.githubusercontent.com/webpack-contrib/html-loader/master/README.md
edit: https://github.com/webpack-contrib/html-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/html-loader
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



将 HTML 导出为字符串。当编译器需要时，将压缩 HTML 字符串。

## 入门 {#getting-started}

首先，你需要安装 `html-loader` ：

```console
npm install --save-dev html-loader
```

然后将插件添加到你的 `webpack` 配置中。例如：

**file.js**

```js
import html from './file.html';
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
};
```

## 选项 {#options}

| 名称 | 类型 | 默认 | 描述 |
| :-: | :-: | :-: | :-- |
| **[`attributes`](#attributes)** | `{Boolean|Object}` | `true` | 启用 / 禁用属性处理 |
| **[`preprocessor`](#preprocessor)** | `{Function}` | `undefined` | 允许在处理之前对内容进行预处理 |
| **[`minimize`](#minimize)** | `{Boolean|Object}` | 在生产环境下为 `true` ，否则为 `false` | 告诉 `html-loader` 压缩 HTML |
| **[`esModule`](#esmodule)** | `{Boolean}` | `false` | 使用 ES 模块语法 |

### `attributes` {#attributes}

类型： `Boolean|Object`
默认值： `true`

默认情况下，每个可加载属性（例如 - `<img src="image.png">` ）都将被导入（ `const img = require ('./image.png')` 或 `import img from "./image.png""` ）。
你可能需要为配置中的图片指定 loader（推荐使用 `file-loader` 或 `url-loader` ）。

支持的标签和属性：

- `audio` 标签的 `src` 属性
- `embed` 标签的 `src` 属性
- `img` 标签的 `src` 属性
- `img` 标签的 `srcset` 属性
- `input` 标签的 `src` 属性
- `link` 标记的 `href` 属性（仅适用于样式表）
- `object` 标签的 `data` 属性
- `script` 标签的 `src` 属性
- `source` 标签的 `src` 属性
- `source` 标签的 `srcset` 属性
- `track` 标签的 `src` 属性
- `video` 标签的 `poster` 属性
- `video` 标签的 `src` 属性
- `image` 标签的 `xlink:href` 属性
- `image` 标签的 `href` 属性
- `use` 标签的 `xlink:href` 属性
- `use` 标签的 `href` 属性

#### `Boolean` {#boolean}

当设置为 `true` 时，则启用所有默认元素和属性的处理，而 `false` 则禁用所有属性的处理。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          // Disables attributes processing
          attributes: false,
        },
      },
    ],
  },
};
```

#### `Object` {#object}

你可以配置要处理的标签和属性，来过滤它们，过滤 URL 并处理以 `/` 开头的资源地址。

例如：

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          attributes: {
            list: [
              // All default supported tags and attributes
              '...',
              {
                tag: 'img',
                attribute: 'data-src',
                type: 'src',
              },
              {
                tag: 'img',
                attribute: 'data-srcset',
                type: 'srcset',
              },
            ],
            urlFilter: (attribute, value, resourcePath) => {
              // The `attribute` argument contains a name of the HTML attribute.
              // The `value` argument contains a value of the HTML attribute.
              // The `resourcePath` argument contains a path to the loaded HTML file.

              if (/example\.pdf$/.test(value)) {
                return false;
              }

              return true;
            },
            root: '.',
          },
        },
      },
    ],
  },
};
```

#### `list` {#list}

类型：`Array`
默认值：[支持的标签和属性列表](#attributes)

允许设置要处理的标签和属性以及处理方式，以及过滤其中一些标签和属性的能力。

使用 `...` 语法可以使用所有[默认支持的标签和属性](#attributes)。

例如：

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          attributes: {
            list: [
              // All default supported tags and attributes
              '...',
              {
                tag: 'img',
                attribute: 'data-src',
                type: 'src',
              },
              {
                tag: 'img',
                attribute: 'data-srcset',
                type: 'srcset',
              },
              {
                // Tag name
                tag: 'link',
                // Attribute name
                attribute: 'href',
                // Type of processing, can be `src` or `scrset`
                type: 'src',
                // Allow to filter some attributes
                filter: (tag, attribute, attributes, resourcePath) => {
                  // The `tag` argument contains a name of the HTML tag.
                  // The `attribute` argument contains a name of the HTML attribute.
                  // The `attributes` argument contains all attributes of the tag.
                  // The `resourcePath` argument contains a path to the loaded HTML file.

                  if (/my-html\.html$/.test(resourcePath)) {
                    return false;
                  }

                  if (!/stylesheet/i.test(attributes.rel)) {
                    return false;
                  }

                  if (
                    attributes.type &&
                    attributes.type.trim().toLowerCase() !== 'text/css'
                  ) {
                    return false;
                  }

                  return true;
                },
              },
            ],
          },
        },
      },
    ],
  },
};
```

如果未指定标签名称，它将处理所有标签。

> 你可以使用自定义过滤器指定要处理的 html 元素。

例如：

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          attributes: {
            list: [
              {
                // Attribute name
                attribute: 'src',
                // Type of processing, can be `src` or `scrset`
                type: 'src',
                // Allow to filter some attributes (optional)
                filter: (tag, attribute, attributes, resourcePath) => {
                  // The `tag` argument contains a name of the HTML tag.
                  // The `attribute` argument contains a name of the HTML attribute.
                  // The `attributes` argument contains all attributes of the tag.
                  // The `resourcePath` argument contains a path to the loaded HTML file.

                  // choose all HTML tags except img tag
                  return tag.toLowerCase() !== 'img';
                },
              },
            ],
          },
        },
      },
    ],
  },
};
```

#### `urlFilter` {#urlfilter}

类型：`Function`
默认值： `undefined`

允许配置要过滤的 url。所有过滤的 url 都参与解析（会保持原样）。
默认情况下，所有非请求资源类型的值（例如 `<img src="javascript:void (0)">` ）都不处理。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          attributes: {
            urlFilter: (attribute, value, resourcePath) => {
              // The `attribute` argument contains a name of the HTML attribute.
              // The `value` argument contains a value of the HTML attribute.
              // The `resourcePath` argument contains a path to the loaded HTML file.

              if (/example\.pdf$/.test(value)) {
                return false;
              }

              return true;
            },
          },
        },
      },
    ],
  },
};
```

#### `root` {#root}

类型：`String`
默认值： `undefined`

对于 `/` 开头的 url，默认不进行转换。
但是，如果设置了 `root` 查询参数，它将被放在 URL 之前进行转换。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          attributes: {
            root: '.',
          },
        },
      },
    ],
  },
};
```

### `preprocessor` {#preprocessor}

类型：`Function`
默认值：`undefined`

允许在处理之前对内容进行预处理。

> ⚠你应该始终返回有效的 HTML

**file.hbs**

```hbs
<div>
  <p>{{firstname}} {{lastname}}</p>
  <img src="image.png" alt="alt" />
<div>
```

#### `Function` {#function}

你可以将 `preprocessor` 选项设置为 `Function` 实例。

**webpack.config.js**

```js
const Handlebars = require('handlebars');

module.exports = {
  module: {
    rules: [
      {
        test: /\.hbs$/i,
        loader: 'html-loader',
        options: {
          preprocessor: (content, loaderContext) => {
            let result;

            try {
              result = Handlebars.compile(content)({
                firstname: 'Value',
                lastname: 'OtherValue',
              });
            } catch (error) {
              loaderContext.emitError(error);

              return content;
            }

            return result;
          },
        },
      },
    ],
  },
};
```

你还可以将 `preprocessor` 选项设置为异步函数实例。

例如：

**webpack.config.js**

```js
const Handlebars = require('handlebars');

module.exports = {
  module: {
    rules: [
      {
        test: /\.hbs$/i,
        loader: 'html-loader',
        options: {
          preprocessor: async (content, loaderContext) => {
            let result;

            try {
              result = await Handlebars.compile(content)({
                firstname: 'Value',
                lastname: 'OtherValue',
              });
            } catch (error) {
              await loaderContext.emitError(error);

              return content;
            }

            return result;
          },
        },
      },
    ],
  },
};
```

### `minimize` {#minimize}

类型：`Boolean|Object`
默认值：在生产模式下为 `true` ，否则为 `false`

告诉 `html-loader` 编译时需要压缩 HTML 字符串。

#### `Boolean` {#boolean}

默认情况下，启用压缩的规则如下：

```js
({
  caseSensitive: true,
  collapseWhitespace: true,
  conservativeCollapse: true,
  keepClosingSlash: true,
  minifyCSS: true,
  minifyJS: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
});
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          minimize: true,
        },
      },
    ],
  },
};
```

#### `Object` {#object}

**webpack.config.js**

关于可用选项的更多信息，请参阅 [html-minifier-terser](https://github.com/DanielRuf/html-minifier-terser) 文档。

可以在 `webpack.conf.js` 中使用以下选项来禁用规则

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          minimize: {
            removeComments: false,
            collapseWhitespace: false,
          },
        },
      },
    ],
  },
};
```

### `esModule` {#esmodule}

类型：`Boolean`
值默认值：`false`

默认情况下， `html-loader` 生成使用 CommonJS 模块语法的 JS 模块。
在某些情况下，使用 ES 模块会更好，例如在进行[模块合并](/plugins/module-concatenation-plugin/)和 [tree shaking](/guides/tree-shaking/) 时。

你可以使用以下方法启用 ES 模块语法：

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          esModule: true,
        },
      },
    ],
  },
};
```

## 示例 {#examples}

### CDN {#cdn}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      { test: /\.jpg$/, loader: 'file-loader' },
      { test: /\.png$/, loader: 'url-loader' },
    ],
  },
  output: {
    publicPath: 'http://cdn.example.com/[hash]/',
  },
};
```

**file.html**

```html
<img src="image.jpg" data-src="image2x.png" />
```

**index.js**

```js
require('html-loader!./file.html');

// => '<img src="http://cdn.example.com/49eba9f/a992ca.jpg" data-src="image2x.png">'
```

```js
require('html-loader?{"attributes":{"list":[{"tag":"img","attribute":"data-src","type":"src"}]}}!./file.html');

// => '<img src="image.jpg" data-src="data:image/png;base64,..." >'
```

```js
require('html-loader?{"attributes":{"list":[{"tag":"img","attribute":"src","type":"src"},{"tag":"img","attribute":"data-src","type":"src"}]}}!./file.html');

// => '<img src="http://cdn.example.com/49eba9f/a992ca.jpg" data-src="data:image/png;base64,..." >'
```

```js
require('html-loader?-attributes!./file.html');

// => '<img src="image.jpg"  data-src="image2x.png" >'
```

> ：warning： `-attributes` 设置 `attributes: false` 。

### 处理 `script` 和 `link` 标签 {#process-script-and-link-tags}

**script.file.js**

```js
console.log(document);
```

**style.file.css**

```css
a {
  color: red;
}
```

**file.html**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Title of the document</title>
    <link rel="stylesheet" type="text/css" href="./style.file.css" />
  </head>
  <body>
    Content of the document......
    <script src="./script.file.js"></script>
  </body>
</html>
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: ['file-loader?name=[name].[ext]', 'extract-loader', 'html-loader'],
      },
      {
        test: /\.js$/i,
        exclude: /\.file.js$/i,
        loader: 'babel-loader',
      },
      {
        test: /\.file.js$/i,
        loader: 'file-loader',
      },
      {
        test: /\.css$/i,
        exclude: /\.file.css$/i,
        loader: 'css-loader',
      },
      {
        test: /\.file.css$/i,
        loader: 'file-loader',
      },
    ],
  },
};
```

### “相对根” 的 URL {#root-relative-urls}

与 CDN 示例中的配置相同：

**file.html**

```html
<img src="/image.jpg" />
```

**scripts.js**

```js
require('html-loader!./file.html');

// => '<img src="/image.jpg">'
```

**other-scripts.js**

```js
require('html-loader?{"attributes":{"root":"."}}!./file.html');

// => '<img src="http://cdn.example.com/49eba9f/a992ca.jpg">'
```

### 模板 {#templating}

你可以使用任何模板系统。以下是 [handlebars](https://handlebarsjs.com/) 的示例。

**file.hbs**

```hbs
<div>
  <p>{{firstname}} {{lastname}}</p>
  <img src="image.png" alt="alt" />
<div>
```

**webpack.config.js**

```js
const Handlebars = require('handlebars');

module.exports = {
  module: {
    rules: [
      {
        test: /\.hbs$/i,
        loader: 'html-loader',
        options: {
          preprocessor: (content, loaderContext) => {
            let result;

            try {
              result = Handlebars.compile(content)({
                firstname: 'Value',
                lastname: 'OtherValue',
              });
            } catch (error) {
              loaderContext.emitError(error);

              return content;
            }

            return result;
          },
        },
      },
    ],
  },
};
```

### PostHTML {#posthtml}

你可以使用 [PostHTML](https://github.com/posthtml/posthtml) 而无需任何其他加载程序。

**file.html**

```html
<img src="image.jpg" />
```

**webpack.config.js**

```js
const posthtml = require('posthtml');
const posthtmlWebp = require('posthtml-webp');

module.exports = {
  module: {
    rules: [
      {
        test: /\.hbs$/i,
        loader: 'html-loader',
        options: {
          preprocessor: (content, loaderContext) => {
            let result;

            try {
              result = posthtml().use(plugin).process(content, { sync: true });
            } catch (error) {
              loaderContext.emitError(error);

              return content;
            }

            return result.html;
          },
        },
      },
    ],
  },
};
```

### 导出为 HTML 文件 {#export-into-html-files}

一种非常常见的情况是将 HTML 导出到自己的 *.html* 文件中，
以直接使用，而非注入到 javascript。
可以使用以下 3 种 loader 来实现：

- [file-loader](/loaders/file-loader/)
- [extract-loader](https://github.com/peerigon/extract-loader)
- html-loader

html-loader 将解析 URL，同时引入图片以及你需要的所有内容。
extract-loader 会将 javascript 解析为正确的 html 文件，
然后确保图片被引入且路径正确，
file-loader 会为你生成 *.html* 文件。例如：

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: ['file-loader?name=[name].[ext]', 'extract-loader', 'html-loader'],
      },
    ],
  },
};
```

## 贡献 {#contributing}

如果你还没有阅读，请花一点时间阅读我们的贡献指南。

[贡献](https://github.com/webpack-contrib/html-loader/blob/master/.github/CONTRIBUTING.md)

## 许可证 {#license}

[MIT](https://github.com/webpack-contrib/html-loader/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/html-loader.svg
[npm-url]: https://npmjs.com/package/html-loader
[node]: https://img.shields.io/node/v/html-loader.svg
[node-url]: https://nodejs.org/
[deps]: https://david-dm.org/webpack-contrib/html-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/html-loader
[tests]: https://github.com/webpack-contrib/html-loader/workflows/html-loader/badge.svg
[tests-url]: https://github.com/webpack-contrib/html-loader/actions
[cover]: https://codecov.io/gh/webpack-contrib/html-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/html-loader
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=html-loader
[size-url]: https://packagephobia.now.sh/result?p=html-loader
