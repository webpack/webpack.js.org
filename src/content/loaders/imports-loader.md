---
title: imports-loader
source: https://raw.githubusercontent.com/webpack-contrib/imports-loader/master/README.md
edit: https://github.com/webpack-contrib/imports-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/imports-loader
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![cover][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



The imports loader allows you to use modules that depend on specific global variables.

This is useful for third-party modules that rely on global variables like `$` or `this` being the `window` object. The imports loader can add the necessary `require('whatever')` calls, so those modules work with webpack.

## Getting Started

To begin, you'll need to install `imports-loader`:

```console
$ npm install imports-loader --save-dev
```

Given you have this file `example.js`

```js
$('img').doSomeAwesomeJqueryPluginStuff();
```

then you can inject the `jquery` variable into the module by configuring the imports-loader like this:

**index.js**

```js
require('imports-loader?imports=default%20jquery%20$!./example.js');
// Adds the following code to the beginning of example.js:
//
//  `import $ from "jquery";` to `example.js`
```

> ⚠ By default loader generate ES module named syntax.

### Inline

The `imports` have follow syntax:

```
?imports=syntax%20moduleName%20name%20alias
```

The space (`%20`) is the separator between import segments.

> `syntax` is required.

A `syntax` can be omitted only if one segment is used. In this case, the `moduleName` and `name` will be equal to it.

Description of string values can be found in the documentation below.

#### Examples

**index.js**

```js
require(`imports-loader?imports[]=default%20jquery%20$&imports[]=angular!./example.js`);
// Adds the following code to the beginning of example.js:
//
//  import $ from "jquery";
//  import angular from "angular";
```

```js
require(`imports-loader?type=commonjsimports[]=single%20jquery%20$&imports[]=angular!./example.js`);
// Adds the following code to the beginning of example.js:
//
//  var $ = require("jquery");
//  var angular = require("angular");
```

```js
require(`imports-loader?wrapper=window&imports[]=default%20jquery%20$&imports[]=angular!./example.js`);
// Adds the following code to the example.js:
//
//  import $ from "jquery";
//  import angular from "angular";
//
// (function () {
//   code from example.js
// }.call(window));
```

Description of string values can be found in the documentation below.

### Using Configuration

The loader's signature:

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
              type: 'commonjs',
              imports: [
                'single ./lib_1 $',
                'single ./lib_2 lib_2_default',
                'multiple ./lib_2 lib2_method_1',
                'multiple ./lib_2 lib2_method_2 lib_2_method_2_short',
                'single ./lib_3 lib_3_defaul',
                'pure ./lib_4',
                'single jquery $',
                {
                  moduleName: 'angular',
                  name: 'angular',
                },
              ],
              wrapper: {
                call: 'window',
              },
              additionalCode: 'var someVariable = 1;',
            },
          },
        ],
      },
    ],
  },
};
```

And run `webpack` via your preferred method.

## Options

|           Name            |                   Type                    |   Default   | Description                 |
| :-----------------------: | :---------------------------------------: | :---------: | :-------------------------- |
|    **[`type`](#type)**    |                `{String}`                 |  `module`   | Format of generated exports |
| **[`imports`](#imports)** | `{String\|Object\|Array<String\|Object>}` | `undefined` | List of imports             |

### Type

Type: `String`
Default: `module`

Format of generated exports.

Possible values - `commonjs` (CommonJS module syntax) and `module` (ES module syntax).

#### `commonjs`

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('example.js'),
        loader: 'imports-loader',
        options: {
          type: 'commonjs',
          imports: 'Foo',
        },
      },
    ],
  },
};
// Adds the following code to the beginning of example.js:
//
// var Foo = require("Foo");
```

