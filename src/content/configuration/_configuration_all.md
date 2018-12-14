

# Configuration

Out of the box, webpack won't require you to use a configuration file. However, it will assume the entry point of your project is `src/index` and will output the result in `dist/main.js` minified and optimized for production.

Usually your projects will need to extend this functionality, for this you can create a `webpack.config.js` file in the root folder and webpack will automatically use it.

All the available configuration options are specified below.

T> New to webpack? Check out our guide to some of webpack's [core concepts](/concepts/) to get started!

## Options

Click on the name of each option in the configuration code below to jump to the detailed documentation. Also note that the items with arrows can be expanded to show more examples and, in some cases, more advanced configuration.

W> Notice that throughout the configuration we use Node's built-in [path module](https://nodejs.org/api/path.html) and prefix it with the [__dirname](https://nodejs.org/docs/latest/api/globals.html#globals_dirname) global. This prevents file path issues between operating systems and allows relative paths to work as expected. See [this section](https://nodejs.org/api/path.html#path_windows_vs_posix) for more info on POSIX vs. Windows paths.

__webpack.config.js__

```js-with-links-with-details
const path = require('path');

module.exports = {
  <details><summary>[mode](/concepts/mode): "production", // "production" | "development" | "none"</summary>
  [mode](/concepts/mode): "production", // enable many optimizations for production builds
  [mode](/concepts/mode): "development", // enabled useful tools for development
  [mode](/concepts/mode): "none", // no defaults
  </details>
  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  <details><summary>[entry](/configuration/entry-context#entry): "./app/entry", // string | object | array</summary>
  [entry](/configuration/entry-context#entry): ["./app/entry1", "./app/entry2"],
  [entry](/configuration/entry-context#entry): {
    a: "./app/entry-a",
    b: ["./app/entry-b1", "./app/entry-b2"]
  },
  </details>
  // defaults to './src'
  // Here the application starts executing
  // and webpack starts bundling
  [output](/configuration/output): {
    // options related to how webpack emits results
    [path](/configuration/output#output-path): path.resolve(__dirname, "dist"), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    <details><summary>[filename](/configuration/output#output-filename): "bundle.js", // string</summary>
    [filename](/configuration/output#output-filename): "[name].js", // for multiple entry points
    [filename](/configuration/output#output-filename): "[chunkhash].js", // for [long term caching](/guides/caching)
    </details>
    // the filename template for entry chunks
    <details><summary>[publicPath](/configuration/output#output-publicpath): "/assets/", // string</summary>
    [publicPath](/configuration/output#output-publicpath): "",
    [publicPath](/configuration/output#output-publicpath): "https://cdn.example.com/",
    </details>
    // the url to the output directory resolved relative to the HTML page
    [library](/configuration/output#output-library): "MyLibrary", // string,
    // the name of the exported library
    <details><summary>[libraryTarget](/configuration/output#output-librarytarget): "umd", // universal module definition</summary>
        [libraryTarget](/configuration/output#output-librarytarget): "umd2", // universal module definition
        [libraryTarget](/configuration/output#output-librarytarget): "commonjs2", // exported with module.exports
        [libraryTarget](/configuration/output#output-librarytarget): "commonjs", // exported as properties to exports
        [libraryTarget](/configuration/output#output-librarytarget): "amd", // defined with AMD defined method
        [libraryTarget](/configuration/output#output-librarytarget): "this", // property set on this
        [libraryTarget](/configuration/output#output-librarytarget): "var", // variable defined in root scope
        [libraryTarget](/configuration/output#output-librarytarget): "assign", // blind assignment
        [libraryTarget](/configuration/output#output-librarytarget): "window", // property set to window object
        [libraryTarget](/configuration/output#output-librarytarget): "global", // property set to global object
        [libraryTarget](/configuration/output#output-librarytarget): "jsonp", // jsonp wrapper
    </details>
    // the type of the exported library
    <details><summary>/* Advanced output configuration (click to show) */</summary>
    [pathinfo](/configuration/output#output-pathinfo): true, // boolean
    // include useful path info about modules, exports, requests, etc. into the generated cod
    [chunkFilename](/configuration/output#output-chunkfilename): "[id].js",
    [chunkFilename](/configuration/output#output-chunkfilename): "[chunkhash].js", // for [long term caching](/guides/caching)
    // the filename template for additional chunks
    [jsonpFunction](/configuration/output#output-jsonpfunction): "myWebpackJsonp", // string
    // name of the JSONP function used to load chunks
    [sourceMapFilename](/configuration/output#output-sourcemapfilename): "[file].map", // string
    [sourceMapFilename](/configuration/output#output-sourcemapfilename): "sourcemaps/[file].map", // string
    // the filename template of the source map location
    [devtoolModuleFilenameTemplate](/configuration/output#output-devtoolmodulefilenametemplate): "webpack:///[resource-path]", // string
    // the name template for modules in a devtool
    [devtoolFallbackModuleFilenameTemplate](/configuration/output#output-devtoolfallbackmodulefilenametemplate): "webpack:///[resource-path]?[hash]", // string
    // the name template for modules in a devtool (used for conflicts)
    [umdNamedDefine](/configuration/output#output-umdnameddefine): true, // boolean
    // use a named AMD module in UMD library
    [crossOriginLoading](/configuration/output#output-crossoriginloading): "use-credentials", // enum
    [crossOriginLoading](/configuration/output#output-crossoriginloading): "anonymous",
    [crossOriginLoading](/configuration/output#output-crossoriginloading): false,
    // specifies how cross origin request are issued by the runtime
    <details><summary>/* Expert output configuration (on own risk) */</summary>
    [devtoolLineToLine](/configuration/output#output-devtoollinetoline): {
      test: /\.jsx$/
    },
    // use a simple 1:1 mapped SourceMaps for these modules (faster)
    [hotUpdateMainFilename](/configuration/output#output-hotupdatemainfilename): "[hash].hot-update.json", // string
    // filename template for HMR manifest
    [hotUpdateChunkFilename](/configuration/output#output-hotupdatechunkfilename): "[id].[hash].hot-update.js", // string
    // filename template for HMR chunks
    [sourcePrefix](/configuration/output#output-sourceprefix): "\t", // string
    // prefix module sources in bundle for better readablitity
    </details>
    </details>
  },
  [module](/configuration/module): {
    // configuration regarding modules
    [rules](/configuration/module#module-rules): [
      // rules for modules (configure loaders, parser options, etc.)
      {
        [test](/configuration/module#rule-test): /\.jsx?$/,
        [include](/configuration/module#rule-include): [
          path.resolve(__dirname, "app")
        ],
        [exclude](/configuration/module#rule-exclude): [
          path.resolve(__dirname, "app/demo-files")
        ],
        // these are matching conditions, each accepting a regular expression or string
        // test and include have the same behavior, both must be matched
        // exclude must not be matched (takes preference over test and include)
        // Best practices:
        // - Use RegExp only in test and for filename matching
        // - Use arrays of absolute paths in include and exclude
        // - Try to avoid exclude and prefer include
        [issuer](/configuration/module#rule-issuer): { test, include, exclude },
        // conditions for the issuer (the origin of the import)
        [enforce](/configuration/module#rule-enforce): "pre",
        [enforce](/configuration/module#rule-enforce): "post",
        // flags to apply these rules, even if they are overridden (advanced option)
        [loader](/configuration/module#rule-loader): "babel-loader",
        // the loader which should be applied, it'll be resolved relative to the context
        // -loader suffix is no longer optional in webpack2 for clarity reasons
        // see [webpack 1 upgrade guide](/migrate/3/#automatic-loader-module-name-extension-removed)
        [options](/configuration/module#rule-options-rule-query): {
          presets: ["es2015"]
        },
        // options for the loader
      },
      {
        [test](/configuration/module#rule-test): /\.html$/,
        [use](/configuration/module#rule-use): [
          // apply multiple loaders and options
          "htmllint-loader",
          {
            loader: "html-loader",
            options: {
              /* ... */
            }
          }
        ]
      },
      { [oneOf](/configuration/module#rule-oneof): [ /* rules */ ] },
      // only use one of these nested rules
      { [rules](/configuration/module#rule-rules): [ /* rules */ ] },
      // use all of these nested rules (combine with conditions to be useful)
      { [resource](/configuration/module#rule-resource): { [and](/configuration/module#condition): [ /* conditions */ ] } },
      // matches only if all conditions are matched
      { [resource](/configuration/module#rule-resource): { [or](/configuration/module#condition): [ /* conditions */ ] } },
      { [resource](/configuration/module#rule-resource): [ /* conditions */ ] },
      // matches if any condition is matched (default for arrays)
      { [resource](/configuration/module#rule-resource): { [not](/configuration/module#condition): /* condition */ } }
      // matches if the condition is not matched
    ],
    <details><summary>/* Advanced module configuration (click to show) */</summary>
    [noParse](/configuration/module#module-noparse): [
      /special-library\.js$/
    ],
    // do not parse this module
    unknownContextRequest: ".",
    unknownContextRecursive: true,
    unknownContextRegExp: /^\.\/.*$/,
    unknownContextCritical: true,
    exprContextRequest: ".",
    exprContextRegExp: /^\.\/.*$/,
    exprContextRecursive: true,
    exprContextCritical: true,
    wrappedContextRegExp: /.*/,
    wrappedContextRecursive: true,
    wrappedContextCritical: false,
    // specifies default behavior for dynamic requests
    </details>
  },
  [resolve](/configuration/resolve): {
    // options for resolving module requests
    // (does not apply to resolving to loaders)
    [modules](/configuration/resolve#resolve-modules): [
      "node_modules",
      path.resolve(__dirname, "app")
    ],
    // directories where to look for modules
    [extensions](/configuration/resolve#resolve-extensions): [".js", ".json", ".jsx", ".css"],
    // extensions that are used
    [alias](/configuration/resolve#resolve-alias): {
      // a list of module name aliases
      "module": "new-module",
      // alias "module" -> "new-module" and "module/path/file" -> "new-module/path/file"
      "only-module$": "new-module",
      // alias "only-module" -> "new-module", but not "only-module/path/file" -> "new-module/path/file"
      "module": path.resolve(__dirname, "app/third/module.js"),
      // alias "module" -> "./app/third/module.js" and "module/file" results in error
      // modules aliases are imported relative to the current context
    },
    <details><summary>/* alternative alias syntax (click to show) */</summary>
    [alias](/configuration/resolve#resolve-alias): [
      {
        name: "module",
        // the old request
        alias: "new-module",
        // the new request
        onlyModule: true
        // if true only "module" is aliased
        // if false "module/inner/path" is also aliased
      }
    ],
    </details>
    <details><summary>/* Advanced resolve configuration (click to show) */</summary>
    [symlinks](/configuration/resolve#resolve-symlinks): true,
    // follow symlinks to new location
    [descriptionFiles](/configuration/resolve#resolve-descriptionfiles): ["package.json"],
    // files that are read for package description
    [mainFields](/configuration/resolve#resolve-mainfields): ["main"],
    // properties that are read from description file
    // when a folder is requested
    [aliasFields](/configuration/resolve#resolve-aliasfields): ["browser"],
    // properties that are read from description file
    // to alias requests in this package
    [enforceExtension](/configuration/resolve#resolve-enforceextension): false,
    // if true request must not include an extensions
    // if false request may already include an extension
    [moduleExtensions](/configuration/resolve#resolveloader-moduleextensions): ["-module"],
    [enforceModuleExtension](/configuration/resolve#resolve-enforcemoduleextension): false,
    // like extensions/enforceExtension but for module names instead of files
    [unsafeCache](/configuration/resolve#resolve-unsafecache): true,
    [unsafeCache](/configuration/resolve#resolve-unsafecache): {},
    // enables caching for resolved requests
    // this is unsafe as folder structure may change
    // but performance improvement is really big
    [cachePredicate](/configuration/resolve#resolve-cachepredicate): (path, request) => true,
    // predicate function which selects requests for caching
    [plugins](/configuration/resolve#resolve-plugins): [
      // ...
    ]
    // additional plugins applied to the resolver
    </details>
  },
  [performance](/configuration/performance): {
    <details><summary>[hints](/configuration/performance#performance-hints): "warning", // enum </summary>
    [hints](/configuration/performance#performance-hints): "error", // emit errors for perf hints
    [hints](/configuration/performance#performance-hints): false, // turn off perf hints
    </details>
    [maxAssetSize](/configuration/performance#performance-maxassetsize): 200000, // int (in bytes),
    [maxEntrypointSize](/configuration/performance#performance-maxentrypointsize): 400000, // int (in bytes)
    [assetFilter](/configuration/performance#performance-assetfilter): function(assetFilename) {
      // Function predicate that provides asset filenames
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  <details><summary>[devtool](/configuration/devtool): "source-map", // enum </summary>
  [devtool](/configuration/devtool): "inline-source-map", // inlines SourceMap into original file
  [devtool](/configuration/devtool): "eval-source-map", // inlines SourceMap per module
  [devtool](/configuration/devtool): "hidden-source-map", // SourceMap without reference in original file
  [devtool](/configuration/devtool): "cheap-source-map", // cheap-variant of SourceMap without module mappings
  [devtool](/configuration/devtool): "cheap-module-source-map", // cheap-variant of SourceMap with module mappings
  [devtool](/configuration/devtool): "eval", // no SourceMap, but named modules. Fastest at the expense of detail.
  </details>
  // enhance debugging by adding meta info for the browser devtools
  // source-map most detailed at the expense of build speed.
  [context](/configuration/entry-context#context): __dirname, // string (absolute path!)
  // the home directory for webpack
  // the [entry](/configuration/entry-context) and [module.rules.loader](/configuration/module#rule-loader) option
  //   is resolved relative to this directory
  <details><summary>[target](/configuration/target): "web", // enum</summary>
  [target](/configuration/target): "webworker", // WebWorker
  [target](/configuration/target): "node", // Node.js via require
  [target](/configuration/target): "async-node", // Node.js via fs and vm
  [target](/configuration/target): "node-webkit", // nw.js
  [target](/configuration/target): "electron-main", // electron, main process
  [target](/configuration/target): "electron-renderer", // electron, renderer process
  [target](/configuration/target): (compiler) => { /* ... */ }, // custom
  </details>
  // the environment in which the bundle should run
  // changes chunk loading behavior and available modules
  <details><summary>[externals](/configuration/externals): ["react", /^@angular\//],</summary>
  [externals](/configuration/externals): "react", // string (exact match)
  [externals](/configuration/externals): /^[a-z\-]+($|\/)/, // Regex
  [externals](/configuration/externals): { // object
    angular: "this angular", // this["angular"]
    react: { // UMD
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "React"
    }
  },
  [externals](/configuration/externals): (request) => { /* ... */ return "commonjs " + request }
  </details>
  // Don't follow/bundle these modules, but request them at runtime from the environment
  [serve](https://github.com/webpack-contrib/webpack-serve#options): { //object
    port: 1337,
    content: './dist',
    // ...
  },
  // lets you provide options for webpack-serve
  <details><summary>[stats](/configuration/stats): "errors-only",</summary>
  [stats](/configuration/stats): { //object
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true,
    hash: true,
    // ...
  },
  </details>
  // lets you precisely control what bundle information gets displayed
  [devServer](/configuration/dev-server): {
    proxy: { // proxy URLs to backend development server
      '/api': 'http://localhost:3000'
    },
    contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    // ...
  },
  [plugins](plugins): [
    // ...
  ],
  // list of additional plugins
  <details><summary>/* Advanced configuration (click to show) */</summary>
  [resolveLoader](/configuration/resolve#resolveloader): { /* same as resolve */ }
  // separate resolve options for loaders
  [parallelism](other-options#parallelism): 1, // number
  // limit the number of parallel processed modules
  [profile](other-options#profile): true, // boolean
  // capture timing information
  [bail](other-options#bail): true, //boolean
  // fail out on the first error instead of tolerating it.
  [cache](other-options#cache): false, // boolean
  // disable/enable caching
  [watch](watch#watch): true, // boolean
  // enables watching
  [watchOptions](watch#watchoptions): {
    [aggregateTimeout](watch#watchoptions-aggregatetimeout): 1000, // in ms
    // aggregates multiple changes to a single rebuild
    [poll](watch#watchoptions-poll): true,
    [poll](watch#watchoptions-poll): 500, // interval in ms
    // enables polling mode for watching
    // must be used on filesystems that doesn't notify on change
    // i. e. nfs shares
  },
  [node](node): {
    // Polyfills and mocks to run Node.js-
    // environment code in non-Node environments.
    [console](node#node-console): false, // boolean | "mock"
    [global](node#node-global): true, // boolean | "mock"
    [process](node#node-process): true, // boolean
    [__filename](node#node-__filename): "mock", // boolean | "mock"
    [__dirname](node#node-__dirname): "mock", // boolean | "mock"
    [Buffer](node#node-buffer): true, // boolean | "mock"
    [setImmediate](node#node-setimmediate): true // boolean | "mock" | "empty"
  },
  [recordsPath](other-options#recordspath): path.resolve(__dirname, "build/records.json"),
  [recordsInputPath](other-options#recordsinputpath): path.resolve(__dirname, "build/records.json"),
  [recordsOutputPath](other-options#recordsoutputpath): path.resolve(__dirname, "build/records.json"),
  // TODO
  </details>
}
```

