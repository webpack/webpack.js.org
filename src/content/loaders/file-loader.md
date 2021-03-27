---
title: file-loader
source: https://raw.githubusercontent.com/webpack-contrib/file-loader/master/README.md
edit: https://github.com/webpack-contrib/file-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/file-loader
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



**v5 版本已废弃**: 请考虑向 [`asset modules`](/guides/asset-modules/) 迁移。

`file-loader` 将一个文件中的 `import`/`require()` 解析为 url，并且将文件发送到输出文件夹。

## 快速开始 {#getting-started}

首先，你需要安装 `file-loader`：

```console
$ npm install file-loader --save-dev
```

在一个 bundle 文件中 import（或 `require`）目标文件：

**file.js**

```js
import img from './file.png';
```

然后，在 `webpack` 配置中添加 loader。例如：

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
};
```

然后，通过你喜欢的方式运行 `webpack`。将 `file.png` 作为一个文件，发送到输出目录，
（如果指定了配置项，则使用指定的命名约定）
并返回文件的 public URI。

> ℹ️ 默认情况下，生成文件的文件名，是文件内容的哈希值，并会保留所引用资源的原始扩展名。

## 配置项 {#options}

### `name` {#name}

类型：`String|Function`
默认值：`'[contenthash].[ext]'`

可以使用查询参数 `name` 为一个或多个目标文件配置自定义文件名模板。
例如，要将文件从 `context` 目录发送到保留完整目录结构的输出目录中，
可以使用：

#### `String` {#string}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
};
```

#### `Function` {#function}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name(resourcePath, resourceQuery) {
            // `resourcePath` - `/absolute/path/to/file.js`
            // `resourceQuery` - `?foo=bar`

            if (process.env.NODE_ENV === 'development') {
              return '[path][name].[ext]';
            }

            return '[contenthash].[ext]';
          },
        },
      },
    ],
  },
};
```

> ℹ️ 默认情况下，文件会按照你指定的路径和名称输出同一目录中，且会使用相同的 URI 路径来访问文件。

### `outputPath` {#outputpath}

类型：`String|Function`
默认值：`undefined`

指定用来放置一个或多个目标文件的文件系统路径。

#### `String` {#string}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
        },
      },
    ],
  },
};
```

#### `Function` {#function}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          outputPath: (url, resourcePath, context) => {
            // `resourcePath` 是资源文件的原始绝对路径
            // `context` 是存储资源文件（`rootContext`）或 `context` 配置项的目录

            // 获取你可以使用的相对路径
            // const relativePath = path.relative(context, resourcePath);

            if (/my-custom-image\.png/.test(resourcePath)) {
              return `other_output_path/${url}`;
            }

            if (/images/.test(context)) {
              return `image_output_path/${url}`;
            }

            return `output_path/${url}`;
          },
        },
      },
    ],
  },
};
```

### `publicPath` {#publicpath}

类型：`String|Function`
默认值：[`__webpack_public_path__`](/api/module-variables/#__webpack_public_path__-webpack-specific)+outputPath

为一个或多个目标文件指定自定义公共路径。

#### `String` {#string}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          publicPath: 'assets',
        },
      },
    ],
  },
};
```

#### `Function` {#function}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          publicPath: (url, resourcePath, context) => {
            // `resourcePath` 是资源的原始绝对路径
            // `context` 是存储资源文件（`rootContext`）或 `context` 配置项的目录

            // 获取你可以使用的相对路径
            // const relativePath = path.relative(context, resourcePath);

            if (/my-custom-image\.png/.test(resourcePath)) {
              return `other_public_path/${url}`;
            }

            if (/images/.test(context)) {
              return `image_output_path/${url}`;
            }

            return `public_path/${url}`;
          },
        },
      },
    ],
  },
};
```

### `postTransformPublicPath` {#posttransformpublicpath}

类型：`Function`
默认值：`undefined`

指定一个自定义函数去后置处理（post-process）生成的公共路径。这可用于在运行时才可用的动态全局变量之前或之后添加，就像是 `__webpack_public_path__`。不可以仅使用 `publicPath`，因为它将值转换为字符串。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        loader: 'file-loader',
        options: {
          publicPath: '/some/path/',
          postTransformPublicPath: (p) => `__webpack_public_path__ + ${p}`,
        },
      },
    ],
  },
};
```

