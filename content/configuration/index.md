---
title: Configuration
sort: 1
contributors:
  - sokra
  - skipjack
  - grgur
  - bondz
  - sricc
  - terinjokes
  - mattce
  - kbariotis
---

webpack is fed via a configuration object. It is passed in one of two ways depending on how you are using webpack: through the terminal or via Node.js. All the available configuration options are specified below.

T> New to webpack? Check out our guide to some of webpack's [core concepts](/concepts) to get started!

T> Notice that throughout the configuration we use Node's built-in [path module](https://nodejs.org/api/path.html) and prefix it with the [__dirname](https://nodejs.org/docs/latest/api/globals.html#globals_dirname) global. This prevents file path issues between operating systems and allows relative paths to work as expected. See [this section](https://nodejs.org/api/path.html#path_windows_vs_posix) for more info on POSIX vs. Windows paths.

## Options

``` js-with-links-with-details
const path = require('path');

module.exports = {
  // click on the name of the option to get to the detailed documentation
  // click on the items with arrows to show more examples / advanced options

  <details><summary>[entry](/configuration/entry-context#entry): "./app/entry", // string | object | array</summary>
  [entry](/configuration/entry-context#entry): ["./app/entry1", "./app/entry2"],
  [entry](/configuration/entry-context#entry): {
    a: "./app/entry-a",
    b: ["./app/entry-b1", "./app/entry-b2"]
  },
  </details>
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
        [libraryTarget](/configuration/output#output-librarytarget): "commonjs-module", // exports with module.exports
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
    // include useful path info about modules, exports, requests, etc. into the generated code

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
        // exclude must not be matched (takes preferrence over test and include)
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
        // see [webpack 1 upgrade guide](/guides/migrating)

        [options](/configuration/module#rule-options-rule-query): {
          presets: ["es2015"]
        },
        // options for the loader
      },

      {
        [test](/configuration/module#rule-test): "\.html$",

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
      // alias "only-module" -> "new-module", but not "module/path/file" -> "new-module/path/file"

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
    // properites that are read from description file
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
  [devtool](/configuration/devtool): "inline-source-map", // inlines SourceMap into orginal file
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
    [poll](watch#watchoptions-poll): 500, // intervall in ms
    // enables polling mode for watching
    // must be used on filesystems that doesn't notify on change
    // i. e. nfs shares
  },

  [node](node): {
    /* TODO */
  },

  [recordsPath](other-options#recordspath): path.resolve(__dirname, "build/records.json"),
  [recordsInputPath](other-options#recordsinputpath): path.resolve(__dirname, "build/records.json"),
  [recordsOutputPath](other-options#recordsoutputpath): path.resolve(__dirname, "build/records.json"),
  // TODO

  </details>
}
```