## Use custom configuration file

If for some reason you want to use custom configuration file depending on certain situations you can change this via command line by using the `--config` flag.

__package.json__

```json
"scripts": {
  "build": "webpack --config prod.config.js"
}
```

## Configuration file generators

Want to rapidly generate webpack configuration file for your project requirements with few clicks away?

[Generate Custom Webpack Configuration](https://generatewebpackconfig.netlify.com/) is an interactive portal you can play around by selecting custom webpack configuration options tailored for your frontend project. It automatically generates a minimal webpack configuration based on your selection of loaders/plugins, etc.

[Visual tool for creating webpack configs](https://webpack.jakoblind.no/) is an online configuration tool for creating webpack configuration file where you can select any combination of features you need. It also generates a full example project based on your webpack configs.


# Configuration Languages

webpack accepts configuration files written in multiple programming and data languages. The list of supported file extensions can be found at the [node-interpret](https://github.com/js-cli/js-interpret) package. Using [node-interpret](https://github.com/js-cli/js-interpret), webpack can handle many different types of configuration files.


## TypeScript

To write the webpack configuration in [TypeScript](http://www.typescriptlang.org/), you would first install the necessary dependencies, i.e., TypeScript and the relevant type definitions from the [DefinitelyTyped](https://definitelytyped.org/) project:

``` bash
npm install --save-dev typescript ts-node @types/node @types/webpack
# and, if using webpack-dev-server
npm install --save-dev @types/webpack-dev-server
```

and then proceed to write your configuration:

__webpack.config.ts__

```typescript
import path from 'path';
import webpack from 'webpack';

const config: webpack.Configuration = {
  mode: 'production',
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js'
  }
};

export default config;
```

Above sample assumes version >= 2.7 or newer of TypeScript is used with the new `esModuleInterop` and `allowSyntheticDefaultImports` compiler options in your `tsconfig.json` file.

Note that you'll also need to check your `tsconfig.json` file. If the module in `compilerOptions` in `tsconfig.json` is `commonjs`, the setting is complete, else webpack will fail with an error. This occurs because `ts-node` does not support any module syntax other than `commonjs`.

There are two solutions to this issue:

- Modify `tsconfig.json`.
- Install `tsconfig-paths`.

The __first option__ is to open your `tsconfig.json` file and look for `compilerOptions`. Set `target` to `"ES5"` and `module` to `"CommonJS"` (or completely remove the `module` option).

The __second option__ is to install the `tsconfig-paths` package:

``` bash
npm install --save-dev tsconfig-paths
```

And create a separate TypeScript configuration specifically for your webpack configs:

__tsconfig-for-webpack-config.json__

``` json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "esModuleInterop": true
  }
}
```

T> `ts-node` can resolve a `tsconfig.json` file using the environment variable provided by `tsconfig-path`.

Then set the environment variable `process.env.TS_NODE_PROJECT` provided by `tsconfig-path` like so:

__package.json__

```json
{
  "scripts": {
    "build": "TS_NODE_PROJECT=\"tsconfig-for-webpack-config.json\" webpack"
  }
}
```


## CoffeeScript

Similarly, to use [CoffeeScript](http://coffeescript.org/), you would first install the necessary dependencies:

``` bash
npm install --save-dev coffee-script
```

and then proceed to write your configuration:

__webpack.config.coffee__

<!-- eslint-skip -->

```js
HtmlWebpackPlugin = require('html-webpack-plugin')
webpack = require('webpack')
path = require('path')

config =
  mode: 'production'
  entry: './path/to/my/entry/file.js'
  output:
    path: path.resolve(__dirname, 'dist')
    filename: 'my-first-webpack.bundle.js'
  module: rules: [ {
    test: /\.(js|jsx)$/
    use: 'babel-loader'
  } ]
  plugins: [
    new HtmlWebpackPlugin(template: './src/index.html')
  ]

module.exports = config
```


## Babel and JSX

In the example below JSX (React JavaScript Markup) and Babel are used to create a JSON Configuration that webpack can understand.

> Courtesy of [Jason Miller](https://twitter.com/_developit/status/769583291666169862)

First install the necessary dependencies:

``` bash
npm install --save-dev babel-register jsxobj babel-preset-es2015
```

__.babelrc__

``` json
{
  "presets": [ "es2015" ]
}
```

__webpack.config.babel.js__

``` js
import jsxobj from 'jsxobj';

// example of an imported plugin
const CustomPlugin = config => ({
  ...config,
  name: 'custom-plugin'
});

export default (
  <webpack target="web" watch mode="production">
    <entry path="src/index.js" />
    <resolve>
      <alias {...{
        react: 'preact-compat',
        'react-dom': 'preact-compat'
      }} />
    </resolve>
    <plugins>
      <CustomPlugin foo="bar" />
    </plugins>
  </webpack>
);
```

W> If you are using Babel elsewhere and have `modules` set to `false`, you will have to either maintain two separate `.babelrc` files or use `const jsxobj = require('jsxobj');` and `module.exports` instead of the new `import` and `export` syntax. This is because while Node does support many new ES6 features, they don't yet support ES6 module syntax.


# Configuration Types

Besides exporting a single config object, there are a few more ways that cover other needs as well.


## Exporting a Function

Eventually you will find the need to disambiguate in your `webpack.config.js` between [development](/guides/development) and [production builds](/guides/production). You have (at least) two options:

One option is to export a function from your webpack config instead of exporting an object. The function will be invoked with two arguments:

- An environment as the first parameter. See the [environment options CLI documentation](/api/cli#environment-options) for syntax examples.
- An options map (`argv`) as the second parameter. This describes the options passed to webpack, with keys such as [`output-filename`](/api/cli/#output-options) and [`optimize-minimize`](/api/cli/#optimize-options).

```diff
-module.exports = {
+module.exports = function(env, argv) {
+  return {
+    mode: env.production ? 'production' : 'development',
+    devtool: env.production ? 'source-maps' : 'eval',
     plugins: [
       new TerserPlugin({
         terserOptions: {
+          compress: argv['optimize-minimize'] // only if -p or --optimize-minimize were passed
         }
       })
     ]
+  };
};
```


## Exporting a Promise

webpack will run the function exported by the configuration file and wait for a Promise to be returned. Handy when you need to asynchronously load configuration variables.

```js
module.exports = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        entry: './app.js',
        /* ... */
      });
    }, 5000);
  });
};
```


## Exporting multiple configurations

Instead of exporting a single configuration object/function, you may export multiple configurations (multiple functions are supported since webpack 3.1.0). When running webpack, all configurations are built. For instance, this is useful for [bundling a library](/guides/author-libraries) for multiple [targets](/configuration/output#output-librarytarget) such as AMD and CommonJS:

```js
module.exports = [{
  output: {
    filename: './dist-amd.js',
    libraryTarget: 'amd'
  },
  name: 'amd',
  entry: './app.js',
  mode: 'production',
}, {
  output: {
    filename: './dist-commonjs.js',
    libraryTarget: 'commonjs'
  },
  name: 'commonjs',
  entry: './app.js',
  mode: 'production',
}];
```

T> If you pass a name to [`--config-name`](/api/cli/#config-options) flag, webpack will only build that specific configuration.


# Entry and Context

The entry object is where webpack looks to start building the bundle. The context is an absolute string to the directory that contains the entry files.


## `context`

`string`

The base directory, an __absolute path__, for resolving entry points and loaders from configuration.

``` js
module.exports = {
  //...
  context: path.resolve(__dirname, 'app')
};
```

By default the current directory is used, but it's recommended to pass a value in your configuration. This makes your configuration independent from CWD (current working directory).

---


## `entry`

`string | [string] | object { <key>: string | [string] } | (function: () => string | [string] | object { <key>: string | [string] })`

The point or points to enter the application. At this point the application starts executing. If an array is passed all items will be executed.

A dynamically loaded module is __not__ an entry point.

Simple rule: one entry point per HTML page. SPA: one entry point, MPA: multiple entry points.

```js
module.exports = {
  //...
  entry: {
    home: './home.js',
    about: './about.js',
    contact: './contact.js'
  }
};
```


### Naming

If a string or array of strings is passed, the chunk is named `main`. If an object is passed, each key is the name of a chunk, and the value describes the entry point for the chunk.


### Dynamic entry

If a function is passed then it will be invoked on every [make](/api/compiler-hooks/#make) event.

> Note that the make event triggers when webpack starts and for every invalidation when [watching for file changes](/configuration/watch/).

```js
module.exports = {
  //...
  entry: () => './demo'
};
```

or

```js
module.exports = {
  //...
  entry: () => new Promise((resolve) => resolve(['./demo', './demo2']))
};
```

For example: you can use dynamic entries to get the actual entries from an external source (remote server, file system content or database):

__webpack.config.js__

``` js
module.exports = {
  entry() {
    return fetchPathsFromSomeExternalSource(); // returns a promise that will be resolved with something like ['src/main-layout.js', 'src/admin-layout.js']
  }
};
```

When combining with the [`output.library`](/configuration/output#output-library) option: If an array is passed only the last item is exported.


# Output

The top-level `output` key contains set of options instructing webpack on how and where it should output your bundles, assets and anything else you bundle or load with webpack.


## `output.auxiliaryComment`

`string` `object`

When used in tandem with [`output.library`](#output-library) and [`output.libraryTarget`](#output-librarytarget), this option allows users to insert comments within the export wrapper. To insert the same comment for each `libraryTarget` type, set `auxiliaryComment` to a string:

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    library: 'someLibName',
    libraryTarget: 'umd',
    filename: 'someLibName.js',
    auxiliaryComment: 'Test Comment'
  }
};
```

which will yield the following:

__webpack.config.js__

```javascript
(function webpackUniversalModuleDefinition(root, factory) {
  // Test Comment
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory(require('lodash'));
  // Test Comment
  else if(typeof define === 'function' && define.amd)
    define(['lodash'], factory);
  // Test Comment
  else if(typeof exports === 'object')
    exports['someLibName'] = factory(require('lodash'));
  // Test Comment
  else
    root['someLibName'] = factory(root['_']);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
  // ...
});
```

For fine-grained control over each `libraryTarget` comment, pass an object:

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    //...
    auxiliaryComment: {
      root: 'Root Comment',
      commonjs: 'CommonJS Comment',
      commonjs2: 'CommonJS2 Comment',
      amd: 'AMD Comment'
    }
  }
};
```


## `output.chunkFilename`

`string`

This option determines the name of non-entry chunk files. See [`output.filename`](#output-filename) option for details on the possible values.

Note that these filenames need to be generated at runtime to send the requests for chunks. Because of this, placeholders like `[name]` and `[chunkhash]` need to add a mapping from chunk id to placeholder value to the output bundle with the webpack runtime. This increases the size and may invalidate the bundle when placeholder value for any chunk changes.

By default `[id].js` is used or a value inferred from [`output.filename`](#output-filename) (`[name]` is replaced with `[id]` or `[id].` is prepended).


## `output.chunkLoadTimeout`

`integer`

Number of milliseconds before chunk request expires, defaults to 120 000. This option is supported since webpack 2.6.0.


## `output.crossOriginLoading`

`boolean` `string`

Only used when [`target`](/configuration/target) is web, which uses JSONP for loading on-demand chunks, by adding script tags.

Enable [cross-origin](https://developer.mozilla.org/en/docs/Web/HTML/Element/script#attr-crossorigin) loading of chunks. The following values are accepted...

`crossOriginLoading: false` - Disable cross-origin loading (default)

`crossOriginLoading: 'anonymous'` - Enable cross-origin loading __without credentials__

`crossOriginLoading: 'use-credentials'` - Enable cross-origin loading __with credentials__


## `output.jsonpScriptType`

`string`

Allows customization of the `script` type webpack injects `script` tags into the DOM to download async chunks. The following options are available:

- `'text/javascript'` (default)
- `'module'`: Use with ES6 ready code.


## `output.devtoolFallbackModuleFilenameTemplate`

`string | function(info)`

A fallback used when the template string or function above yields duplicates.

See [`output.devtoolModuleFilenameTemplate`](#output-devtoolmodulefilenametemplate).


## `output.devtoolLineToLine`

`boolean | object`

> Avoid using this option as it is __deprecated__ and will soon be removed.

Enables line to line mapping for all or some modules. This produces a simple source map where each line of the generated source is mapped to the same line of the original source. This is a performance optimization and should only be used if all input lines match generated lines.

Pass a boolean to enable or disable this feature for all modules (defaults to `false`). An object with `test`, `include`, `exclude` is also allowed. For example, to enable this feature for all javascript files within a certain directory:

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    devtoolLineToLine: { test: /\.js$/, include: 'src/utilities' }
  }
};
```


## `output.devtoolModuleFilenameTemplate`

`string | function(info)`

This option is only used when [`devtool`](/configuration/devtool) uses an options which requires module names.

Customize the names used in each source map's `sources` array. This can be done by passing a template string or function. For example, when using `devtool: 'eval'`, this is the default:

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    devtoolModuleFilenameTemplate: 'webpack://[namespace]/[resource-path]?[loaders]'
  }
};
```

The following substitutions are available in template strings (via webpack's internal [`ModuleFilenameHelpers`](https://github.com/webpack/webpack/blob/master/lib/ModuleFilenameHelpers.js)):

| Template                 | Description |
| ------------------------ | ----------- |
| [absolute-resource-path] | The absolute filename |
| [all-loaders]            | Automatic and explicit loaders and params up to the name of the first loader |
| [hash]                   | The hash of the module identifier |
| [id]                     | The module identifier |
| [loaders]                | Explicit loaders and params up to the name of the first loader |
| [resource]               | The path used to resolve the file and any query params used on the first loader |
| [resource-path]          | The path used to resolve the file without any query params |
| [namespace]              | The modules namespace. This is usually the library name when building as a library, empty otherwise |

When using a function, the same options are available camel-cased via the `info` parameter:

```javascript
module.exports = {
  //...
  output: {
    devtoolModuleFilenameTemplate: info => {
      return `webpack:///${info.resourcePath}?${info.loaders}`;
    }
  }
};
```

If multiple modules would result in the same name, [`output.devtoolFallbackModuleFilenameTemplate`](#output-devtoolfallbackmodulefilenametemplate) is used instead for these modules.


## `output.devtoolNamespace`

`string`

This option determines the modules namespace used with the [`output.devtoolModuleFilenameTemplate`](#output-devtoolmodulefilenametemplate). When not specified, it will default to the value of: [`output.library`](#output-library). It's used to prevent source file path collisions in source maps when loading multiple libraries built with webpack.

For example, if you have 2 libraries, with namespaces `library1` and `library2`, which both have a file `./src/index.js` (with potentially different contents), they will expose these files as `webpack://library1/./src/index.js` and `webpack://library2/./src/index.js`.


## `output.filename`

`string` `function`

This option determines the name of each output bundle. The bundle is written to the directory specified by the [`output.path`](#output-path) option.

For a single [`entry`](/configuration/entry-context#entry) point, this can be a static name.

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    filename: 'bundle.js'
  }
};
```

However, when creating multiple bundles via more than one entry point, code splitting, or various plugins, you should use one of the following substitutions to give each bundle a unique name...

Using entry name:

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    filename: '[name].bundle.js'
  }
};
```

Using internal chunk id:

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    filename: '[id].bundle.js'
  }
};
```

Using the unique hash generated for every build:

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    filename: '[name].[hash].bundle.js'
  }
};
```

Using hashes based on each chunks' content:

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    filename: '[chunkhash].bundle.js'
  }
};
```

Using hashes generated for extracted content:

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    filename: '[contenthash].bundle.css'
  }
};
```

Using function to return the filename:

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    filename: (chunkData) => {
      return chunkData.chunk.name === 'main' ? '[name].js': '[name]/[name].js';
    },
  }
};
```

Make sure to read the [Caching guide](/guides/caching) for details. There are more steps involved than just setting this option.

Note this option is called filename but you are still allowed to use something like `'js/[name]/bundle.js'` to create a folder structure.

Note this option does not affect output files for on-demand-loaded chunks. For these files the [`output.chunkFilename`](#output-chunkfilename) option is used. Files created by loaders also aren't affected. In this case you would have to try the specific loader's available options.

The following substitutions are available in template strings (via webpack's internal [`TemplatedPathPlugin`](https://github.com/webpack/webpack/blob/master/lib/TemplatedPathPlugin.js)):

| Template    | Description                                                                         |
| ----------- | ----------------------------------------------------------------------------------- |
| [hash]      | The hash of the module identifier                                                   |
| [chunkhash] | The hash of the chunk content                                                       |
| [name]      | The module name                                                                     |
| [id]        | The module identifier                                                               |
| [query]     | The module query, i.e., the string following `?` in the filename                    |
| [function]  | The function, which can return filename [string]                                    |

The lengths of `[hash]` and `[chunkhash]` can be specified using `[hash:16]` (defaults to 20). Alternatively, specify [`output.hashDigestLength`](#output-hashdigestlength) to configure the length globally.

If using a function for this option, the function will be passed an object containing the substitutions in the table above.

T> When using the [`ExtractTextWebpackPlugin`](/plugins/extract-text-webpack-plugin), use `[contenthash]` to obtain a hash of the extracted file (neither `[hash]` nor `[chunkhash]` work).


## `output.hashDigest`

The encoding to use when generating the hash, defaults to `'hex'`. All encodings from Node.JS' [`hash.digest`](https://nodejs.org/api/crypto.html#crypto_hash_digest_encoding) are supported. Using `'base64'` for filenames might be problematic since it has the character `/` in its alphabet. Likewise `'latin1'` could contain any character.


## `output.hashDigestLength`

The prefix length of the hash digest to use, defaults to `20`.


## `output.hashFunction`

`string|function`

The hashing algorithm to use, defaults to `'md4'`. All functions from Node.JS' [`crypto.createHash`](https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm_options) are supported. Since `4.0.0-alpha2`, the `hashFunction` can now be a constructor to a custom hash function. You can provide a non-crypto hash function for performance reasons.

```javascript
module.exports = {
  //...
  output: {
    hashFunction: require('metrohash').MetroHash64
  }
};
```

Make sure that the hashing function will have `update` and `digest` methods available.

## `output.hashSalt`

An optional salt to update the hash via Node.JS' [`hash.update`](https://nodejs.org/api/crypto.html#crypto_hash_update_data_inputencoding).


## `output.hotUpdateChunkFilename`

`string` `function`

Customize the filenames of hot update chunks. See [`output.filename`](#output-filename) option for details on the possible values.

The only placeholders allowed here are `[id]` and `[hash]`, the default being:

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    hotUpdateChunkFilename: '[id].[hash].hot-update.js'
  }
};
```

Here is no need to change it.


## `output.hotUpdateFunction`

`function`

Only used when [`target`](/configuration/target) is web, which uses JSONP for loading hot updates.

A JSONP function used to asynchronously load hot-update chunks.

For details see [`output.jsonpFunction`](#output-jsonpfunction).


## `output.hotUpdateMainFilename`

`string` `function`

Customize the main hot update filename. See [`output.filename`](#output-filename) option for details on the possible values.

`[hash]` is the only available placeholder, the default being:

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    hotUpdateMainFilename: '[hash].hot-update.json'
  }
};
```

Here is no need to change it.


## `output.jsonpFunction`

`string`

Only used when [`target`](/configuration/target) is web, which uses JSONP for loading on-demand chunks.

A JSONP function name used to asynchronously load chunks or join multiple initial chunks (SplitChunksPlugin, AggressiveSplittingPlugin).

This needs to be changed if multiple webpack runtimes (from different compilation) are used on the same webpage.

If using the [`output.library`](#output-library) option, the library name is automatically appended.


## `output.library`

`string` or `object` (since webpack 3.1.0; for `libraryTarget: 'umd'`)

How the value of the `output.library` is used depends on the value of the [`output.libraryTarget`](#output-librarytarget) option; please refer to that section for the complete details. Note that the default option for `output.libraryTarget` is `var`, so if the following configuration option is used:

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    library: 'MyLibrary'
  }
};
```

The variable `MyLibrary` will be bound with the return value of your entry file, if the resulting output is included as a script tag in an HTML page.

W> Note that if an `array` is provided as an `entry` point, only the last module in the array will be exposed. If an `object` is provided, it can be exposed using an `array` syntax (see [this example](https://github.com/webpack/webpack/tree/master/examples/multi-part-library) for details).

T> Read the [authoring libraries guide](/guides/author-libraries) guide for more information on `output.library` as well as `output.libraryTarget`.


## `output.libraryExport`

`string | string[]`

Configure which module or modules will be exposed via the `libraryTarget`. It is `undefined` by default, same behaviour will be applied if you set `libraryTarget` to an empty string e.g. `''` it will export the whole (namespace) object. The examples below demonstrate the effect of this config when using `libraryTarget: 'var'`.

The following configurations are supported:

`libraryExport: 'default'` - The __default export of your entry point__ will be assigned to the library target:

```javascript
// if your entry has a default export of `MyDefaultModule`
var MyDefaultModule = _entry_return_.default;
```

`libraryExport: 'MyModule'` - The __specified module__ will be assigned to the library target:

```javascript
var MyModule = _entry_return_.MyModule;
```

`libraryExport: ['MyModule', 'MySubModule']` - The array is interpreted as a __path to a module__ to be assigned to the library target:

```javascript
var MySubModule = _entry_return_.MyModule.MySubModule;
```

With the `libraryExport` configurations specified above, the resulting libraries could be utilized as such:

```javascript
MyDefaultModule.doSomething();
MyModule.doSomething();
MySubModule.doSomething();
```


## `output.libraryTarget`

`string: 'var'`

Configure how the library will be exposed. Any one of the following options can be used. Please note that this option works in conjunction with the value assigned to [`output.library`](#output-library). For the following examples, it is assumed that this value is configured as `MyLibrary`.

T> Note that `_entry_return_` in the example code below is the value returned by the entry point. In the bundle itself, it is the output of the function that is generated by webpack from the entry point.

### Expose a Variable

These options assign the return value of the entry point (e.g. whatever the entry point exported) to the name provided by `output.library` at whatever scope the bundle was included at.

`libraryTarget: 'var'` - (default) When your library is loaded, the __return value of your entry point__ will be assigned to a variable:

```javascript
var MyLibrary = _entry_return_;

// In a separate script...
MyLibrary.doSomething();
```

W> When using this option, an empty `output.library` will result in no assignment.


`libraryTarget: 'assign'` - This will generate an implied global which has the potential to reassign an existing value (use with caution).

```javascript
MyLibrary = _entry_return_;
```

Be aware that if `MyLibrary` isn't defined earlier your library will be set in global scope.

W> When using this option, an empty `output.library` will result in a broken output bundle.


### Expose Via Object Assignment

These options assign the return value of the entry point (e.g. whatever the entry point exported) to a specific object under the name defined by `output.library`.

If `output.library` is not assigned a non-empty string, the default behavior is that all properties returned by the entry point will be assigned to the object as defined for the particular `output.libraryTarget`, via the following code fragment:

```javascript
(function(e, a) { for(var i in a) { e[i] = a[i]; } }(output.libraryTarget, _entry_return_));
```

W> Note that not setting a `output.library` will cause all properties returned by the entry point to be assigned to the given object; there are no checks against existing property names.

`libraryTarget: "this"` - The __return value of your entry point__ will be assigned to this under the property named by `output.library`. The meaning of `this` is up to you:

```javascript
this['MyLibrary'] = _entry_return_;

// In a separate script...
this.MyLibrary.doSomething();
MyLibrary.doSomething(); // if this is window
```

`libraryTarget: 'window'` - The __return value of your entry point__ will be assigned to the `window` object using the `output.library` value.

```javascript
window['MyLibrary'] = _entry_return_;

window.MyLibrary.doSomething();
```


`libraryTarget: 'global'` - The __return value of your entry point__ will be assigned to the `global` object using the `output.library` value.

```javascript
global['MyLibrary'] = _entry_return_;

global.MyLibrary.doSomething();
```


`libraryTarget: 'commonjs'` - The __return value of your entry point__ will be assigned to the `exports` object using the `output.library` value. As the name implies, this is used in CommonJS environments.

```javascript
exports['MyLibrary'] = _entry_return_;

require('MyLibrary').doSomething();
```

### Module Definition Systems

These options will result in a bundle that comes with a more complete header to ensure compatibility with various module systems. The `output.library` option will take on a different meaning under the following `output.libraryTarget` options.


`libraryTarget: 'commonjs2'` - The __return value of your entry point__ will be assigned to the `module.exports`. As the name implies, this is used in CommonJS environments:

```javascript
module.exports = _entry_return_;

require('MyLibrary').doSomething();
```

Note that `output.library` is omitted, thus it is not required for this particular `output.libraryTarget`.

T> Wondering the difference between CommonJS and CommonJS2 is? While they are similar, there are some subtle differences between them that are not usually relevant in the context of webpack. (For further details, please [read this issue](https://github.com/webpack/webpack/issues/1114).)


`libraryTarget: 'amd'` - This will expose your library as an AMD module.

AMD modules require that the entry chunk (e.g. the first script loaded by the `<script>` tag) be defined with specific properties, such as `define` and `require` which is typically provided by RequireJS or any compatible loaders (such as almond). Otherwise, loading the resulting AMD bundle directly will result in an error like `define is not defined`.

So, with the following configuration...

```javascript
module.exports = {
  //...
  output: {
    library: 'MyLibrary',
    libraryTarget: 'amd'
  }
};
```

The generated output will be defined with the name "MyLibrary", i.e.

```javascript
define('MyLibrary', [], function() {
  return _entry_return_;
});
```

The bundle can be included as part of a script tag, and the bundle can be invoked like so:

```javascript
require(['MyLibrary'], function(MyLibrary) {
  // Do something with the library...
});
```

If `output.library` is undefined, the following is generated instead.

```javascript
define([], function() {
  return _entry_return_;
});
```

This bundle will not work as expected, or not work at all (in the case of the almond loader) if loaded directly with a `<script>` tag. It will only work through a RequireJS compatible asynchronous module loader through the actual path to that file, so in this case, the `output.path` and `output.filename` may become important for this particular setup if these are exposed directly on the server.


`libraryTarget: 'amd-require'` - This packages your output with an immediately-executed AMD `require(dependencies, factory)` wrapper.

The `'amd-require'` target allows for the use of AMD dependencies without needing a separate later invocation. As with the `'amd'` target, this depends on the appropriate [`require` function](https://github.com/amdjs/amdjs-api/blob/master/require.md) being available in the environment in which the webpack output is loaded.

With this target, the library name is ignored.


`libraryTarget: 'umd'` - This exposes your library under all the module definitions, allowing it to work with CommonJS, AMD and as global variable. Take a look at the [UMD Repository](https://github.com/umdjs/umd) to learn more.

In this case, you need the `library` property to name your module:

```javascript
module.exports = {
  //...
  output: {
    library: 'MyLibrary',
    libraryTarget: 'umd'
  }
};
```

And finally the output is:

```javascript
(function webpackUniversalModuleDefinition(root, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if(typeof define === 'function' && define.amd)
    define([], factory);
  else if(typeof exports === 'object')
    exports['MyLibrary'] = factory();
  else
    root['MyLibrary'] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
  return _entry_return_;
});
```

Note that omitting `library` will result in the assignment of all properties returned by the entry point be assigned directly to the root object, as documented under the [object assignment section](#expose-via-object-assignment). Example:

```javascript
module.exports = {
  //...
  output: {
    libraryTarget: 'umd'
  }
};
```

The output will be:

```javascript
(function webpackUniversalModuleDefinition(root, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if(typeof define === 'function' && define.amd)
    define([], factory);
  else {
    var a = factory();
    for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
  }
})(typeof self !== 'undefined' ? self : this, function() {
  return _entry_return_;
});
```

Since webpack 3.1.0, you may specify an object for `library` for differing names per targets:

```javascript
module.exports = {
  //...
  output: {
    library: {
      root: 'MyLibrary',
      amd: 'my-library',
      commonjs: 'my-common-library'
    },
    libraryTarget: 'umd'
  }
};
```

Module proof library.


### Other Targets

`libraryTarget: 'jsonp'` - This will wrap the return value of your entry point into a jsonp wrapper.

``` javascript
MyLibrary(_entry_return_);
```

The dependencies for your library will be defined by the [`externals`](/configuration/externals/) config.


## `output.path`

`string`

The output directory as an __absolute__ path.

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    path: path.resolve(__dirname, 'dist/assets')
  }
};
```

Note that `[hash]` in this parameter will be replaced with an hash of the compilation. See the [Caching guide](/guides/caching) for details.


## `output.pathinfo`

`boolean`

Tells webpack to include comments in bundles with information about the contained modules. This option defaults to `true` in `development` and `false` in `production` [mode](/concepts/mode/) respectively.

W> While the data this comments can provide is very useful during development when reading the generated code, it __should not__ be used in production.

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    pathinfo: true
  }
};
```

Note it also adds some info about tree shaking to the generated bundle.


## `output.publicPath`

`string: ''` `function`

This is an important option when using on-demand-loading or loading external resources like images, files, etc. If an incorrect value is specified you'll receive 404 errors while loading these resources.

This option specifies the __public URL__ of the output directory when referenced in a browser. A relative URL is resolved relative to the HTML page (or `<base>` tag). Server-relative URLs, protocol-relative URLs or absolute URLs are also possible and sometimes required, i. e. when hosting assets on a CDN.

The value of the option is prefixed to every URL created by the runtime or loaders. Because of this __the value of this option ends with `/`__ in most cases.

Simple rule: The URL of your [`output.path`](#output-path) from the view of the HTML page.

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    path: path.resolve(__dirname, 'public/assets'),
    publicPath: 'https://cdn.example.com/assets/'
  }
};
```

For this configuration:

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    publicPath: '/assets/',
    chunkFilename: '[id].chunk.js'
  }
};
```

A request to a chunk will look like `/assets/4.chunk.js`.

A loader outputting HTML might emit something like this:

```html
<link href="/assets/spinner.gif" />
```

or when loading an image in CSS:

```css
background-image: url(/assets/spinner.gif);
```

The webpack-dev-server also takes a hint from `publicPath`, using it to determine where to serve the output files from.

Note that `[hash]` in this parameter will be replaced with an hash of the compilation. See the [Caching guide](/guides/caching) for details.

Examples:

```javascript
module.exports = {
  //...
  output: {
    // One of the below
    publicPath: 'https://cdn.example.com/assets/', // CDN (always HTTPS)
    publicPath: '//cdn.example.com/assets/', // CDN (same protocol)
    publicPath: '/assets/', // server-relative
    publicPath: 'assets/', // relative to HTML page
    publicPath: '../assets/', // relative to HTML page
    publicPath: '', // relative to HTML page (same directory)
  }
};
```

In cases where the `publicPath` of output files can't be known at compile time, it can be left blank and set dynamically at runtime in the entry file using the [free variable](https://stackoverflow.com/questions/12934929/what-are-free-variables) `__webpack_public_path__`.

```javascript
__webpack_public_path__ = myRuntimePublicPath;

// rest of your application entry
```

See [this discussion](https://github.com/webpack/webpack/issues/2776#issuecomment-233208623) for more information on `__webpack_public_path__`.


## `output.sourceMapFilename`

`string`

This option is only used when [`devtool`](/configuration/devtool) uses a SourceMap option which writes an output file.

Configure how source maps are named. By default `'[file].map'` is used.

The `[name]`, `[id]`, `[hash]` and `[chunkhash]` substitutions from [#output-filename](#output-filename) can be used. In addition to those, you can use substitutions listed below. The `[file]` placeholder is replaced with the filename of the original file. We recommend __only using the `[file]` placeholder__, as the other placeholders won't work when generating SourceMaps for non-chunk files.

| Template                   | Description                                                                         |
| -------------------------- | ----------------------------------------------------------------------------------- |
| [file]                     | The module filename                                                                 |
| [filebase]                 | The module [basename](https://nodejs.org/api/path.html#path_path_basename_path_ext) |


## `output.sourcePrefix`

`string`

Change the prefix for each line in the output bundles.

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    sourcePrefix: '\t'
  }
};
```

Note by default an empty string is used. Using some kind of indentation makes bundles look more pretty, but will cause issues with multi-line strings.

There is no need to change it.


## `output.strictModuleExceptionHandling`

`boolean`

Tell webpack to remove a module from the module instance cache (`require.cache`) if it throws an exception when it is `require`d.

It defaults to `false` for performance reasons.

When set to `false`, the module is not removed from cache, which results in the exception getting thrown only on the first `require` call (making it incompatible with node.js).

For instance, consider `module.js`:

```javascript
throw new Error('error');
```

With `strictModuleExceptionHandling` set to `false`, only the first `require` throws an exception:

```javascript
// with strictModuleExceptionHandling = false
require('module'); // <- throws
require('module'); // <- doesn't throw
```

Instead, with `strictModuleExceptionHandling` set to `true`, all `require`s of this module throw an exception:

```javascript
// with strictModuleExceptionHandling = true
require('module'); // <- throws
require('module'); // <- also throws
```


## `output.umdNamedDefine`

`boolean`

When using `libraryTarget: "umd"`, setting:

```javascript
module.exports = {
  //...
  output: {
    umdNamedDefine: true
  }
};
```

will name the AMD module of the UMD build. Otherwise an anonymous `define` is used.


# Module

These options determine how the [different types of modules](/concepts/modules) within a project will be treated.


## `module.noParse`

`RegExp | [RegExp] | function | string | [string]`

Prevent webpack from parsing any files matching the given regular expression(s). Ignored files __should not__ have calls to `import`, `require`, `define` or any other importing mechanism. This can boost build performance when ignoring large libraries.

__webpack.config.js__

```javascript
module.exports = {
  //...
  module: {
    noParse: /jquery|lodash/,
  }
};
```

```javascript
module.exports = {
  //...
  module: {
    noParse: (content) => /jquery|lodash/.test(content)
  }
};
```


## `module.rules`

`[Rule]`

An array of [Rules](#rule) which are matched to requests when modules are created. These rules can modify how the module is created. They can apply loaders to the module, or modify the parser.


## Rule

`object`

A Rule can be separated into three parts — Conditions, Results and nested Rules.


### Rule Conditions

There are two input values for the conditions:

1. The resource: An absolute path to the file requested. It's already resolved according to the [`resolve` rules](/configuration/resolve).

2. The issuer: An absolute path to the file of the module which requested the resource. It's the location of the import.

__Example:__ When we `import './style.css'` within `app.js`, the resource is `/path/to/style.css` and the issuer is `/path/to/app.js`.

In a Rule the properties [`test`](#rule-test), [`include`](#rule-include), [`exclude`](#rule-exclude) and [`resource`](#rule-resource) are matched with the resource and the property [`issuer`](#rule-issuer) is matched with the issuer.

When using multiple conditions, all conditions must match.

W> Be careful! The resource is the _resolved_ path of the file, which means symlinked resources are the real path _not_ the symlink location. This is good to remember when using tools that symlink packages (like `npm link`), common conditions like `/node_modules/` may inadvertently miss symlinked files. Note that you can turn off symlink resolving (so that resources are resolved to the symlink path) via [`resolve.symlinks`](/configuration/resolve#resolve-symlinks).


### Rule results

Rule results are used only when the Rule condition matches.

There are two output values of a Rule:

1. Applied loaders: An array of loaders applied to the resource.
2. Parser options: An options object which should be used to create the parser for this module.

These properties affect the loaders: [`loader`](#rule-loader), [`options`](#rule-options-rule-query), [`use`](#rule-use).

For compatibility also these properties: [`query`](#rule-options-rule-query), [`loaders`](#rule-loaders).

The [`enforce`](#rule-enforce) property affects the loader category. Whether it's a normal, pre- or post- loader.

The [`parser`](#rule-parser) property affects the parser options.


## Nested rules

Nested rules can be specified under the properties [`rules`](#rule-rules) and [`oneOf`](#rule-oneof).

These rules are evaluated when the Rule condition matches.


## `Rule.enforce`

`string`

Possible values: `'pre' | 'post'`

Specifies the category of the loader. No value means normal loader.

There is also an additional category "inlined loader" which are loaders applied inline of the import/require.

There are two phases that all loaders enter one after the other:

1. __Pitching__ phase: the pitch method on loaders is called in the order `post, inline, normal, pre`. See [Pitching Loader](/api/loaders/#pitching-loader) for details.
2. __Normal__ phase: the normal method on loaders is executed in the order `pre, normal, inline, post`. Transformation on the source code of a module happens in this phase.

All normal loaders can be omitted (overridden) by prefixing `!` in the request.

All normal and pre loaders can be omitted (overridden) by prefixing `-!` in the request.

All normal, post and pre loaders can be omitted (overridden) by prefixing `!!` in the request.

Inline loaders and `!` prefixes should not be used as they are non-standard. They may be use by loader generated code.


## `Rule.exclude`

`Rule.exclude` is a shortcut to `Rule.resource.exclude`. If you supply a `Rule.exclude` option, you cannot also supply a `Rule.resource`. See [`Rule.resource`](#rule-resource) and [`Condition.exclude`](#condition) for details.


## `Rule.include`

`Rule.include` is a shortcut to `Rule.resource.include`. If you supply a `Rule.include` option, you cannot also supply a `Rule.resource`. See [`Rule.resource`](#rule-resource) and [`Condition.include`](#condition) for details.


## `Rule.issuer`

A [`Condition`](#condition) to match against the module that issued the request. In the following example, the `issuer` for the `a.js` request would be the path to the `index.js` file.

__index.js__

```javascript
import A from './a.js';
```

This option can be used to apply loaders to the dependencies of a specific module or set of modules.


## `Rule.loader`

`Rule.loader` is a shortcut to `Rule.use: [ { loader } ]`. See [`Rule.use`](#rule-use) and [`UseEntry.loader`](#useentry) for details.


## `Rule.loaders`

W> This option is __deprecated__ in favor of `Rule.use`.

`Rule.loaders` is an alias to `Rule.use`. See [`Rule.use`](#rule-use) for details.


## `Rule.oneOf`

An array of [`Rules`](#rule) from which only the first matching Rule is used when the Rule matches.

__webpack.config.js__

```javascript
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.css$/,
        oneOf: [
          {
            resourceQuery: /inline/, // foo.css?inline
            use: 'url-loader'
          },
          {
            resourceQuery: /external/, // foo.css?external
            use: 'file-loader'
          }
        ]
      }
    ]
  }
};
```

## `Rule.options` / `Rule.query`

`Rule.options` and `Rule.query` are shortcuts to `Rule.use: [ { options } ]`. See [`Rule.use`](#rule-use) and [`UseEntry.options`](#useentry) for details.

W> `Rule.query` is deprecated in favor of `Rule.options` and `UseEntry.options`.


## `Rule.parser`

An object with parser options. All applied parser options are merged.

Parsers may inspect these options and disable or reconfigure themselves accordingly. Most of the default plugins interpret the values as follows:

- Setting the option to `false` disables the parser.
- Setting the option to `true` or leaving it `undefined` enables the parser.

However, parser plugins may accept more than just a boolean. For example, the internal `NodeStuffPlugin` can accept an object instead of `true` to add additional options for a particular Rule.

__Examples__ (parser options by the default plugins):

```js-with-links
module.exports = {
  //...
  module: {
    rules: [
      {
        //...
        parser: {
          amd: false, // disable AMD
          commonjs: false, // disable CommonJS
          system: false, // disable SystemJS
          harmony: false, // disable ES2015 Harmony import/export
          requireInclude: false, // disable require.include
          requireEnsure: false, // disable require.ensure
          requireContext: false, // disable require.context
          browserify: false, // disable special handling of Browserify bundles
          requireJs: false, // disable requirejs.*
          node: false, // disable __dirname, __filename, module, require.extensions, require.main, etc.
          node: {...} // reconfigure [node](/configuration/node) layer on module level
        }
      }
    ]
  }
}
```


## `Rule.resource`

A [`Condition`](#condition) matched with the resource. You can either supply a `Rule.resource` option or use the shortcut options `Rule.test`, `Rule.exclude`, and `Rule.include`. See details in [`Rule` conditions](#rule-conditions).


## `Rule.resourceQuery`

A [`Condition`](#condition) matched with the resource query. This option is used to test against the query section of a request string (i.e. from the question mark onwards). If you were to `import Foo from './foo.css?inline'`, the following condition would match:

__webpack.config.js__

```javascript
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.css$/,
        resourceQuery: /inline/,
        use: 'url-loader'
      }
    ]
  }
};
```


## `Rule.rules`

An array of [`Rules`](#rule) that is also used when the Rule matches.


## `Rule.sideEffects`

`bool`

Indicate what parts of the module contain side effects. See [Tree Shaking](/guides/tree-shaking/#mark-the-file-as-side-effect-free) for details.


## `Rule.test`

`Rule.test` is a shortcut to `Rule.resource.test`. If you supply a `Rule.test` option, you cannot also supply a `Rule.resource`. See [`Rule.resource`](#rule-resource) and [`Condition.test`](#condition) for details.


## `Rule.type`

`string`

Possible values: `'javascript/auto' | 'javascript/dynamic' | 'javascript/esm' | 'json' | 'webassembly/experimental'`

`Rule.type` sets the type for a matching module. This prevents defaultRules and their default importing behaviors from occurring. For example, if you want to load a `.json` file through a custom loader, you'd need to set the `type` to `javascript/auto` to bypass webpack's built-in json importing. (See [v4.0 changelog](https://github.com/webpack/webpack/releases/tag/v4.0.0) for more details)

__webpack.config.js__

```javascript
module.exports = {
  //...
  module: {
    rules: [
      //...
      {
        test: /\.json$/,
        type: 'javascript/auto',
        loader: 'custom-json-loader'
      }
    ]
  }
};
```


## `Rule.use`

A list of [UseEntries](#useentry) which are applied to modules. Each entry specifies a loader to be used.

Passing a string (i.e. `use: [ 'style-loader' ]`) is a shortcut to the loader property (i.e. `use: [ { loader: 'style-loader '} ]`).

Loaders can be chained by passing multiple loaders, which will be applied from right to left (last to first configured).

__webpack.config.js__

```javascript
module.exports = {
  //...
  module: {
    rules: [
      {
        //...
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'less-loader',
            options: {
              noIeCompat: true
            }
          }
        ]
      }
    ]
  }
};
```

See [UseEntry](#useentry) for details.


## `Condition`

Conditions can be one of these:

- A string: To match the input must start with the provided string. I. e. an absolute directory path, or absolute path to the file.
- A RegExp: It's tested with the input.
- A function: It's called with the input and must return a truthy value to match.
- An array of Conditions: At least one of the Conditions must match.
- An object: All properties must match. Each property has a defined behavior.

`{ test: Condition }`: The Condition must match. The convention is to provide a RegExp or array of RegExps here, but it's not enforced.

`{ include: Condition }`: The Condition must match. The convention is to provide a string or array of strings here, but it's not enforced.

`{ exclude: Condition }`: The Condition must NOT match. The convention is to provide a string or array of strings here, but it's not enforced.

`{ and: [Condition] }`: All Conditions must match.

`{ or: [Condition] }`: Any Condition must match.

`{ not: [Condition] }`: All Conditions must NOT match.

__Example:__

```javascript
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'app/styles'),
          path.resolve(__dirname, 'vendor/styles')
        ]
      }
    ]
  }
};
```


## `UseEntry`

`object`

It must have a `loader` property being a string. It is resolved relative to the configuration [`context`](/configuration/entry-context#context) with the loader resolving options ([resolveLoader](/configuration/resolve#resolveloader)).

It can have an `options` property being a string or object. This value is passed to the loader, which should interpret it as loader options.

For compatibility a `query` property is also possible, which is an alias for the `options` property. Use the `options` property instead.

__webpack.config.js__

```javascript
module.exports = {
  //...
  module: {
    rules: [
      {
        loader: 'css-loader',
        options: {
          modules: true
        }
      }
    ]
  }
};
```

Note that webpack needs to generate a unique module identifier from the resource and all loaders including options. It tries to do this with a `JSON.stringify` of the options object. This is fine in 99.9% of cases, but may be not unique if you apply the same loaders with different options to the resource and the options have some stringified values.

It also breaks if the options object cannot be stringified (i.e. circular JSON). Because of this you can have a `ident` property in the options object which is used as unique identifier.


## Module Contexts

> Avoid using these options as they are __deprecated__ and will soon be removed.

These options describe the default settings for the context created when a dynamic dependency is encountered.

Example for an `unknown` dynamic dependency: `require`.

Example for an `expr` dynamic dependency: `require(expr)`.

Example for an `wrapped` dynamic dependency: `require('./templates/' + expr)`.

Here are the available options with their [defaults](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsDefaulter.js):

__webpack.config.js__

```javascript
module.exports = {
  //...
  module: {
    exprContextCritical: true,
    exprContextRecursive: true,
    exprContextRegExp: false,
    exprContextRequest: '.',
    unknownContextCritical: true,
    unknownContextRecursive: true,
    unknownContextRegExp: false,
    unknownContextRequest: '.',
    wrappedContextCritical: false,
    wrappedContextRecursive: true,
    wrappedContextRegExp: /.*/,
    strictExportPresence: false // since webpack 2.3.0
  }
};
```

T> You can use the `ContextReplacementPlugin` to modify these values for individual dependencies. This also removes the warning.

A few use cases:

- Warn for dynamic dependencies: `wrappedContextCritical: true`.
- `require(expr)` should include the whole directory: `exprContextRegExp: /^\.\//`
- `require('./templates/' + expr)` should not include subdirectories by default: `wrappedContextRecursive: false`
- `strictExportPresence` makes missing exports an error instead of warning


