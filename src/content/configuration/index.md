---
title: 配置
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
  - sterlingvix
---

webpack 是需要传入一个配置对象(configuration object)。取决于你如何使用 webpack，可以通过两种方式之一：终端或 Node.js。下面指定了所有可用的配置选项。

T> 刚接触 webpack？请查看我们提供的指南，从 webpack 一些[核心概念](/concepts)开始学习吧！

T> 注意整个配置中我们使用 Node 内置的 [path 模块](https://nodejs.org/api/path.html)，并在它前面加上 [__dirname](https://nodejs.org/docs/latest/api/globals.html#globals_dirname)这个全局变量。可以防止不同操作系统之间的文件路径问题，并且可以使相对路径按照预期工作。更多「POSIX 和 Windows」的相关信息请查看[此章节](https://nodejs.org/api/path.html#path_windows_vs_posix)。

## 选项

点击下面配置代码中每个选项的名称，跳转到详细的文档。还要注意，带有箭头的项目可以展开，以显示更多示例，在某些情况下可以看到高级配置。

__webpack.config.js__

``` js-with-links-with-details
const path = require('path');

module.exports = {
  <details><summary>[entry](/configuration/entry-context#entry): "./app/entry", // string | object | array</summary>
  [entry](/configuration/entry-context#entry): ["./app/entry1", "./app/entry2"],
  [entry](/configuration/entry-context#entry): {
    a: "./app/entry-a",
    b: ["./app/entry-b1", "./app/entry-b2"]
  },
  </details>
  // 这里应用程序开始执行
  // webpack 开始打包

  [output](/configuration/output): {
    // webpack 如何输出结果的相关选项

    [path](/configuration/output#output-path): path.resolve(__dirname, "dist"), // string
    // 所有输出文件的目标路径
    // 必须是绝对路径（使用 Node.js 的 path 模块）

    <details><summary>[filename](/configuration/output#output-filename): "bundle.js", // string</summary>
    [filename](/configuration/output#output-filename): "[name].js", // 用于多个入口点(entry point)（出口点？）
    [filename](/configuration/output#output-filename): "[chunkhash].js", // 用于[长效缓存](/guides/cache)
    </details>
    // 「入口分块(entry chunk)」的文件名模板（出口分块？）

    <details><summary>[publicPath](/configuration/output#output-publicpath): "/assets/", // string</summary>
    [publicPath](/configuration/output#output-publicpath): "",
    [publicPath](/configuration/output#output-publicpath): "https://cdn.example.com/",
    </details>
    // 输出解析文件的目录，url 相对于 HTML 页面

    [library](/configuration/output#output-library): "MyLibrary", // string,
    // 导出库(exported library)的名称

    <details><summary>[libraryTarget](/configuration/output#output-librarytarget): "umd", // 通用模块定义</summary>
        [libraryTarget](/configuration/output#output-librarytarget): "umd2", // 通用模块定义
        [libraryTarget](/configuration/output#output-librarytarget): "commonjs2", // exported with module.exports
        [libraryTarget](/configuration/output#output-librarytarget): "commonjs-module", // 使用 module.exports 导出
        [libraryTarget](/configuration/output#output-librarytarget): "commonjs", // 作为 exports 的属性导出
        [libraryTarget](/configuration/output#output-librarytarget): "amd", // 使用 AMD 定义方法来定义
        [libraryTarget](/configuration/output#output-librarytarget): "this", // 在 this 上设置属性
        [libraryTarget](/configuration/output#output-librarytarget): "var", // 变量定义于根作用域下
        [libraryTarget](/configuration/output#output-librarytarget): "assign", // 盲分配(blind assignment)
        [libraryTarget](/configuration/output#output-librarytarget): "window", // 在 window 对象上设置属性
        [libraryTarget](/configuration/output#output-librarytarget): "global", // property set to global object
        [libraryTarget](/configuration/output#output-librarytarget): "jsonp", // jsonp wrapper
    </details>
    // 导出库(exported library)的类型

    <details><summary>/* 高级输出配置（点击显示） */</summary>

    [pathinfo](/configuration/output#output-pathinfo): true, // boolean
    // 在生成代码时，引入相关的模块、导出、请求等有帮助的路径信息。

    [chunkFilename](/configuration/output#output-chunkfilename): "[id].js",
    [chunkFilename](/configuration/output#output-chunkfilename): "[chunkhash].js", // 长效缓存(/guides/caching)
    // 「附加分块(additional chunk)」的文件名模板

    [jsonpFunction](/configuration/output#output-jsonpfunction): "myWebpackJsonp", // string
    // 用于加载分块的 JSONP 函数名

    [sourceMapFilename](/configuration/output#output-sourcemapfilename): "[file].map", // string
    [sourceMapFilename](/configuration/output#output-sourcemapfilename): "sourcemaps/[file].map", // string
    // 「source map 位置」的文件名模板

    [devtoolModuleFilenameTemplate](/configuration/output#output-devtoolmodulefilenametemplate): "webpack:///[resource-path]", // string
    // 「devtool 中模块」的文件名模板

    [devtoolFallbackModuleFilenameTemplate](/configuration/output#output-devtoolfallbackmodulefilenametemplate): "webpack:///[resource-path]?[hash]", // string
    // 「devtool 中模块」的文件名模板（用于冲突）

    [umdNamedDefine](/configuration/output#output-umdnameddefine): true, // boolean
    // 在 UMD 库中使用命名的 AMD 模块

    [crossOriginLoading](/configuration/output#output-crossoriginloading): "use-credentials", // 枚举
    [crossOriginLoading](/configuration/output#output-crossoriginloading): "anonymous",
    [crossOriginLoading](/configuration/output#output-crossoriginloading): false,
    // 指定运行时如何发出跨域请求问题

    <details><summary>/* 专家级输出配置（自行承担风险） */</summary>

    [devtoolLineToLine](/configuration/output#output-devtoollinetoline): {
      test: /\.jsx$/
    },
    // 为这些模块使用 1:1 映射 SourceMaps（快速）

    [hotUpdateMainFilename](/configuration/output#output-hotupdatemainfilename): "[hash].hot-update.json", // string
    // 「HMR 清单」的文件名模板

    [hotUpdateChunkFilename](/configuration/output#output-hotupdatechunkfilename): "[id].[hash].hot-update.js", // string
    // 「HMR 分块」的文件名模板

    [sourcePrefix](/configuration/output#output-sourceprefix): "\t", // string
    // 包内前置式模块资源具有更好可读性
    </details>
    </details>
  },

  [module](/configuration/module): {
    // 关于模块配置

    [rules](/configuration/module#module-rules): [
      // 模块规则（配置 loader、解析器等选项）

      {
        [test](/configuration/module#rule-test): /\.jsx?$/,
        [include](/configuration/module#rule-include): [
          path.resolve(__dirname, "app")
        ],
        [exclude](/configuration/module#rule-exclude): [
          path.resolve(__dirname, "app/demo-files")
        ],
        // 这里是匹配条件，每个选项都接收一个正则表达式或字符串
        // test 和 include 具有相同的作用，都是必须匹配选项
        // exclude 是必不匹配选项（优先于 test 和 include）
        // 最佳实践：
        // - 只在 test 和 文件名匹配 中使用正则表达式
        // - 在 include 和 exclude 中使用绝对路径数组
        // - 尽量避免 exclude，更倾向于使用 include

        [issuer](/configuration/module#rule-issuer): { test, include, exclude },
        // issuer 条件（导入源）

        [enforce](/configuration/module#rule-enforce): "pre",
        [enforce](/configuration/module#rule-enforce): "post",
        // 标识应用这些规则，即使规则覆盖（高级选项）

        [loader](/configuration/module#rule-loader): "babel-loader",
        // 应该应用的 loader，它相对上下文解析
        // 为了更清晰，`-loader` 后缀在 webpack 2 中不再是可选的
        // 查看 [webpack 1 升级指南](/guides/migrating)。

        [options](/configuration/module#rule-options-rule-query): {
          presets: ["es2015"]
        },
        // loader 的可选项
      },

      {
        [test](/configuration/module#rule-test): /\.html$/,
        [test](/configuration/module#rule-test): "\.html$"

        [use](/configuration/module#rule-use): [
          // 应用多个 loader 和选项
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
      // 只使用这些嵌套规则之一

      { [rules](/configuration/module#rule-rules): [ /* rules */ ] },
      // 使用所有这些嵌套规则（合并可用条件）

      { [resource](/configuration/module#rule-resource): { [and](/configuration/module#condition): [ /* 条件 */ ] } },
      // 仅当所有条件都匹配时才匹配

      { [resource](/configuration/module#rule-resource): { [or](/configuration/module#condition): [ /* 条件 */ ] } },
      { [resource](/configuration/module#rule-resource): [ /* 条件 */ ] },
      // 任意条件匹配时匹配（默认为数组）

      { [resource](/configuration/module#rule-resource): { [not](/configuration/module#condition): /* 条件 */ } }
      // 条件不匹配时匹配
    ],

    <details><summary>/* 高级模块配置（点击展示） */</summary>

    [noParse](/configuration/module#module-noparse): [
      /special-library\.js$/
    ],
    // 不解析这里的模块

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
    // 解析模块请求的选项
    // （不适用于对 loader 解析）

    [modules](/configuration/resolve#resolve-modules): [
      "node_modules",
      path.resolve(__dirname, "app")
    ],
    // 用于查找模块的目录

    [extensions](/configuration/resolve#resolve-extensions): [".js", ".json", ".jsx", ".css"],
    // 使用的扩展名

    [alias](/configuration/resolve#resolve-alias): {
      // 模块别名列表

      "module": "new-module",
      // 起别名："module" -> "new-module" 和 "module/path/file" -> "new-module/path/file"

      "only-module$": "new-module",
      // 起别名 "only-module" -> "new-module"，但不匹配 "only-module/path/file" -> "new-module/path/file"

      "module": path.resolve(__dirname, "app/third/module.js"),
      // 起别名 "module" -> "./app/third/module.js" 和 "module/file" 会导致错误
      // 模块别名相对于当前上下文导入
    },
    <details><summary>/* 可供选择的别名语法（点击展示） */</summary>
    [alias](/configuration/resolve#resolve-alias): [
      {
        name: "module",
        // 旧的请求

        alias: "new-module",
        // 新的请求

        onlyModule: true
        // 如果为 true，只有 "module" 是别名
        // 如果为 false，"module/inner/path" 也是别名
      }
    ],
    </details>

    <details><summary>/* 高级解析选项（点击展示） */</summary>

    [symlinks](/configuration/resolve#resolve-symlinks): true,
    // 遵循符号链接(symlinks)到新位置

    [descriptionFiles](/configuration/resolve#resolve-descriptionfiles): ["package.json"],
    // 从 package 描述中读取的文件

    [mainFields](/configuration/resolve#resolve-mainfields): ["main"],
    // 从描述文件中读取的属性
    // 当请求文件夹时

    [aliasFields](/configuration/resolve#resolve-aliasfields): ["browser"],
    // 从描述文件中读取的属性
    // 以对此 package 的请求起别名

    [enforceExtension](/configuration/resolve#resolve-enforceextension): false,
    // 如果为 true，请求必不包括扩展名
    // 如果为 false，请求可以包括扩展名

    [moduleExtensions](/configuration/resolve#resolveloader-moduleextensions): ["-module"],
    [enforceModuleExtension](/configuration/resolve#resolve-enforcemoduleextension): false,
    // 类似 extensions/enforceExtension，但是用模块名替换文件

    [unsafeCache](/configuration/resolve#resolve-unsafecache): true,
    [unsafeCache](/configuration/resolve#resolve-unsafecache): {},
    // 为解析的请求启用缓存
    // 这是不安全，因为文件夹结构可能会改动
    // 但是性能改善是很大的

    [cachePredicate](/configuration/resolve#resolve-cachepredicate): (path, request) => true,
    // predicate function which selects requests for caching

    [plugins](/configuration/resolve#resolve-plugins): [
      // ...
    ]
    // 应用于解析器的附加插件
    </details>
  },

  [performance](/configuration/performance): {
    <details><summary>[hints](/configuration/performance#performance-hints): "warning", // 枚举 </summary>
    [hints](/configuration/performance#performance-hints): "error", // 性能提示中抛出错误
    [hints](/configuration/performance#performance-hints): false, // 关闭性能提示
    </details>
    [maxAssetSize](/configuration/performance#performance-maxassetsize): 200000, // 整数类型（以字节为单位）
    [maxEntrypointSize](/configuration/performance#performance-maxentrypointsize): 400000, // 整数类型（以字节为单位）
    [assetFilter](/configuration/performance#performance-assetfilter): function(assetFilename) {
      // 提供资源文件名的断言函数
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },

  <details><summary>[devtool](/configuration/devtool): "source-map", // enum </summary>
  [devtool](/configuration/devtool): "inline-source-map", // 嵌入到源文件中
  [devtool](/configuration/devtool): "eval-source-map", // 将 SourceMap 嵌入到每个模块中
  [devtool](/configuration/devtool): "hidden-source-map", // SourceMap 不在源文件中引用
  [devtool](/configuration/devtool): "cheap-source-map", // 没有模块映射(module mappings)的 SourceMap 低级变体(cheap-variant)
  [devtool](/configuration/devtool): "cheap-module-source-map", // 有模块映射(module mappings)的 SourceMap 低级变体
  [devtool](/configuration/devtool): "eval", // 没有模块映射，而是命名模块。以牺牲细节达到最快。
  </details>
  // 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试
  // 牺牲了构建速度的 `source-map' 是最详细的。

  [context](/configuration/entry-context#context): __dirname, // string（绝对路径！）
  // webpack 的主目录
  // [entry](/configuration/entry-context) 和 [module.rules.loader](/configuration/module#rule-loader) 选项
  // 相对于此目录解析

  <details><summary>[target](/configuration/target): "web", // 枚举</summary>
  [target](/configuration/target): "webworker", // WebWorker
  [target](/configuration/target): "node", // node.js 通过 require
  [target](/configuration/target): "async-node", // Node.js 通过 fs and vm
  [target](/configuration/target): "node-webkit", // nw.js
  [target](/configuration/target): "electron-main", // electron，主进程(main process)
  [target](/configuration/target): "electron-renderer", // electron，渲染进程(renderer process)
  [target](/configuration/target): (compiler) => { /* ... */ }, // 自定义
  </details>
  // 包(bundle)应该运行的环境
  // 更改 块加载行为(chunk loading behavior) 和 可用模块(available module)

  <details><summary>[externals](/configuration/externals): ["react", /^@angular\//],</summary>
  [externals](/configuration/externals): "react", // string（精确匹配）
  [externals](/configuration/externals): /^[a-z\-]+($|\/)/, // 正则
  [externals](/configuration/externals): { // 对象
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
  // 不要遵循/打包这些模块，而是在运行时从环境中请求他们

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
  // 精确控制要显示的 bundle 信息

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
  // 附加插件列表


  <details><summary>/* 高级配置（点击展示） */</summary>

  [resolveLoader](/configuration/resolve#resolveloader): { /* 等同于 resolve */ }
  // 独立解析选项的 loader

  [parallelism](other-options#parallelism): 1, // number
  // 限制并行处理模块的数量

  [profile](other-options#profile): true, // boolean
  // 捕获时机信息

  [bail](other-options#bail): true, //boolean
  // 在第一个错误出错时抛出，而不是无视错误。

  [cache](other-options#cache): false, // boolean
  // 禁用/启用缓存

  [watch](watch#watch): true, // boolean
  // 启用观察

  [watchOptions](watch#watchoptions): {
    [aggregateTimeout](watch#watchoptions-aggregatetimeout): 1000, // in ms
    // 将多个更改聚合到单个重构建(rebuild)

    [poll](watch#watchoptions-poll): true,
    [poll](watch#watchoptions-poll): 500, // 间隔单位 ms
    // 启用轮询观察模式
    // 必须用在不通知更改的文件系统中
    // 即 nfs shares（译者注：[Network FileSystem](http://linux.vbird.org/linux_server/0330nfs/0330nfs.php)，最大的功能就是可以透過網路，讓不同的機器、不同的作業系統、可以彼此分享個別的檔案 ( share file )）
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

***

> 原文：https://webpack.js.org/configuration/
