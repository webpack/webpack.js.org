---
title: Loaders
sort: 4
contributors:
  - manekinekko
  - ev1stensberg
  - SpaceK33z
  - gangachris
  - simon04
---

Loaders are transformations that are applied on a resource file of your application. They are functions (running in Node.js) that take the source of a resource file as the parameter and return the new source.

## Example

For example, you can use loaders to tell webpack to load a CSS file or to convert TypeScript to JavaScript. Firstly, install the corresponding loaders:

```
npm install --save-dev css-loader
npm install --save-dev ts-loader
```

Secondly, configure in your `webpack.config.js` that for every `.css` file the `css-loader` should be used and analogously for `.ts` files and the `ts-loader`:

**webpack.config.js**

```js-with-links-with-details
module.exports = {
  module: {
    rules: [
      {test: /\.css$/, use: ['css-loader'](/loaders/css-loader)},
      {test: /\.ts$/, use: ['ts-loader'](https://github.com/TypeStrong/ts-loader)}
    ]
  }
};
```

Note that according to the [configuration options](/configuration#options), the following specifications define the identical loader usage:

```js-with-links-with-details
{test: /\.css$/, [loader](/configuration/module#rule-loader): 'css-loader'}
// or equivalently
{test: /\.css$/, [use](/configuration/module#rule-use): 'css-loader'}
// or equivalently
{test: /\.css$/, [use](/configuration/module#rule-use): {
  loader: 'css-loader',
  options: {}
}}
```

## Loader Features

* Loaders can be chained. They are applied in a pipeline to the resource. A chain of loaders are compiled chronologically. The first loader in a chain of loaders returns a value to the next. At the end loader, webpack expects JavaScript to be returned.
* Loaders can be synchronous or asynchronous.
* Loaders run in Node.js and can do everything that’s possible there.
* Loaders accept query parameters. This can be used to pass configuration to the loader.
* Loaders can also be configured with an `options` object.
* Normal modules can export a loader in addition to the normal `main` via `package.json` with the `loader` field.
* Plugins can give loaders more features.
* Loaders can emit additional arbitrary files.

Loaders allow more power in the JavaScript ecosystem through preprocessing
functions (loaders). Users now have more flexibility to include fine-grained logic such as compression, packaging, language translations and [more](/loaders).

## Resolving Loaders

Loaders follow the standard [module resolution](/concepts/module-resolution/). In most cases you will be loaders from the [module path](/concepts/module-resolution/#module-paths) (think `npm install`, `node_modules`).

[How to write a loader?](/development/how-to-write-a-loader) A loader module is expected to export a function and to be written in Node.js compatible JavaScript. In the common case you manage loaders with npm, but you can also have loaders as files in your app.

By convention, loaders are usually named as `XXX-loader`, where `XXX` is the context name. For example, `json-loader`.

The loader name convention and precedence search order is defined by [`resolveLoader.moduleTemplates`](/configuration/resolve#resolveloader) within the webpack configuration API.
