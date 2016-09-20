---
title: Resolve Loader
contributors:
  - sokra
  - gregvenech
---

?> Description

### `resolveLoader`

`object`

This set of options is almost identical to the `resolve` set above, but is used only to resolve webpack's [loader](/concepts/loaders) packages. Here's the default:

```js
resolveLoader: {
  modulesDirectories: [ "web_loaders", "web_modules", "node_loaders", "node_modules" ],
  extensions: [ "", ".webpack-loader.js", ".web-loader.js", ".loader.js", ".js" ],
  packageMains: [ "webpackLoader", "webLoader", "loader", "main" ],
  moduleTemplates: [ "*-webpack-loader", "*-web-loader", "*-loader", "*" ]
}
```

The rest of the `resolve` options are also available. For example to `alias` certain loaders:

```js
alias: {
  txt: 'raw-loader'
}
```

which would allow `import Text from "txt!./myText" or `loader: "txt"` within a [loader object](). The only additional option is `moduleTemplates` below.


### `resolveLoader.moduleTemplates`

`array`

Specify templates to help webpack resolve loader packages. Using the defaults shown above, when a module is imported through [loader objects](#loader-objects) or like so:

```js
import Module from 'babel-loader!eslint-loader!./path/to/my/module';
```

webpack will try to find the [babel loader](https://github.com/babel/babel-loader) using "babel-webpack-loader", "babel-web-loader", and so on on until the package is found.

W> This option is only available in `resolveLoader` **not** `resolve`.