# Resolve

These options change how modules are resolved. webpack provides reasonable defaults, but it is possible to change the resolving in detail. Have a look at [Module Resolution](/concepts/module-resolution) for more explanation of how the resolver works.


## `resolve`

`object`

Configure how modules are resolved. For example, when calling `import "lodash"` in ES2015, the `resolve` options can change where webpack goes to look for `"lodash"` (see [`modules`](#resolve-modules)).


### `resolve.alias`

`object`

Create aliases to `import` or `require` certain modules more easily. For example, to alias a bunch of commonly used `src/` folders:

```js
module.exports = {
  //...
  resolve: {
    alias: {
      Utilities: path.resolve(__dirname, 'src/utilities/'),
      Templates: path.resolve(__dirname, 'src/templates/')
    }
  }
};
```

Now, instead of using relative paths when importing like so:

```js
import Utility from '../../utilities/utility';
```

you can use the alias:

```js
import Utility from 'Utilities/utility';
```

A trailing `$` can also be added to the given object's keys to signify an exact match:

```js
module.exports = {
  //...
  resolve: {
    alias: {
      xyz$: path.resolve(__dirname, 'path/to/file.js')
    }
  }
};
```

which would yield these results:

```js
import Test1 from 'xyz'; // Exact match, so path/to/file.js is resolved and imported
import Test2 from 'xyz/file.js'; // Not an exact match, normal resolution takes place
```

The following table explains other cases:

| `alias:`                            | `import "xyz"`                        | `import "xyz/file.js"`              |
| ----------------------------------- | ------------------------------------- | ----------------------------------- |
| `{}`                                | `/abc/node_modules/xyz/index.js`      | `/abc/node_modules/xyz/file.js`     |
| `{ xyz: "/abs/path/to/file.js" }`   | `/abs/path/to/file.js`                | error                               |
| `{ xyz$: "/abs/path/to/file.js" }`  | `/abs/path/to/file.js`                | `/abc/node_modules/xyz/file.js`     |
| `{ xyz: "./dir/file.js" }`          | `/abc/dir/file.js`                    | error                               |
| `{ xyz$: "./dir/file.js" }`         | `/abc/dir/file.js`                    | `/abc/node_modules/xyz/file.js`     |
| `{ xyz: "/some/dir" }`              | `/some/dir/index.js`                  | `/some/dir/file.js`                 |
| `{ xyz$: "/some/dir" }`             | `/some/dir/index.js`                  | `/abc/node_modules/xyz/file.js`     |
| `{ xyz: "./dir" }`                  | `/abc/dir/index.js`                   | `/abc/dir/file.js`                  |
| `{ xyz: "modu" }`                   | `/abc/node_modules/modu/index.js`     | `/abc/node_modules/modu/file.js`    |
| `{ xyz$: "modu" }`                  | `/abc/node_modules/modu/index.js`     | `/abc/node_modules/xyz/file.js`     |
| `{ xyz: "modu/some/file.js" }`      | `/abc/node_modules/modu/some/file.js` | error                               |
| `{ xyz: "modu/dir" }`               | `/abc/node_modules/modu/dir/index.js` | `/abc/node_modules/dir/file.js`     |
| `{ xyz: "xyz/dir" }`                | `/abc/node_modules/xyz/dir/index.js`  | `/abc/node_modules/xyz/dir/file.js` |
| `{ xyz$: "xyz/dir" }`               | `/abc/node_modules/xyz/dir/index.js`  | `/abc/node_modules/xyz/file.js`     |

`index.js` may resolve to another file if defined in the `package.json`.

`/abc/node_modules` may resolve in `/node_modules` too.


### `resolve.aliasFields`

`array`

Specify a field, such as `browser`, to be parsed according to [this specification](https://github.com/defunctzombie/package-browser-field-spec). Default:

```js
module.exports = {
  //...
  resolve: {
    aliasFields: ['browser']
  }
};
```


### `resolve.cacheWithContext`

`boolean` (since webpack 3.1.0)

If unsafe cache is enabled, includes `request.context` in the cache key. This option is taken into account by the [`enhanced-resolve`](https://github.com/webpack/enhanced-resolve/) module. Since webpack 3.1.0 context in resolve caching is ignored when resolve or resolveLoader plugins are provided. This addresses a performance regression.


### `resolve.descriptionFiles`

`array`

The JSON files to use for descriptions. Default:

```js
module.exports = {
  //...
  resolve: {
    descriptionFiles: ['package.json']
  }
};
```


### `resolve.enforceExtension`

`boolean`

If `true`, it will not allow extension-less files. So by default `require('./foo')` works if `./foo` has a `.js` extension, but with this enabled only `require('./foo.js')` will work. Default:

```js
module.exports = {
  //...
  resolve: {
    enforceExtension: false
  }
};
```


### `resolve.enforceModuleExtension`

`boolean`

Whether to require to use an extension for modules (e.g. loaders). Default:

```js
module.exports = {
  //...
  resolve: {
    enforceModuleExtension: false
  }
};
```


### `resolve.extensions`

`array`

Automatically resolve certain extensions. This defaults to:

```js
module.exports = {
  //...
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json']
  }
};
```

which is what enables users to leave off the extension when importing:

```js
import File from '../path/to/file';
```

W> Using this will __override the default array__, meaning that webpack will no longer try to resolve modules using the default extensions. For modules that are imported with their extension, e.g. `import SomeFile from "./somefile.ext"`, to be properly resolved, a string containing "\*" must be included in the array.


### `resolve.mainFields`

`array`

When importing from an npm package, e.g. `import * as D3 from "d3"`, this option will determine which fields in its `package.json` are checked. The default values will vary based upon the [`target`](/concepts/targets) specified in your webpack configuration.

When the `target` property is set to `webworker`, `web`, or left unspecified:


```js
module.exports = {
  //...
  resolve: {
    mainFields: ['browser', 'module', 'main']
  }
};
```

For any other target (including `node`):

```js
module.exports = {
  //...
  resolve: {
    mainFields: ['module', 'main']
  }
};
```

For example, the `package.json` of [D3](https://d3js.org/) contains these fields:

```json
{
  "main": "build/d3.Node.js",
  "browser": "build/d3.js",
  "module": "index"
}
```

This means that when we `import * as D3 from "d3"` this will really resolve to the file in the `browser` property. The `browser` property takes precedence here because it's the first item in `mainFields`. Meanwhile, a Node.js application bundled by webpack will resolve by default to the file in the `module` field.


### `resolve.mainFiles`

`array`

The filename to be used while resolving directories. Default:

```js
module.exports = {
  //...
  resolve: {
    mainFiles: ['index']
  }
};
```


### `resolve.modules`

`array`

Tell webpack what directories should be searched when resolving modules.

Absolute and relative paths can both be used, but be aware that they will behave a bit differently.

A relative path will be scanned similarly to how Node scans for `node_modules`, by looking through the current directory as well as its ancestors (i.e. `./node_modules`, `../node_modules`, and on).

With an absolute path, it will only search in the given directory.

`resolve.modules` defaults to:

```js
module.exports = {
  //...
  resolve: {
    modules: ['node_modules']
  }
};
```

If you want to add a directory to search in that takes precedence over `node_modules/`:

```js
module.exports = {
  //...
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  }
};
```


### `resolve.unsafeCache`

`regex` `array` `boolean`

Enable aggressive, but __unsafe__, caching of modules. Passing `true` will cache everything. Default:

```js
module.exports = {
  //...
  resolve: {
    unsafeCache: true
  }
};
```

A regular expression, or an array of regular expressions, can be used to test file paths and only cache certain modules. For example, to only cache utilities:

```js
module.exports = {
  //...
  resolve: {
    unsafeCache: /src\/utilities/
  }
};
```

W> Changes to cached paths may cause failure in rare cases.


### `resolve.plugins`

A list of additional resolve plugins which should be applied. It allows plugins such as [`DirectoryNamedWebpackPlugin`](https://www.npmjs.com/package/directory-named-webpack-plugin).

```js
module.exports = {
  //...
  resolve: {
    plugins: [
      new DirectoryNamedWebpackPlugin()
    ]
  }
};
```


### `resolve.symlinks`

`boolean`

Whether to resolve symlinks to their symlinked location.

When enabled, symlinked resources are resolved to their _real_ path, not their symlinked location. Note that this may cause module resolution to fail when using tools that symlink packages (like `npm link`).

`resolve.symlinks` defaults to:

```js
module.exports = {
  //...
  resolve: {
    symlinks: true
  }
};
```


### `resolve.cachePredicate`

`function`

A function which decides whether a request should be cached or not. An object is passed to the function with `path` and `request` properties. Default:

```js
module.exports = {
  //...
  resolve: {
    cachePredicate: function() { return true; }
  }
};
```


## `resolveLoader`

`object`

This set of options is identical to the `resolve` property set above, but is used only to resolve webpack's [loader](/concepts/loaders) packages. Default:

```js
module.exports = {
  //...
  resolveLoader: {
    modules: [ 'node_modules' ],
    extensions: [ '.js', '.json' ],
    mainFields: [ 'loader', 'main' ]
  }
};
```

T> Note that you can use alias here and other features familiar from resolve. For example `{ txt: 'raw-loader' }` would shim `txt!templates/demo.txt` to use `raw-loader`.


### `resolveLoader.moduleExtensions`

`array`

The extensions/suffixes that are used when resolving loaders. Since version two, we [strongly recommend](/migrate/3/#automatic-loader-module-name-extension-removed) using the full name, e.g. `example-loader`, as much as possible for clarity. However, if you really wanted to exclude the `-loader` bit, i.e. just use `example`, you can use this option to do so:

```js
module.exports = {
  //...
  resolveLoader: {
    moduleExtensions: [ '-loader' ]
  }
};
```


# Optimization

Since version 4 webpack runs optimizations for you depending on the chosen  [`mode`](/concepts/mode/), still all optimizations are available for manual configuration and overrides.


## `optimization.minimize`

`boolean`

Tell webpack to minimize the bundle using the [TerserPlugin](/plugins/terser-webpack-plugin/).

This is `true` by default in `production` mode.

__webpack.config.js__


```js
module.exports = {
  //...
  optimization: {
    minimize: false
  }
};
```

T> Learn how [mode](/concepts/mode/) works.

## `optimization.minimizer`

`[TerserPlugin]`

Allows you to override the default minimizer by providing a different one or more customized [TerserPlugin](/plugins/terser-webpack-plugin/) instances.

__webpack.config.js__


```js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  //...
  optimization: {
    minimizer: [
      new TerserPlugin({ /* your config */ })
    ]
  }
};
```

## `optimization.splitChunks`

`object`

By default webpack v4+ provides new common chunks strategies out of the box for dynamically imported modules. See available options for configuring this behavior in the [SplitChunksPlugin](/plugins/split-chunks-plugin/) page.

## `optimization.runtimeChunk`

`object` `string` `boolean`

Setting `optimization.runtimeChunk` to `true` or `"multiple"` adds an additional chunk to each entrypoint containing only the runtime. This setting is an alias for:

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`
    }
  }
};
```

The value `"single"` instead creates a runtime file to be shared for all generated chunks. This setting is an alias for:

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    }
  }
};
```

By setting `optimization.runtimeChunk` to `object` it is only possible to provide the `name` property which stands for the name or name factory for the runtime chunks.

Default is `false`: each entry chunk embeds runtime.

W> Imported modules are initialized for each runtime chunk separately, so if you include multiple entry points on a page, beware of this behavior. You will probably want to set it to `single` or use another configuration that allows you to only have one runtime instance.

__webpack.config.js__


```js
module.exports = {
  //...
  optimization: {
    runtimeChunk: {
      name: entrypoint => `runtimechunk~${entrypoint.name}`
    }
  }
};
```

## `optimization.noEmitOnErrors`

`boolean`

Use the `optimization.noEmitOnErrors` to skip the emitting phase whenever there are errors while compiling. This ensures that no erroring assets are emitted. The `emitted` flag in the stats is `false` for all assets.

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    noEmitOnErrors: true
  }
};
```

W> If you are using webpack [CLI](/api/cli/), the webpack process will not exit with an error code while this plugin is enabled. If you want webpack to "fail" when using the CLI, please check out the [`bail` option](/api/cli/#advanced-options).

## `optimization.namedModules`

`boolean: false`

Tells webpack to use readable module identifiers for better debugging. When `optimization.namedModules` is not set in webpack config, webpack will enable it by default for [mode](/concepts/mode/) `development` and disable for [mode](/concepts/mode/) `production`.

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    namedModules: true
  }
};
```

## `optimization.namedChunks`

`boolean: false`

Tells webpack to use readable chunk identifiers for better debugging. This option is enabled by default for [mode](/concepts/mode/) `development` and disabled for [mode](/concepts/mode/) `production` if no option is provided in webpack config.

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    namedChunks: true
  }
};
```

## `optimization.moduleIds`

`bool: false` `string: natural, named, hashed, size, total-size`

Tells webpack which algorithm to use when choosing module ids. Setting `optimization.moduleIds` to `false` tells webpack that none of built-in algorithms should be used, as custom one can be provided via plugin. By default `optimization.moduleIds` is set to `false`.

The following string values are supported:

Option                | Description
--------------------- | -----------------------
`natural`             | Numeric ids in order of usage.
`named`               | Readable ids for better debugging.
`hashed`              | Short hashes as ids for better long term caching.
`size`                | Numeric ids focused on minimal initial download size.
`total-size`          | numeric ids focused on minimal total download size.

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    moduleIds: 'hashed'
  }
};
```

## `optimization.nodeEnv`

`string` `bool: false`

Tells webpack to set `process.env.NODE_ENV` to a given string value. `optimization.nodeEnv` uses [DefinePlugin](/plugins/define-plugin/) unless set to `false`. `optimization.nodeEnv` __defaults__ to [mode](/concepts/mode/) if set, else falls back to `"production"`.

Possible values:

- any string: the value to set `process.env.NODE_ENV` to.
- false: do not modify/set the value of `process.env.NODE_ENV`.

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    nodeEnv: 'production'
  }
};
```

## `optimization.mangleWasmImports`

`bool: false`

When set to `true` tells webpack to reduce the size of WASM by changing imports to shorter strings. It mangles module and export names.

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    mangleWasmImports: true
  }
};
```

## `optimization.removeAvailableModules`

`bool: true`

Tells webpack to detect and remove modules from chunks when these modules are already included in all parents. Setting `optimization.removeAvailableModules` to `false` will disable this optimization.

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    removeAvailableModules: false
  }
};
```

