---
title: How to Shim Third Party Libraries?
---

`webpack` as a module bundler can understand modules written as ES2015 modules, CommonJS or AMD. But many times, while using third party libraries, we see that they expect dependencies which are global aka `$` for `jquery`. They might also be creating global variables which need to be exported. Here we will see different ways to help webpack understand these __broken modules__.

## Prefer unminified CommonJs/AMD files over bundled `dist` versions.

Most modules link the `dist` version in the `main` field of their `package.json`. While this is useful for most developers, for webpack it is better to alias the src version because this way webpack is able to optimize dependencies better (e.g. when using the [DedupePlugin](/concepts/plugins#DedupePlugin)). However in most cases `dist` works fine as well.

``` javascript
// webpack.config.js

module.exports = {
    ...
    resolve: {
        alias: {
            jquery: "jquery/src/jquery"
        }
    }
};
```

## ProvidePlugin
The [ProvidePlugin](/concepts/plugins#ProvidePlugin) makes a module available as a variable in every other module required by `webpack`. The module is required only if you use the variable.
Most legacy modules rely on the presence of specific globals, like jQuery plugins do on `$` or `jQuery`. In this scenario, you can configure webpack to prepend `var $ = require(“jquery”)` everytime it encounters the global `$` identifier.

``` javascript
var webpack = require("webpack");

    ...

    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
```

## `imports-loader`

[`imports-loader`](https://github.com/webpack/imports-loader) inserts necessary globals into the required legacy module.
For example, Some legacy modules rely on `this` being the `window` object. This becomes a problem when the module is executed in a CommonJS context where `this` equals `module.exports`. In this case you can override `this` using the `imports-loader`.

```javascript
module: {
    loaders: [
        {
            test: /[\/\\]node_modules[\/\\]some-module[\/\\]index\.js$/,
            loader: "imports?this=>window"
        }
    ]
}
```

There are modules that support different module styles, like AMD, CommonJS and legacy. However, most of the time they first check for `define` and then use some quirky code to export properties. In these cases, it could help to force the CommonJS path by setting `define = false`

```javascript
module: {
    loaders: [
        {
            test: /[\/\\]node_modules[\/\\]some-module[\/\\]index\.js$/,
            loader: "imports-loader?define=>false"
        }
    ]
}
```

## `exports-loader`

Let's say a library creates a global variable that it expects it's consumers to use. In this case we can use [`exports-loader`](https://github.com/webpack/exports-loader), to export that global variable in CommonJS format.

```javascript
module: {
    loaders: [
        {
            test: /[\/\\]node_modules[\/\\]some-module[\/\\]file\.js$/,
            loader: "exports-loader?file,parse=helpers.parse"
            // adds below code the the file's source:
            //  exports["file"] = file;
            //  exports["parse"] = helpers.parse;
        }
    ]
}
```

## `scripts-loader`

The [scripts-loader](https://github.com/webpack/script-loader) evaluates code in the global context, just like you would add the code into a `script` tag. In this mode every normal library should work. require, module, etc. are undefined.
Note: The file is added as string to the bundle. It is not minimized by `webpack`, so use a minimized version. There is also no dev tool support for libraries added by this loader.

```javascript
require('script-loader!legacy.js')
// This makes the global variable created by the legacy.js available to your application.
// The above require will not return anything meaningful as a variable.

globalLegacyVariable() // This global variable will be added as a result of the script loader
```

## `noParse` option

When there is no AMD/CommonJS version of the module and you want to include the `dist`, you can flag this module as `noParse`. Then `webpack` will just include the module without parsing it, which can be used to improve the build time. This means that any feature requiring the AST, like the `ProvidePlugin`, will not work.

```javascript
module: {
    noParse: [
        /[\/\\]node_modules[\/\\]angular[\/\\]angular\.js$/
    ]
}
```