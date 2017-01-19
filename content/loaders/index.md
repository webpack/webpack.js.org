---
title: Loaders
sort: 1
contributors:
  - ev1stensberg
  - TheLarkInn
  - manekinekko
  - SpaceK33z
  - mikeerickson
---

As explained on the [concepts page](/concepts/loaders), loaders are transformations that are applied on a resource file of your application. Loaders allow you to, for example, configure how webpack should handle a CSS file.

A loader is typically a npm package, which you can install as a development dependency:

```sh
npm install css-loader --save-dev
```

There are three ways to use loaders in your application:

* via configuration
* explicit in the `require` statement
* via CLI

## Via Configuration

[`module.rules`](https://webpack.js.org/configuration/module/#module-rules) allows you to specify several loaders within your webpack configuration.
This is a concise way to display loaders, and helps to have clean code as
well as you have a full overview of each respective loader.

### Webpack Rules Shorthand Syntax
The following example demonstrates how to use the [`module.rules`](https://webpack.js.org/configuration/module/#module-rules) shorthand sytnax for defining loaders

```javascript
  module: {
    rules: [
      {test: /\.css$/, loaders: ['style-loader','css-loader']}          // transform css files
    ]
  }
  ...
```
### Webpack Rules Use Syntax
If you need more configuration options, you can also use the [`use`](https://webpack.js.org/configuration/module/#rule-use) syntax

```js
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }
```

## Via `require`

It's possible to specify the loaders in the `require` statement (or `define`, `require.ensure`, etc.). Separate loaders from the resource with `!`. Each part is resolved relative to the current directory.

```js
require('style-loader!css-loader?modules!./styles.css');
```

It's possible to overwrite any loaders in the configuration by prefixing the entire rule with `!`.

Options can be passed with a query parameter, just like on the web (`?key=value&foo=bar`). It's also possible to use a JSON object (`?{"key":"value","foo":"bar"}`).

T> Use `module.rules` whenever possible, as this will reduce boilerplate in your source code and allows you to debug or locate a loader faster if something goes south.

## Via CLI

Optionally, you could also use loaders through the CLI:

```sh
webpack --module-bind jade --module-bind 'css=style!css'
```

This uses the loader “jade” for “.jade” files and the loaders “style” and “css” for “.css” files.
