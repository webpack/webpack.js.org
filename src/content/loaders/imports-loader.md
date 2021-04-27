---
title: imports-loader
source: https://raw.githubusercontent.com/webpack-contrib/imports-loader/master/README.md
edit: https://github.com/webpack-contrib/imports-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/imports-loader
translators:
  - jacob-lcs
  - 92hackers
  - QC-L
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![cover][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



imports loader 允许使用依赖于特定全局变量的模块。

这对于依赖 `window` 对象下的全局变量（比如 `$` 或 `this` ）的第三方模块非常有用。
imports loader 可以添加必要的 `require('whatever')` 调用，因此这些模块可以与 webpack 一起使用。

有关兼容性问题的进一步提示，可以查看官方文档中的 [Shimming](/guides/shimming/)。

> ⚠ 默认情况下，loader 生成具名 ES module。

> ⚠ 请注意，在原始代码中已存在的 imports（`import`/`require`）与引入新值会导致失败。

## 快速开始 {#getting-started}

首先，你需要安装 `imports-loader`：

```console
$ npm install imports-loader --save-dev
```

如果你有这个文件：

**example.js**

```js
$('img').doSomeAwesomeJqueryPluginStuff();
```

然后你可以使用两个方法来配置 `imports-loader`，就可以把 `jquery` 值注入到模块中。

### 内联 {#inline}

可以使用 `|` 或者 `%20`（空格）分隔 import 语句中的 `syntax`、`moduleName`、`name` 和 `alias`。
可以在 [这里](#syntax) 获取文档和语法示例。

> ⚠ `%20` 是查询字符串中的空格，因为你不能在 URL 中使用空格。

```js
// 可供选择的语法：
//
// import myLib from 'imports-loader?imports=default%20jquery%20$!./example.js';
//
// `%20` 是查询字符串中的空格，相当于 `default jquery $`
import myLib from 'imports-loader?imports=default|jquery|$!./example.js';
// 在 example.js 的开头添加如下代码：
//
// import $ from "jquery";
//
// ...
// Code
// ...
```

```js
import myLib from 'imports-loader?imports=default|jquery|$,angular!./example.js';
// `|` 是查询字符串中的分隔符，相当于 `default|jquery|$` 与 `angular`
// 在 example.js 的开头添加如下代码：
//
// import $ from "jquery";
// import angular from "angular";
//
// ...
// Code
// ...
```

```js
import myLib from 'imports-loader?imports=named|library|myMethod,angular!./example.js';
// `|` 是查询字符串中的分隔符，相当于 `named|library|myMethod` 与 `angular`
// 在 example.js 的开头添加如下代码：
//
// import { myMethod } from "library";
// import angular from "angular";
//
// ...
// Code
// ...
```

```js
const myLib = require(`imports-loader?type=commonjs&imports=single|jquery|$,angular!./example.js`);
// `|` 是查询字符串中的分隔符，相当于 `single|jquery|$` 与 `angular`
// 在 example.js 的开头添加如下代码：
//
// var $ = require("jquery");
// var angular = require("angular");
//
// ...
// Code
// ...
```

```js
const myLib = require(`imports-loader?type=commonjs&imports=single|myLib|myMethod&wrapper=window&!./example.js`);
// `|` 是查询字符串中的分隔符，相当于 `single|myLib|myMethod` 与 `angular`
// 在 example.js 中添加如下代码：
//
// const myMethod = require('myLib');
//
// (function () {
// ...
// Code
// ...
// }.call(window));
```

```js
import myLib from 'imports-loader?additionalCode=var%20myVariable%20=%20false;!./example.js';
// 在 example.js 的开头添加如下代码：
//
// var myVariable = false;
//
// ...
// Code
// ...
```

### 使用配置项 {#using-configuration}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        // 你可以使用 `regexp`
        // test: /example\.js/$
        test: require.resolve('example.js'),
        use: [
          {
            loader: 'imports-loader',
            options: {
              imports: [
                'default jquery $',
                'default lib_2 lib_2_default',
                'named lib_3 lib2_method_1',
                'named lib_3 lib2_method_2 lib_2_method_2_short',
                'namespace lib_4 my_namespace',
                'side-effects lib_5',
                {
                  syntax: 'default',
                  moduleName: 'angular',
                  name: 'angular',
                },
              ],
            },
          },
        ],
      },
    ],
  },
};
```

生成输出：

```js
import $ from 'jquery';
import lib_2_default from 'lib_2';
import { lib2_method_1, lib2_method_2 as lib_2_method_2_short } from 'lib_3';
import * as my_namespace from 'lib_4';
import 'lib_5';
import angular from 'angular';
```

然后用你喜欢的方式运行 `webpack`

## 配置项 {#options}

|                  Name                   |                   Type                    |   Default   | Description                                                            |
| :-------------------------------------: | :---------------------------------------: | :---------: | :--------------------------------------------------------------------- |
|           **[`type`](#type)**           |                `{String}`                 |  `module`   | 生成 import 的格式                                            |
|        **[`imports`](#imports)**        | `{String\|Object\|Array<String\|Object>}` | `undefined` | import 列表                                                        |
|        **[`wrapper`](#wrapper)**        |        `{Boolean\|String\|Object}`        | `undefined` | 关闭函数中的模块代码 (`(function () { ... }).call();`) |
| **[`additionalCode`](#additionalcode)** |                `{String}`                 | `undefined` | 添加自定义代码                                                       |

### `type` {#type}

类型：`String`
默认值：`module`

生成 exports 的格式。

可选值 - `commonjs` （CommonJS module 语法） 和 `module` （ES module 语法）。

#### `commonjs` {#commonjs}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('example.js'),
        loader: 'imports-loader',
        options: {
          syntax: 'default',
          type: 'commonjs',
          imports: 'Foo',
        },
      },
    ],
  },
};
```

