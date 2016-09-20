---
title: Configuration
contributors:
  - sokra
  - gregvenech
---

Webpack is fed a configuration object. It is passed in one of two ways depending on how you are using webpack: through the [terminal]() or via [Node](). Learn more about the various ways this can be done in [Passing a Configuration](). All the available configuration options are specified below.

T> Notice that throughout the configuration we use Node's built-in [path module](https://nodejs.org/api/path.html). This prevents file path issues between operating systems. See [this section](https://nodejs.org/api/path.html#path_windows_vs_posix) for more.


### Configuration Options

``` js-with-links-with-details
{
  // click on the name of the option to get to the detailed documentation
  // click on the items with arrows to show more examples / advanced options

  <details><summary>[entry](#entry): "./app/entry", // string | object | array</summary>
  [entry](#entry): ["./app/entry1", "./app/entry2"],
  [entry](#entry): {
    a: "./app/entry-a",
    b: ["./app/entry-b1", "./app/entry-b2"]
  },
  </details>
  // Here the application starts executing
  // and webpack starts bundling

  [output](#output): {
    // options related how webpack emits results

    [path](#output-path): path.resolve(__dirname, "dist"), // string
    // the target directory for all output files
    // must be an absolute path (use the node.js path module)

    <details><summary>[filename](#output-filename): "bundle.js", // string</summary>
    [filename](#output-filename): "[name].js", // for multiple entry points
    [filename](#output-filename): "[chunkhash].js", // for [long term caching](/how-to/cache)
    </details>
    // the filename template for [entry chunks](chunks)

    <details><summary>[publicPath](#output-publicPath): "/assets/", // string</summary>
    [publicPath](#output-publicPath): "",
    [publicPath](#output-publicPath): "https://cdn.example.com/",
    </details>
    // the url to the output directory resolved relative to the HTML page

    [library](#output-library): "MyLibrary", // string,
    // the name of the exported library

    <details><summary>[libraryTarget](#output-librarytarget): "umd", // enum</summary>
    [libraryTarget](#output-librarytarget): "umd-module", // ES6 module wrapped in UMD
    [libraryTarget](#output-librarytarget): "commonjs-module", // ES6 module wrapped in CommonJs
    [libraryTarget](#output-librarytarget): "commonjs2", // exported with module.exports
    [libraryTarget](#output-librarytarget): "commonjs", // exported as properties to exports
    [libraryTarget](#output-librarytarget): "amd", // defined with AMD defined method
    [libraryTarget](#output-librarytarget): "this", // property set on this
    [libraryTarget](#output-librarytarget): "var", // variable defined in root scope
    </details>
    // the type of the exported library

    <details><summary>/* Advanced output configuration (click to show) */</summary>

    [pathinfo](#output-pathinfo): true, // boolean
    // include useful path info about modules, exports, requests, etc. into the generated code

    [chunkFilename](#output-chunkfilename): "[id].js",
    [chunkFilename](#output-chunkfilename): "[chunkhash].js", // for [long term caching](/how-to/cache)
    // the filename template for additional chunks

    [jsonpFunction](#output-jsonpFunction): "myWebpackJsonp", // string
    // name of the JSONP function used to load chunks

    [sourceMapFilename](#output-sourceMapFilename): "[file].map", // string
    [sourceMapFilename](#output-sourceMapFilename): "sourcemaps/[file].map", // string
    // the filename template of the source map location

    [devtoolModuleFilenameTemplate](#output-devtoolModuleFilenameTemplate): "webpack:///[resource-path]", // string
    // the name template for modules in a devtool

    [devtoolFallbackModuleFilenameTemplate](#output-devtoolFallbackModuleFilenameTemplate): "webpack:///[resource-path]?[hash]", // string
    // the name template for modules in a devtool (used for conflicts)

    [umdNamedDefine](#output-umdNamedDefine): true, // boolean
    // use a named AMD module in UMD library

    [crossOriginLoading](#output-crossOriginLoading): "use-credentials", // enum
    [crossOriginLoading](#output-crossOriginLoading): "anonymous",
    [crossOriginLoading](#output-crossOriginLoading): false,
    // specifies how cross origin request are issued by the runtime

    <details><summary>/* Expert output configuration (on own risk) */</summary>

    [devtoolLineToLine](#output-devtoolLineToLine): {
      test: /\.jsx$/
    },
    // use a simple 1:1 mapped SourceMaps for these modules (faster)

    [hotUpdateMainFilename](#output-hotUpdateMainFilename): "[hash].hot-update.json", // string
    // filename template for HMR manifest

    [hotUpdateChunkFilename](#output-hotUpdateChunkFilename): "[id].[hash].hot-update.js", // string
    // filename template for HMR chunks

    [sourcePrefix](#output-sourcePrefix): "\t", // string
    // prefix module sources in bundle for better readablitity
    </details>
    </details>
  },

  [module](#module): {
    // configuration regarding modules

    [loaders](#module-loaders): [
      // rules to assign loaders to modules

      {
        [test](#module-loaders-test): /\.jsx?$/,
        [include](#module-loaders-include): [
          path.resolve(__dirname, "app")
        ],
        [exclude](#module-loaders-exclude): [
          path.resolve(__dirname, "app/demo-files")
        ]
        // matching conditions, each accepting regular expression or string
        // test and include behave equal, both must be matched
        // exclude must not be matched
        // Best practices:
        // - Use RegExp only in test and for filename matching
        // - Use arrays of absolute paths in include and exclude
        // - Try to avoid exclude and prefer include

        [loader](#module-loaders-loader): "babel-loader",
        // the loader which should be applied, it'll be resolve relative to the context

        [options](#module-loaders-options): {
          presets: ["es2015"]
        }
        // options for the loader

        enforce: "before",
        enforce: "after",
        // (deprecated) apply these rule even if rules are overriden
      },

      {
        test: "\.html$"

        [loaders](#module-loaders-loaders): [
          // apply multiple loaders
          "htmllint-loader",
          {
            loader: "html-loader",
            options: {
              /* ... */
            }
          }
        ]
      }

    ],

    <details><summary>/* Advanced module configuration (click to show) */</summary>

    [noParse](#module.noParse): [
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

  [resolve](#resolve): {
    // options for resolving module requests
    // (does not apply to resolving to loaders)

    [modules](#resolve-modules): [
      "node_modules",
      path.resolve(__dirname, "app")
    ],
    // directories where to look for modules

    [extensions](#resolve-extensions): [".js", ".json", ".jsx", ".css"],
    // extensions that are used

    [alias](#resolve-alias): [
      // a list of module name aliasings

      {
        [name](#resolve-alias-name): "module",
        // the old request

        [alias](#resolve-alias-alias): "new-module",
        // the new request

        [onlyModule](#resolve-alias-onlyModule): true
        // if true only "module" is aliased
        // if false "module/inner/path" is also aliased
      }
    ],
    [alias](#resolve-alias): {
      // alternative syntax (recommended)

      "only-module$": "new-module",
      "module": "new-module"
    },

    <details><summary>/* Advanced resolve configuration (click to show) */</summary>

    [symlinks](#resolve-symlinks): true,
    // follow symlinks to new location

    [descriptionFiles](#resolve-descriptionFiles): ["package.json"],
    // files that are read for package description

    [mainFields](#resolve-mainFields): ["main"],
    // properties that are read from description file
    // when a folder is requested

    [aliasFields](#resolve-aliasFields): ["browser"],
    // properites that are read from description file
    // to alias requests in this package

    [enforceExtension](#resolve-enforceExtension): false,
    // if true request must not include an extensions
    // if false request may already include an extension

    [moduleExtensions](#resolve-moduleExtensions): ["-module"],
    [enforceModuleExtension](#resolve-enforceModuleExtension): false,
    // like extensions/enforceExtension but for module names instead of files

    [unsafeCache](#resolve-unsafeCache): true,
    [unsafeCache](#resolve-unsafeCache): {},
    // enables caching for resolved requests
    // this is unsafe as folder structure may change
    // but preformance improvement is really big

    [cachePredicate](#resolve-cachePredicate): (path, request) => true,
    // predicate function which selects requests for caching

    [plugins](#resolve-plugins): [
      // ...
    ]
    // additional plugins applied to the resolver
    </details>
  },

  <details><summary>[devtool](#devtool): "source-map", // enum</summary>
  [devtool](#devtool): "inline-source-map", // inlines SourceMap into orginal file
  [devtool](#devtool): "eval-source-map", // inlines SourceMap per module
  [devtool](#devtool): "hidden-source-map", // SourceMap without reference in original file
  [devtool](#devtool): "cheap-source-map", // cheap-variant of SourceMap without module mappings
  [devtool](#devtool): "cheap-module-source-map", // cheap-variant of SourceMap with module mappings
  [devtool](#devtool): "eval", // no SourceMap, but named modules
  </details>
  // enhance debugging by adding meta info for the browser devtools

  [context](#context): __dirname, // string
  // the home directory for webpack
  // the [entry](#entry) and [module.loaders.loader](#module-loaders-loader) option
  //   is resolved relative to this directory

  <details><summary>[target](#target): "web", // enum</summary>
  [target](#target): "webworker", // WebWorker
  [target](#target): "node", // node.js via require
  [target](#target): "async-node", // node.js via fs and vm
  [target](#target): "node-webkit", // nw.js
  [target](#target): "electron-main", // electron, main process
  [target](#target): "electron-renderer", // electron, renderer process
  [target](#target): (compiler) => { /* ... */ }, // custom
  </details>
  // the environment in which the bundle should run
  // changes chunk loading behavior and available modules

  [externals](#externals): ["angular", "react"], // array
  [externals](#externals): /^[a-z\-]+($|\/)/, // Regex
  [externals](#externals): {
    angular: "this angular", // this["angular"]
    react: { // UMD
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "React"
    }
  }
  [externals](#externals): (request) => { /* ... */ return "commonjs " + request }
  // Don't follow/bundle these modules, but request them at runtime from the environment

  [stats](#stats): {
    /* TODO */
  },

  [devServer](#devServer): {
    /* TODO */
  },

  [plugins](#plugins): [
    // ...
  ],
  // list of additional plugins

  <details><summary>/* Advanced configuration (click to show) */</summary>

  [resolveLoader](#resolveLoader): { /* same as resolve */ }
  // separate resolve options for loaders

  [profile](#profile): true, // boolean
  // capture timing information

  [cache](#cache): false, // boolean
  // disable/enable caching

  [watch](#watch): true, // boolean
  // enables watching

  [watchOptions](#watchOptions): {
    [aggregateTimeout](#watchOptions.aggregateTimeout): 1000, // in ms
    // aggregates multiple changes to a single rebuild

    [poll](#watchOptions.poll): true,
    [poll](#watchOptions.poll): 500, // intervall in ms
    // enables polling mode for watching
    // must be used on filesystems that doesn't notify on change
    // i. e. nfs shares
  },

  [node](#node): {
    /* TODO */
  },

  [recordsPath](#recordsPath): path.resolve(__dirname, "build/records.json"),
  [recordsInputPath](#recordsInputPath): path.resolve(__dirname, "build/records.json"),
  [recordsOutputPath](#recordsOutputPath): path.resolve(__dirname, "build/records.json"),
  // TODO

  </details>
}
```