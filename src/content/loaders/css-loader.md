---
title: css-loader
source: https://raw.githubusercontent.com/webpack-contrib/css-loader/master/README.md
edit: https://github.com/webpack-contrib/css-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/css-loader
translators:
  - Jacksonlike
  - QC-L
  - jacob-lcs
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



`css-loader` 会对 `@import` 和 `url()` 进行处理，就像 js 解析 `import/require()` 一样。

## 快速开始 {#getting-started}

<<<<<<< HEAD
首先，你需要先安装 `css-loader`：
=======
> ⚠ To use css-loader, webpack@5 is required

To begin, you'll need to install `css-loader`:
>>>>>>> 076a4a41ddf8ad3abf74b8900d6d73e82eb56946

```console
npm install --save-dev css-loader
```

然后把 loader 引用到你 `webpack` 的配置中。如下所示：

**file.js**

```js
import css from "file.css";
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```

<<<<<<< HEAD
**仅针对 webpack v4：**

[file-loader](/loaders/file-loader/) 和 [url-loader](/loaders/url-loader/) 能够非常好的处理资源文件，需在配置文件中进行配置，相关配置请[参阅](https://github.com/webpack-contrib/css-loader#assets)。

然后运行 `webpack`。
=======
And run `webpack` via your preferred method.
>>>>>>> 076a4a41ddf8ad3abf74b8900d6d73e82eb56946

### `toString` {#tostring}

你也可以直接将 css-loader 的结果作为字符串使用，例如 Angular 的组件样式。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["to-string-loader", "css-loader"],
      },
    ],
  },
};
```

or

```js
const css = require("./test.css").toString();

console.log(css); // {String}
```

如果有 SourceMap，它们也将包含在字符串结果中。

如果由于某种原因，你需要将 CSS 提取为纯粹的
字符串资源（即不包含在 JS 模块中），则可能需要
查看 [extract-loader](https://github.com/peerigon/extract-loader)。
比如，当你需要对 CSS 进行后处理时，会非常有用。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "handlebars-loader", // handlebars loader 需要原始资源字符串
          "extract-loader",
          "css-loader",
        ],
      },
    ],
  },
};
```

## Options {#options}