### `context` {#context}

类型：`String`
默认值： [`context`](/configuration/entry-context/#context)

指定自定义文件上下文。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              context: 'project',
            },
          },
        ],
      },
    ],
  },
};
```

### `emitFile` {#emitfile}

类型：`Boolean`
默认值：`true`

如果值为 true，发送一个文件（向文件系统写入一个文件）。
如果是 false，loader 会返回 public URI，但 **不会** 发送文件。
对于服务器端项目，禁用此选项通常很有用。

**file.js**

```js
// bundle file
import img from './file.png';
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: false,
            },
          },
        ],
      },
    ],
  },
};
```

### `regExp` {#regexp}

类型：`RegExp`
默认值：`undefined`

为目标文件路径的一个或多个部分指定一个正则表达式。
可以使用 `[N]` [placeholder](https://github.com/webpack-contrib/file-loader#placeholders)
在 `name` 属性中重用捕获组。

**file.js**

```js
import img from './customer01/file.png';
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              regExp: /\/([a-z0-9]+)\/[a-z0-9]+\.png$/i,
              name: '[1]-[name].[ext]',
            },
          },
        ],
      },
    ],
  },
};
```

> ℹ️ 如果使用 `[0]`，它将被替换为整个测试字符串，而 `[1]` 将包含你的正则表达式的第一个捕获括号，依次类推。。。

### `esModule` {#esmodule}

类型：`Boolean`
默认值：`true`

默认情况下，`file-loader` 使用 ES modules 语法生成 JS 模块。
在某些情况下使用 ES modules 会更好，比如在[模块联邦](/plugins/module-concatenation-plugin/)与 [tree shaking](/guides/tree-shaking/) 中。

你可以这样启用 CommonJS module 语法：

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
  },
};
```

## Placeholders {#placeholders}