## `optimization.removeEmptyChunks`

`bool: true`

Tells webpack to detect and remove chunks which are empty. Setting `optimization.removeEmptyChunks` to `false` will disable this optimization.

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    removeEmptyChunks: false
  }
};
```

## `optimization.mergeDuplicateChunks`

`bool: true`

Tells webpack to merge chunks which contain the same modules. Setting `optimization.mergeDuplicateChunks` to `false` will disable this optimization.

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    mergeDuplicateChunks: false
  }
};
```

## `optimization.flagIncludedChunks`

`bool`

Tells webpack to determine and flag chunks which are subsets of other chunks in a way that subsets don’t have to be loaded when the bigger chunk has been already loaded. By default `optimization.flagIncludedChunks` is enabled in `production` [mode](/concepts/mode/) and disabled elsewise.

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    flagIncludedChunks: true
  }
};
```

## `optimization.occurrenceOrder`

`bool`

Tells webpack to figure out an order of modules which will result in the smallest initial bundle. By default `optimization.occurrenceOrder` is enabled in `production` [mode](/concepts/mode/) and disabled elsewise. 

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    occurrenceOrder: false
  }
};
```

## `optimization.providedExports`

`bool`

Tells webpack to figure out which exports are provided by modules to generate more efficient code for `export * from ...`. By default  `optimization.providedExports` is enabled. 

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    providedExports: false
  }
};
```

## `optimization.usedExports`

`bool`

Tells webpack to determine used exports for each module. This depends on [`optimization.providedExports`](#optimization-occurrenceorder). Information collected by `optimization.usedExports` is used by other optimizations or code generation i.e. exports are not generated for unused exports, export names are mangled to single char identifiers when all usages are compatible. 
Dead code elimination in minimizers will benefit from this and can remove unused exports.
By default `optimization.usedExports` is enabled in `production` [mode](/concepts/mode/) and disabled elsewise. 

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    usedExports: true
  }
};
```