生成输出：

```js
var Foo = require('Foo');

// ...
// Code
// ...
```

#### `module` {#module}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('example.js'),
        loader: 'imports-loader',
        options: {
          type: 'module',
          imports: 'Foo',
        },
      },
    ],
  },
};
```

生成输出：

```js
import Foo from 'Foo';

// ...
// Code
// ...
```

### `imports` {#imports}

类型：`String|Object|Array<String|Object>`
默认值：`undefined`

import 列表。

#### `String` {#string}

允许使用字符串描述 export。

##### `Syntax` {#syntax}

使用 `|` 或者 `%20`（空格）分隔 import 中的 `syntax`、`moduleName`、`name` 与 `alias`。

字符串语法 - `[[syntax] [moduleName] [name] [alias]]` 或者 `[[syntax]|[moduleName]|[name]|[alias]]`，其含义为：

- `[syntax]` (**可以被省略**):

  - 如果 `type` 值为 `module`- 可以是 `default`、`named`、`namespace` 或者 `side-effects`，默认值为 `default`。
  - 如果 `type` 值为 `commonjs`- 可以是 `single`、`multiple` 或者 `pure`，默认值为 `single`。

- `[moduleName]` - 被导入模块的名称(**必填**)
- `[name]` - 被导入值的名称(**必填**)
- `[alias]` - 被导入值的别名(**可以被省略**)

示例：

如果 type 值为 `module`：

- `[Foo]` - 生成 `import Foo from "Foo";`.
- `[default Foo]` - 生成 `import Foo from "Foo";`.
- `[default ./my-lib Foo]` - 生成 `import Foo from "./my-lib";`.
- `[named Foo FooA]` - 生成 `import { FooA } from "Foo";`.
- `[named Foo FooA Bar]` - 生成 `import { FooA as Bar } from "Foo";`.
- `[namespace Foo FooA]` - 生成 `import * as FooA from "Foo";`.
- `[side-effects Foo]` - 生成 `import "Foo";`.

如果 type 值为 `commonjs`：

- `[Foo]` - 生成 `const Foo = require("Foo");`.
- `[single Foo]` - 生成 `const Foo = require("Foo");`.
- `[single ./my-lib Foo]` - 生成 `const Foo = require("./my-lib");`.
- `[multiple Foo FooA Bar]` - 生成 `const { FooA: Bar } = require("Foo");`.
- `[pure Foo]` - 生成 `require("Foo");`.

> ⚠ 你需要设置 `type: "commonjs"` 以使用 `single`、`multiple` 与 `pure` 语法。

> ⚠ Aliases 不能与 `default`、`namespace`、`side-effects`、`single` 与 `pure` 语法同时使用。

###### 示例 {#examples}

###### ES Module 默认导入 {#es-module-default-import}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('./path/to/example.js'),
        loader: 'imports-loader',
        options: {
          imports: 'default lib myName',
        },
      },
    ],
  },
};
```