你可以在[这里](https://github.com/webpack/loader-utils#interpolatename)查到关于 placeholders 的所有信息。

### `[ext]` {#ext}

类型：`String`
默认值：`file.extname`

目标文件或资源的文件扩展名。

### `[name]` {#name}

类型：`String`
默认值：`file.basename`

文件或资源的 basename。

### `[path]` {#path}

类型：`String`
默认值：`file.directory`

相对于 webpack/config `context` 的资源路径。

### `[folder]` {#folder}

类型：`String`
默认值：`file.folder`

内有资源的文件夹。

### `[query]` {#query}

类型：`String`
默认值：`file.query`

资源的查询，例如：`?foo=bar`。

### `[emoji]` {#emoji}

类型：`String`
默认值：`undefined`

`content` 的随机 emoji 表示。

### `[emoji:<length>]` {#emojilength}

类型：`String`
默认值：`undefined`

同上，但是有一个自定义 emoji 数量。

### `[hash]` {#hash}

类型：`String`
默认值：`md4`

指定生成文件内容哈希值的哈希方法。

### `[contenthash]` {#contenthash}

类型：`String`
默认值：`md4`

指定生成文件内容哈希值的哈希方法。

### `[<hashType>:hash:<digestType>:<length>]` {#hashtypehashdigesttypelength}

类型：`String`

options.content (Buffer) 的哈希（默认情况下，它是哈希的十六进制摘要）。

#### `digestType` {#digesttype}

类型：`String`
默认值：`'hex'`

哈希函数会使用的 [digest](https://en.wikipedia.org/wiki/Cryptographic_hash_function)。
有效值包括：base26、base32、base36、
base49、base52、base58、base62、base64 和 hex。

#### `hashType` {#hashtype}

类型：`String`
默认值：`'md4'`

哈希函数应该使用的哈希类型。有效值包括：`md5`、`sha1`、`sha256` 和 `sha512`。

#### `length` {#length}

类型：`Number`
默认值：`undefined`

用户还可以为计算出来的哈希值指定一个长度。

### `[N]` {#n}

类型：`String`
默认值：`undefined`

根据 `regExp` 匹配当前文件名而获得的第 n 个匹配。

## 示例 {#examples}

### Names {#names}

下面的例子展示了如何使用 `file-loader` 以及它会产生的结果。

**file.js**

```js
import png from './image.png';
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'dirname/[contenthash].[ext]',
            },
          },
        ],
      },
    ],
  },
};
```

结果：

```bash
# result
dirname/0dcbbaa701328ae351f.png
```

---

**file.js**

```js
import png from './image.png';
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[sha512:hash:base64:7].[ext]',
            },
          },
        ],
      },
    ],
  },
};
```

结果：

```bash
# result
gdyb21L.png
```

---

**file.js**

```js
import png from './path/to/file.png';
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]?[contenthash]',
            },
          },
        ],
      },
    ],
  },
};
```

结果：

```bash
# result
path/to/file.png?e43b20c069c4a01867c31e98cbce33c9
```

### CDN {#cdn}

下面的例子展示了如何在 CDN 使用查询参数时使用 `file-loader`。

**file.js**

```js
import png from './directory/image.png?width=300&height=300';
```

**webpack.config.js**

```js
module.exports = {
  output: {
    publicPath: 'https://cdn.example.com/',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext][query]',
            },
          },
        ],
      },
    ],
  },
};
```

结果：

```bash
# result
https://cdn.example.com/directory/image.png?width=300&height=300
```

### 动态公共路径取决于运行时的环境变量 {#dynamic-public-path-depending-on-environment-variable-at-run-time}

应用程序可能想要根据环境变量配置不同的 CDN 地址，而这个环境变量仅在运行应用程序时可用。这可能是一个优点，因为应用程序只需要一个构建，根据部署环境的环境变量而产生不同的构建行为。由于 file-loader 是在编译应用程序时应用的，而不是在运行应用程序时应用的，因此环境变量不能在 file-loader 配置中使用。解决这个问题的一种方法是在应用程序的入口根据环境变量将 `__webpack_public_path__` 设置为所需的 CDN 地址。`postTransformPublicPath` 配置项可以根据像 `__webpack_public_path__` 一样的变量来配置自定义路径。

**main.js**

```js
const assetPrefixForNamespace = (namespace) => {
  switch (namespace) {
    case 'prod':
      return 'https://cache.myserver.net/web';
    case 'uat':
      return 'https://cache-uat.myserver.net/web';
    case 'st':
      return 'https://cache-st.myserver.net/web';
    case 'dev':
      return 'https://cache-dev.myserver.net/web';
    default:
      return '';
  }
};
const namespace = process.env.NAMESPACE;

__webpack_public_path__ = `${assetPrefixForNamespace(namespace)}/`;
```

**file.js**

```js
import png from './image.png';
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[contenthash].[ext]',
          outputPath: 'static/assets/',
          publicPath: 'static/assets/',
          postTransformPublicPath: (p) => `__webpack_public_path__ + ${p}`,
        },
      },
    ],
  },
};
```

使用 `NAMESPACE=prod` 环境变量的运行结果为：

```bash
# result
https://cache.myserver.net/web/static/assets/image.somehash.png
```

使用 `NAMESPACE=dev` 环境变量的运行结果为：

```bash
# result
https://cache-dev.myserver.net/web/static/assets/image.somehash.png
```

## 贡献 {#contributing}

如果您还没有阅读，请花一点时间阅读我们的贡献指南。

[贡献指南](https://github.com/webpack-contrib/file-loader/blob/master/.github/CONTRIBUTING.md)

## License {#license}

[MIT](https://github.com/webpack-contrib/file-loader/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/file-loader.svg
[npm-url]: https://npmjs.com/package/file-loader
[node]: https://img.shields.io/node/v/file-loader.svg
[node-url]: https://nodejs.org/
[deps]: https://david-dm.org/webpack-contrib/file-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/file-loader
[tests]: https://github.com/webpack-contrib/file-loader/workflows/file-loader/badge.svg
[tests-url]: https://github.com/webpack-contrib/file-loader/actions
[cover]: https://codecov.io/gh/webpack-contrib/file-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/file-loader
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=file-loader
[size-url]: https://packagephobia.now.sh/result?p=file-loader