## `optimization.concatenateModules`

`bool`

Tells webpack to find segments of the module graph which can be safely concatenated into a single module. Depends on [`optimization.providedExports`](#optimization-providedexports) and [`optimization.usedExports`](#optimization-usedexports).
By default `optimization.concatenateModules` is enabled in `production` [mode](/concepts/mode/) and disabled elsewise. 

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    concatenateModules: true
  }
};
```

## `optimization.sideEffects`

`bool`

Tells webpack to recognise the [`sideEffects`](https://github.com/webpack/webpack/blob/master/examples/side-effects/README.md) flag in `package.json` or rules to skip over modules which are flagged to contain no side effects when exports are not used. 

__package.json__

``` json
{
  "name": "awesome npm module",
  "version": "1.0.0",
  "sideEffects": false
}
```

T> Please note that `sideEffects` should be in the npm module's `package.json` file and doesn't mean that you need to set `sideEffects` to `false` in your own project's `package.json` which requires that big module.

`optimization.sideEffects` depends on [`optimization.providedExports`](#optimization-providedexports) to be enabled. This dependency has a build time cost, but eliminating modules has positive impact on performance because of less code generation. Effect of this optimization depends on your codebase, try it for possible performance wins.

By default `optimization.sideEffects` is enabled in `production` [mode](/concepts/mode/) and disabled elsewise. 

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    sideEffects: true
  }
};
```

## `optimization.portableRecords`

`bool`

`optimization.portableRecords` tells webpack to generate records with relative paths to be able to move the context folder.