<<<<<<< HEAD
|                 名称                  |            类型             |                   默认值                       | 描述                                                |
| :-----------------------------------: | :-------------------------: | :--------------------------------------------: | :-------------------------------------------------- |
|           **[`url`](#url)**           |    `{Boolean\|Function}`    |                     `true`                     | 启用/禁用 `url`/`image-set` 函数处理                |
|        **[`import`](#import)**        |    `{Boolean\|Function}`    |                     `true`                     | 启用/禁用 `@import` 规则进行处理                    |
|       **[`modules`](#modules)**       | `{Boolean\|String\|Object}` |                 `{auto: true}`                 | 启用/禁用 CSS 模块及其配置                          |
|     **[`sourceMap`](#sourcemap)**     |         `{Boolean}`         |               `compiler.devtool`               | 启用/禁用生成 SourceMap                             |
| **[`importLoaders`](#importloaders)** |         `{Number}`          |                      `0`                       | 启用/禁用或者设置在 css-loader 前应用的 loader 数量 |
|      **[`esModule`](#esmodule)**      |         `{Boolean}`         |                     `true`                     | 使用 ES 模块语法                                    |
=======
|                 Name                  |            Type             |      Default       | Description                                                                                                              |
| :-----------------------------------: | :-------------------------: | :----------------: | :----------------------------------------------------------------------------------------------------------------------- |
|           **[`url`](#url)**           |     `{Boolean\|Object}`     |       `true`       | Allows to enables/disables `url()`/`image-set()` functions handling                                                      |
|        **[`import`](#import)**        |     `{Boolean\|Object}`     |       `true`       | Allows to enables/disables `@import` at-rules handling                                                                   |
|       **[`modules`](#modules)**       | `{Boolean\|String\|Object}` |   `{auto: true}`   | Allows to enables/disables or setup CSS Modules options                                                                  |
|     **[`sourceMap`](#sourcemap)**     |         `{Boolean}`         | `compiler.devtool` | Enables/Disables generation of source maps                                                                               |
| **[`importLoaders`](#importloaders)** |         `{Number}`          |        `0`         | Allows enables/disables or setups number of loaders applied before CSS loader for `@import`/CSS Modules and ICSS imports |
|      **[`esModule`](#esmodule)**      |         `{Boolean}`         |       `true`       | Use ES modules syntax                                                                                                    |
>>>>>>> 076a4a41ddf8ad3abf74b8900d6d73e82eb56946

### `url` {#url}

<<<<<<< HEAD
类型: `Boolean|Function`
默认值: `true`

启用/禁用 `url`/`image-set` 函数进行处理。如果设置为 `false`，`css-loader` 将不会解析 `url` 或者 `image-set` 中的任何路径。还可以传递给一个函数基于资源的路径动态地控制这种行为。绝对路径和根目录的相对 URL 现在会被解析(版本 [4.0.0](https://github.com/webpack-contrib/css-loader/blob/master/CHANGELOG.md#400-2020-07-25)。
=======
Type: `Boolean|Object`
Default: `true`

Allow to enable/disables handling the CSS functions `url` and `image-set`.
If set to `false`, `css-loader` will not parse any paths specified in `url` or `image-set`.
A function can also be passed to control this behavior dynamically based on the path to the asset.
Starting with version [4.0.0](https://github.com/webpack-contrib/css-loader/blob/master/CHANGELOG.md#400-2020-07-25), absolute paths are parsed based on the server root.
>>>>>>> 076a4a41ddf8ad3abf74b8900d6d73e82eb56946

示例解决方案:

```
url(image.png) => require('./image.png')
url('image.png') => require('./image.png')
url(./image.png) => require('./image.png')
url('./image.png') => require('./image.png')
url('http://dontwritehorriblecode.com/2112.png') => require('http://dontwritehorriblecode.com/2112.png')
image-set(url('image2x.png') 1x, url('image1x.png') 2x) => require('./image1x.png') and require('./image2x.png')
```

要从 `node_modules` 目录（包括 `resolve.modules`）导入资源，而对于 `alias`，请加上一个前缀 `~`：

```
url(~module/image.png) => require('module/image.png')
url('~module/image.png') => require('module/image.png')
url(~aliasDirectory/image.png) => require('otherDirectory/image.png')
```

#### `Boolean` {#boolean}

启用/禁用 `url()` 解析。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          url: true,
        },
      },
    ],
  },
};
```

<<<<<<< HEAD
#### `Function` {#function}
=======
#### `Object`
>>>>>>> 076a4a41ddf8ad3abf74b8900d6d73e82eb56946

允许过滤 `url()`。所有过滤的内容 `url()` 都不会解析（保留编写时的代码）。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
<<<<<<< HEAD
          url: (url, resourcePath) => {
            // resourcePath - css 文件的路径

            // 不处理 `img.png` url
            if (url.includes("img.png")) {
              return false;
            }
=======
          url: {
            filter: (url, resourcePath) => {
              // resourcePath - path to css file

              // Don't handle `img.png` urls
              if (url.includes("img.png")) {
                return false;
              }
>>>>>>> 076a4a41ddf8ad3abf74b8900d6d73e82eb56946

              return true;
            },
          },
        },
      },
    ],
  },
};
```

### `import` {#import}

<<<<<<< HEAD
类型: `Boolean|Function`
默认值: `true`

启用/禁用 `@import` 规则进行处理
控制 `@import` 的解析。`@import` 中的绝对 URL 会被直接移到运行时去处理。
=======
Type: `Boolean|Object`
Default: `true`

Allows to enables/disables `@import` at-rules handling.
Control `@import` resolving. Absolute urls in `@import` will be moved in runtime code.
>>>>>>> 076a4a41ddf8ad3abf74b8900d6d73e82eb56946

示例解决方案：

```
@import 'style.css' => require('./style.css')
@import url(style.css) => require('./style.css')
@import url('style.css') => require('./style.css')
@import './style.css' => require('./style.css')
@import url(./style.css) => require('./style.css')
@import url('./style.css') => require('./style.css')
@import url('http://dontwritehorriblecode.com/style.css') => @import url('http://dontwritehorriblecode.com/style.css') in runtime
```

要从 `node_modules` 目录（包括 `resolve.modules`）导入样式，而对于 `alias`，请加上一个前缀 `~`：

```
@import url(~module/style.css) => require('module/style.css')
@import url('~module/style.css') => require('module/style.css')
@import url(~aliasDirectory/style.css) => require('otherDirectory/style.css')
```

#### `Boolean` {#boolean}

启用/禁用 `@import` 解析。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          import: true,
        },
      },
    ],
  },
};
```

<<<<<<< HEAD
#### `Function` {#function}
=======
#### `Object`

|          Name           |     Type     |   Default   | Description               |
| :---------------------: | :----------: | :---------: | :------------------------ |
| **[`filter`](#filter)** | `{Function}` | `undefined` | Allow to filter `@import` |

##### `filter`

Type: `Function`
Default: `undefined`
>>>>>>> 076a4a41ddf8ad3abf74b8900d6d73e82eb56946

允许过滤 `@import`。所有过滤的内容 `@import` 都不会解析（保留编写时的代码）。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
<<<<<<< HEAD
          import: (url, media, resourcePath) => {
            // resourcePath - css 文件路径

            // 不处理 `style.css` 的导入
            if (url.includes("style.css")) {
              return false;
            }
=======
          import: {
            filter: (url, media, resourcePath) => {
              // resourcePath - path to css file

              // Don't handle `style.css` import
              if (url.includes("style.css")) {
                return false;
              }
>>>>>>> 076a4a41ddf8ad3abf74b8900d6d73e82eb56946

              return true;
            },
          },
        },
      },
    ],
  },
};
```

### `modules` {#modules}

<<<<<<< HEAD
类型：`Boolean|String|Object`
默认值：基于文件名，所有匹配正则表达式 `/\.module\.\w+$/i.test(filename)` 的文件为 `true`，你可以参考[这里](https://github.com/webpack-contrib/css-loader#auto)获取更多的信息

启用/禁用 CSS 模块及其配置
=======
Type: `Boolean|String|Object`
Default: `undefined`

Allows to enable/disable CSS Modules or ICSS and setup configuration:

- `undefined` - enable CSS modules for all files matching `/\.module\.\w+$/i.test(filename)` and `/\.icss\.\w+$/i.test(filename)` regexp.
- `true` - enable CSS modules for all files.
- `false` - disables CSS Modules for all files.
- `string` - disables CSS Modules for all files and set the `mode` option, more information you can read [here](https://github.com/webpack-contrib/css-loader#mode)
- `object` - enable CSS modules for all files, if `modules.auto` option is not specified, otherwise the `modules.auto` option will determine whether if it is CSS modules or not, more information you can read [here](https://github.com/webpack-contrib/css-loader#auto)
>>>>>>> 076a4a41ddf8ad3abf74b8900d6d73e82eb56946

该 `modules` 选项启用/禁用 **[CSS 模块](https://github.com/css-modules/css-modules)** 规范并且设置基本的行为。

设置为 `false` 值会提升性能，因为避免了 **CSS Modules** 特性的解析，这对于使用普通 CSS 或者其他技术的开发人员是非常有用的。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          modules: true,
        },
      },
    ],
  },
};
```

#### `Features` {#features}

##### `Scope` {#scope}

使用 `local` 值要求你指定 `:global` 类。
使用 `global` 值要求你指定 `:local` 类。
使用 `pure` 值则要求必须至少包含一个局部类或者 id。

你可以点击 [此处](https://github.com/css-modules/css-modules) 了解更多。

样式可以在局部作用域中，避免影响全局作用域的样式。

语法 `:local(.className)` 可以被用来在局部作用域中声明 className。局部的作用域标识符会以模块形式暴露出去。

使用 `:local`（无括号）可以为此选择器启用局部模式。
`:global(.className)` 可以用来声明一个明确的全局选择器。
使用 `:global`（无括号）可以将此选择器切换至全局模式。

loader 会用唯一的标识符 (identifier) 来替换局部选择器。所选择的唯一标识符以模块形式暴露出去。

```css
:local(.className) {
  background: red;
}
:local .className {
  color: green;
}
:local(.className .subClass) {
  color: green;
}
:local .className .subClass :global(.global-class-name) {
  color: blue;
}
```

```css
._23_aKvs-b8bW2Vg3fwHozO {
  background: red;
}
._23_aKvs-b8bW2Vg3fwHozO {
  color: green;
}
._23_aKvs-b8bW2Vg3fwHozO ._13LGdX8RMStbBE9w-t0gZ1 {
  color: green;
}
._23_aKvs-b8bW2Vg3fwHozO ._13LGdX8RMStbBE9w-t0gZ1 .global-class-name {
  color: blue;
}
```

> ℹ️ 被导出的标识符

```js
exports.locals = {
  className: "_23_aKvs-b8bW2Vg3fwHozO",
  subClass: "_13LGdX8RMStbBE9w-t0gZ1",
};
```

本地选择器推荐使用驼峰命名。它们在导入的 JS 模块中更容易使用。

你也可以使用 `:local(#someId)`，但这并不推荐。应该使用类去代替 id。

##### `Composing` {#composing}

声明本地类名时，可以从另一个本地类名组成一个本地类。

```css
:local(.className) {
  background: red;
  color: yellow;
}

:local(.subClass) {
  composes: className;
  background: blue;
}
```

这不会导致 CSS 本身发生任何变化，但是会导出多个类名。

```js
exports.locals = {
  className: "_23_aKvs-b8bW2Vg3fwHozO",
  subClass: "_13LGdX8RMStbBE9w-t0gZ1 _23_aKvs-b8bW2Vg3fwHozO",
};
```

```css
._23_aKvs-b8bW2Vg3fwHozO {
  background: red;
  color: yellow;
}

._13LGdX8RMStbBE9w-t0gZ1 {
  background: blue;
}
```

##### `Importing` {#importing}

从另一个模块导入本地类名。

> 我强烈建议您在导入文件时指定扩展名，因为可以导入具有任何扩展名的文件，而且事先并不能知道要使用哪个文件。

```css
:local(.continueButton) {
  composes: button from "library/button.css";
  background: red;
}
```

```css
:local(.nameEdit) {
  composes: edit highlight from "./edit.css";
  background: red;
}
```

要从多个模块导入，请使用多个 `composes:` 规则。

```css
:local(.className) {
  composes: edit hightlight from "./edit.css";
  composes: button from "module/button.css";
  composes: classFromThisModule;
  background: red;
}
```

##### `Values` {#values}

可以使用 `@value` 来指定在整个文档中都能被重复使用的值，

我们推荐对特定的值使用 `v-` 的前缀，给选择器使用 `s-` 的前缀，并且为媒体规则使用 `m-` 前缀。

```css
@value v-primary: #BF4040;
@value s-black: black-selector;
@value m-large: (min-width: 960px);

.header {
  color: v-primary;
  padding: 0 10px;
}

.s-black {
  color: black;
}

@media m-large {
  .header {
    padding: 0 20px;
  }
}
```

#### `Boolean` {#boolean}

启用 **CSS 模块** 功能。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          modules: true,
        },
      },
    ],
  },
};
```

#### `String` {#string}

启用 **CSS 模块** 功能和设置 `mode`。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          // 使用 `local` 同使用 `modules: true` 的效果是一样的
          modules: "global",
        },
      },
    ],
  },
};
```

