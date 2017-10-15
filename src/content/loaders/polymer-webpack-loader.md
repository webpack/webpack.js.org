---
title: polymer-webpack-loader
source: https://raw.githubusercontent.com/webpack-contrib/polymer-webpack-loader/master/README.md
edit: https://github.com/webpack-contrib/polymer-webpack-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/polymer-webpack-loader
---

[![npm version](https://badge.fury.io/js/polymer-webpack-loader.svg)](https://badge.fury.io/js/polymer-webpack-loader)
[![build status](https://travis-ci.org/webpack-contrib/polymer-webpack-loader.svg?branch=master)](https://travis-ci.org/webpack-contrib/polymer-webpack-loader)

> [Polymer](https://www.polymer-project.org/) component loader for [webpack](https://webpack.js.org/).

The loader allows you to write mixed HTML, CSS and JavaScript Polymer elements and
still use the full webpack ecosystem including module bundling and code splitting.


<img width="1024" alt="" src="https://user-images.githubusercontent.com/1066253/28131928-3b257288-66f0-11e7-8295-cb968cefb040.png">

The loader transforms your components:

 * `<link rel="import" href="./my-other-element.html">` -> `import './my-other-element.html';`
 * `<dom-module>` becomes a string which is registered at runtime
 * `<script src="./other-script.js"></script>` -> `import './other-script.js';`
 * `<script>/* contents */</script>` -> `/* contents */`

 What does that mean?
 
 Any ```<link>``` "href" or ```<script>``` "src" that is **not an external link** and does not start with ```~```, ```/```, ```./``` or a series of ```../``` will have ```./``` appended to the beginning of the value. To prevent this change use options ignoreLinks below. 

## Path Translations

| `tag`                            | `import`                        |
| ----------------------------------- | ------------------------------------- |
| `<link rel="import" href="path/to/some-element.html">`     | `import "./path/to/some-element.html"`  |
| `<link rel="import" href="/path/to/some-element.html">`    | `import "/path/to/some-element.html"`   |
| `<link rel="import" href="../path/to/some-element.html">`  | `import "../path/to/some-element.html"` |
| `<link rel="import" href="./path/to/some-element.html">`   | `import "./path/to/some-element.html"`  |
| `<link rel="import" href="~path/to/some-element.html">`    | `import "~path/to/some-element.html"`   |

## Configuring the Loader

```javascript
{
  test: /\.html$/,
  include: Condition(s) (optional),
  exclude: Condition(s) (optional),
  options: {
    ignoreLinks: Condition(s) (optional),
    ignorePathReWrite: Condition(s) (optional),
    processStyleLinks: Boolean (optional),
    htmlLoader: Object (optional)
  },
  loader: 'polymer-webpack-loader'
},
```

### include: Condition(s)

See [Rule.include] and [Condition] in the webpack documentation. Paths
matching this option will be processed by polymer-webpack-loader.  WARNING: If
this property exists the loader will only process files matching the given
conditions. If your component has a `<link>` pointing to a component e.g. in
another directory, the `include` condition(s) MUST also match that directory.

[Rule.include]: https://webpack.js.org/configuration/module/#rule-include
[Condition]: https://webpack.js.org/configuration/module/#condition

### exclude: Condition(s)

See [Rule.exclude] and [Condition] in the webpack documentation. Paths
matching this option will be excluded from processing by
polymer-webpack-loader. NOTE: Files imported through a `<link>` will not be
excluded by this property. See `Options.ignoreLinks`.

[Rule.exclude]: https://webpack.js.org/configuration/module/#rule-exclude

### Options

#### ignoreLinks: Condition(s)

`<link>`s pointing to paths matching these conditions (see [Condition] in the
webpack documentation) will not be transformed into `import`s.

#### ignorePathReWrite: Condition(s)

`<link>` paths matching these conditions (see [Condition] in the webpack
documentation) will not be changed when transformed into `import`s. This can
be useful for respecting aliases, loader syntax (e.g.
`markup-inline-loader!./my-element.html`), or module paths.

#### processStyleLinks Boolean

If set to true the loader will rewrite `<link import="css" href="...">` or `<link rel="stylesheet" href="...">` that are inside the dom-module with `<style>require('...')</style>`. This will allow for the file to be processed by loaders that are set up in the webpack config to handle their file type. 

1. Any `<link>` that is inside the `<dom-module>` but not in the `<template>` will be added to the `<template>` in the order the tags appear in the file.

```html
  <dom-module>
    <link rel="stylesheet" href="file1.css">
    <template>
      <link rel="stylesheet" href="file2.css">
    </template>
  </dom-module>

  would produce

  <dom-module>
    <template>
      <style>require('file1.css')</style>
      <style>require('file2.css')</style>
    </template>
  </dom-module>
```

2. The loader will only replace a `<link>` if the href is a relative path. Any link attempting to access an external link i.e. `http`, `https` or `//` will not be replaced.

#### htmlLoader: Object

Options to pass to the html-loader. See [html-loader](/loaders/html-loader/).

### Use with Babel (or other JS transpilers)
If you'd like to transpile the contents of your element's `<script>` block you can [chain an additional loader](https://webpack.js.org/configuration/module/#rule-use).

```js
module: {
  loaders: [
    {
      test: /\.html$/,
      use: [
        // Chained loaders are applied last to first
        { loader: 'babel-loader' },
        { loader: 'polymer-webpack-loader' }
      ]
    }
  ]
}

// alternative syntax

module: {
  loaders: [
    {
      test: /\.html$/,
      // Chained loaders are applied right to left
      loader: 'babel-loader!polymer-webpack-loader'
    }
  ]
}
```

### Use of HtmlWebpackPlugin
Depending on how you configure the HtmlWebpackPlugin you may encounter conflicts with the polymer-webpack-loader. 

Example: 

```javascript
{
  test: /\.html$/,
  loader: 'html-loader',
  include: [
    path.resolve(__dirname, './index.html'),
  ],
},
{
  test: /\.html$/,  
  loader: 'polymer-webpack-loader'
}
```
This would expose your index.html file to the polymer-webpack-loader based on the process used by the html-loader. In this case you would need to exclude your html file from the polymer-webpack-loader or look for other ways to avoid this conflict. See: [html-webpack-plugin template options](https://github.com/jantimon/html-webpack-plugin/blob/master/docs/template-option.md)

## Shimming
Not all Polymer Elements have been written to execute as a module and will
require changes to work with webpack. The most common issue encountered is because modules do not execute
in the global scope. Variables, functions and classes will no longer be global unless
they are declared as properties on the global object (window).

```js
class MyElement {} // I'm not global anymore
window.myElement = MyElement; // Now I'm global again
```

For external library code, webpack provides [shimming options](https://webpack.js.org/guides/shimming/).

 * Use the [exports-loader](https://webpack.js.org/guides/shimming/#exports-loader) to
   add a module export to components which expect a symbol to be global.
 * Use the [imports-loader](https://webpack.js.org/guides/shimming/#imports-loader) when a script
   expects the `this` keyword to reference `window`.
 * Use the [ProvidePlugin](https://webpack.js.org/guides/shimming/#provideplugin) to add a module
   import statement when a script expects a variable to be globally defined (but is now a module export).
 * Use the [NormalModuleReplacementPlugin](https://webpack.js.org/plugins/normal-module-replacement-plugin/)
   to have webpack swap a module-compliant version for a script.
   
You may need to apply multiple shimming techniques to the same component.

## Boostrapping Your Application

The webcomponent polyfills must be added in a specific order. If you do not delay loading the main bundle with your components, you will see the following exceptions in the browser console:

```
Uncaught TypeError: Failed to construct 'HTMLElement': Please use the 'new' operator, this DOM object constructor cannot be called as a function.
```

Reference the [demo html file](https://github.com/webpack-contrib/polymer-webpack-loader/blob/master/demo/src/index.ejs)
for the proper loading sequence.

## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/bryandcoulter">
          <img width="150" height="150" src="https://avatars.githubusercontent.com/u/18359726?v=3">
          </br>
          Bryan Coulter
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/ChadKillingsworth">
          <img width="150" height="150" src="https://avatars.githubusercontent.com/u/1247639?v=3">
          </br>
          Chad Killingsworth
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/robdodson">
          <img width="150" height="150" src="https://avatars.githubusercontent.com/u/1066253?v=3">
          </br>
          Rob Dodson
        </a>
      </td>
    </tr>
  <tbody>
</table>
