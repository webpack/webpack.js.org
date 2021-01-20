---
title: exports-loader
source: https://raw.githubusercontent.com/webpack-contrib/exports-loader/master/README.md
edit: https://github.com/webpack-contrib/exports-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/exports-loader
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



允许对源文件设置 `module.exports`/`export`。

当源文件不包含 exports 或者有一些内容没有 export 时是有用的。

想要获取有关兼容性的进一步提示，请查看官方文档中的 [Shimming](/guides/shimming/)。

> ⚠ 默认情况下，loader 生成具名的 ES module。
>
> ⚠ 请注意，原始代码中现有的 exports（`export`/`module.exports`/`exports`）和导出新值可能会导致失败。

## 快速开始 {#getting-started}

首先，你需要安装 `exports-loader`：

```console
$ npm install exports-loader --save-dev
```

### 内联 {#inline}

可以使用 `|` 或者 `%20`（空格）分隔 export 中的 `syntax`，`name` 和 `alias`。
可以在[这里](#syntax)获取文档和语法实例。

> ⚠ `%20` 是查询字符串中的空格，因为你不能在 URL 中使用空格

然后将 loader 添加到所需的 `import` 语句或 `require` 调用中。例如：

```js
import { myFunction } from 'exports-loader?exports=myFunction!./file.js';
// 向源文件中添加如下代码：
//
// ...
// Code
// ...
//
// export { myFunction }

myFunction('Hello world');
```

```js
import {
  myVariable,
  myFunction,
} from 'exports-loader?exports=myVariable,myFunction!./file.js';
// 向源文件中添加如下代码：
//
// ...
// Code
// ...
//
// export { myVariable, myFunction };

const newVariable = myVariable + '!!!';

console.log(newVariable);

myFunction('Hello world');
```

```js
const {
  myFunction,
} = require('exports-loader?type=commonjs&exports=myFunction!./file.js');
// 向源文件中添加如下代码：
//
// ...
// Code
// ...
//
// module.exports = { myFunction }

myFunction('Hello world');
```

```js
// 替换语法：
// import myFunction from 'exports-loader?exports=default%20myFunction!./file.js';
import myFunction from 'exports-loader?exports=default|myFunction!./file.js';
// `%20` 是查询字符串中的空格，等同于 `default myFunction`
// 向源文件中添加如下代码：
//
// ...
// Code
// ...
//
// exports default myFunction;

myFunction('Hello world');
```

```js
const myFunction = require('exports-loader?type=commonjs&exports=single|myFunction!./file.js');
// `|` 是查询字符串中的分隔符， 等同于 `single|myFunction`
// 向源文件中添加如下代码：
//
// ...
// Code
// ...
//
// module.exports = myFunction;

myFunction('Hello world');
```

```js
import { myFunctionAlias } from 'exports-loader?exports=named|myFunction|myFunctionAlias!./file.js';
// `|` 是查询字符串中的分隔符， 等同于 `named|myFunction|myFunctionAlias`
// 向源文件中添加如下代码：
//
// ...
// Code
// ...
//
// exports { myFunction as myFunctionAlias };

myFunctionAlias('Hello world');
```

可以在下面的文档中找到字段值的含义。

### 使用配置文件 {#using-configuration}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        // 你可以使用 `regexp`
        // test: /vendor\.js/$
        test: require.resolve('./path/to/vendor.js'),
        loader: 'exports-loader',
        options: {
          exports: 'myFunction',
        },
      },
    ],
  },
};
```

然后用你喜欢的方式运行 `webpack`。

## 配置项 {#options}

|           Name            |                   Type                    |   Default   | Description                 |
| :-----------------------: | :---------------------------------------: | :---------: | :-------------------------- |
|    **[`type`](#type)**    |                `{String}`                 |  `module`   | 生成导出的格式 |
| **[`exports`](#exports)** | `{String\|Object\|Array<String\|Object>}` | `undefined` | 导出的列表             |

### `type` {#type}

类型：`String`
默认值：`module`

生成导出的格式

可选值 - `commonjs`（CommonJS 模块语法）和 `module`（ES 模块语法）。

#### `commonjs` {#commonjs}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('./path/to/vendor.js'),
        loader: 'exports-loader',
        options: {
          type: 'commonjs',
          exports: 'Foo',
        },
      },
    ],
  },
};
```