#### `Object` {#object}

启用 **CSS 模块** 功能和设置选项。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          modules: {
            mode: "local",
            auto: true,
            exportGlobals: true,
            localIdentName: "[path][name]__[local]--[hash:base64:5]",
            localIdentContext: path.resolve(__dirname, "src"),
            localIdentHashSalt: "my-custom-hash",
            namedExport: true,
            exportLocalsConvention: "camelCase",
            exportOnlyLocals: false,
          },
        },
      },
    ],
  },
};
```

<<<<<<< HEAD
##### `compileType` {#compiletype}

Type: `'module' | 'icss'`
Default: `'module'`

Controls the level of compilation applied to the input styles.

The `module` handles `class` and `id` scoping and `@value` values.
The `icss` will only compile the low level `Interoperable CSS` format for declaring `:import` and `:export` dependencies between CSS and other languages.

ICSS underpins CSS Module support, and provides a low level syntax for other tools to implement CSS-module variations of their own.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          modules: {
            compileType: "icss",
          },
        },
      },
    ],
  },
};
```

##### `auto` {#auto}

类型：`Boolean|RegExp|Function`
默认：`'true'`

允许基于文件名自动启用 CSS 模块。
=======
##### `auto`

Type: `Boolean|RegExp|Function`
Default: `undefined`