生成输出：

```js
import myName from 'lib';

// ...
// Code
// ...
```

###### CommonJS Single Import {#commonjs-single-import}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('./path/to/example.js'),
        loader: 'imports-loader',
        options: {
          type: 'commonjs',
          imports: 'single lib myName',
        },
      },
    ],
  },
};
```

生成输出：

```js
var myName = require('lib');

// ...
// Code
// ...
```

#### `Object` {#object}

允许使用一个对象来描述 import。

属性：

- `syntax`:

  - 如果 `type` 值为 `module`- 可以是 `default`、`named`、`namespace` 或 `side-effects`
  - 如果 `type` 值为 `commonjs`- 可以是 single`、`multiple` 或 `pure`

- `moduleName` - 被导入模块的名称 (**必填**)
- `name` - 被导入值的名称 (**必填**)
- `alias` - 被导入值的别名 (**可以被省略**)

> ⚠ Alias 不能与 `default`、`namespace`、`side-effects`、`single` 与 `pure` 语法同时使用。

##### 示例 {#examples}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('example.js'),
        use: [
          {
            loader: 'imports-loader',
            options: {
              imports: {
                syntax: 'named',
                moduleName: 'lib_2',
                name: 'lib2_method_2',
                alias: 'lib_2_method_2_alias',
              },
            },
          },
        ],
      },
    ],
  },
};
```

生成输出：

```js
import { lib2_method_2 as lib_2_method_2_alias } from 'lib_2';

// ...
// Code
// ...
```

#### `Array` {#array}

允许指定多个导入。
每一项可以为 [`string`](https://github.com/webpack-contrib/imports-loader#string) 或者 [`object`](https://github.com/webpack-contrib/imports-loader#object)。

##### 示例 {#examples}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('example.js'),
        use: [
          {
            loader: 'imports-loader',
            options: {
              imports: [
                {
                  moduleName: 'angular',
                },
                {
                  syntax: 'default',
                  moduleName: 'jquery',
                  name: '$',
                },
                'default lib_2 lib_2_default',
                'named lib_2 lib2_method_1',
                'named lib_2 lib2_method_2 lib_2_method_2_alias',
                'namespace lib_3 lib_3_all',
                'side-effects lib_4',
              ],
            },
          },
        ],
      },
    ],
  },
};
```

生成输出：

```js
import angular from 'angular';
import $ from 'jquery';
import lib_2_default from 'lib_2';
import { lib2_method_1, lib2_method_2 as lib_2_method_2_alias } from 'lib_2';
import * as lib_3_all from 'lib_3';
import 'lib_4';

// ...
// Code
// ...
```

### `wrapper` {#wrapper}

类型：`Boolean|String|Object`
默认值：`undefined`

用给定的 `thisArg` 和 `args` 关闭函数中的模块代码 (`(function () { ... }).call();`)。

> ⚠ 如果源码中包含 ES module import 的话，请不要使用该配置。

