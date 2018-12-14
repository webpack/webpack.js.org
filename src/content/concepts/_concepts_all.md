

# Concepts

At its core, __webpack__ is a _static module bundler_ for modern JavaScript applications. When webpack processes your application, it internally builds a [dependency graph](/concepts/dependency-graph/) which maps every module your project needs and generates one or more _bundles_.

T> Learn more about JavaScript modules and webpack modules [here](/concepts/modules).

Since version 4.0.0, __webpack does not require a configuration file__ to bundle your project, nevertheless it is [incredibly configurable](/configuration) to better fit your needs.

To get started you only need to understand its __Core Concepts__:

- [Entry](#entry)
- [Output](#output)
- [Loaders](#loaders)
- [Plugins](#plugins)
- [Mode](#mode)
- [Browser Compatibility](#browser-compatibility)

This document is intended to give a __high-level__ overview of these concepts, while providing links to detailed concept specific use cases.

For a better understanding of the ideas behind module bundlers and how they work under the hood consult these resources:

- [Manually Bundling an Application](https://www.youtube.com/watch?v=UNMkLHzofQI)
- [Live Coding a Simple Module Bundler](https://www.youtube.com/watch?v=Gc9-7PBqOC8)
- [Detailed Explanation of a Simple Module Bundler](https://github.com/ronami/minipack)


## Entry

An __entry point__ indicates which module webpack should use to begin building out its internal [dependency graph](/concepts/dependency-graph/). webpack will figure out which other modules and libraries that entry point depends on (directly and indirectly).

By default its value is `./src/index.js`, but you can specify a different (or multiple entry points) by configuring the __entry__ property in the [webpack configuration](/configuration). For example:

__webpack.config.js__

``` js
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```

T> Learn more in the [entry points](/concepts/entry-points) section.


## Output

The __output__ property tells webpack where to emit the _bundles_ it creates and how to name these files. It defaults to `./dist/main.js` for the main output file and to the `./dist` folder for any other generated file.

You can configure this part of the process by specifying an `output` field in your configuration:

__webpack.config.js__

```javascript
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```

In the example above, we use the `output.filename` and the `output.path` properties to tell webpack the name of our bundle and where we want it to be emitted to. In case you're wondering about the path module being imported at the top, it is a core [Node.js module](https://nodejs.org/api/modules.html) that gets used to manipulate file paths.

T> The `output` property has [many more configurable features](/configuration/output) and if you like to know more about the concepts behind it, you can [read more in the output section](/concepts/output).


## Loaders

Out of the box, webpack only understands JavaScript and JSON files. __Loaders__ allow webpack to process other types of files and convert them into valid [modules](/concepts/modules) that can be consumed by your application and added to the dependency graph.

W> Note that the ability to `import` any type of module, e.g. `.css` files, is a feature specific to webpack and may not be supported by other bundlers or task runners. We feel this extension of the language is warranted as it allows developers to build a more accurate dependency graph.

At a high level, __loaders__ have two properties in your webpack configuration:

1. The `test` property identifies which file or files should be transformed.
2. The `use` property indicates which loader should be used to do the transforming.

__webpack.config.js__

```javascript
const path = require('path');

module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};
```

The configuration above has defined a `rules` property for a single module with two required properties: `test` and `use`. This tells webpack's compiler the following:

> "Hey webpack compiler, when you come across a path that resolves to a '.txt' file inside of a `require()`/`import` statement, __use__ the `raw-loader` to transform it before you add it to the bundle."

W> It is important to remember that when defining rules in your webpack config, you are defining them under `module.rules` and not `rules`. For your benefit, webpack will warn you if this is done incorrectly.

You can check further customization when including loaders in the [loaders section](/concepts/loaders).


## Plugins

While loaders are used to transform certain types of modules, plugins can be leveraged to perform a wider range of tasks like bundle optimization, asset management and injection of environment variables.

T> Check out the [plugin interface](/api/plugins) and how to use it to extend webpacks capabilities.

In order to use a plugin, you need to `require()` it and add it to the `plugins` array. Most plugins are customizable through options. Since you can use a plugin multiple times in a config for different purposes, you need to create an instance of it by calling it with the `new` operator.

__webpack.config.js__

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
```

In the example above, the `html-webpack-plugin` generates an HTML file for your application by injecting automatically all your generated bundles.

T> There are many plugins that webpack provides out of the box! Check out the [list of plugins](/plugins).

Using plugins in your webpack config is straightforward - however, there are many use cases that are worth further exploration. [Learn more about them here](/concepts/plugins).


## Mode

By setting the `mode` parameter to either `development`, `production` or `none`, you can enable webpack's built-in optimizations that correspond to each environment. The default value is `production`.

```javascript
module.exports = {
  mode: 'production'
};
```

Learn more about the [mode configuration here](/concepts/mode) and what optimizations take place on each value.


## Browser Compatibility

webpack supports all browsers that are [ES5-compliant](https://kangax.github.io/compat-table/es5/) (IE8 and below are not supported). webpack needs `Promise` for `import()` and `require.ensure()`. If you want to support older browsers, you will need to [load a polyfill](/guides/shimming/) before using these expressions.


# Entry Points

As mentioned in [Getting Started](/guides/getting-started/#using-a-configuration), there are multiple ways to define the `entry` property in your webpack configuration. We will show you the ways you __can__ configure the `entry` property, in addition to explaining why it may be useful to you.


## Single Entry (Shorthand) Syntax

Usage: `entry: string|Array<string>`

__webpack.config.js__

```javascript
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```

The single entry syntax for the `entry` property is a shorthand for:

__webpack.config.js__

```javascript
module.exports = {
  entry: {
    main: './path/to/my/entry/file.js'
  }
};
```

T> __What happens when you pass an array to `entry`?__ Passing an array of file paths to the `entry` property creates what is known as a __"multi-main entry"__. This is useful when you would like to inject multiple dependent files together and graph their dependencies into one "chunk".

This is a great choice when you are looking to quickly setup a webpack configuration for an application or tool with one entry point (i.e., a library). However, there is not much flexibility in extending or scaling your configuration with this syntax.


## Object Syntax

Usage: `entry: {[entryChunkName: string]: string|Array<string>}`

__webpack.config.js__

```javascript
module.exports = {
  entry: {
    app: './src/app.js',
    adminApp: './src/adminApp.js'
  }
};
```

The object syntax is more verbose. However, this is the most scalable way of defining entry/entries in your application.

T> __"Scalable webpack configurations"__ are ones that can be reused and combined with other partial configurations. This is a popular technique used to separate concerns by environment, build target and runtime. They are then merged using specialized tools like [webpack-merge](https://github.com/survivejs/webpack-merge).


## Scenarios

Below is a list of entry configurations and their real-world use cases:

### Separate App and Vendor Entries

T> In webpack version < 4 it was common to add vendors as separate entrypoint to compile it as separate file (in combination with the `CommonsChunkPlugin`). This is discouraged in webpack 4. Instead the `optimization.splitChunks` option takes care of separating vendors and app modules and creating a separate file. __Do not__ create a entry for vendors or other stuff which is not the starting point of execution.

### Multi Page Application

__webpack.config.js__

```javascript
module.exports = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
};
```

__What does this do?__ We are telling webpack that we would like 3 separate dependency graphs (like the above example).

__Why?__ In a multi-page application, the server is going to fetch a new HTML document for you. The page reloads this new document and assets are redownloaded. However, this gives us the unique opportunity to do multiple things:

- Use `optimization.splitChunks` to create bundles of shared application code between each page. Multi-page applications that reuse a lot of code/modules between entry points can greatly benefit from these techniques, as the amount of entry points increase.

T> As a rule of thumb: for each HTML document use exactly one entry point.


# Output

Configuring the `output` configuration options tells webpack how to write the compiled files to disk. Note that, while there can be multiple `entry` points, only one `output` configuration is specified.


## Usage

The minimum requirements for the `output` property in your webpack config is to set its value to an object including the following thing:

- A `filename` to use for the output file(s).

__webpack.config.js__

```javascript
module.exports = {
  output: {
    filename: 'bundle.js',
  }
};
```

This configuration would output a single `bundle.js` file into the `dist` directory.


## Multiple Entry Points

If your configuration creates more than a single "chunk" (as with multiple entry points or when using plugins like CommonsChunkPlugin), you should use [substitutions](/configuration/output#output-filename) to ensure that each file has a unique name.

```javascript
module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
};

// writes to disk: ./dist/app.js, ./dist/search.js
```


## Advanced

Here's a more complicated example of using a CDN and hashes for assets:

__config.js__

```javascript
module.exports = {
  //...
  output: {
    path: '/home/proj/cdn/assets/[hash]',
    publicPath: 'http://cdn.example.com/assets/[hash]/'
  }
};
```

In cases where the eventual `publicPath` of output files isn't known at compile time, it can be left blank and set dynamically at runtime via the `__webpack_public_path__` variable in the entry point file:

```javascript
__webpack_public_path__ = myRuntimePublicPath;

// rest of your application entry
```


# Loaders

Loaders are transformations that are applied on the source code of a module. They allow you to pre-process files as you `import` or “load” them. Thus, loaders are kind of like “tasks” in other build tools and provide a powerful way to handle front-end build steps. Loaders can transform files from a different language (like TypeScript) to JavaScript or inline images as data URLs. Loaders even allow you to do things like `import` CSS files directly from your JavaScript modules!


## Example

For example, you can use loaders to tell webpack to load a CSS file or to convert TypeScript to JavaScript. To do this, you would start by installing the loaders you need:

``` bash
npm install --save-dev css-loader
npm install --save-dev ts-loader
```

And then instruct webpack to use the [`css-loader`](/loaders/css-loader) for every `.css` file and the [`ts-loader`](https://github.com/TypeStrong/ts-loader) for all `.ts` files:

__webpack.config.js__

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

- [Configuration](#configuration) (recommended): Specify them in your __webpack.config.js__ file.
- [Inline](#inline): Specify them explicitly in each `import` statement.
- [CLI](#cli): Specify them within a shell command.


### Configuration

[`module.rules`](/configuration/module/#module-rules) allows you to specify several loaders within your webpack configuration.
This is a concise way to display loaders, and helps to maintain clean code. It also offers you a full overview of each respective loader.

Loaders are evaluated/executed from right to left. In the example below execution starts with sass-loader, continues with css-loader and finally ends with style-loader. See ["Loader Features"](/concepts/loaders/#loader-features) for more information about loaders order.

```js-with-links-with-details
module.exports = {
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
          },
          { loader: ['sass-loader'](/loaders/sass-loader) }
        ]
      }
    ]
  }
};
```


### Inline

It's possible to specify loaders in an `import` statement, or any [equivalent "importing" method](/api/module-methods). Separate loaders from the resource with `!`. Each part is resolved relative to the current directory.

```js
import Styles from 'style-loader!css-loader?modules!./styles.css';
```

It's possible to override any loaders in the configuration by prefixing the entire rule with `!`.

Options can be passed with a query parameter, e.g. `?key=value&foo=bar`, or a JSON object, e.g. `?{"key":"value","foo":"bar"}`.

T> Use `module.rules` whenever possible, as this will reduce boilerplate in your source code and allow you to debug or locate a loader faster if something goes south.


### CLI

You can also use loaders through the CLI:

```sh
webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'
```

This uses the `jade-loader` for `.jade` files, and the [`style-loader`](/loaders/style-loader) and [`css-loader`](/loaders/css-loader) for `.css` files.


## Loader Features

- Loaders can be chained. Each loader in the chain applies transformations to the processed resource. A chain is executed in reverse order. The first loader passes its result (resource with applied transformations) to the next one, and so forth. Finally, webpack expects JavaScript to be returned by the last loader in the chain.
- Loaders can be synchronous or asynchronous.
- Loaders run in Node.js and can do everything that’s possible there.
- Loaders can be configured with an `options` object (using `query` parameters to set options is still supported but has been deprecated).
- Normal modules can export a loader in addition to the normal `main` via `package.json` with the `loader` field.
- Plugins can give loaders more features.
- Loaders can emit additional arbitrary files.

Loaders allow more power in the JavaScript ecosystem through preprocessing
functions (loaders). Users now have more flexibility to include fine-grained logic such as compression, packaging, language translations and [more](/loaders).


## Resolving Loaders

Loaders follow the standard [module resolution](/concepts/module-resolution/). In most cases it will be loaded from the [module path](/concepts/module-resolution/#module-paths) (think `npm install`, `node_modules`).

A loader module is expected to export a function and be written in Node.js compatible JavaScript. They are most commonly managed with npm, but you can also have custom loaders as files within your application. By convention, loaders are usually named `xxx-loader` (e.g. `json-loader`). See ["How to Write a Loader?"](/development/how-to-write-a-loader) for more information.


# Mode

Providing the `mode` configuration option tells webpack to use its built-in optimizations accordingly.

`string`

T> Possible values for `mode` are: `none`, `development` or `production`(default).

## Usage

Just provide the `mode` option in the config:

```javascript
module.exports = {
  mode: 'production'
};
```


or pass it as a [CLI](/api/cli/) argument:

```bash
webpack --mode=production
```

The following string values are supported:

Option                | Description
--------------------- | -----------------------
`development`         | Sets `process.env.NODE_ENV` on `DefinePlugin` to value `development`. Enables `NamedChunksPlugin` and `NamedModulesPlugin`.
`production`          | Sets `process.env.NODE_ENV` on `DefinePlugin` to value `production`. Enables `FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`, `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin`, `OccurrenceOrderPlugin`, `SideEffectsFlagPlugin` and `TerserPlugin`.
`none`                | Opts out of any default optimization options

If not set, webpack sets `production` as the default value for `mode`. The supported values for mode are:

T> Please remember that setting `NODE_ENV` doesn't automatically set `mode`.


### Mode: development


```diff
// webpack.development.config.js
module.exports = {
+ mode: 'development'
- devtool: 'eval',
- cache: true,
- performance: {
-   hints: false
- },
- output: {
-   pathinfo: true
- },
- optimization: {
-   namedModules: true,
-   namedChunks: true,
-   nodeEnv: 'development',
-   flagIncludedChunks: false,
-   occurrenceOrder: false,
-   sideEffects: false,
-   usedExports: false,
-   concatenateModules: false,
-   splitChunks: {
-     hidePathInfo: false,
-     minSize: 10000,
-     maxAsyncRequests: Infinity,
-     maxInitialRequests: Infinity,
-   },
-   noEmitOnErrors: false,
-   checkWasmTypes: false,
-   minimize: false,
- },
- plugins: [
-   new webpack.NamedModulesPlugin(),
-   new webpack.NamedChunksPlugin(),
-   new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
- ]
}
```


### Mode: production


```diff
// webpack.production.config.js
module.exports = {
+  mode: 'production',
- performance: {
-   hints: 'warning'
- },
- output: {
-   pathinfo: false
- },
- optimization: {
-   namedModules: false,
-   namedChunks: false,
-   nodeEnv: 'production',
-   flagIncludedChunks: true,
-   occurrenceOrder: true,
-   sideEffects: true,
-   usedExports: true,
-   concatenateModules: true,
-   splitChunks: {
-     hidePathInfo: true,
-     minSize: 30000,
-     maxAsyncRequests: 5,
-     maxInitialRequests: 3,
-   },
-   noEmitOnErrors: true,
-   checkWasmTypes: true,
-   minimize: true,
- },
- plugins: [
-   new TerserPlugin(/* ... */),
-   new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
-   new webpack.optimize.ModuleConcatenationPlugin(),
-   new webpack.NoEmitOnErrorsPlugin()
- ]
}
```


### Mode: none


```diff
// webpack.custom.config.js
module.exports = {
+ mode: 'none',
- performance: {
-  hints: false
- },
- optimization: {
-   flagIncludedChunks: false,
-   occurrenceOrder: false,
-   sideEffects: false,
-   usedExports: false,
-   concatenateModules: false,
-   splitChunks: {
-     hidePathInfo: false,
-     minSize: 10000,
-     maxAsyncRequests: Infinity,
-     maxInitialRequests: Infinity,
-   },
-   noEmitOnErrors: false,
-   checkWasmTypes: false,
-   minimize: false,
- },
- plugins: []
}
```

If you want to change the behavior according to the __mode__ variable inside the _webpack.config.js_, you have to export a function instead of an object:

```javascript
var config = {
  entry: './app.js'
  //...
};

module.exports = (env, argv) => {

  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  }

  if (argv.mode === 'production') {
    //...
  }

  return config;
};
```


# Plugins

__Plugins__ are the [backbone](https://github.com/webpack/tapable) of webpack. webpack itself is built on the __same plugin system__ that you use in your webpack configuration!

They also serve the purpose of doing __anything else__ that a [loader](/concepts/loaders) cannot do.


## Anatomy

A webpack __plugin__ is a JavaScript object that has an [`apply`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) method. This `apply` method is called by the webpack compiler, giving access to the __entire__ compilation lifecycle.

__ConsoleLogOnBuildWebpackPlugin.js__

```javascript
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, compilation => {
      console.log('The webpack build process is starting!!!');
    });
  }
}
```

The first parameter of the tap method of the compiler hook should be a camelized version of the plugin name. It is advisable to use a constant for this so it can be reused in all hooks.

## Usage

Since __plugins__ can take arguments/options, you must pass a `new` instance to the `plugins` property in your webpack configuration.

Depending on how you are using webpack, there are multiple ways to use plugins.


### Configuration

__webpack.config.js__

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
```