Allows auto enable CSS modules/ICSS based on filename when `modules` option is object.

Possible values:

- `undefined` - enable CSS modules for all files.
- `true` - enable CSS modules for all files matching `/\.module\.\w+$/i.test(filename)` and `/\.icss\.\w+$/i.test(filename)` regexp.
- `false` - disables CSS Modules.
- `RegExp` - enable CSS modules for all files matching `/RegExp/i.test(filename)` regexp.
- `function` - enable CSS Modules for files based on the filename satisfying your filter function check.
>>>>>>> 076a4a41ddf8ad3abf74b8900d6d73e82eb56946

###### `Boolean` {#boolean}

可能的值：

<<<<<<< HEAD
- `true` - 启用 CSS 模块或者可交互 CSS 格式，为所有满足 `/\.module(s)?\.\w+$/i.test(filename)` 条件的文件设置 [`modules.compileType`](#compiletype) 选项为 `module`，或者为所有满足 `/\.icss\.\w+$/i.test(filename)` 条件的文件设置 [`modules.compileType`](#compiletype) 选项为 `icss`
- `false` - 禁用 css 模块或者基于文件名的可交互 CSS 格式
=======
- `true` - enables CSS modules or interoperable CSS format, sets the [`modules.mode`](#mode) option to `local` value for all files which satisfy `/\.module(s)?\.\w+$/i.test(filename)` condition or sets the [`modules.mode`](#mode) option to `icss` value for all files which satisfy `/\.icss\.\w+$/i.test(filename)` condition
- `false` - disables CSS modules or interoperable CSS format based on filename
>>>>>>> 076a4a41ddf8ad3abf74b8900d6d73e82eb56946

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          modules: {
            auto: true,
          },
        },
      },
    ],
  },
};
```

###### `RegExp` {#regexp}

根据正则表达式检查文件名，为匹配的文件启用 css 模块。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          modules: {
            auto: /\.custom-module\.\w+$/i,
          },
        },
      },
    ],
  },
};
```

###### `Function` {#function}

根据过滤器检查文件名，为满足过滤要求的文件启用css模块。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          modules: {
            auto: (resourcePath) => resourcePath.endsWith(".custom-module.css"),
          },
        },
      },
    ],
  },
};
```

##### `mode` {#mode}

类型：`String|Function`
默认：`'local'`

设置 `mode` 选项。需要 `local` 模式时可以忽略该值。

<<<<<<< HEAD
###### `String` {#string}

可能的值 - `local`，`global`，和 `pure`。
=======
Controls the level of compilation applied to the input styles.

The `local`, `global`, and `pure` handles `class` and `id` scoping and `@value` values.
The `icss` will only compile the low level `Interoperable CSS` format for declaring `:import` and `:export` dependencies between CSS and other languages.

ICSS underpins CSS Module support, and provides a low level syntax for other tools to implement CSS-module variations of their own.

###### `String`

Possible values - `local`, `global`, `pure`, and `icss`.
>>>>>>> 076a4a41ddf8ad3abf74b8900d6d73e82eb56946

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          modules: {
            mode: "global",
          },
        },
      },
    ],
  },
};
```

