---
title: Loaders
sort: 4
contributors:
  - manekinekko
  - ev1stensberg
  - SpaceK33z
  - gangachris
  - TheLarkInn
  - simon04
  - jhnns
---

Loaders are transformations that are applied on the source code of a module. They allow you to pre-process files as you `import` or “load” them. Thus, loaders are kind of like “tasks” in other build tools, and provide a powerful way to handle front-end build steps. Loaders can transform files from a different language (like TypeScript) to JavaScript, or inline images as data URLs. Loaders even allow you to do things like `import` CSS files directly from your JavaScript modules!


## Example

For example, you can use loaders to tell webpack to load a CSS file or to convert TypeScript to JavaScript. To do this, you would start by installing the loaders you need:

``` bash
npm install --save-dev css-loader
npm install --save-dev ts-loader
```

And then instruct webpack to use the [`css-loader`](/loaders/css-loader) for every `.css` file and the [`ts-loader`](https://github.com/TypeStrong/ts-loader) for all `.ts` files:

**webpack.config.js**

``` js
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  }
};
```


## Using Loaders

There are three ways to use loaders in your application:

* Configuration (recommended): Specify them in your __webpack.config.js__ file.
* Inline: Specify them explicitly in each `import` statement.
* CLI: Specify them within a shell command.


### Configuration

[`module.rules`](/configuration/module/#module-rules) allows you to specify several loaders within your webpack configuration.
This is a concise way to display loaders, and helps to maintain clean code. It also offers you a full overview of each respective loader:

```js-with-links-with-details
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: ['style-loader'](/loaders/style-loader) },
          {
            loader: ['css-loader'](/loaders/css-loader),
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }
```


### Inline

It's possible to specify loaders in an `import` statement, or any [equivalent "importing" method](/api/module-methods). Separate loaders from the resource with `!`. Each part is resolved relative to the current directory.

```js
import Styles from 'style-loader!css-loader?modules!./styles.css';
```

It's possible to overwrite any loaders in the configuration by prefixing the entire rule with `!`.

Options can be passed with a query parameter, e.g. `?key=value&foo=bar`, or a JSON object, e.g. `?{"key":"value","foo":"bar"}`.

T> Use `module.rules` whenever possible, as this will reduce boilerplate in your source code and allow you to debug or locate a loader faster if something goes south.


### CLI

You can also use loaders through the CLI:

```sh
webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'
```

This uses the `jade-loader` for `.jade` files, and the [`style-loader`](/loaders/style-loader) and [`css-loader`](/loaders/css-loader) for `.css` files.


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

Loaders follow the standard [module resolution](/concepts/module-resolution/). In most cases it will be loaders from the [module path](/concepts/module-resolution/#module-paths) (think `npm install`, `node_modules`).

A loader module is expected to export a function and be written in Node.js compatible JavaScript. They are most commonly managed with npm, but you can also have custom loaders as files within your application. By convention, loaders are usually named `xxx-loader` (e.g. `json-loader`). See ["How to Write a Loader?"](/development/how-to-write-a-loader) for more information.