### Node API

When using the Node API, you can also pass plugins via the `plugins` property in the configuration.

__some-node-script.js__

```javascript
const webpack = require('webpack'); //to access webpack runtime
const configuration = require('./webpack.config.js');

let compiler = webpack(configuration);

new webpack.ProgressPlugin().apply(compiler);

compiler.run(function(err, stats) {
  // ...
});
```

T> Did you know: The example seen above is extremely similar to the [webpack runtime itself!](https://github.com/webpack/webpack/blob/e7087ffeda7fa37dfe2ca70b5593c6e899629a2c/bin/webpack.js#L290-L292) There are lots of great usage examples hiding in the [webpack source code](https://github.com/webpack/webpack) that you can apply to your own configurations and scripts!


# Configuration

You may have noticed that few webpack configurations look exactly alike. This is because __webpack's configuration file is a JavaScript file that exports a webpack [configuration](/configuration/).__ This configuration is then processed by webpack based upon its defined properties.

Because it's a standard Node.js CommonJS module, you __can do the following__:

- import other files via `require(...)`
- use utilities on npm via `require(...)`
- use JavaScript control flow expressions i. e. the `?:` operator
- use constants or variables for often used values
- write and execute functions to generate a part of the configuration

Use these features when appropriate.

While they are technically feasible, __the following practices should be avoided__:

- Access CLI arguments, when using the webpack CLI (instead write your own CLI, or [use `--env`](/configuration/configuration-types/))
- Export non-deterministic values (calling webpack twice should result in the same output files)
- Write long configurations (instead split the configuration into multiple files)

T> The most important part to take away from this document is that there are many different ways to format and style your webpack configuration. The key is to stick with something consistent that you and your team can understand and maintain.

The examples below describe how webpack's configuration can be both expressive and configurable because _it is code_:

## Simple Configuration

__webpack.config.js__

```javascript
var path = require('path');

module.exports = {
  mode: 'development',
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js'
  }
};
```

_See_: [Configuration section](/configuration/) for the all supported configuration options

## Multiple Targets

Along with exporting a single configuration as an object, [function](/configuration/configuration-types/#exporting-a-function) or [Promise](/configuration/configuration-types/#exporting-a-promise), you can export multiple configurations.

_See_: [Exporting multiple configurations](/configuration/configuration-types/#exporting-multiple-configurations)

## Using other Configuration Languages

webpack accepts configuration files written in multiple programming and data languages.

_See_: [Configuration Languages](/configuration/configuration-languages/)


# Modules

In [modular programming](https://en.wikipedia.org/wiki/Modular_programming), developers break programs up into discrete chunks of functionality called a _module_.

Each module has a smaller surface area than a full program, making verification, debugging, and testing trivial.
Well-written _modules_ provide solid abstractions and encapsulation boundaries, so that each module has a coherent design and a clear purpose within the overall application.

Node.js has supported modular programming almost since its inception.
On the web, however, support for _modules_ has been slow to arrive.
Multiple tools exist that support modular JavaScript on the web, with a variety of benefits and limitations.
webpack builds on lessons learned from these systems and applies the concept of _modules_ to any file in your project.

## What is a webpack Module

In contrast to [Node.js modules](https://nodejs.org/api/modules.html), webpack _modules_ can express their _dependencies_ in a variety of ways. A few examples are:

- An [ES2015 `import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) statement
- A [CommonJS](http://www.commonjs.org/specs/modules/1.0/) `require()` statement
- An [AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md) `define` and `require` statement
- An [`@import` statement](https://developer.mozilla.org/en-US/docs/Web/CSS/@import) inside of a css/sass/less file.
- An image url in a stylesheet (`url(...)`) or html (`<img src=...>`) file.

T> webpack 1 requires a specific loader to convert ES2015 `import`, however this is possible out of the box via webpack 2

## Supported Module Types

webpack supports modules written in a variety of languages and preprocessors, via _loaders_. _Loaders_ describe to webpack __how__ to process non-JavaScript _modules_ and include these _dependencies_ into your _bundles_.
The webpack community has built _loaders_ for a wide variety of popular languages and language processors, including:

- [CoffeeScript](http://coffeescript.org)
- [TypeScript](https://www.typescriptlang.org)
- [ESNext (Babel)](https://babeljs.io)
- [Sass](http://sass-lang.com)
- [Less](http://lesscss.org)
- [Stylus](http://stylus-lang.com)

And many others! Overall, webpack provides a powerful and rich API for customization that allows one to use webpack for __any stack__, while staying __non-opinionated__ about your development, testing, and production workflows.

For a full list, see [__the list of loaders__](/loaders) or [__write your own__](/api/loaders).


# Why webpack

To understand why you should use webpack let's do a recap of how we used JavaScript on the web before bundlers were a thing.

There are two ways to run JavaScript in a browser. First, include a script for each functionality you want to implement, the issue is that the solution is hard to scale as loading too many scripts causes a network bottleneck. The other alternative is to load a big .js file containing all your project code, but this results in an unmaintainable scripts that causes problems in scope, size, readability, fragility and monolith files.


## IIFE's - Immediately invoked function expressions

IIFEs solve scoping issues for large projects. When script files are wrapped by an IIFE, you can safely concatenate or safely combine files without concern of scope collision. 

This lead to tools like Make, Gulp, Grunt, Broccoli or Brunch. These tools are known as task runners and they are used, among other purposes, to concatenate all your project files together in order to solve some of the issues mentioned before.

However, anytime you want to change one file you have to rebuild the whole thing. Concatenating makes it trivial to reuse scripts across files and makes build optimizations more difficult to implement. How do you even know what code is being used and which is not?

If you are only using one function from lodash or one date utility from moment.js you are actually adding the entire library and just squishing it together. How do you treeshake the dependencies on your code? Also, lazy loading chunks of code can be hard to achieve at scale and requires a lot of manual work from the developer.


## Birth of JavaScript Modules happened thanks to Node.js

webpack runs on Node.js, a JavaScript runtime that can be used in computers and servers outside a browser environment.

When Node.js was released a new era started, and it came with new challenges. Now that JavaScript is not running in a browser, how are Node applications supposed to load new chunks of code? There are no html files and script tags that can be added to it.

CommonJS came out and introduced `require`, which allows you to load and use a module in the current file. This solves scope issues out of the box and which code is used becomes clear since we need to import each module that we are going to need.


## npm + Node.js + modules -- mass distribution

JavaScript is taking over the world as a language, as a platform and as a way to rapidly develop and create fast running applications. 

But there is no browser support for CommonJS. There are no [live bindings](https://medium.com/webpack/the-state-of-javascript-modules-4636d1774358). There are problems with circular references. Sync module resolution loader is slow. While CommonJS was a great solution for Node.js projects, browsers didn't support modules. That's when bundlers and tools like Browserify, RequireJS and SystemJS were created to solve this limitation making it possible to write CommonJS modules that run in a browser.


## ESM - ECMAScript Modules

The good news for web projects is that modules are becoming an official feature in ECMAScript standard, though browser support is still short and early implementations show that bundling is still faster and recommended today.


## Wouldn't it be nice…

...to have something that will not only let us write modules but also support any module format (at least until we get to ESM) and that can handle resources and assets at the same time?

This is why webpack exists. It's a tool that not only let's you bundle your JavaScript applications, supporting both ESM and CommonJS, but can be extended to support all different kinds of assets like images, fonts and stylesheets.

webpack cares a lot about performance and it's always adding and improving features like async chunk loading and prefetching to help you deliver the best possible version of your project to the user, always caring about loading times and performance.


# Module Resolution

A resolver is a library which helps in locating a module by its absolute path.
A module can be required as a dependency from another module as:

```js
import foo from 'path/to/module';
// or
require('path/to/module');
```

The dependency module can be from the application code or a third party library. The resolver helps
webpack find the module code that needs to be included in the bundle for every such `require`/`import` statement.
webpack uses [enhanced-resolve](https://github.com/webpack/enhanced-resolve) to resolve file paths while bundling modules.


## Resolving rules in webpack

Using `enhanced-resolve`, webpack can resolve three kinds of file paths:


### Absolute paths

```js
import '/home/me/file';

import 'C:\\Users\\me\\file';
```

Since we already have the absolute path to the file, no further resolution is required.


### Relative paths

```js
import '../src/file1';
import './file2';
```

In this case, the directory of the resource file where the `import` or `require` occurs is taken to be the context directory. The relative path specified in the `import/require` is joined to this context path to produce the absolute path to the module.


### Module paths

```js
import 'module';
import 'module/lib/file';
```

Modules are searched for inside all directories specified in [`resolve.modules`](/configuration/resolve/#resolve-modules).
You can replace the original module path by an alternate path by creating an alias for it using [`resolve.alias`](/configuration/resolve/#resolve-alias) configuration option.

Once the path is resolved based on the above rule, the resolver checks to see if the path points to a file or a directory. If the path points to a file:

- If the path has a file extension, then the file is bundled straightaway.
- Otherwise, the file extension is resolved using the [`resolve.extensions`](/configuration/resolve/#resolve-extensions) option, which tells the resolver which extensions (eg - `.js`, `.jsx`) are acceptable for resolution.

If the path points to a folder, then the following steps are taken to find the right file with the right extension:

- If the folder contains a `package.json` file, then fields specified in [`resolve.mainFields`](/configuration/resolve/#resolve-mainfields) configuration option are looked up in order, and the first such field in `package.json` determines the file path.
- If there is no `package.json` or if the main fields do not return a valid path, file names specified in the [`resolve.mainFiles`](/configuration/resolve/#resolve-mainfiles) configuration option are looked for in order, to see if a matching filename exists in the imported/required directory .
- The file extension is then resolved in a similar way using the `resolve.extensions` option.

webpack provides reasonable [defaults](/configuration/resolve) for these options depending on your build target.


## Resolving Loaders

This follows the same rules as those specified for file resolution. But the [`resolveLoader`](/configuration/resolve/#resolveloader) configuration option can be used to have separate resolution rules for loaders.


## Caching

Every filesystem access is cached, so that multiple parallel or serial requests to the same file occur faster. In [watch mode](/configuration/watch/#watch), only modified files are evicted from the cache. If watch mode is off, then the cache gets purged before every compilation.


See [Resolve API](/configuration/resolve) to learn more on the configuration options mentioned above.


# Dependency Graph

Any time one file depends on another, webpack treats this as a _dependency_. This allows webpack to take non-code assets, such as images or web fonts, and also provide them as _dependencies_ for your application.

When webpack processes your application, it starts from a list of modules defined on the command line or in its config file.
Starting from these [_entry points_](/concepts/entry-points/), webpack recursively builds a _dependency graph_ that includes every module your application needs, then bundles all of those modules into a small number of _bundles_ - often, just one - to be loaded by the browser.

T> Bundling your application is especially powerful for _HTTP/1.1_ clients, as it minimizes the number of times your app has to wait while the browser starts a new request. For _HTTP/2_, you can also use [Code Splitting](/guides/code-splitting/) to achieve best results.


# Targets

Because JavaScript can be written for both server and browser, webpack offers multiple deployment _targets_ that you can set in your webpack [configuration](/configuration).

W> The webpack `target` property is not to be confused with the `output.libraryTarget` property. For more information see [our guide](/concepts/output/) on the `output` property.

## Usage

To set the `target` property, you simply set the target value in your webpack config:

__webpack.config.js__

```javascript
module.exports = {
  target: 'node'
};
```

In the example above, using `node` webpack will compile for usage in a Node.js-like environment (uses Node.js `require` to load chunks and not touch any built in modules like `fs` or `path`).

Each _target_ has a variety of deployment/environment specific additions, support to fit its needs. See what [targets are available](/configuration/target/).

?>Further expansion for other popular target values

## Multiple Targets

Although webpack does __not__ support multiple strings being passed into the `target` property, you can create an isomorphic library by bundling two separate configurations:

__webpack.config.js__

```javascript
const path = require('path');
const serverConfig = {
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.node.js'
  }
  //…
};

const clientConfig = {
  target: 'web', // <=== can be omitted as default is 'web'
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.js'
  }
  //…
};

module.exports = [ serverConfig, clientConfig ];
```

The example above will create a `lib.js` and `lib.node.js` file in your `dist` folder.

## Resources

As seen from the options above there are multiple different deployment _targets_ that you can choose from. Below is a list of examples, and resources that you can refer to.

-  __[compare-webpack-target-bundles](https://github.com/TheLarkInn/compare-webpack-target-bundles)__: A great resource for testing and viewing different webpack _targets_. Also great for bug reporting.
- __[Boilerplate of Electron-React Application](https://github.com/chentsulin/electron-react-boilerplate)__: A good example of a build process for electron's main process and renderer process.

?> Need to find up to date examples of these webpack targets being used in live code or boilerplates.


# The Manifest

In a typical application or site built with webpack, there are three main types of code:

1. The source code you, and maybe your team, have written.
2. Any third-party library or "vendor" code your source is dependent on.
3. A webpack runtime and __manifest__ that conducts the interaction of all modules.

This article will focus on the last of these three parts, the runtime and in particular the manifest.


## Runtime

The runtime, along with the manifest data, is basically all the code webpack needs to connect your modularized application while it's running in the browser. It contains the loading and resolving logic needed to connect your modules as they interact. This includes connecting modules that have already been loaded into the browser as well as logic to lazy-load the ones that haven't.


## Manifest

Once your application hits the browser in the form of `index.html` file, some bundles and a variety of other assets required by your application must be loaded and linked somehow. That `/src` directory you meticulously laid out is now bundled, minified and maybe even split into smaller chunks for lazy-loading by webpack's [`optimization`](/configuration/optimization/). So how does webpack manage the interaction between all of your required modules? This is where the manifest data comes in...

As the compiler enters, resolves, and maps out your application, it keeps detailed notes on all your modules. This collection of data is called the "Manifest" and it's what the runtime will use to resolve and load modules once they've been bundled and shipped to the browser. No matter which [module syntax](/api/module-methods) you have chosen, those `import` or `require` statements have now become `__webpack_require__` methods that point to module identifiers. Using the data in the manifest, the runtime will be able to find out where to retrieve the modules behind the identifiers.


## The Problem

So now you have a little bit of insight about how webpack works behind the scenes. "But, how does this affect me?", you might ask. The simple answer is that most of the time it doesn't. The runtime will do its thing, utilizing the manifest, and everything will appear to just magically work once your application hits the browser. However, if you decide to improve your projects performance by utilizing browser caching, this process will all of a sudden become an important thing to understand.

By using content hashes within your bundle file names, you can indicate to the browser when the contents of a file has changed thus invalidating the cache. Once you start doing this though, you'll immediately notice some funny behavior. Certain hashes change even when their contents apparently do not. This is caused by the injection of the runtime and manifest which changes every build.

See [the manifest section](/guides/output-management/#the-manifest) of our _Output management_ guide to learn how to extract the manifest, and read the guides below to learn more about the intricacies of long term caching.


# Hot Module Replacement

Hot Module Replacement (HMR) exchanges, adds, or removes [modules](/concepts/modules/) while an application is running, without a full reload. This can significantly speed up development in a few ways:

- Retain application state which is lost during a full reload.
- Save valuable development time by only updating what's changed.
- Modifications made to CSS/JS in the source code results in an instant browser update which is almost comparable to changing styles directly in the browser's dev tools.


## How It Works

Let's go through some different viewpoints to understand exactly how HMR works...

### In the Application

The following steps allow modules to be swapped in and out of an application:

1. The application asks the HMR runtime to check for updates.
2. The runtime asynchronously downloads the updates and notifies the application.
3. The application then asks the runtime to apply the updates.
4. The runtime synchronously applies the updates.

You can set up HMR so that this process happens automatically, or you can choose to require user interaction for updates to occur.


### In the Compiler

In addition to normal assets, the compiler needs to emit an "update" to allow updating from previous version to the new version. The "update" consists of two parts:

1. The updated [manifest](/concepts/manifest) (JSON)
2. One or more updated chunks (JavaScript)

The manifest contains the new compilation hash and a list of all updated chunks. Each of these chunks contains the new code for all updated modules (or a flag indicating that the module was removed).

The compiler ensures that module IDs and chunk IDs are consistent between these builds. It typically stores these IDs in memory (e.g. with [webpack-dev-server](/configuration/dev-server/)), but it's also possible to store them in a JSON file.


### In a Module

HMR is an opt-in feature that only affects modules containing HMR code. One example would be patching styling through the [`style-loader`](https://github.com/webpack-contrib/style-loader). In order for patching to work, the `style-loader` implements the HMR interface; when it receives an update through HMR, it replaces the old styles with the new ones.

Similarly, when implementing the HMR interface in a module, you can describe what should happen when the module is updated. However, in most cases, it's not mandatory to write HMR code in every module. If a module has no HMR handlers, the update bubbles up. This means that a single handler can update a complete module tree. If a single module from the tree is updated, the entire set of dependencies is reloaded.

See the [HMR API page](/api/hot-module-replacement) for details on the `module.hot` interface.


### In the Runtime

Here things get a bit more technical... if you're not interested in the internals, feel free to jump to the [HMR API page](/api/hot-module-replacement) or [HMR guide](/guides/hot-module-replacement).

For the module system runtime, additional code is emitted to track module `parents` and `children`. On the management side, the runtime supports two methods: `check` and `apply`.

A `check` makes an HTTP request to the update manifest. If this request fails, there is no update available. If it succeeds, the list of updated chunks is compared to the list of currently loaded chunks. For each loaded chunk, the corresponding update chunk is downloaded. All module updates are stored in the runtime. When all update chunks have been downloaded and are ready to be applied, the runtime switches into the `ready` state.

The `apply` method flags all updated modules as invalid. For each invalid module, there needs to be an update handler in the module or in its parent(s). Otherwise, the invalid flag bubbles up and invalidates parent(s) as well. Each bubble continues until the app's entry point or a module with an update handler is reached (whichever comes first). If it bubbles up from an entry point, the process fails.

Afterwards, all invalid modules are disposed (via the dispose handler) and unloaded. The current hash is then updated and all `accept` handlers are called. The runtime switches back to the `idle` state and everything continues as normal.


## Get Started

HMR can be used in development as a LiveReload replacement. [webpack-dev-server](/configuration/dev-server/) supports a `hot` mode in which it tries to update with HMR before trying to reload the whole page. See the [Hot Module Replacement guide](/guides/hot-module-replacement) for details.

T> As with many other features, webpack's power lies in its customizability. There are _many_ ways of configuring HMR depending on the needs of a particular project. However, for most purposes, `webpack-dev-server` is a good fit and will allow you to get started with HMR quickly.