###### `Function` {#function}

允许根据文件名设置不同的 `mode` 选项值。

<<<<<<< HEAD
可能的返回值 - `local`，`global`，和 `pure`。
=======
Possible return values - `local`, `global`, `pure` and `icss`.
>>>>>>> 076a4a41ddf8ad3abf74b8900d6d73e82eb56946

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          modules: {
            // 回调必须返回 `local`，`global`，或者 `pure`
            mode: (resourcePath) => {
              if (/pure.css$/i.test(resourcePath)) {
                return "pure";
              }

              if (/global.css$/i.test(resourcePath)) {
                return "global";
              }

              return "local";
            },
          },
        },
      },
    ],
  },
};
```

##### `localIdentName` {#localidentname}

类型：`String`
默认：`'[hash:base64]'`

<<<<<<< HEAD
允许配置生成的本地标识符(ident)
查看[loader-utils 的文档](https://github.com/webpack/loader-utils#interpolatename)获取选项更多的信息.
=======
Allows to configure the generated local ident name.

For more information on options see:

- [webpack template strings](/configuration/output/#template-strings),
- [output.hashDigest](/configuration/output/#outputhashdigest),
- [output.hashDigestLength](/configuration/output/#outputhashdigestlength),
- [output.hashFunction](/configuration/output/#outputhashfunction),
- [output.hashSalt](/configuration/output/#outputhashsalt).

Supported template strings:

- [name] the basename of the resource
- [path] the path of the resource relative to the `compiler.context` option or `modules.localIdentContext` option.
- [file] - filename and path.
- [ext] - extension with leading .
- [hash] - the hash of the string, generated based on `localIdentHashSalt`, `localIdentHashFunction`, `localIdentHashDigest`, `localIdentHashDigestLength`, `localIdentContext`, `resourcePath` and `exportName`
- [<hashFunction>:hash:<hashDigest>:<hashDigestLength>] - hash with hash settings.
- [local] - original class.
>>>>>>> 076a4a41ddf8ad3abf74b8900d6d73e82eb56946

建议：

- 开发环境使用 `'[path][name]__[local]'`
- 生产环境使用 `'[hash:base64]'`

`[local]` 占位符包含原始的类。

**注意：**所有保留 (`<>:"/\|?*`) 和控制文件系统字符 (不包括 `[local]` 占位符) 都将转换为 `-`。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: "[path][name]__[local]--[hash:base64:5]",
          },
        },
      },
    ],
  },
};
```

##### `localIdentContext` {#localidentcontext}

类型：`String`
默认：`compiler.context`

允许为本地标识符名称重新定义基本的 loader 上下文。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          modules: {
            localIdentContext: path.resolve(__dirname, "src"),
          },
        },
      },
    ],
  },
};
```

<<<<<<< HEAD
##### `localIdentHashPrefix` {#localidenthashprefix}
=======
##### `localIdentHashSalt`
>>>>>>> 076a4a41ddf8ad3abf74b8900d6d73e82eb56946

类型：`String`
默认：`undefined`

<<<<<<< HEAD
允许添加自定义哈希值以生成更多唯一类。
=======
Allows to add custom hash to generate more unique classes.
For more information see [output.hashSalt](/configuration/output/#outputhashsalt).

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          modules: {
            localIdentHashSalt: "hash",
          },
        },
      },
    ],
  },
};
```

##### `localIdentHashFunction`

Type: `String`
Default: `md4`

Allows to specify hash function to generate classes .
For more information see [output.hashFunction](/configuration/output/#outputhashfunction).

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          modules: {
            localIdentHashFunction: "md4",
          },
        },
      },
    ],
  },
};
```

##### `localIdentHashDigest`

Type: `String`
Default: `hex`

Allows to specify hash digest to generate classes.
For more information see [output.hashDigest](/configuration/output/#outputhashdigest).

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          modules: {
            localIdentHashDigest: "base64",
          },
        },
      },
    ],
  },
};
```

##### `localIdentHashDigestLength`

Type: `Number`
Default: `20`

Allows to specify hash digest length to generate classes.
For more information see [output.hashDigestLength](/configuration/output/#outputhashdigestlength).
>>>>>>> 076a4a41ddf8ad3abf74b8900d6d73e82eb56946

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          modules: {
            localIdentHashDigestLength: 5,
          },
        },
      },
    ],
  },
};
```

##### `localIdentRegExp` {#localidentregexp}