生成的输出结果：

```js
// ...
// Code
// ...

module.exports = { Foo };
```

#### `module` {#module}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('./path/to/vendor.js'),
        loader: 'exports-loader',
        options: {
          type: 'module',
          exports: 'Foo',
        },
      },
    ],
  },
};
```

生成的输出结果：

```js
// ...
// Code
// ...

export { Foo };
```

### `exports` {#exports}

类型：`String|Array`
默认值：`undefined`

导出的列表。

#### `String` {#string}

允许使用一个字符串来描述导出。

##### `Syntax` {#syntax}

可以使用 `|` 或者 `%20`（空格）分隔 export 中的 `syntax`，`name` 和 `alias`。

字符串语法 - `[[syntax] [name] [alias]]` 或者 `[[syntax]|[name]|[alias]]`，含义如下：

- `[syntax]` (**可以省略**) -

  - 如果 `type` 为 `module`- 可以是 `default` 和 `named`,
  - 如果 `type` 为 `commonjs`- 可以使 `single` 和 `multiple`

- `[name]` - 导出值的名称 (**必填项**)
- `[alias]` - 导出值的别名 (**可以省略**)

Examples:

- `[Foo]` - 生成 `export { Foo };`.
- `[default Foo]` - 生成 `export default Foo;`.
- `[named Foo]` - 生成 `export { Foo };`.
- `[named Foo FooA]` - 生成 `export { Foo as FooA };`.
- `[single Foo]` - 生成 `module.exports = Foo;`.
- `[multiple Foo]` - 生成 `module.exports = { Foo };`.
- `[multiple Foo FooA]` - 生成 `module.exports = { 'FooA': Foo };`.
- `[named [name] [name]Alias]` - 生成名为 exports 的 ES 模块，并导出等于另一个名称下的文件名的值., 对于 `single.js` 将会是 `single` and 和`singleAlias`, 生成 `export { single as singleAlias };`.

> ⚠ 你需要设置 `type: "commonjs"` 才能使用 `single` 或者 `multiple` 语法。

> ⚠ 别名不能与 `default` 或者 `single` 语法一起使用。

##### 示例 {#examples}

###### ES Module Default Export {#es-module-default-export}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('./path/to/vendor.js'),
        loader: 'exports-loader',
        options: {
          exports: 'default Foo',
        },
      },
    ],
  },
};
```

生成的输出结果：

```js
// ...
// Code
// ...

export default Foo;
```

###### ES Module Named Exports {#es-module-named-exports}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('./path/to/vendor.js'),
        loader: 'exports-loader',
        options: {
          exports: 'named Foo FooA',
        },
      },
    ],
  },
};
```

生成的输出结果：

```js
// ...
// Code
// ...

export { Foo as FooA };
```

###### CommonJS Single Export {#commonjs-single-export}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('./path/to/vendor.js'),
        loader: 'exports-loader',
        options: {
          type: 'commonjs',
          exports: 'single Foo',
        },
      },
    ],
  },
};
```

生成的输出结果：

```js
// ...
// Code
// ...

module.exports = Foo;
```

###### CommonJS 导出多个 {#commonjs-multiple-exports}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('./path/to/vendor.js'),
        loader: 'exports-loader',
        options: {
          type: 'commonjs',
          exports: 'multiple Foo FooA',
        },
      },
    ],
  },
};
```

生成的输出结果：

```js
// ...
// Code
// ...

module.exports = { FooA: Foo };
```

#### `Object` {#object}

允许使用对象来描述导出。

属性：

- `syntax` - 对于 `module` 类型（`ES modules` 模块格式）可以是 `default` 或者 `named`，对于 `commonjs` 类型（`CommonJS` 模块格式）可以是 `single` 或者 `multiple`（**可以省略**）
- `name` - 导出值的名称 (**required**)
- `alias` - 导出值的别名 (**may be omitted**)

##### 示例 {#examples}

###### ES Module 默认导出 {#es-module-default-export}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('./path/to/vendor.js'),
        loader: 'exports-loader',
        options: {
          exports: {
            syntax: 'default',
            name: 'Foo',
          },
        },
      },
    ],
  },
};
```