#### `Boolean` {#boolean}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('example.js'),
        use: [
          {
            loader: 'imports-loader',
            options: {
              imports: {
                moduleName: 'jquery',
                name: '$',
              },
              wrapper: true,
            },
          },
        ],
      },
    ],
  },
};
```

生成输出：

```js
import $ from 'jquery';

(function () {
  // ...
  // Code
  // ...
}.call());
```

#### `String` {#string}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('example.js'),
        use: [
          {
            loader: 'imports-loader',
            options: {
              imports: {
                moduleName: 'jquery',
                name: '$',
              },
              wrapper: 'window',
            },
          },
        ],
      },
    ],
  },
};
```

生成输出：

```js
import $ from 'jquery';

(function () {
  // ...
  // Code
  // ...
}.call(window));
```

#### `Object` {#object}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('example.js'),
        use: [
          {
            loader: 'imports-loader',
            options: {
              imports: {
                moduleName: 'jquery',
                name: '$',
              },
              wrapper: {
                thisArg: 'window',
                args: ['myVariable', 'myOtherVariable'],
              },
            },
          },
        ],
      },
    ],
  },
};
```

生成输出：

```js
import $ from 'jquery';

(function (myVariable, myOtherVariable) {
  // ...
  // Code
  // ...
}.call(window, myVariable, myOtherVariable));
```

#### `Object` with different parameter names {#object-with-different-parameter-names}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('example.js'),
        use: [
          {
            loader: 'imports-loader',
            options: {
              imports: {
                moduleName: 'jquery',
                name: '$',
              },
              wrapper: {
                thisArg: 'window',
                args: {
                  myVariable: 'var1',
                  myOtherVariable: 'var2',
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

生成输出：

```js
import $ from 'jquery';

(function (var1, var2) {
  // ...
  // Code
  // ...
}.call(window, myVariable, myOtherVariable));
```

### `additionalCode` {#additionalcode}

类型：`String`
默认值：`undefined`

在模块代码之前添加自定义代码作为前导。

##### Examples {#examples}

###### 定义自定义变量 {#define-custom-variable}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('example.js'),
        use: [
          {
            loader: 'imports-loader',
            options: {
              imports: {
                moduleName: 'jquery',
                name: '$',
              },
              additionalCode: 'var myVariable = false;',
            },
          },
        ],
      },
    ],
  },
};
```

生成输出：

```js
import $ from 'jquery';

var myVariable = false;

// ...
// Code
// ...
```

###### Disable AMD Import Syntax {#disable-amd-import-syntax}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('example.js'),
        use: [
          {
            loader: 'imports-loader',
            options: {
              imports: {
                moduleName: 'jquery',
                name: '$',
              },
              additionalCode:
                'var define = false; /* Disable AMD for misbehaving libraries */',
            },
          },
        ],
      },
    ],
  },
};
```

生成输出：

```js
import $ from 'jquery';

var define = false; /* Disable AMD for misbehaving libraries */

// ...
// Code
// ...
```

## Contributing {#contributing}

如果你还没有阅读，请花一点时间阅读我们的贡献指南。

[贡献指南](https://github.com/webpack-contrib/imports-loader/blob/master/.github/CONTRIBUTING.md)

## License {#license}

[MIT](https://github.com/webpack-contrib/imports-loader/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/imports-loader.svg
[npm-url]: https://www.npmjs.com/package/imports-loader
[node]: https://img.shields.io/node/v/imports-loader.svg
[node-url]: https://nodejs.org/
[deps]: https://david-dm.org/webpack-contrib/imports-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/imports-loader
[tests]: https://github.com/webpack-contrib/imports-loader/workflows/imports-loader/badge.svg
[tests-url]: https://github.com/webpack-contrib/imports-loader/actions
[cover]: https://codecov.io/gh/webpack-contrib/imports-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/imports-loader
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=imports-loader
[size-url]: https://packagephobia.now.sh/result?p=imports-loader