类型：`String|RegExp`
默认：`undefined`

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          modules: {
            localIdentRegExp: /page-(.*)\.css/i,
          },
        },
      },
    ],
  },
};
```

##### `getLocalIdent` {#getlocalident}

类型：`Function`
默认：`undefined`

可以指定自定义 `getLocalIdent` 函数的绝对路径，以基于不同的架构生成类名。
默认情况下，我们使用内置函数来生成 classname。
如果自定义函数返回 `null` 或者 `undefined`，
我们将降级使用内置函数来生成 classname。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          modules: {
            getLocalIdent: (context, localIdentName, localName, options) => {
              return "whatever_random_class_name";
            },
          },
        },
      },
    ],
  },
};
```

##### `namedExport` {#namedexport}

类型：`Boolean`
默认：`false`

本地环境启用/禁用 export 的 ES 模块。

> ⚠ 本地环境的命名将转换为驼峰格式，即 `exportLocalsConvention` 选项默认设置了 `camelCaseOnly`。

> ⚠ 不允许在 CSS 类名中使用 JavaScript 保留字。

**styles.css**

```css
.foo-baz {
  color: red;
}
.bar {
  color: blue;
}
```

**index.js**

```js
import { fooBaz, bar } from "./styles.css";

console.log(fooBaz, bar);
```

可以使用以下命令启用 export 的 ES 模块：

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          esModule: true,
          modules: {
            namedExport: true,
          },
        },
      },
    ],
  },
};
```

##### `exportGlobals` {#exportglobals}

类型：`Boolean`
默认：`false`

允许 `css-loader` 从全局类或 ID 导出名称，因此您可以将其用作本地名称。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          modules: {
            exportGlobals: true,
          },
        },
      },
    ],
  },
};
```

##### `exportLocalsConvention` {#exportlocalsconvention}

类型：`String`
默认：取决于 `modules.namedExport` 选项值，如果为 `true` 则对应的是 `camelCaseOnly`，反之对应的是 `asIs`

导出的类名称的样式。

默认情况下，导出的 JSON 密钥反映了类名（即 `asIs` 值）。

> ⚠ 如果你设置 `namedExport` 为 `true` 那么只有 `camelCaseOnly` 被允许。

|         名称          |    类型    | 描述                                       |
| :-------------------: | :--------: | :----------------------------------------- |
|     **`'asIs'`**      | `{String}` | 类名将按原样导出。                         |
|   **`'camelCase'`**   | `{String}` | 类名将被驼峰化，原类名不会从局部环境删除   |
| **`'camelCaseOnly'`** | `{String}` | 类名将被驼峰化，原类名从局部环境删除       |
|    **`'dashes'`**     | `{String}` | 类名中只有破折号会被驼峰化                 |
|  **`'dashesOnly'`**   | `{String}` | 类名中破折号会被驼峰，原类名从局部环境删除 |

**file.css**

```css
.class-name {
}
```

**file.js**

```js
import { className } from "file.css";
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          modules: {
            exportLocalsConvention: "camelCase",
          },
        },
      },
    ],
  },
};
```

##### `exportOnlyLocals` {#exportonlylocals}

类型：`Boolean`
默认：`false`

仅导出局部环境。

使用 **css 模块** 进行预渲染（例如 SSR）时**很有用**。
要进行预渲染，**预渲染包** 应使用 `mini-css-extract-plugin` 选项而不是 `style-loader!css-loader`。
它不嵌入 CSS，而仅导出标识符映射。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          modules: {
            exportOnlyLocals: true,
          },
        },
      },
    ],
  },
};
```

<<<<<<< HEAD
### `sourceMap` {#sourcemap}

类型：`Boolean`
默认：取决于 `compiler.devtool` 的值。

默认情况下，SouceMap 的生成取决于 [`devtool`](/configuration/devtool/) 选项。除eval和false值外，所有值均都会生成 SouceMap。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          sourceMap: true,
        },
      },
    ],
  },
};
```

### `importLoaders` {#importloaders}
=======
### `importLoaders`
>>>>>>> 076a4a41ddf8ad3abf74b8900d6d73e82eb56946

类型：`Number`
默认：`0`

<<<<<<< HEAD
启用/禁用或设置在CSS加载程序之前应用的加载程序的数量。

`importLoaders` 选项允许你配置在 `css-loader` 之前有多少 loader 应用于`@import`ed 资源。
=======
Allows to enables/disables or setups number of loaders applied before CSS loader for `@import` at-rules, CSS modules and ICSS imports, i.e. `@import`/`composes`/`@value value from './values.css'`/etc.

The option `importLoaders` allows you to configure how many loaders before `css-loader` should be applied to `@import`ed resources and CSS modules/ICSS imports.
>>>>>>> 076a4a41ddf8ad3abf74b8900d6d73e82eb56946

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
};
```

当模块系统（即 webpack）支持按来源匹配 loader 时，这种情况将来可能会改变。

<<<<<<< HEAD
### `esModule` {#esmodule}
=======
### `sourceMap`

Type: `Boolean`
Default: depends on the `compiler.devtool` value

By default generation of source maps depends on the [`devtool`](/configuration/devtool/) option. All values enable source map generation except `eval` and `false` value.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          sourceMap: true,
        },
      },
    ],
  },
};
```