生成的输出结果：

```js
// ...
// Code
// ...

export default Foo;
```

###### ES Module 重命名导出 {#es-module-named-exports}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('./path/to/vendor.js'),
        loader: 'exports-loader',
        options: {
          exports: {
            syntax: 'named',
            name: 'Foo',
            alias: 'FooA',
          },
        },
      },
    ],
  },
};
```

生成的输出结果：

```js
// ...
// Code
// ...

export { Foo as FooA };
```

###### CommonJS 单个导出 {#commonjs-single-export}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('./path/to/vendor.js'),
        loader: 'exports-loader',
        options: {
          type: 'commonjs',
          exports: {
            syntax: 'single',
            name: 'Foo',
          },
        },
      },
    ],
  },
};
```

生成的输出结果：

```js
// ...
// Code
// ...

module.exports = Foo;
```

###### CommonJS 导出多个 {#commonjs-multiple-exports}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('./path/to/vendor.js'),
        loader: 'exports-loader',
        options: {
          type: 'commonjs',
          exports: {
            syntax: 'multiple',
            name: 'Foo',
            alias: 'FooA',
          },
        },
      },
    ],
  },
};
```

生成的输出结果：

```js
// ...
// Code
// ...

module.exports = { FooA: Foo };
```

#### `Array` {#array}

允许指定多个导出。 每一个可以是 [`string`](https://github.com/webpack-contrib/exports-loader#string) 或者 [`object`](https://github.com/webpack-contrib/exports-loader#object).

> ⚠ 因为 CommonJS 格式限制，不能将 `single` 与 `multiple` 语法一起使用。

> ⚠ 因为 ES module 格式限制，不能导出多个 `default` 值。

> ⚠ 因为 CommonJS 格式限制，不能导出多个 `single` 值。

##### 示例 {#examples}

###### CommonJS 导出多个 {#commonjs-multiple-exports}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('./path/to/vendor.js'),
        loader: 'exports-loader',
        options: {
          type: 'commonjs',
          exports: ['Foo', 'multiple Bar', 'multiple Baz BazA'],
        },
      },
    ],
  },
};
```

生成的输出结果：

```js
// ...
// Code
// ...

module.exports = { Foo, Bar, BazA: Bar };
```

###### ES 默认导出与导出重命名 {#es-module-default-export-and-named-exports-together}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('./path/to/vendor.js'),
        loader: 'exports-loader',
        options: {
          exports: ['default Foo', 'named Bar BarA'],
        },
      },
    ],
  },
};
```

生成的输出结果：

```js
// ...
// Code
// ...

export default Foo;
export { Bar as BarA };
```

###### 导出重命名 {#named-exports}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('./path/to/vendor.js'),
        loader: 'exports-loader',
        options: {
          exports: [
            { syntax: 'named', name: 'Foo', alias: 'FooA' },
            { syntax: 'named', name: 'Bar' },
            'Baz',
          ],
        },
      },
    ],
  },
};
```

生成的输出结果：

```js
// ...
// Code
// ...

export { Foo as FooA, Bar, Baz };
```

## 贡献 {#contributing}

如果您还没有阅读，请花一点时间阅读我们的贡献指南。

[CONTRIBUTING](https://github.com/webpack-contrib/exports-loader/blob/master/.github/CONTRIBUTING.md)

## License {#license}

[MIT](https://github.com/webpack-contrib/exports-loader/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/exports-loader.svg
[npm-url]: https://npmjs.com/package/exports-loader
[node]: https://img.shields.io/node/v/exports-loader.svg
[node-url]: https://nodejs.org/
[deps]: https://david-dm.org/webpack-contrib/exports-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/exports-loader
[tests]: https://github.com/webpack-contrib/exports-loader/workflows/exports-loader/badge.svg
[tests-url]: https://github.com/webpack-contrib/exports-loader/actions
[cover]: https://codecov.io/gh/webpack-contrib/exports-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/exports-loader
[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=exports-loader
[size-url]: https://packagephobia.now.sh/result?p=exports-loader
