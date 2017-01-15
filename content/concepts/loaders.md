---
title: Loaders
sort: 4
contributors:
  - manekinekko
  - ev1stensberg
  - SpaceK33z
  - gangachris
  - mikeerickson
---

Loaders are transformations that are applied on a resource file of your application. They are functions (running in Node.js) that take the source of a resource file as the parameter and return the new source.

For example, you can use loaders to tell webpack to load a CSS file or to convert TypeScript to JavaScript.

## Loader Features

* Loaders can be chained. They are applied in a pipeline to the resource. A chain of loaders are compiled chronologically. The first loader in a chain of loaders returns a value to the next and at the end loader, webpack expects JavaScript to be returned.
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

Loaders are [resolved similar to modules](/concepts/module-resolution/). A loader module is expected to export a function and to be written in Node.js compatible JavaScript. In the common case you manage loaders with npm, but you can also have loaders as files in your app.

### Referencing Loaders

By convention, loaders are usually named as `xxx-loader`, where `xxx` is the context name. For example, `babel-loader`.

In the following example, we will configure webpack to run all files which end with `.js` through the `babel-loader`.

All webpack loaders are standard npm modules and installed via npm from command line as follows:


## Usage

To set the `loader` property, you define the `module.rules` array value in your webpack config:

**webpack.config.js**

```javascript
const config = {
  ...
  module: {
    rules: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/}, // transform js files
      {test: /\s[a|c]ss$/, loader: 'sass-loader'}                       // transform sass files
      {test: /\.css$/, loaders: ['style-loader','css-loader']}          // transform css files
    ]
  }
  ...
};
```
#### Install Webpack Loader modules
Each of the specified rules requires one or more loaders.  In the `webpack.config.js` we referenced the following loaders
```
$ npm install --save-dev babel-loader css-loader style-loader sass-loader
```
## Options

The following is a list of values you can pass to the `module.rules` array.  Each element shall contain an object defining the desired loader.

### `test (required)`

The `test` property contains a regex of the files you wish to transform

`eg /\.js$/` will transform all files which end with `.js`

### `loader (either loader or loaders required)`

The `loader` property contains the name of the desired loader (eg `babel-loader`). If you wish to apply more than one transformation, use `loaders` property.

`eg. loader: 'babel-loader'` will apply babel transformation to all `.js` files

### `loaders (either loader or loaders required)`

The `loaders` property shall contain an array of loaders (reads right to left) which you wish to apply.

`eg. ['style-loader','css-loader']` will apply `css` then `style` tranformation

### `use`

The `use` property can be used instead of the `loaders` -or- `loaders` properties, where each array element contains a `loader` object

```javascript
  module: {
    rules: [
      ...
      {test: /\.js$/, use: [{loader: 'babel-loader'},{loader: 'eslint-loader'}]}
      ...
    ]
  },
```

### `include`

The `include` property will contain a regex of path patterns you wish to use during transformation.  If property is not supplied, the default webpack `context` pathname will be used.

### `exclude`

The `execlude` property will contain a regex path patterns you wish to ignore during transformation.

`eg. exclude: /bower_components|node_modules` will ignore supplied paths

#### Omitting Loader Error

If you fail to define a loader for the desired files within your project, you will receive an error similar to the following:

`Module not found: Error: Can't resolve 'json-loader' in ...`

This can be cured by installing `json-loader`

`$ npm install --save-dev json-loader`

And referencing the loader within your `webpack.config.js`

```
...
module: {
  rules: [
    ...
    {test: /\.json$/, loader: 'json-loader'},
    ...
  ]
}
...
```
#### Loader Convention and Precedence
The loader name convention and precedence search order is defined by [`resolveLoader.moduleTemplates`](/configuration/resolve#resolveloader) within the webpack configuration API.