### `esModule`
>>>>>>> 076a4a41ddf8ad3abf74b8900d6d73e82eb56946

类型：`Boolean`
默认：`true`

默认情况下，`css-loader` 生成使用 ES 模块语法的 JS 模块。
在某些情况下，使用 ES 模块是有益的，例如在[模块串联](/plugins/module-concatenation-plugin/)或 [tree shaking](/guides/tree-shaking/) 时。

您可以使用以下方式启用ES模块语法：

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          esModule: false,
        },
      },
    ],
  },
};
```

## 示例 {#examples}

### 推荐 {#recommend}

推荐 `production` 环境的构建将 CSS 从你的 bundle 中分离出来，这样可以使用 CSS/JS 文件的并行加载。
这可以通过使用 `mini-css-extract-plugin` 来实现，因为它可以创建单独的 CSS 文件。
对于 `development` 模式（包括 `webpack-dev-server`），你可以使用 [style-loader](/loaders/style-loader/)，因为它可以使用多个 <style></style> 标签将 CSS 插入到 DOM 中，并且反应会更快。

> i 不要同时使用 `style-loader` 与 `mini-css-extract-plugin`。

**webpack.config.js**

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [].concat(devMode ? [] : [new MiniCssExtractPlugin()]),
};
```

### 使用 `/* webpackIgnore: true */` 注释禁用 url 解析

有了 `/* webpackIgnore: true */` 注释，可以禁用对规则和单个声明的源处理。

```css
/* webpackIgnore: true */
@import url(./basic.css);
@import /* webpackIgnore: true */ url(./imported.css);

.class {
  /* 对 'background' 声明中的所有 url 禁用 url 处理 */
  color: red;
  /* webpackIgnore: true */
  background: url("./url/img.png"), url("./url/img.png");
}

.class {
  /* 对 'background' 声明中第一个 url 禁用 url 处理 */
  color: red;
  background:
    /* webpackIgnore: true */ url("./url/img.png"), url("./url/img.png");
}

.class {
  /* 对 'background' 声明中第二个 url 禁用 url 处理 */
  color: red;
  background: url("./url/img.png"),
    /* webpackIgnore: true */ url("./url/img.png");
}

/* prettier-ignore */
.class {
  /* 对 'background' 声明中第二个 url 禁用 url 处理 */
  color: red;
  background: url("./url/img.png"),
    /* webpackIgnore: true */
    url("./url/img.png");
}

/* prettier-ignore */
.class {
  /* 对 'background-image' 声明中第三和第六个 url 禁用 url 处理 */
  background-image: image-set(
    url(./url/img.png) 2x,
    url(./url/img.png) 3x,
    /* webpackIgnore:  true */ url(./url/img.png) 4x,
    url(./url/img.png) 5x,
    url(./url/img.png) 6x,
    /* webpackIgnore:  true */
    url(./url/img.png) 7x
  );
}
```

### Assets {#assets}

如下配置的 `webpack.config.js` 可以加载 CSS 文件，嵌入小的 PNG/JPG/GIF/SVG 图片以及字体作为[数据 URL](https://tools.ietf.org/html/rfc2397)，并将较大的文件复制到输出目录。

**对于 webpack v5：**

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        // 更多信息请点击这里 https://webpack.js.org/guides/asset-modules/
        type: "asset",
      },
    ],
  },
};
```

<<<<<<< HEAD
**对于 webpack v4：**
=======
### Extract
>>>>>>> 076a4a41ddf8ad3abf74b8900d6d73e82eb56946

For production builds it's recommended to extract the CSS from your bundle being able to use parallel loading of CSS/JS resources later on.

- This can be achieved by using the [mini-css-extract-plugin](/plugins/mini-css-extract-plugin/) to extract the CSS when running in production mode.

- As an alternative, if seeking better development performance and css outputs that mimic production. [extract-css-chunks-webpack-plugin](https://github.com/faceyspacey/extract-css-chunks-webpack-plugin) offers a hot module reload friendly, extended version of mini-css-extract-plugin. HMR real CSS files in dev, works like mini-css in non-dev

### 纯 CSS，CSS 模块和 PostCSS {#pure-css-css-modules-and-postcss}

如果项目中没有纯 CSS（没有 CSS 模块），CSS 模块和 PostCSS，则可以使用以下设置：

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        // 对于 pure CSS - /\.css$/i,
        // 对于 Sass/SCSS - /\.((c|sa|sc)ss)$/i,
        // 对于 Less - /\.((c|le)ss)$/i,
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
<<<<<<< HEAD
              // 每一个 CSS 的 `@import` 都运行 `postcss-loader`，不要忘了 `sass-loader` 将不属于 CSS 的 `@import` 编译到一个文件中
              // 如果您需要在每个 CSS 的 `@import` 上运行 `sass-loader` 和 `postcss-loader`，请将其设置为 `2`。
=======
              // Run `postcss-loader` on each CSS `@import` and CSS modules/ICSS imports, do not forget that `sass-loader` compile non CSS `@import`'s into a single file
              // If you need run `sass-loader` and `postcss-loader` on each CSS `@import` please set it to `2`
>>>>>>> 076a4a41ddf8ad3abf74b8900d6d73e82eb56946
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: { plugins: () => [postcssPresetEnv({ stage: 0 })] },
          },
          // 也可能是 `less-loader`
          {
            loader: "sass-loader",
          },
        ],
      },
      // 对于 webpack v5
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        // More information here https://webpack.js.org/guides/asset-modules/
        type: "asset",
      },
<<<<<<< HEAD
      // 对于 webpack v4
      // {
      //  test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
      //  loader: "url-loader",
      //  options: {
      //    limit: 8192,
      //  },
      // },
=======
>>>>>>> 076a4a41ddf8ad3abf74b8900d6d73e82eb56946
    ],
  },
};
```

