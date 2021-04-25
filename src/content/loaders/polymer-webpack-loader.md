---
title: polymer-webpack-loader
source: https://raw.githubusercontent.com/Banno/polymer-webpack-loader/master/README.md
edit: https://github.com/Banno/polymer-webpack-loader/edit/master/README.md
repo: https://github.com/Banno/polymer-webpack-loader
---

[![npm version](https://badge.fury.io/js/polymer-webpack-loader.svg)](https://badge.fury.io/js/polymer-webpack-loader)

> [Polymer](https://www.polymer-project.org/) component loader for [webpack](/).

The loader processes Polymer 3 template elements to minify the html and add images, fonts and imported
stylesheets to the webpack dependency graph.

**Looking for the Polymer 2 version?** See the
[Polymer 2 branch](https://github.com/webpack-contrib/polymer-webpack-loader/tree/polymer2)

## Configuring the Loader {#configuring-the-loader}

```javascript
{
  test: /\.js$/,
  options: {
    htmlLoader: Object (optional)
  },
  loader: 'polymer-webpack-loader'
},
```

### Options {#options}

#### htmlLoader: Object {#htmlloader-object}

Options to pass to the html-loader. See [html-loader](/loaders/html-loader/).

### Use with Babel (or other JS transpilers) {#use-with-babel-or-other-js-transpilers}
If you'd like to transpile the contents of your element you can
[chain an additional loader](/configuration/module/#ruleuse).

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

## Boostrapping Your Application {#boostrapping-your-application}

The webcomponent polyfills must be added in a specific order. If you do not delay loading the main bundle with your components, you will see the following exceptions in the browser console:

```
Uncaught TypeError: Failed to construct 'HTMLElement': Please use the 'new' operator, this DOM object constructor cannot be called as a function.
```

Reference the [demo html file](https://github.com/webpack-contrib/polymer-webpack-loader/blob/master/demo/src/index.ejs)
for the proper loading sequence.

## Maintainers {#maintainers}

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