By default `optimization.portableRecords` is disabled. Automatically enabled if at least one of the records options provided to webpack config: [`recordsPath`](/configuration/other-options/#recordspath), [`recordsInputPath`](/configuration/other-options/#recordsinputpath), [`recordsOutputPath`](/configuration/other-options/#recordsoutputpath).

__webpack.config.js__

```js
module.exports = {
  //...
  optimization: {
    portableRecords: true
  }
};
```


# Plugins

The `plugins` option is used to customize the webpack build process in a variety of ways. webpack comes with a variety built-in plugins available under `webpack.[plugin-name]`. See [Plugins page](/plugins) for a list of plugins and documentation but note that there are a lot more out in the community.

T> Note: This page only discusses using plugins, however if you are interested in writing your own please visit [Writing a Plugin](/development/how-to-write-a-plugin/).


## `plugins`

`array`

A list of webpack plugins. For example, [`DefinePlugin`](/plugins/define-plugin/) allows you to create global constants which can be configured at compile time. This can be useful for allowing different behavior between development builds and release builds.

```js
module.exports = {
  //...
  plugins: [
    new webpack.DefinePlugin({
      // Definitions...
    })
  ]
};
```

A more complex example, using multiple plugins, might look something like this:

```js
var webpack = require('webpack');
// importing plugins that do not come by default in webpack
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');

// adding plugins to your configuration
module.exports = {
  //...
  plugins: [
    new ExtractTextPlugin({
      filename: 'build.min.css',
      allChunks: true,
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // compile time plugins
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    // webpack-dev-server enhancement plugins
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
};
```


# DevServer

[webpack-dev-server](https://github.com/webpack/webpack-dev-server) can be used to quickly develop an application. See the [development guide](/guides/development/) to get started.

This page describes the options that affect the behavior of webpack-dev-server (short: dev-server).

T> Options that are compatible with [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) have 🔑 next to them.


## `devServer`

`object`

This set of options is picked up by [webpack-dev-server](https://github.com/webpack/webpack-dev-server) and can be used to change its behavior in various ways. Here's a simple example that gzips and serves everything from our `dist/` directory in the project root:

__webpack.config.js__

```javascript
var path = require('path');

module.exports = {
  //...
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};
```

When the server is started, there will be a message prior to the list of resolved modules:

```bash
http://localhost:9000/
webpack output is served from /build/
Content not from webpack is served from /path/to/dist/
```

that will give some background on where the server is located and what it's serving.

If you're using dev-server through the Node.js API, the options in `devServer` will be ignored. Pass the options as a second parameter instead: `new WebpackDevServer(compiler, {...})`. [See here](https://github.com/webpack/webpack-dev-server/tree/master/examples/api/simple) for an example of how to use webpack-dev-server through the Node.js API.

W> Be aware that when [exporting multiple configurations](/configuration/configuration-types/#exporting-multiple-configurations) only the `devServer` options for the first configuration will be taken into account and used for all the configurations in the array.

T> If you're having trouble, navigating to the `/webpack-dev-server` route will show where files are served. For example, `http://localhost:9000/webpack-dev-server`.

## `devServer.after`

`function (app, server)`

Provides the ability to execute custom middleware after all other middleware
internally within the server.

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    after: function(app, server) {
      // do fancy stuff
    }
  }
};
```

## `devServer.allowedHosts`

`array`

This option allows you to whitelist services that are allowed to access the dev server.

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    allowedHosts: [
      'host.com',
      'subdomain.host.com',
      'subdomain2.host.com',
      'host2.com'
    ]
  }
};
```

Mimicking django's `ALLOWED_HOSTS`, a value beginning with `.` can be used as a subdomain wildcard. `.host.com` will match `host.com`, `www.host.com`, and any other subdomain of `host.com`.

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    // this achieves the same effect as the first example
    // with the bonus of not having to update your config
    // if new subdomains need to access the dev server
    allowedHosts: [
      '.host.com',
      'host2.com'
    ]
  }
};
```

To use this option with the CLI pass the `--allowed-hosts` option a comma-delimited string.

```bash
webpack-dev-server --entry /entry/file --output-path /output/path --allowed-hosts .host.com,host2.com
```

## `devServer.before`

`function (app, server)`

Provides the ability to execute custom middleware prior to all other middleware
internally within the server. This could be used to define custom handlers, for
example:

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    before: function(app, server) {
      app.get('/some/path', function(req, res) {
        res.json({ custom: 'response' });
      });
    }
  }
};
```

## `devServer.bonjour`

This option broadcasts the server via [ZeroConf](http://www.zeroconf.org/) networking on start

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    bonjour: true
  }
};
```

Usage via the CLI

```bash
webpack-dev-server --bonjour
```


## `devServer.clientLogLevel`

`string: 'none' | 'info' | 'error' | 'warning'`

When using _inline mode_, the console in your DevTools will show you messages e.g. before reloading, before an error or when [Hot Module Replacement](/concepts/hot-module-replacement/) is enabled. Defaults to `info`.

`devServer.clientLogLevel` may be too verbose, you can turn logging off by setting it to  `'none'`.

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    clientLogLevel: 'none'
  }
};
```

Usage via the CLI

```bash
webpack-dev-server --client-log-level none
```

## `devServer.color` - CLI only

`boolean`

Enables/Disables colors on the console.

```bash
webpack-dev-server --color
```


## `devServer.compress`

`boolean`

Enable [gzip compression](https://betterexplained.com/articles/how-to-optimize-your-site-with-gzip-compression/) for everything served:

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    compress: true
  }
};
```

Usage via the CLI

```bash
webpack-dev-server --compress
```


## `devServer.contentBase`

`boolean: false` `string` `[string]` `number`

Tell the server where to serve content from. This is only necessary if you want to serve static files. [`devServer.publicPath`](#devserver-publicpath-) will be used to determine where the bundles should be served from, and takes precedence.

T> It is recommended to use an absolute path.

By default it will use your current working directory to serve content. To disable `contentBase` set it to `false`.

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    contentBase: path.join(__dirname, 'public')
  }
};
```

It is also possible to serve from multiple directories:

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'assets')]
  }
};
```

Usage via the CLI

```bash
webpack-dev-server --content-base /path/to/content/dir
```


## `devServer.disableHostCheck`

`boolean`

When set to `true` this option bypasses host checking. __THIS IS NOT RECOMMENDED__ as apps that do not check the host are vulnerable to DNS rebinding attacks.

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    disableHostCheck: true
  }
};
```

Usage via the CLI

```bash
webpack-dev-server --disable-host-check
```


## `devServer.filename` 🔑

`string`

This option lets you reduce the compilations in [lazy mode](#devserver-lazy-).
By default in [lazy mode](#devserver-lazy-), every request results in a new compilation. With `filename`, it's possible to only compile when a certain file is requested.

If [`output.filename`](/configuration/output/#output-filename) is set to `'bundle.js'` and `devServer.filename` is used like this:

__webpack.config.js__

```javascript
module.exports = {
  //...
  output: {
    filename: 'bundle.js'
  },
  devServer: {
    lazy: true,
    filename: 'bundle.js'
  }
};
```

It will now only compile the bundle when `/bundle.js` is requested.

T> `filename` has no effect when used without [lazy mode](#devserver-lazy-).


## `devServer.headers` 🔑

`object`

Adds headers to all responses:

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    headers: {
      'X-Custom-Foo': 'bar'
    }
  }
};
```


## `devServer.historyApiFallback`

`boolean` `object`

When using the [HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History), the `index.html` page will likely have to be served in place of any `404` responses. `devServer.historyApiFallback` is disabled by default. Enable it by passing:

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    historyApiFallback: true
  }
};
```

By passing an object this behavior can be controlled further using options like `rewrites`:

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/views/landing.html' },
        { from: /^\/subpage/, to: '/views/subpage.html' },
        { from: /./, to: '/views/404.html' }
      ]
    }
  }
};
```

When using dots in your path (common with Angular), you may need to use the `disableDotRule`:

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    historyApiFallback: {
      disableDotRule: true
    }
  }
};
```

Usage via the CLI

```bash
webpack-dev-server --history-api-fallback
```

For more options and information, see the [connect-history-api-fallback](https://github.com/bripkens/connect-history-api-fallback) documentation.


## `devServer.host`

`string`

Specify a host to use. By default this is `localhost`. If you want your server to be accessible externally, specify it like this:

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    host: '0.0.0.0'
  }
};
```

Usage via the CLI

```bash
webpack-dev-server --host 0.0.0.0
```


## `devServer.hot`

`boolean`

Enable webpack's [Hot Module Replacement](/concepts/hot-module-replacement/) feature:

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    hot: true
  }
};
```

T> Note that [`webpack.HotModuleReplacementPlugin`](/plugins/hot-module-replacement-plugin/) is required to fully enable HMR. If `webpack` or `webpack-dev-server` are launched with the `--hot` option, this plugin will be added automatically, so you may not need to add this to your `webpack.config.js`. See the [HMR concepts page](/concepts/hot-module-replacement/) for more information.


## `devServer.hotOnly`

`boolean`

Enables Hot Module Replacement (see [`devServer.hot`](#devserver-hot)) without page refresh as fallback in case of build failures.

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    hotOnly: true
  }
};
```

Usage via the CLI

```bash
webpack-dev-server --hot-only
```


## `devServer.https`

`boolean` `object`

By default dev-server will be served over HTTP. It can optionally be served over HTTP/2 with HTTPS:

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    https: true
  }
};
```

With the above setting a self-signed certificate is used, but you can provide your own:

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    https: {
      key: fs.readFileSync('/path/to/server.key'),
      cert: fs.readFileSync('/path/to/server.crt'),
      ca: fs.readFileSync('/path/to/ca.pem'),
    }
  }
};
```

This object is passed straight to Node.js HTTPS module, so see the [HTTPS documentation](https://nodejs.org/api/https.html) for more information.

Usage via the CLI

```bash
webpack-dev-server --https
```

To pass your own certificate via the CLI use the following options

```bash
webpack-dev-server --https --key /path/to/server.key --cert /path/to/server.crt --cacert /path/to/ca.pem
```

## `devServer.index`

`string`

The filename that is considered the index file.

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    index: 'index.html'
  }
};
```


## `devServer.info` - CLI only

`boolean`

Output cli information. It is enabled by default.

```bash
webpack-dev-server --info=false
```


## `devServer.inline`

`boolean`

Toggle between the dev-server's two different modes. By default the application will be served with _inline mode_ enabled. This means that a script will be inserted in your bundle to take care of live reloading, and build messages will appear in the browser console.

It is also possible to use __iframe mode__, which uses an `<iframe>` under a notification bar with messages about the build. To switch to __iframe mode__:

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    inline: false
  }
};
```

Usage via the CLI

```bash
webpack-dev-server --inline=false
```

T> Inline mode is recommended for [Hot Module Replacement](/plugins/hot-module-replacement-plugin/) as it includes an HMR trigger from the websocket. Polling mode can be used as an alternative, but requires an additional entry point, `'webpack/hot/poll?1000'`.


## `devServer.lazy` 🔑

`boolean`

When `devServer.lazy` is enabled, the dev-server will only compile the bundle when it gets requested. This means that webpack will not watch any file changes. We call this __lazy mode__.

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    lazy: true
  }
};
```

Usage via the CLI

```bash
webpack-dev-server --lazy
```

T> [`watchOptions`](#devserver-watchoptions-) will have no effect when used with __lazy mode__.

T> If you use the CLI, make sure __inline mode__ is disabled.


## `devServer.noInfo` 🔑

`boolean`

Tells dev-server to supress messages like the webpack bundle information. Errors and warnings will still be shown. `devServer.noInfo` is disabled by default.

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    noInfo: true
  }
};
```


## `devServer.open`

`boolean` `string`

Tells dev-server to open the browser after server had been started. Disabled by default.

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    open: true
  }
};
```

Usage via the CLI

```bash
webpack-dev-server --open
```

If no browser is provided (as shown above), your default browser will be used. To specify a different browser, just pass its name:

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    open: 'Chrome'
  }
};
```

And via the CLI

```bash
webpack-dev-server --open 'Chrome'
```

T> The browser application name is platform dependent. Don't hard code it in reusable modules. For example, `'Chrome'` is Google Chrome on macOS, `'google-chrome'` on Linux and `'chrome'` on Windows.


## `devServer.openPage`

`string`

Specify a page to navigate to when opening the browser.

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    openPage: '/different/page'
  }
};
```

Usage via the CLI

```bash
webpack-dev-server --open-page "/different/page"
```


## `devServer.overlay`

`boolean` `object: { boolean errors, boolean warnings }`

Shows a full-screen overlay in the browser when there are compiler errors or warnings. Disabled by default. If you want to show only compiler errors:

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    overlay: true
  }
};
```

If you want to show warnings as well as errors:

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  }
};
```


## `devServer.pfx`

`string`

When used via the CLI, a path to an SSL .pfx file. If used in options, it should be the bytestream of the .pfx file.

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    pfx: '/path/to/file.pfx'
  }
};
```

Usage via the CLI

```bash
webpack-dev-server --pfx /path/to/file.pfx
```


## `devServer.pfxPassphrase`

`string`

The passphrase to a SSL PFX file.

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    pfxPassphrase: 'passphrase'
  }
};
```

Usage via the CLI

```bash
webpack-dev-server --pfx-passphrase passphrase
```


## `devServer.port`

`number`

Specify a port number to listen for requests on:

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    port: 8080
  }
};
```

Usage via the CLI

```bash
webpack-dev-server --port 8080
```


## `devServer.proxy`

`object` `[object, function]`

Proxying some URLs can be useful when you have a separate API backend development server and you want to send API requests on the same domain.

The dev-server makes use of the powerful [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) package. Check out its [documentation](https://github.com/chimurai/http-proxy-middleware#options) for more advanced usages. Note that some of `http-proxy-middleware`'s features do not require a `target` key, e.g. its `router` feature, but you will still need to include a `target` key in your config here, otherwise `webpack-dev-server` won't pass it along to `http-proxy-middleware`).

With a backend on `localhost:3000`, you can use this to enable proxying:

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
};
```

A request to `/api/users` will now proxy the request to `http://localhost:3000/api/users`.

If you don't want `/api` to be passed along, we need to rewrite the path:

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {'^/api' : ''}
      }
    }
  }
};
```

A backend server running on HTTPS with an invalid certificate will not be accepted by default. If you want to, modify your config like this:

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': {
        target: 'https://other-server.example.com',
        secure: false
      }
    }
  }
};
```

Sometimes you don't want to proxy everything. It is possible to bypass the proxy based on the return value of a function.

In the function you get access to the request, response and proxy options. It must return either `false` or a path that will be served instead of continuing to proxy the request.

E.g. for a browser request, you want to serve a HTML page, but for an API request you want to proxy it. You could do something like this:

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        bypass: function(req, res, proxyOptions) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.');
            return '/index.html';
          }
        }
      }
    }
  }
};
```

If you want to proxy multiple, specific paths to the same target, you can use an array of one or more objects with a `context` property:

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    proxy: [{
      context: ['/auth', '/api'],
      target: 'http://localhost:3000',
    }]
  }
};
```

Note that requests to root won't be proxied by default. To enable root proxying, the `devServer.index` option should be specified as a falsy value:

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    index: '', // specify to enable root proxying
    host: '...',
    contentBase: '...',
    proxy: {
      context: () => true,
      target: 'http://localhost:1234'
    }
  }
};
```

The origin of the host header is kept when proxying by default, you can set `changeOrigin` to `true` to override this behaviour. It is useful in some cases like using [name-based virtual hosted sites](https://en.wikipedia.org/wiki/Virtual_hosting#Name-based).

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000',
      changeOrigin: true
    }
  }
};
```

## `devServer.progress` - CLI only

`boolean`

Output running progress to console.

```bash
webpack-dev-server --progress
```


## `devServer.public`

`string`

When using _inline mode_ and you're proxying dev-server, the inline client script does not always know where to connect to. It will try to guess the URL of the server based on `window.location`, but if that fails you'll need to use this.

For example, the dev-server is proxied by nginx, and available on `myapp.test`:

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    public: 'myapp.test:80'
  }
};
```

Usage via the CLI

```bash
webpack-dev-server --public myapp.test:80
```


## `devServer.publicPath` 🔑

`string`

The bundled files will be available in the browser under this path.

Imagine that the server is running under `http://localhost:8080` and [`output.filename`](/configuration/output/#output-filename) is set to `bundle.js`. By default the `devServer.publicPath` is `'/'`, so your bundle is available as `http://localhost:8080/bundle.js`.

Change `devServer.publicPath` to put bundle under specific directory:

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    publicPath: '/assets/'
  }
};
```

The bundle will now be available as `http://localhost:8080/assets/bundle.js`.

T> Make sure `devServer.publicPath` always starts and ends with a forward slash.

It is also possible to use a full URL. This is necessary for [Hot Module Replacement](/concepts/hot-module-replacement/).

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    publicPath: 'http://localhost:8080/assets/'
  }
};
```

The bundle will also be available as `http://localhost:8080/assets/bundle.js`.

T> It is recommended that `devServer.publicPath` is the same as [`output.publicPath`](/configuration/output/#output-publicpath).


## `devServer.quiet` 🔑

`boolean`

With `devServer.quiet` enabled, nothing except the initial startup information will be written to the console. This also means that errors or warnings from webpack are not visible.

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    quiet: true
  }
};
```

Usage via the CLI

```bash
webpack-dev-server --quiet
```


## `devServer.setup`

`function (app, server)`

W> This option is __deprecated__ in favor of [`devServer.before`](#devserver-before) and will be removed in v3.0.0.

Here you can access the Express app object and add your own custom middleware to it.
For example, to define custom handlers for some paths:

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    setup: function(app, server) {
      app.get('/some/path', function(req, res) {
        res.json({ custom: 'response' });
      });
    }
  }
};
```


## `devServer.socket`

`string`

The Unix socket to listen to (instead of a host).

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    socket: 'socket'
  }
};
```

Usage via the CLI

```bash
webpack-dev-server --socket socket
```


## `devServer.staticOptions`

It is possible to configure advanced options for serving static files from `contentBase`. See the [Express documentation](http://expressjs.com/en/4x/api.html#express.static) for the possible options.

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    staticOptions: {
      redirect: false
    }
  }
};
```

T> This only works when using [`devServer.contentBase`](#devserver-contentbase) as a `string`.


## `devServer.stats` 🔑

`string: 'none' | 'errors-only' | 'minimal' | 'normal' | 'verbose'` `object`

This option lets you precisely control what bundle information gets displayed. This can be a nice middle ground if you want some bundle information, but not all of it.

To show only errors in your bundle:

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    stats: 'errors-only'
  }
};
```

For more information, see the [__stats documentation__](/configuration/stats/).

T> This option has no effect when used with `quiet` or `noInfo`.


## `devServer.stdin` - CLI only

`boolean`

This option closes the server when stdin ends.

```bash
webpack-dev-server --stdin
```


## `devServer.useLocalIp`

`boolean`

This option lets the browser open with your local IP.

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    useLocalIp: true
  }
};
```