### 使用别名解析未解析的 URL {#resolve-unresolved-urls-using-an-alias}

**index.css**

```css
.class {
  background: url(/assets/unresolved/img.png);
}
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      "/assets/unresolved/img.png": path.resolve(
        __dirname,
        "assets/real-path-to-img/img.png"
      ),
    },
  },
};
```

### 只允许 `可交互的 CSS` 使其与 `CSS Module` 特性分离{#separating-interoperable-css-only-and-css-module-features}

<<<<<<< HEAD
下面是有关配置的示例代码，通过为所有未匹配到 `*.module.scss` 命名约定文件设置 `compileType` 选项，只允许使用 `可交互的 CSS` 特性（如 `:import` 和 `:export`），而不使用其他的 `CSS Module` 特性。此处仅供参考，因为在 v4 之前，`css-loader` 默认将 `ICSS` 特性应用于所有文件。
同时，在本示例中，匹配到 `*.module.scss` 的所有文件都将被视为 `CSS Modules`。
=======
The following setup is an example of allowing `Interoperable CSS` features only (such as `:import` and `:export`) without using further `CSS Module` functionality by setting `mode` option for all files that do not match `*.module.scss` naming convention. This is for reference as having `ICSS` features applied to all files was default `css-loader` behavior before v4.
Meanwhile all files matching `*.module.scss` are treated as `CSS Modules` in this example.
>>>>>>> 076a4a41ddf8ad3abf74b8900d6d73e82eb56946

假设项目中有这样一个需求，要求 canvas 绘制使用的变量与 CSS 同步，换句话说就是 canvas 绘制使用的颜色（在 JavaScript 中设置的颜色名）与 HTML 背景（在 CSS 中通过 class 设置）相同。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      // ...
      // --------
      // SCSS ALL EXCEPT MODULES
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                mode: "icss",
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      // --------
      // SCSS MODULES
      {
        test: /\.module\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                mode: "local",
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      // --------
      // ...
    ],
  },
};
```

**variables.scss**

文件被视为仅使用 `ICSS`。

```scss
$colorBackground: red;
:export {
  colorBackgroundCanvas: $colorBackground;
}
```

**Component.module.scss**

文件被视为 `CSS Module`。

```scss
@import "variables.scss";
.componentClass {
  background-color: $colorBackground;
}
```

**Component.jsx**

在 JavaScript 中直接使用 `CSS Module` 的特性以及 SCSS 声明的变量。

```jsx
import svars from "variables.scss";
import styles from "Component.module.scss";

// Render DOM with CSS modules class name
// <div className={styles.componentClass}>
//   <canvas ref={mountsCanvas}/>
// </div>

// Somewhere in JavaScript canvas drawing code use the variable directly
// const ctx = mountsCanvas.current.getContext('2d',{alpha: false});
ctx.fillStyle = `${svars.colorBackgroundCanvas}`;
```

## Contributing {#contributing}

如果您还没有阅读，请花一点时间阅读我们的贡献指南。

[贡献](https://github.com/webpack-contrib/css-loader/blob/master/.github/CONTRIBUTING.md)

## License {#license}

[MIT](https://github.com/webpack-contrib/css-loader/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/css-loader.svg
[npm-url]: https://npmjs.com/package/css-loader
[node]: https://img.shields.io/node/v/css-loader.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/webpack-contrib/css-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/css-loader
[tests]: https://github.com/webpack-contrib/css-loader/workflows/css-loader/badge.svg
[tests-url]: https://github.com/webpack-contrib/css-loader/actions
[cover]: https://codecov.io/gh/webpack-contrib/css-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/css-loader
[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=css-loader
[size-url]: https://packagephobia.now.sh/result?p=css-loader
