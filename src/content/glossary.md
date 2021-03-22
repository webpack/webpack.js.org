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

## A {#a}

- [**Asset**](/guides/asset-management/): 资源是对图像、字体、媒体和任何其他类型文件的统称，通常用于网站和其他应用程序中。这些文件通常在 [output](/glossary/#o) 中最终输出为单独的文件，但也可以通过诸如 [style-loader](/loaders/style-loader) 或 [url-loader](/loaders/url-loader)之类的方法内联。

## B {#b}

- [**Bundle**](/guides/getting-started/#creating-a-bundle): bundle 由许多不同的模块生成，包含已经经过加载和编译过程的源文件的最终版本。
- [**Bundle Splitting**](/guides/code-splitting): 这个过程提供了一种优化构建的方法，允许 webpack 为单个应用程序生成多个 bundle 文件。因此，可以将每个 bundle 文件与影响其他文件的更改进行分离，从而减少重新发布并由此被客户端重新下载的代码量，并且运用浏览器缓存。

## C {#c}

- **Chunk**: 此 webpack 特定术语在内部用于管理捆绑过程。输出束（bundle）由块组成，其中有几种类型（例如 entry 和 child ）。通常，_块_ 直接与 _输出束_ (bundle）相对应，但是，有些配置不会产生一对一的关系。
- [**Code Splitting**](/guides/code-splitting/): 代码分离指将代码分成不同的包/块，然后可以按需加载，而不是加载包含所有内容的单个包。
- [**Configuration**](/concepts/configuration/): webpack 的配置文件是导出一个对象的 JavaScript 文件。 webpack 根据配置对象定义的属性进行解析。

## D {#d}

- [**Dependency Graph**](/concepts/dependency-graph): 任何时候，一个文件依赖于另一个文件，webpack 就把此视为文件之间有 _依赖关系_ 。从这些入口起点开始，webpack 递归地构建一个依赖图，这个依赖图包含着应用程序所需的每个模块。

## E {#e}

- [**Entry Point**](/concepts/entry-points): 入口起点告诉 webpack 从哪里开始，并遵循着依赖图知道要打包哪些文件。您可以将应用程序的入口起点视为要捆绑的内容的 _根上下文_。

## H {#h}

- [**Hot Module Replacement (HMR)**](/concepts/hot-module-replacement)：模块热替换功能会在应用程序运行过程中替换、添加或删除 `模块`，而无需重新加载整个页面。

## L {#l}

- [**Loaders**](/concepts/loaders): loader 用于对模块的源代码进行转换。loader 可以使你在 `require()` 或"加载"模块时预处理文件。类似于一个 “task-runner”。
- [**Lazy Loading**](/guides/lazy-loading): 对应用程序的部分（块）进行懒加载的过程。换句话说，只有我们在真正需要它们的时候才进行加载。

## M {#m}

- [**Module**](/concepts/modules): Module 是离散功能块，相比于完整程序提供了更小的接触面。精心编写的模块提供了可靠的抽象和封装界限，使得应用程序中每个模块都具有条理清楚的设计和明确的目的。
- [**Module Resolution**](/concepts/module-resolution/)：一个模块可以作为另一个模块的依赖模块。resolver 是一个库(library)，用于帮助找到模块的绝对路径，并在 `resolve.modules` 中指定的所有目录中搜索该模块.
- [**Manifest**](/concepts/manifest): 当完成打包并发送到浏览器时，会在运行时通过 Manifest 来解析和加载模块。

## O {#o}

- [**Output**](/concepts/output): 配置项指定将编译的文件输出到磁盘的位置。
  > *注意,即使可以存在多个入口起点，但只指定一个输出配置。*

## P {#p}

- [**Plugin**](/concepts/plugins): webpack 插件是一个具有 `apply` 属性的 JavaScript 对象。`apply` 属性会被 webpack compiler 调用，并且插件可在整个编译生命周期访问。这些包通常会以某种方式扩展编译功能。

## R {#r}

- [**Request**](/guides/dependency-management/): 指在 require/import 语句中的表达式，如在 _require("./template/" + name + ".ejs")_ 中的请求是 _"./template/" + name + ".ejs"_ 。

## S {#s}

<<<<<<< HEAD
- [**Scaffolding**](/guides/scaffolding/): 此功能允许使用可自定义的第三方初始化包创建 webpack 配置项。
- [**Shimming**](/guides/shimming/): 并非所有 JS 文件都可以直接与 webpack 一起使用。有些文件可能是不支持的模块格式，甚至不是任何模块格式。`shimming` 这时就会发挥作用。
=======
- [**Shimming**](/guides/shimming/): Not all JS files can be used directly with webpack. The file maybe in an unsupported module format, or not even in any module format. It is here where `shimming` comes into play.
>>>>>>> c2c13f356b18ccadb0f3fcaa8bcc9ef9316d05f5

## T {#t}

- [**Target**](/configuration/target/): 用户配置的部署目标 [此处列出](/configuration/target/) 用于为特定环境编译，如浏览器、 NodeJS 或 Electron。
- [**Tree Shaking**](/guides/tree-shaking/): 删除未使用/多余的代码，或者更准确地说，实时代码导入。像 webpack 这样的编译器将通过分析各种 `import` 语句和导入代码的使用情况，来确定实际使用了依赖项的哪些部分来实现这一点，删除那些没有使用的 “树” 的部分。

## V {#v}

- [**Vendor Entry Point**](/concepts/entry-points/#separate-app-and-vendor-entries): 从 `app.js` 和 `vendors.js` 开始创建依赖图。这些依赖图完全是分开且独立的，允许使用 `CommonsChunkPlugin`，并将应用程序包的任何供应商（vendor）引用提取到你的供应商包中。有助于在 webpack 中实现一种称为 [长期供应商缓存](/guides/caching/) 的常见模式。

## W {#w}

- [**webpack**](/): 一个用于现代 JavaScript 应用程序的高度可配置的 [module](/concepts/modules) 打包工具。