Usage via the CLI

```bash
webpack-dev-server --useLocalIp
```


## `devServer.watchContentBase`

`boolean`

Tell dev-server to watch the files served by the [`devServer.contentBase`](#devserver-contentbase) option. It is disabled by default. When enabled, file changes will trigger a full page reload.

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    watchContentBase: true
  }
};
```

Usage via the CLI

```bash
webpack-dev-server --watch-content-base
```


## `devServer.watchOptions` 🔑

`object`

Control options related to watching the files.

webpack uses the file system to get notified of file changes. In some cases this does not work. For example, when using Network File System (NFS). [Vagrant](https://www.vagrantup.com/) also has a lot of problems with this. In these cases, use polling:

__webpack.config.js__

```javascript
module.exports = {
  //...
  devServer: {
    watchOptions: {
      poll: true
    }
  }
};
```

If this is too heavy on the file system, you can change this to an integer to set the interval in milliseconds.

See [WatchOptions](/configuration/watch/) for more options.


# Devtool

This option controls if and how source maps are generated.

Use the [`SourceMapDevToolPlugin`](/plugins/source-map-dev-tool-plugin) for a more fine grained configuration. See the [`source-map-loader`](/loaders/source-map-loader) to deal with existing source maps.


## `devtool`

`string` `false`

Choose a style of [source mapping](http://blog.teamtreehouse.com/introduction-source-maps) to enhance the debugging process. These values can affect build and rebuild speed dramatically.

T> The webpack repository contains an [example showing the effect of all `devtool` variants](https://github.com/webpack/webpack/tree/master/examples/source-map). Those examples will likely help you to understand the differences.

T> Instead of using the `devtool` option you can also use `SourceMapDevToolPlugin`/`EvalSourceMapDevToolPlugin` directly as it has more options. Never use both the `devtool` option and plugin together. The `devtool` option adds the plugin internally so you would end up with the plugin applied twice.

devtool                        | build | rebuild | production | quality
------------------------------ | ----- | ------- | ---------- | -----------------------------
(none)                         | +++   | +++     | yes        | bundled code
eval                           | +++   | +++     | no         | generated code
cheap-eval-source-map          | +     | ++      | no         | transformed code (lines only)
cheap-module-eval-source-map   | o     | ++      | no         | original source (lines only)
eval-source-map                | --    | +       | no         | original source
cheap-source-map               | +     | o       | yes        | transformed code (lines only)
cheap-module-source-map        | o     | -       | yes        | original source (lines only)
inline-cheap-source-map        | +     | o       | no         | transformed code (lines only)
inline-cheap-module-source-map | o     | -       | no         | original source (lines only)
source-map                     | --    | --      | yes        | original source
inline-source-map              | --    | --      | no         | original source
hidden-source-map              | --    | --      | yes        | original source
nosources-source-map           | --    | --      | yes        | without source content

T> `+++` super fast, `++` fast, `+` pretty fast, `o` medium, `-` pretty slow, `--` slow

Some of these values are suited for development and some for production. For development you typically want fast Source Maps at the cost of bundle size, but for production you want separate Source Maps that are accurate and support minimizing.

W> There are some issues with Source Maps in Chrome. [We need your help!](https://github.com/webpack/webpack/issues/3165).

T> See [`output.sourceMapFilename`](/configuration/output#output-sourcemapfilename) to customize the filenames of generated Source Maps.


### Qualities

`bundled code` - You see all generated code as a big blob of code. You don't see modules separated from each other.

`generated code` - You see each module separated from each other, annotated with module names. You see the code generated by webpack. Example: Instead of `import {test} from "module"; test();` you see something like `var module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42); module__WEBPACK_IMPORTED_MODULE_1__.a();`.

`transformed code` - You see each module separated from each other, annotated with module names. You see the code before webpack transforms it, but after Loaders transpile it. Example: Instead of `import {test} from "module"; class A extends test {}` you see something like `import {test} from "module"; var A = function(_test) { ... }(test);`

`original source` - You see each module separated from each other, annotated with module names. You see the code before transpilation, as you authored it. This depends on Loader support.

`without source content` - Contents for the sources are not included in the Source Maps. Browsers usually try to load the source from the webserver or filesystem. You have to make sure to set [`output.devtoolModuleFilenameTemplate`](/configuration/output/#output-devtoolmodulefilenametemplate) correctly to match source urls.

`(lines only)` - Source Maps are simplified to a single mapping per line. This usually means a single mapping per statement (assuming you author is this way). This prevents you from debugging execution on statement level and from settings breakpoints on columns of a line. Combining with minimizing is not possible as minimizers usually only emit a single line.


### Development

The following options are ideal for development:

`eval` - Each module is executed with `eval()` and `//@ sourceURL`. This is pretty fast. The main disadvantage is that it doesn't display line numbers correctly since it gets mapped to transpiled code instead of the original code (No Source Maps from Loaders).

`eval-source-map` - Each module is executed with `eval()` and a SourceMap is added as a DataUrl to the `eval()`. Initially it is slow, but it provides fast rebuild speed and yields real files. Line numbers are correctly mapped since it gets mapped to the original code. It yields the best quality SourceMaps for development.

`cheap-eval-source-map` - Similar to `eval-source-map`, each module is executed with `eval()`. It is "cheap" because it doesn't have column mappings, it only maps line numbers. It ignores SourceMaps from Loaders and only display transpiled code similar to the `eval` devtool.

`cheap-module-eval-source-map` - Similar to `cheap-eval-source-map`, however, in this case Source Maps from Loaders are processed for better results. However Loader Source Maps are simplified to a single mapping per line.

### Special cases

The following options are not ideal for development nor production. They are needed for some special cases, i. e. for some 3rd party tools.

`inline-source-map` - A SourceMap is added as a DataUrl to the bundle.

`cheap-source-map` - A SourceMap without column-mappings ignoring loader Source Maps.

`inline-cheap-source-map` - Similar to `cheap-source-map` but SourceMap is added as a DataUrl to the bundle.

`cheap-module-source-map` - A SourceMap without column-mappings that simplifies loader Source Maps to a single mapping per line.

`inline-cheap-module-source-map` - Similar to `cheap-module-source-map` but SourceMap is added as a DataUrl to the bundle.


### Production

These options are typically used in production:

`(none)` (Omit the `devtool` option) - No SourceMap is emitted. This is a good option to start with.

`source-map` - A full SourceMap is emitted as a separate file. It adds a reference comment to the bundle so development tools know where to find it.

W> You should configure your server to disallow access to the Source Map file for normal users!

`hidden-source-map` - Same as `source-map`, but doesn't add a reference comment to the bundle. Useful if you only want SourceMaps to map error stack traces from error reports, but don't want to expose your SourceMap for the browser development tools.

W> You should not deploy the Source Map file to the webserver. Instead only use it for error report tooling.

`nosources-source-map` - A SourceMap is created without the `sourcesContent` in it. It can be used to map stack traces on the client without exposing all of the source code. You can deploy the Source Map file to the webserver.

W> It still exposes filenames and structure for decompiling, but it doesn't expose the original code.

T> When using the `terser-webpack-plugin` you must provide the `sourceMap: true` option to enable SourceMap support.


# Target

webpack can compile for multiple environments or _targets_. To understand what a `target` is in detail, read through [the targets concept page](/concepts/targets/).

## `target`

`string | function (compiler)`

Instructs webpack to target a specific environment.


### `string`

The following string values are supported via [`WebpackOptionsApply`](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsApply.js):

