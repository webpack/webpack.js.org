---
title: 术语表
sort: 3
contributors:
  - kryptokinght
  - rouzbeh84
  - bebraw
  - skipjack
  - byzyk
  - pranshuchittora
  - jamesgeorge007
---

该索引列出了整个 webpack 生态系统中的常用术语。

<<<<<<< HEAD

## A {#a}

- [__Asset__](/guides/asset-management/): 资源是对图像、字体、媒体和任何其他类型文件的统称，通常用于网站和其他应用程序中。这些文件通常在 [output](/glossary/#o) 中最终输出为单独的文件，但也可以通过诸如 [style-loader](/loaders/style-loader) 或 [url-loader](/loaders/url-loader)之类的方法内联。

=======
## A

- [**Asset**](/guides/asset-management/): This is a general term for the images, fonts, media, and any other kind of files that are typically used in websites and other applications. These typically end up as individual files within the [output](/glossary/#o) but can also be inlined via things like the [style-loader](/loaders/style-loader) or [url-loader](/loaders/url-loader).
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

## B {#b}

<<<<<<< HEAD
- [__Bundle__](/guides/getting-started/#creating-a-bundle): bundle 由许多不同的模块生成，包含已经经过加载和编译过程的源文件的最终版本。
- [__Bundle Splitting__](/guides/code-splitting): 这个过程提供了一种优化构建的方法，允许 webpack 为单个应用程序生成多个 bundle 文件。因此，可以将每个 bundle 文件与影响其他文件的更改进行分离，从而减少重新发布并由此被客户端重新下载的代码量，并且运用浏览器缓存。

=======
- [**Bundle**](/guides/getting-started/#creating-a-bundle): Produced from a number of distinct modules, bundles contain the final versions of source files that have already undergone the loading and compilation process.
- [**Bundle Splitting**](/guides/code-splitting): This process offers one way of optimizing a build, allowing webpack to generate multiple bundles for a single application. As a result, each bundle can be isolated from changes effecting others, reducing the amount of code that needs to be republished and therefore re-downloaded by the client and taking advantage of browser caching.
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

## C {#c}

<<<<<<< HEAD
- __Chunk__: 此 webpack 特定术语在内部用于管理捆绑过程。输出束（bundle）由块组成，其中有几种类型（例如 entry 和 child ）。通常，_块_ 直接与 _输出束_ (bundle）相对应，但是，有些配置不会产生一对一的关系。
- [__Code Splitting__](/guides/code-splitting/): 代码分离指将代码分成不同的包/块，然后可以按需加载，而不是加载包含所有内容的单个包。
- [__Configuration__](/concepts/configuration/): webpack 的配置文件是导出一个对象的 JavaScript 文件。 webpack 根据配置对象定义的属性进行解析。

=======
- **Chunk**: This webpack-specific term is used internally to manage the bundling process. Bundles are composed out of chunks, of which there are several types (e.g. entry and child). Typically, _chunks_ directly correspond with the output _bundles_ however, there are some configurations that don't yield a one-to-one relationship.
- [**Code Splitting**](/guides/code-splitting/): Refers to dividing your code into various bundles/chunks which you can then load on demand instead of loading a single bundle containing everything.
- [**Configuration**](/concepts/configuration/): webpack configuration file is a plain old JavaScript file that exports an object. This object is then processed by webpack based upon its defined properties.
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

## D {#d}

<<<<<<< HEAD
- [__Dependency Graph__](/concepts/dependency-graph): 任何时候，一个文件依赖于另一个文件，webpack 就把此视为文件之间有 _依赖关系_ 。从这些入口起点开始，webpack 递归地构建一个依赖图，这个依赖图包含着应用程序所需的每个模块。

=======
- [**Dependency Graph**](/concepts/dependency-graph): Any time one file depends on another, webpack treats this as a _dependency_. Starting from an entry point(s), webpack recursively builds a dependency graph that includes every module/asset your application needs.
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

## E {#e}

<<<<<<< HEAD
- [__Entry Point__](/concepts/entry-points): 入口起点告诉 webpack 从哪里开始，并遵循着依赖图知道要打包哪些文件。您可以将应用程序的入口起点视为要捆绑的内容的 _根上下文_。

=======
- [**Entry Point**](/concepts/entry-points): The entry point tells webpack where to start and follows the graph of dependencies to know what to bundle. You can think of your application's entry point(s) as the **contextual root(s)** of what you want bundled.
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

## H {#h}

<<<<<<< HEAD
- [__Hot Module Replacement (HMR)__](/concepts/hot-module-replacement)：模块热替换功能会在应用程序运行过程中替换、添加或删除 `模块`，而无需重新加载整个页面。

=======
- [**Hot Module Replacement (HMR)**](/concepts/hot-module-replacement): A process that exchanges, adds, or removes `modules` while an application is running without a full page reload.
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

## L {#l}

<<<<<<< HEAD
- [__Loaders__](/concepts/loaders): loader 用于对模块的源代码进行转换。loader 可以使你在 `require()` 或"加载"模块时预处理文件。类似于一个 “task-runner”。
- [__Lazy Loading__](/guides/lazy-loading): 对应用程序的部分（块）进行懒加载的过程。换句话说，只有我们在真正需要它们的时候才进行加载。

=======
- [**Loaders**](/concepts/loaders): Transformations that are applied on the source code of a module. They allow you to pre-process files as you `require()` or "load" them. Similar to a 'task-runner'.
- [**Lazy Loading**](/guides/lazy-loading): A process of loading parts (chunks) of your application lazily. In other words loading them only when we really need them.
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

## M {#m}

<<<<<<< HEAD
- [__Module__](/concepts/modules): Module 是离散功能块，相比于完整程序提供了更小的接触面。精心编写的模块提供了可靠的抽象和封装界限，使得应用程序中每个模块都具有条理清楚的设计和明确的目的。
- [__Module Resolution__](/concepts/module-resolution/)：一个模块可以作为另一个模块的依赖模块。resolver 是一个库(library)，用于帮助找到模块的绝对路径，并在 `resolve.modules` 中指定的所有目录中搜索该模块.
- [__Manifest__](/concepts/manifest): 当完成打包并发送到浏览器时，会在运行时通过 Manifest 来解析和加载模块。

=======
- [**Module**](/concepts/modules): Discrete chunks of functionality that provide a smaller surface area than a full program. Well-written modules provide solid abstractions and encapsulation boundaries which make up a coherent design and clear purpose.
- [**Module Resolution**](/concepts/module-resolution/): A module can be required as a dependency from another module and a resolver is a library which helps in locating a module by its absolute path. Modules are searched for inside all directories specified in `resolve.modules`.
- [**Manifest**](/concepts/manifest): The runtime will use it to resolve and load modules once they've been bundled and shipped to the browser.
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

## O {#o}

<<<<<<< HEAD
- [__Output__](/concepts/output): 配置项指定将编译的文件输出到磁盘的位置。
  > _注意,即使可以存在多个入口起点，但只指定一个输出配置。_


## P {#p}

- [__Plugin__](/concepts/plugins): webpack 插件是一个具有 `apply` 属性的 JavaScript 对象。`apply` 属性会被 webpack compiler 调用，并且插件可在整个编译生命周期访问。这些包通常会以某种方式扩展编译功能。

=======
- [**Output**](/concepts/output): Option(s) specifying where to output the compiled files to disk.
  > _Note, that while there can be multiple entry points, only one output configuration is specified._

## P

- [**Plugin**](/concepts/plugins): A JavaScript object that has an `apply` property. This `apply` property is called by the webpack compiler, giving access to the entire compilation lifecycle. These packages will typically extend compilation functionality in one way or another.
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

## R {#r}

<<<<<<< HEAD
- [__Request__](/guides/dependency-management/): 指在 require/import 语句中的表达式，如在 _require("./template/" + name + ".ejs")_ 中的请求是 _"./template/" + name + ".ejs"_ 。

=======
- [**Request**](/guides/dependency-management/): Refers to the expression in the require/import statement, e.g. _require("./template/" + name + ".ejs")_, the request is _"./template/" + name + ".ejs"_.
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

## S {#s}

<<<<<<< HEAD
- [__Scaffolding__](/guides/scaffolding/): 此功能允许使用可自定义的第三方初始化包创建 webpack 配置项。
- [__Shimming__](/guides/shimming/): 并非所有 JS 文件都可以直接与 webpack 一起使用。有些文件可能是不支持的模块格式，甚至不是任何模块格式。`shimming` 这时就会发挥作用。

=======
- [**Scaffolding**](/guides/scaffolding/): This feature allows creating a webpack configuration by using customizable third-party initialization packages.
- [**Shimming**](/guides/shimming/): Not all JS files can be used directly with webpack. The file maybe in an unsupported module format, or not even in any module format. It is here where `shimming` comes into play.
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

## T {#t}

<<<<<<< HEAD
- [__Target__](/configuration/target/): 用户配置的部署目标 [此处列出](/configuration/target/) 用于为特定环境编译，如浏览器、 NodeJS 或 Electron。
- [__Tree Shaking__](/guides/tree-shaking/): 删除未使用/多余的代码，或者更准确地说，实时代码导入。像 webpack 这样的编译器将通过分析各种 `import` 语句和导入代码的使用情况，来确定实际使用了依赖项的哪些部分来实现这一点，删除那些没有使用的 “树” 的部分。

=======
- [**Target**](/configuration/target/): User configured deployment target(s) [listed here](/configuration/target/) to compile for a specific environment like the browser, NodeJS, or Electron.
- [**Tree Shaking**](/guides/tree-shaking/): Unused/Excess code elimination, or more precisely, live code importing. Compilers like webpack will accomplish this by analyzing the various kinds `import` statements and usage of the imported code to determine what parts of dependencies are actually being utilized, dropping parts of the "tree" that are not.
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

## V {#v}

<<<<<<< HEAD
- [__Vendor Entry Point__](/concepts/entry-points/#separate-app-and-vendor-entries): 从 `app.js` 和 `vendors.js` 开始创建依赖图。这些依赖图完全是分开且独立的，允许使用 `CommonsChunkPlugin`，并将应用程序包的任何供应商（vendor）引用提取到你的供应商包中。有助于在 webpack 中实现一种称为 [长期供应商缓存](/guides/caching/) 的常见模式。

=======
- [**Vendor Entry Point**](/concepts/entry-points/#separate-app-and-vendor-entries): Create dependency graphs starting at both `app.js` and `vendors.js`. These graphs are completely separate and independent of each other to allow leverage of `CommonsChunkPlugin` and extract any vendor references from your app bundle into your vendor bundle. Helps achieve a common pattern in webpack known as [long-term vendor-caching](/guides/caching/).
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

## W {#w}

<<<<<<< HEAD
- [__webpack__](/): 一个用于现代 JavaScript 应用程序的高度可配置的 [module](/concepts/modules) 打包工具。
=======
- [**webpack**](/): A highly configurable [module](/concepts/modules) bundler for modern JavaScript applications.
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5
