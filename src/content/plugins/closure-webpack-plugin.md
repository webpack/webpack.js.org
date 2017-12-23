---
title: ClosureWebpackPlugin
source: https://raw.githubusercontent.com/webpack-contrib/closure-webpack-plugin/master/README.md
edit: https://github.com/webpack-contrib/closure-webpack-plugin/edit/master/README.md
repo: https://github.com/webpack-contrib/closure-webpack-plugin
---


[![npm version](https://badge.fury.io/js/closure-webpack-plugin.svg)](https://badge.fury.io/js/closure-webpack-plugin)

[Closure-Compiler](https://developers.google.com/closure/compiler/) is a full optimizing compiler and transpiler.
It offers unmatched optimizations, provides type checking and can easily target transpilation to different versions of ECMASCRIPT.

**Note:** This plugin is a very early beta and currently uses a custom build of closure-compiler while neccessary changes are integrated back into the main compiler repository.
Only the java version of closure-compiler is currently supported.

## Usage example

```js
const ClosureCompilerPlugin = require('closure-webpack-plugin');

new ClosureCompilerPlugin({mode: 'STANDARD'}, {
  // compiler flags here
  //
  // for debuging help, try these:
  //
  // formatting: 'PRETTY_PRINT'
  // debug: true
})
```

## Options

 * **mode** - `STANDARD` (default) or `AGGRESSIVE_BUNDLE`. Controls how the plugin utilizes the compiler.  
    In `STANDARD` mode, closure-compiler is used as a direct replacement for other minifiers as well as most Babel transformations.  
    In `AGGRESSIVE_BUNDLE` mode, the compiler performs additional optimizations of modules to produce a much smaller file, but
is not compatible with all input modules.

## Compiler Flags

The plugin controls certain compiler flags. The following flags should not be used in any mode:

 * **module_resolution** - A custom resolution mode for webpack is utilized instead of the standard NODE or BROWSER options.
 * **output_wrapper** - The output wrapper is automatically added by either webpack or the plugin
 * **dependency_mode** - Controlled by the plugin mode.

## Aggressive Bundle Mode

In this mode, the compiler rewrites CommonJS modules and hoists require calls. Some modules are not compatible with this type of rewritting. In particular, hoisting will cause the following code to execute out of order:

```js
const foo = require('foo');
addPolyfillToFoo(foo);
const bar = require('bar');
```

Aggressive Bundle Mode utilizes a custom runtime in which modules within a chunk file are all included in the same scope.
This avoids [the cost of small modules](https://nolanlawson.com/2016/08/15/the-cost-of-small-modules/).

In Aggressive Bundle Mode, a file can only appear in a single output chunk. Use the [Commons Chunk Plugin](https://webpack.js.org/plugins/commons-chunk-plugin/) to split duplicated files into a single output chunk.

## Tips for Use
 * Don't use babel - closure-compiler is also a transpiler.
   If you need [features not yet supported](https://github.com/google/closure-compiler/wiki/ECMAScript6) by closure-compiler, have babel
   only target those features. 
   
   
## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/ChadKillingsworth">
          <img width="150" alt="" height="150" src="https://avatars.githubusercontent.com/u/1247639?v=3">
          </br>
          Chad Killingsworth
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/d3viant0ne">
          <img width="150" alt="" height="150" src="https://avatars.githubusercontent.com/u/8420490?v=3">
          </br>
          Joshua Wiens
        </a>
      </td>
    </tr>
  <tbody>
</table>