Option                | Description
--------------------- | -----------------------
`async-node`          | Compile for usage in a Node.js-like environment (uses `fs` and `vm` to load chunks asynchronously)
`electron-main`       | Compile for [Electron](https://electronjs.org/) for main process.
`electron-renderer`   | Compile for [Electron](https://electronjs.org/) for renderer process, providing a target using `JsonpTemplatePlugin`, `FunctionModulePlugin` for browser environments and `NodeTargetPlugin` and `ExternalsPlugin` for CommonJS and Electron built-in modules.
`node`                | Compile for usage in a Node.js-like environment (uses Node.js `require` to load chunks)
`node-webkit`         | Compile for usage in WebKit and uses JSONP for chunk loading. Allows importing of built-in Node.js modules and [`nw.gui`](http://docs.nwjs.io/en/latest/) (experimental)
`web`                 | Compile for usage in a browser-like environment __(default)__
`webworker`           | Compile as WebWorker

For example, when the `target` is set to `"electron-main"`, webpack includes multiple electron specific variables. For more information on which templates and externals are used, you can refer to webpack's [source code](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsApply.js#L148-L183).


### `function`

If a function is passed, then it will be called with the compiler as a parameter. Set it to a function if none of the predefined targets from the list above meet your needs.

For example, if you don't want any of the plugins they applied:

```js
const options = {
  target: () => undefined
};
```

Or you can apply specific plugins you want:

```js
const webpack = require('webpack');

const options = {
  target: (compiler) => {
    compiler.apply(
      new webpack.JsonpTemplatePlugin(options.output),
      new webpack.LoaderTargetPlugin('web')
    );
  }
};
```


# Watch and WatchOptions

webpack can watch files and recompile whenever they change. This page explains how to enable this and a couple of tweaks you can make if watching does not work properly for you.


## `watch`

`boolean`

Turn on watch mode. This means that after the initial build, webpack will continue to watch for changes in any of the resolved files. Watch mode is turned off by default:

```js
module.exports = {
  //...
  watch: false
};
```

T> In webpack-dev-server and webpack-dev-middleware watch mode is enabled by default.


## `watchOptions`

`object`

A set of options used to customize watch mode:

```js
module.exports = {
  //...
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
};
```


## `watchOptions.aggregateTimeout`

`number`

Add a delay before rebuilding once the first file changed. This allows webpack to aggregate any other changes made during this time period into one rebuild. Pass a value in milliseconds:

```js
module.exports = {
  //...
  watchOptions: {
    aggregateTimeout: 300 // The default
  }
};
```


## `watchOptions.ignored`

For some systems, watching many file systems can result in a lot of CPU or memory usage. It is possible to exclude a huge folder like `node_modules`:

```js
module.exports = {
  //...
  watchOptions: {
    ignored: /node_modules/
  }
};
```

It is also possible to have and use multiple [anymatch](https://github.com/micromatch/anymatch) patterns:

```js
module.exports = {
  //...
  watchOptions: {
    ignored: ['files/**/*.js', 'node_modules']
  }
};
```

T> If you use `require.context`, webpack will watch your entire directory. You will need to ignore files and/or directories so that unwanted changes will not trigger a rebuild.


## `watchOptions.poll`

`boolean` `number`

Turn on [polling](https://whatis.techtarget.com/definition/polling) by passing `true`, or specifying a poll interval in milliseconds:

```js
module.exports = {
  //...
  watchOptions: {
    poll: 1000 // Check for changes every second
  }
};
```

T> If watching does not work for you, try out this option. Watching does not work with NFS and machines in VirtualBox.


## `info-verbosity`

`string`: `none` `info` `verbose`

Controls verbosity of the lifecycle messaging, e.g. the `Started watching files...` log. Setting `info-verbosity` to `verbose` will also message to console at the beginning and the end of incremental build. `info-verbosity` is set to `info` by default.

```bash
webpack --watch --info-verbosity verbose
```


## Troubleshooting

If you are experiencing any issues, please see the following notes. There are a variety of reasons why webpack might miss a file change.

### Changes Seen But Not Processed

Verify that webpack is not being notified of changes by running webpack with the --progress flag. If progress shows on save but no files are outputted, it is likely a configuration issue, not a file watching issue.

```bash
webpack --watch --progress
```

### Not Enough Watchers

Verify that you have enough available watchers in your system. If this value is too low, the file watcher in Webpack won't recognize the changes:

```bash
cat /proc/sys/fs/inotify/max_user_watches
```

Arch users, add `fs.inotify.max_user_watches=524288` to `/etc/sysctl.d/99-sysctl.conf` and then execute `sysctl --system`. Ubuntu users (and possibly others), execute: `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`.

### macOS fsevents Bug

On macOS, folders can get corrupted in certain scenarios. See [this article](https://github.com/livereload/livereload-site/blob/master/livereload.com/_articles/troubleshooting/os-x-fsevents-bug-may-prevent-monitoring-of-certain-folders.md).

### Windows Paths

Because webpack expects absolute paths for many config options such as `__dirname + "/app/folder"` the Windows `\` path separator can break some functionality.

Use the correct separators. I.e. `path.resolve(__dirname, "app/folder")` or `path.join(__dirname, "app", "folder")`.

### Vim

On some machines Vim is preconfigured with the [backupcopy option](http://vimdoc.sourceforge.net/htmldoc/options.html#'backupcopy') set to `auto`. This could potentially cause problems with the system's file watching mechanism. Switching this option to `yes` will make sure a copy of the file is made and the original one overwritten on save.

`:set backupcopy=yes`

### Saving in WebStorm

When using the JetBrains WebStorm IDE, you may find that saving changed files does not trigger the watcher as you might expect. Try disabling the `safe write` option in the settings, which determines whether files are saved to a temporary location first before the originals are overwritten: uncheck `File > Settings... > System Settings > Use "safe write" (save changes to a temporary file first)`.


# Externals

The `externals` configuration option provides a way of excluding dependencies from the output bundles. Instead, the created bundle relies on that dependency to be present in the consumer's environment. This feature is typically most useful to __library developers__, however there are a variety of applications for it.

T> __consumer__ here is any end user application that includes the library that you have bundled using webpack.


## `externals`

`string` `object` `function`  `regex`

__Prevent bundling__ of certain `import`ed packages and instead retrieve these _external dependencies_ at runtime.

For example, to include [jQuery](https://jquery.com/) from a CDN instead of bundling it:

__index.html__

``` html
<script
  src="https://code.jquery.com/jquery-3.1.0.js"
  integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk="
  crossorigin="anonymous">
</script>
```

__webpack.config.js__

```javascript
module.exports = {
  //...
  externals: {
    jquery: 'jQuery'
  }
};
```

This leaves any dependent modules unchanged, i.e. the code shown below will still work:

```javascript
import $ from 'jquery';

$('.my-element').animate(/* ... */);
```

The bundle with external dependencies can be used in various module contexts, such as [CommonJS, AMD, global and ES2015 modules](/concepts/modules). The external library may be available in any of these forms:

- __root__: The library should be available as a global variable (e.g. via a script tag).
- __commonjs__: The library should be available as a CommonJS module.
- __commonjs2__: Similar to the above but where the export is `module.exports.default`.
- __amd__: Similar to `commonjs` but using AMD module system.

The following syntaxes are accepted...


### string

See the example above. The property name `jquery` indicates that the module `jquery` in `import $ from 'jquery'` should be excluded. In order to replace this module, the value `jQuery` will be used to retrieve a global `jQuery` variable. In other words, when a string is provided it will be treated as `root` (defined above and below).


### array

```javascript
module.exports = {
  //...
  externals: {
    subtract: ['./math', 'subtract']
  }
};
```

`subtract: ['./math', 'subtract']` converts to a parent child construct, where `./math` is the parent module and your bundle only requires the subset under `subtract` variable.


### object

W> An object with `{ root, amd, commonjs, ... }` is only allowed for [`libraryTarget: 'umd'`](/configuration/output/#output-librarytarget). It's not allowed for other library targets.

```javascript
module.exports = {
  //...
  externals : {
    react: 'react'
  },

  // or

  externals : {
    lodash : {
      commonjs: 'lodash',
      amd: 'lodash',
      root: '_' // indicates global variable
    }
  },

  // or

  externals : {
    subtract : {
      root: ['math', 'subtract']
    }
  }
};
```

This syntax is used to describe all the possible ways that an external library can be available. `lodash` here is available as `lodash` under AMD and CommonJS module systems but available as `_` in a global variable form. `subtract` here is available via the property `subtract` under the global `math` object (e.g. `window['math']['subtract']`).


### function

It might be useful to define your own function to control the behavior of what you want to externalize from webpack. [webpack-node-externals](https://www.npmjs.com/package/webpack-node-externals), for example, excludes all modules from the `node_modules` directory and provides some options to, for example, whitelist packages.

It basically comes down to this:

```javascript
module.exports = {
  //...
  externals: [
    function(context, request, callback) {
      if (/^yourregex$/.test(request)){
        return callback(null, 'commonjs ' + request);
      }
      callback();
    }
  ]
};
```

The `'commonjs ' + request` defines the type of module that needs to be externalized.


### regex

Every dependency that matches the given regular expression will be excluded from the output bundles.

```javascript
module.exports = {
  //...
  externals: /^(jquery|\$)$/i
};
```

In this case any dependency named `jQuery`, capitalized or not, or `$` would be externalized.

### Combining syntaxes

Sometimes you may want to use a combination of the above syntaxes. This can be done in the following manner:

```javascript
module.exports = {
  //...
  externals: [
    {
      // String
      react: 'react',
      // Object
      lodash : {
        commonjs: 'lodash',
        amd: 'lodash',
        root: '_' // indicates global variable
      },
      // Array
      subtract: ['./math', 'subtract']
    },
    // Function
    function(context, request, callback) {
      if (/^yourregex$/.test(request)){
        return callback(null, 'commonjs ' + request);
      }
      callback();
    },
    // Regex
    /^(jquery|\$)$/i
  ]
};
```

For more information on how to use this configuration, please refer to the article on [how to author a library](/guides/author-libraries).


# Node

These options configure whether to polyfill or mock certain [Node.js globals](https://nodejs.org/docs/latest/api/globals.html) and modules. This allows code originally written for the Node.js environment to run in other environments like the browser.

This feature is provided by webpack's internal [`NodeStuffPlugin`](https://github.com/webpack/webpack/blob/master/lib/NodeStuffPlugin.js) plugin. If the target is "web" (default) or "webworker", the [`NodeSourcePlugin`](https://github.com/webpack/webpack/blob/master/lib/node/NodeSourcePlugin.js) plugin is also activated.


## `node`

`object`

This is an object where each property is the name of a Node global or module and each value may be one of the following...

- `true`: Provide a polyfill.
- `"mock"`: Provide a mock that implements the expected interface but has little or no functionality.
- `"empty"`: Provide an empty object.
- `false`: Provide nothing. Code that expects this object may crash with a `ReferenceError`. Code that attempts to import the module using `require('modulename')` may trigger a `Cannot find module "modulename"` error.

W> Not every Node global supports all four options. The compiler will throw an error for property-value combinations that aren't supported (e.g. `process: 'empty'`). See the sections below for more details.

These are the defaults:

```js
module.exports = {
  //...
  node: {
    console: false,
    global: true,
    process: true,
    __filename: 'mock',
    __dirname: 'mock',
    Buffer: true,
    setImmediate: true

    // See "Other node core libraries" for additional options.
  }
};
```

Since webpack 3.0.0, the `node` option may be set to `false` to completely turn off the `NodeStuffPlugin` and `NodeSourcePlugin` plugins.


## `node.console`

`boolean | "mock"`

Default: `false`

The browser provides a `console` object with a very similar interface to the Node.js `console`, so a polyfill is generally not needed.


## `node.process`

`boolean | "mock"`

Default: `true`


## `node.global`

`boolean`

Default: `true`

See [the source](https://github.com/webpack/webpack/blob/master/buildin/global.js) for the exact behavior of this object.


## `node.__filename`

`boolean | "mock"`

Default: `"mock"`

Options:

- `true`: The filename of the __input__ file relative to the [`context` option](https://webpack.js.org/configuration/entry-context/#context).
- `false`: The regular Node.js `__filename` behavior. The filename of the __output__ file when run in a Node.js environment.
- `"mock"`: The fixed value `"index.js"`.


## `node.__dirname`

`boolean | "mock"`

Default: `"mock"`

Options:

- `true`: The dirname of the __input__ file relative to the [`context` option](https://webpack.js.org/configuration/entry-context/#context).
- `false`: The regular Node.js `__dirname` behavior. The dirname of the __output__ file when run in a Node.js environment.
- `"mock"`: The fixed value `"/"`.


## `node.Buffer`

`boolean | "mock"`

Default: `true`


## `node.setImmediate`

`boolean | "mock" | "empty"`

Default: `true`


## Other node core libraries

`boolean | "mock" | "empty"`

W> This option is only activated (via `NodeSourcePlugin`) when the target is unspecified, "web" or "webworker".

Polyfills for Node.js core libraries from [`node-libs-browser`](https://github.com/webpack/node-libs-browser) are used if available, when the `NodeSourcePlugin` plugin is enabled. See the list of [Node.js core libraries and their polyfills](https://github.com/webpack/node-libs-browser#readme).

By default, webpack will polyfill each library if there is a known polyfill or do nothing if there is not one. In the latter case, webpack will behave as if the module name was configured with the `false` value.

T> To import a built-in module, use [`__non_webpack_require__`](/api/module-variables/#__non_webpack_require__-webpack-specific-), i.e. `__non_webpack_require__('modulename')` instead of `require('modulename')`.

Example:

```js
module.exports = {
  //...
  node: {
    dns: 'mock',
    fs: 'empty',
    path: true,
    url: false
  }
};
```


# Performance

These options allows you to control how webpack notifies you of assets and entry points that exceed a specific file limit.
This feature was inspired by the idea of [webpack Performance Budgets](https://github.com/webpack/webpack/issues/3216).

## `performance`

`object`

Configure how performance hints are shown. For example if you have an asset that is over 250kb, webpack will emit a warning notifying you of this.


## `performance.hints`

`false | "error" | "warning"`

Turns hints on/off. In addition, tells webpack to throw either an error or a warning when hints are found. This property is set to `"warning"` by default.

Given an asset is created that is over 250kb:

```js
module.exports = {
  //...
  performance: {
    hints: false
  }
};
```

No hint warnings or errors are shown.

```js
module.exports = {
  //...
  performance: {
    hints: 'warning'
  }
};
```

A warning will be displayed notifying you of a large asset. We recommend something like this for development environments.

```js
module.exports = {
  //...
  performance: {
    hints: 'error'
  }
};
```

An error will be displayed notifying you of a large asset. We recommend using `hints: "error"` during production builds to help prevent deploying production bundles that are too large, impacting webpage performance.

## `performance.maxEntrypointSize`

`int`

An entry point represents all assets that would be utilized during initial load time for a specific entry. This option controls when webpack should emit performance hints based on the maximum entry point size. The default value is `250000` (bytes).

```js
module.exports = {
  //...
  performance: {
    maxEntrypointSize: 400000
  }
};
```

## `performance.maxAssetSize`

`int`

An asset is any emitted file from webpack. This option controls when webpack emits a performance hint based on individual asset size. The default value is `250000` (bytes).


```js
module.exports = {
  //...
  performance: {
    maxAssetSize: 100000
  }
};
```

## `performance.assetFilter`

`Function`

This property allows webpack to control what files are used to calculate performance hints. The default function is seen below:

```js
function assetFilter(assetFilename) {
  return !(/\.map$/.test(assetFilename));
}
```

You can override this property by passing your own function in:

```js
module.exports = {
  //...
  performance: {
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.js');
    }
  }
};
```

The example above will only give you performance hints based on `.js` files.


# Stats

The `stats` option lets you precisely control what bundle information gets displayed. This can be a nice middle ground if you don't want to use `quiet` or `noInfo` because you want some bundle information, but not all of it.

T> For webpack-dev-server, this property needs to be in the `devServer` object.

W> This option does not have any effect when using the Node.js API.

## `stats`

`object` `string`

There are some presets available to use as a shortcut. Use them like this:

```js
module.exports = {
  //...
  stats: 'errors-only'
};
```

| Preset | Alternative | Description |
|--------|-------------|-------------|
| `"errors-only"` | _none_  | Only output when errors happen |
| `"minimal"`     | _none_  | Only output when errors or new compilation happen |
| `"none"`        | `false` | Output nothing |
| `"normal"`      | `true`  | Standard output |
| `"verbose"`     | _none_  | Output everything |

For more granular control, it is possible to specify exactly what information you want. Please note that all of the options in this object are optional.

<!-- eslint-skip -->

```js
module.exports = {
  //...
  stats: {
    // fallback value for stats options when an option is not defined (has precedence over local webpack defaults)
    all: undefined,

    // Add asset Information
    assets: true,

    // Sort assets by a field
    // You can reverse the sort with `!field`.
    // Some possible values: 'id' (default), 'name', 'size', 'chunks', 'failed', 'issuer'
    // For a complete list of fields see the bottom of the page
    assetsSort: "field",

    // Add build date and time information
    builtAt: true,

    // Add information about cached (not built) modules
    cached: true,

    // Show cached assets (setting this to `false` only shows emitted files)
    cachedAssets: true,

    // Add children information
    children: true,

    // Add chunk information (setting this to `false` allows for a less verbose output)
    chunks: true,

    // Add namedChunkGroups information
    chunkGroups: true,

    // Add built modules information to chunk information
    chunkModules: true,

    // Add the origins of chunks and chunk merging info
    chunkOrigins: true,

    // Sort the chunks by a field
    // You can reverse the sort with `!field`. Default is `id`.
    // Some other possible values: 'name', 'size', 'chunks', 'failed', 'issuer'
    // For a complete list of fields see the bottom of the page
    chunksSort: "field",

    // Context directory for request shortening
    context: "../src/",

    // `webpack --colors` equivalent
    colors: false,

    // Display the distance from the entry point for each module
    depth: false,

    // Display the entry points with the corresponding bundles
    entrypoints: false,

    // Add --env information
    env: false,

    // Add errors
    errors: true,

    // Add details to errors (like resolving log)
    errorDetails: true,

    // Exclude assets from being displayed in stats
    // This can be done with a String, a RegExp, a Function getting the assets name
    // and returning a boolean or an Array of the above.
    excludeAssets: "filter" | /filter/ | (assetName) => true | false |
      ["filter"] | [/filter/] | [(assetName) => true|false],

    // Exclude modules from being displayed in stats
    // This can be done with a String, a RegExp, a Function getting the modules source
    // and returning a boolean or an Array of the above.
    excludeModules: "filter" | /filter/ | (moduleSource) => true | false |
      ["filter"] | [/filter/] | [(moduleSource) => true|false],

    // See excludeModules
    exclude: "filter" | /filter/ | (moduleSource) => true | false |
      ["filter"] | [/filter/] | [(moduleSource) => true|false],

    // Add the hash of the compilation
    hash: true,

    // Set the maximum number of modules to be shown
    maxModules: 15,

    // Add built modules information
    modules: true,

    // Sort the modules by a field
    // You can reverse the sort with `!field`. Default is `id`.
    // Some other possible values: 'name', 'size', 'chunks', 'failed', 'issuer'
    // For a complete list of fields see the bottom of the page
    modulesSort: "field",

    // Show dependencies and origin of warnings/errors (since webpack 2.5.0)
    moduleTrace: true,

    // Show performance hint when file size exceeds `performance.maxAssetSize`
    performance: true,

    // Show the exports of the modules
    providedExports: false,

    // Add public path information
    publicPath: true,

    // Add information about the reasons why modules are included
    reasons: true,

    // Add the source code of modules
    source: false,

    // Add timing information
    timings: true,

    // Show which exports of a module are used
    usedExports: false,

    // Add webpack version information
    version: true,

    // Add warnings
    warnings: true,

    // Filter warnings to be shown (since webpack 2.4.0),
    // can be a String, Regexp, a function getting the warning and returning a boolean
    // or an Array of a combination of the above. First match wins.
    warningsFilter: "filter" | /filter/ | ["filter", /filter/] | (warning) => true|false
  }
}
```

If you want to use one of the pre-defined behaviours e.g. `'minimal'` but still override one or more of the rules, see [the source code](https://github.com/webpack/webpack/blob/master/lib/Stats.js#L1394-L1401). You would want to copy the configuration options from `case 'minimal': ...` and add your additional rules while providing an object to `stats`.

__webpack.config.js__

```javascript
module.exports = {
  //..
  stats: {
    // copied from `'minimal'`
    all: false,
    modules: true,
    maxModules: 0,
    errors: true,
    warnings: true,
    // our additional options
    moduleTrace: true,
    errorDetails: true
  }
};
```

### Sorting fields

For `assetsSort`, `chunksSort` and `moduleSort` there are several possible fields that you can sort items by:

- `id` is the item's id;
- `name` - a item's name that was assigned to it upon importing;
- `size` - a size of item in bytes;
- `chunks` - what chunks the item originates from (for example, if there are multiple subchunks for one chunk - the subchunks will be grouped together according to their main chunk);
- `errors` - amount of errors in items;
- `warnings` - amount of warnings in items;
- `failed` - whether the item has failed compilation;
- `cacheable` - whether the item is cacheable;
- `built` - whether the asset has been built;
- `prefetched` - whether the asset will be prefetched;
- `optional` - whether the asset is optional;
- `identifier` - identifier of the item;
- `index` - item's processing index;
- `index2`
- `profile`
- `issuer` - an identifier of the issuer;
- `issuerId` - an id of the issuer;
- `issuerName` - a name of the issuer;
- `issuerPath` - a full issuer object. There's no real need to sort by this field;


# Other Options


These are the remaining configuration options supported by webpack.

W> Help Wanted: This page is still a work in progress. If you are familiar with any of the options for which the description or examples are incomplete, please create an issue and submit a PR at the [docs repo](https://github.com/webpack/webpack.js.org)!


## `amd`

`object`

Set the value of `require.amd` or `define.amd`:

__webpack.config.js__

```javascript
module.exports = {
  //...
  amd: {
    jQuery: true
  }
};
```

Certain popular modules written for AMD, most notably jQuery versions 1.7.0 to 1.9.1, will only register as an AMD module if the loader indicates it has taken [special allowances](https://github.com/amdjs/amdjs-api/wiki/jQuery-and-AMD) for multiple versions being included on a page.

The allowances were the ability to restrict registrations to a specific version or to support different sandboxes with different defined modules.

This option allows you to set the key your module looks for to a truthy value.
As it happens, the AMD support in webpack ignores the defined name anyways.


## `bail`

`boolean`

Fail out on the first error instead of tolerating it. By default webpack will log these errors in red in the terminal, as well as the browser console when using HMR, but continue bundling. To enable it:

__webpack.config.js__

```javascript
module.exports = {
  //...
  bail: true
};
```

This will force webpack to exit its bundling process.


## `cache`

`boolean` `object`

Cache the generated webpack modules and chunks to improve build speed. Caching is enabled by default while in watch mode. To disable caching simply pass:

__webpack.config.js__

```javascript
module.exports = {
  //...
  cache: false
};
```

If an object is passed, webpack will use this object for caching. Keeping a reference to this object will allow one to share the same cache between compiler calls:

__webpack.config.js__

```javascript
let SharedCache = {};

module.exports = {
  //...
  cache: SharedCache
};
```

W> Don't share the cache between calls with different options.

?> Elaborate on the warning and example - calls with different configuration options?


## `loader`

`object`

Expose custom values into the loader context.

?> Add an example...


## `parallelism`

`number`

Limit the number of parallel processed modules. Can be used to fine tune performance or to get more reliable profiling results.


## `profile`

`boolean`

Capture a "profile" of the application, including statistics and hints, which can then be dissected using the [Analyze](https://webpack.github.io/analyse/) tool.

T> Use the [StatsPlugin](https://www.npmjs.com/package/stats-webpack-plugin) for more control over the generated profile.

T> Combine with `parallelism: 1` for better results.


## `recordsPath`

`string`

Use this option to generate a JSON file containing webpack "records" -- pieces of data used to store module identifiers across multiple builds. You can use this file to track how modules change between builds. To generate one, simply specify a location:

__webpack.config.js__

```javascript
module.exports = {
  //...
  recordsPath: path.join(__dirname, 'records.json')
};
```

Records are particularly useful if you have a complex setup that leverages [Code Splitting](/guides/code-splitting). The data can be used to ensure the split bundles are achieving the [caching](/guides/caching) behavior you need.

T> Note that although this file is generated by the compiler, you may still want to track it in source control to keep a history of how it has changed over time.

W> Setting `recordsPath` will essentially set `recordsInputPath` and `recordsOutputPath` to the same location. This is usually all that's necessary unless you decide to change the name of the file containing the records. See below for an example.


## `recordsInputPath`

`string`

Specify the file from which to read the last set of records. This can be used to rename a records file. See the example below.


## `recordsOutputPath`

`string`

Specify where the records should be written. The following example shows how you might use this option in combination with `recordsInputPath` to rename a records file:

__webpack.config.js__

```javascript
module.exports = {
  //...
  recordsInputPath: path.join(__dirname, 'records.json'),
  recordsOutputPath: path.join(__dirname, 'newRecords.json')
};
```


## `name`

`string`

Name of the configuration. Used when loading multiple configurations.

__webpack.config.js__

```javascript
module.exports = {
  //...
  name: 'admin-app'
};
```
