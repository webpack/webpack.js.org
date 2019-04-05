---
title: ClosureWebpackPlugin
source: https://raw.githubusercontent.com/webpack-contrib/closure-webpack-plugin/master/README.md
edit: https://github.com/webpack-contrib/closure-webpack-plugin/edit/master/README.md
repo: https://github.com/webpack-contrib/closure-webpack-plugin
---


[![npm version](https://badge.fury.io/js/closure-webpack-plugin.svg)](https://badge.fury.io/js/closure-webpack-plugin)

This plugin supports the use of Google's Closure Tools with webpack.

**Note: This is the webpack 4 branch.**

[Closure-Compiler](https://developers.google.com/closure/compiler/) is a full optimizing compiler and transpiler.
It offers unmatched optimizations, provides type checking and can easily target transpilation to different versions of ECMASCRIPT.

[Closure-Library](https://developers.google.com/closure/library/) is a utility library designed for full compatibility
with Closure-Compiler. 

## Older Versions

For webpack 3 support, see https://github.com/webpack-contrib/closure-webpack-plugin/tree/webpack-3

## Install

You must install both the google-closure-compiler package as well as the closure-webpack-plugin.

```
npm install --save-dev closure-webpack-plugin google-closure-compiler
```

## Usage example

```js
const ClosurePlugin = require('closure-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [
      new ClosurePlugin({mode: 'STANDARD'}, {
        // compiler flags here
        //
        // for debuging help, try these:
        //
        // formatting: 'PRETTY_PRINT'
        // debug: true,
        // renaming: false
      })
    ]
  }
};
```

## Options

 * **platform** - `native`, `java` or `javascript`. Controls which version to use of closure-compiler.
     By default the plugin will attempt to automatically choose the fastest option available.
    - `JAVASCRIPT` does not require the JVM to be installed. Not all flags are supported. 
    - `JAVA` utilizes the jvm. Utilizes multiple threads for parsing and results in faster compilation for large builds.
    - `NATIVE` only available on linux or MacOS. Faster compilation times without requiring a JVM.
 * **mode** - `STANDARD` (default) or `AGGRESSIVE_BUNDLE`. Controls how the plugin utilizes the compiler.  
    - `STANDARD` mode, closure-compiler is used as a direct replacement for other minifiers as well as most Babel transformations.  
    - `AGGRESSIVE_BUNDLE` mode, the compiler performs additional optimizations of modules to produce a much smaller file
 * **childCompilations** - boolean or function. Defaults to `false`.
  In order to decrease build times, this plugin by default only operates on the main compilation.
  Plugins such as extract-text-plugin and html-webpack-plugin run as child compilations and
  usually do not need transpilation or minification. You can enable this for all child compilations
  by setting this option to `true`. For specific control, the option can be set to a function which
  will be passed a compilation object.  
  Example: `function(compilation) { return /html-webpack/.test(compilation.name); }`.
 * **output** - An object with either `filename` or `chunkfilename` properties. Used to override the
  output file naming for a particular compilation. See https://webpack.js.org/configuration/output/
  for details.
  
## Compiler Flags

The plugin controls several compiler flags. The following flags should not be used in any mode:

 * module_resolution
 * output_wrapper
 * dependency_mode
 * create_source_map
 * module
 * entry_point

## Aggressive Bundle Mode

In this mode, the compiler rewrites CommonJS modules and hoists require calls. Some modules are not compatible with this type of rewritting. In particular, hoisting will cause the following code to execute out of order:

```js
const foo = require('foo');
addPolyfillToFoo(foo);
const bar = require('bar');
```

Aggressive Bundle Mode utilizes a custom runtime in which modules within a chunk file are all included in the same scope.
This avoids [the cost of small modules](https://nolanlawson.com/2016/08/15/the-cost-of-small-modules/).

In Aggressive Bundle Mode, a file can only appear in a single output chunk. Use the [Split Chunks Plugin](https://webpack.js.org/plugins/split-chunks-plugin/)
to split duplicated files into a single output chunk. If a module is utilized by more than one chunk, the
plugin will move it up to the first common parent to prevent code duplication.

The [concatenatedModules optimization](https://webpack.js.org/configuration/optimization/#optimization-concatenatemodules)
is not compatible with this mode since Closure-Compiler performs an equivalent optimization).
The plugin will emit a warning if this optimization is not disabled.

## Multiple Output Languages

You can add the plugin multiple times. This easily allows you to target multiple output languages.
Use `ECMASCRIPT_2015` for modern browsers and `ECMASCRIPT5` for older browsers.

Use the `output` option to change the filenames of specific plugin instances.

Use `<script type="module" src="es6_out_path.js">` to target modern browsers and
`<script nomodule src="es5_out_path.js">` for older browsers.

See the [es5 and es6 output demo](https://github.com/webpack-contrib/closure-webpack-plugin/tree/master/demo/es5-and-es6)
for an example.

## Other tips for Use
 * Don't use babel at the same time - closure-compiler is also a transpiler.
   If you need [features not yet supported](https://github.com/google/closure-compiler/wiki/ECMAScript6) by closure-compiler, have babel
   only target those features. Closure Compiler can transpile async/await - you don't need babel for that functionality either.

# Closure Library Plugin
In order for webpack to recognize `goog.require`, `goog.provide`, `goog.module` and related primitives,
a separate plugin is shipped.

```js
const ClosurePlugin = require('closure-webpack-plugin');

module.exports = {
  plugins: [
    new ClosurePlugin.LibraryPlugin({
      closureLibraryBase: require.resolve(
        'google-closure-library/closure/goog/base'
      ),
      deps: [
        require.resolve('google-closure-library/closure/goog/deps'),
        './public/deps.js',
      ],
    })
  ]
};
```
The plugin adds extra functionality to support using Closure Library without Closure Compiler.
This is typically used during development mode. When the webpack mode is `production`,
only dependency information is provided to webpack as Closure Compiler will natively recognize
the Closure Library primitives.

The Closure Library Plugin is only compatible with the `AGGRESSIVE_BUNDLE` mode of the Closure-Compiler
webpack plugin.

## Options

 * **closureLibraryBase** - (optional) string. Path to the base.js file in Closure-Library.
 * **deps** - (optional) string or Array. Closures style dependency mappings. Typically generated by the
   [depswriter.py script](https://developers.google.com/closure/library/docs/depswriter) included with Closure-Library.
 * **extraDeps** - (optional) Object. Mapping of namespace to file path for closure-library provided namespaces.
   
   
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