#### `module`

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
// Adds the following code to the beginning of example.js:
//
// import Foo from "Foo";
```

### Imports

Type: `String|Object|Array`
Default: `undefined`

List of imports.

#### `String`

Allows to use a string to describe an export.

##### `Syntax`

String values let you specify import syntax, moduleName, name, and alias.

String syntax - `[[syntax] [moduleName] [name] [alias]]`, where:

- `[syntax]`:

  - if type `module`- can be `default`, `named`, `namespace` or `side-effect`
  - if type `commonjs`- can be `single`, `multiple` or `pure`

- `[moduleName]` - name of an imported module (**required**)
- `[name]` - name of an imported value (**required**)
- `[alias]` - alias of an imported value (**may be omitted**)

Examples:

If type `module`:

- `[Foo]` - generates `import Foo from "Foo";`.
- `[default Foo]` - generates `import Foo from "Foo";`.
- `[default ./my-lib Foo]` - generates `import Foo from "./my-lib";`.
- `[named Foo FooA]` - generates `import { FooA } from "Foo";`.
- `[named Foo FooA Bar]` - generates `import { FooA as Bar } from "Foo";`.
- `[[default Foo] [named Foo Bar BarA]]` - generates `import Foo, { Bar as BarA } from "Foo";`.
- `[namespace Foo FooA]` - generates `import * as FooA from "Foo";`.
- `[[default Foo] [namespace Foo FooA]]` - generates `import Foo, * as FooA from "Foo";`.
- `[side-effect Foo]` - generates `import "Foo";`.

If type `commonjs`:

- `[Foo]` - generates `const Foo = require("Foo");`.
- `[single Foo]` - generates `const Foo = require("Foo");`.
- `[single ./my-lib Foo]` - generates `const Foo = require("./my-lib");`.
- `[multiple Foo FooA Bar]` - generates `const { FooA:Bar } = require("Foo");`.
- `[pure Foo]` - generates `require("Foo");`.

> ⚠ Aliases can't be used together with `default` or `side-effect` syntax.

###### Examples

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
              type: 'commonjs',
              imports: 'default jquery $',
            },
          },
        ],
      },
    ],
  },
};

// Adds the following code to the beginning of example.js:
//
// import $ from "jquery";
```

#### `Object`

Allows to use an object to describe an import.

Properties:

- `[syntax]` - can be `default`, `named`, `namespace` or `side-effect`
- `moduleName` - name of an imported module (**required**)
- `name` - name of an exported value (**required**)
- `alias` - alias of an exported value (**may be omitted**)

##### Examples

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
                moduleName: './lib_2',
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

// Adds the following code to the beginning of example.js:
//
// import { lib2_method_2 as lib_2_method_2_alias } from "./lib_2";
```

#### `Array`

Allow to specify multiple imports. Each item can be a [`string`](https://github.com/webpack-contrib/imports-loader#string) or an [`object`](https://github.com/webpack-contrib/imports-loader#object).

##### Examples

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
                'default ./lib_2 lib_2_default',
                'named ./lib_2 lib2_method_1',
                'named ./lib_2 lib2_method_2 lib_2_method_2_alias',
                'default ./lib_3 lib_3_default',
                'namespace ./lib_3 lib_3_all',
                'side-effect ./lib_4',
              ],
            },
          },
        ],
      },
    ],
  },
};

// Adds the following code to the beginning of example.js:
//
// import angular from "angular";
// import $ from "jquery";
// import lib_2_default, { lib2_method_1, lib2_method_2 as lib_2_method_2_alias } from "./lib_2";
// import lib_3_default, * as lib_3_all from "./lib_3";
// import "./lib_4";
```

### wrapper

Type: `String|Array`
Default: `undefined`

Closes the module code in a function with a given `this` (`(function () { ... }).call(window);`).

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
              wrapper: ['window', 'document'],
            },
          },
        ],
      },
    ],
  },
};
// Adds the following code to the example.js:
//
//  import $ from "jquery";
//
// (function () {
//   code from example.js
// }.call(window, document));
```

### additionalCode

Type: `String`
Default: `undefined`

Adds custom code.

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
              additionalCode: 'var someVariable = 1;',
            },
          },
        ],
      },
    ],
  },
};
// Adds the following code to the beginning of example.js:
//
// import $ from 'jquery';
// var someVariable = 1;
```

For further hints on compatibility issues, check out [Shimming Modules](/guides/shimming/) of the official docs.

## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/166921?v=3&s=150">
        </br>
        <a href="https://github.com/bebraw">Juho Vepsäläinen</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars2.githubusercontent.com/u/8420490?v=3&s=150">
        </br>
        <a href="https://github.com/d3viant0ne">Joshua Wiens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/533616?v=3&s=150">
        </br>
        <a href="https://github.com/SpaceK33z">Kees Kluskens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/3408176?v=3&s=150">
        </br>
        <a href="https://github.com/TheLarkInn">Sean Larkin</a>
      </td>
    </tr>
  <tbody>
</table>

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
