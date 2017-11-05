---
title: 概念术语
sort: 3
contributors:
  - rouzbeh84
  - bebraw
  - skipjack
---

该索引列出了在整个 Webpack 生态系统中共同使用的术语。


## A

- [**资源(Asset)**](/guides/asset-management/): 这是一个普遍的术语，用于图片、字体、媒体，还有一些其他类型的文件，常用在网站和其他应用程序。这些文件通常最终在[输出(output )](/glossary#o) 中成为单个文件，但也可以通过一些东西内联，像 [style-loader](/loaders/style-loader) 或者 [url-loader](/loaders/url-loader) .


## B

- [**Bundle**](/guides/getting-started/#creating-a-bundle): 由多个不同的模块生成，bundles 包含了早已经过加载和编译的最终源文件版本。
- [**Bundle 分离(Bundle Splitting)**](/guides/code-splitting): 这个流程提供一个优化 build 的方法，允许 webpack 为应用程序生成多个 bundle。最终效果是，当其他某些 bundle 的改动时，彼此独立的另一些 bundle 都可以不受到影响，减少需要重新发布的代码量，因此由客户端重新下载并利用浏览器缓存。


## C

- **Chunk**: 这是 webpack 特定的术语被用在内部来管理 building 过程。bundle 由 chunk 组成，其中有几种类型（例如，入口 chunk(entry chunk) 和子 chunk(child chunk)）。通常 chunk 会直接对应所输出的 bundle，但是有一些配置并不会产生一对一的关系。
- [**代码分离(Code Splitting)**](/guides/code-splitting/): 指将代码分离到每个 bundles/chunks 里面，你可以按需加载，而不是加载一个包含全部的 bundle。
- [**配置(Configuration)**](/concepts/configuration/): webpack 的配置文件是一个普通的 JavaScript 文件，它导出为一个对象。然后由 webpack 根据这个对象定义的属性进行处理。


## D

- [**依赖关系图(Dependency Graph)**](/concepts/dependency-graph): 有时候一个文件依赖于其他文件，webpack 将其视为*依赖关系*(*dependency*)。从一个或多个入口点开始，webpack 递归构建一个依赖关系图，里面包含了你的应用程序需要的所有模块/资源(mudule/asset)。


## E

- [**入口点(Entry Point)**](/concepts/entry-points): 入口点可以告诉 webpack 从哪里启动以及遵循依赖关系图，以此知道要打包什么东西。你可以考虑将待打包文件的根目录作为你应用程序的入口点。


## F

## G

## H

- [**热模块替换(Hot Module Replacement(HMR))**](/concepts/hot-module-replacement): 一个修改、添加或删除模块(modules)的过程，而正在运行中的应用程序无需重载加载整个页面。


## I

## J

## K

## L

- [**Loaders**](/concepts/loaders): loader 允许你在 `require()` 或“加载”的文件之前，先预处理文件。就像“任务执行器(task-runner)”


## M

- [**模块(Module)**](/concepts/modules): 提供比完整程序接触面(surface area)更小的离散功能块。精心编写的模块提供了可靠的抽象和封装界限，使得应用程序中每个模块都具有条理清楚的设计和明确的目的。
- [**模块解析(Module Resolution)**](/concepts/module-resolution/): 一个模块可以作为另一个模块的依赖模块，resolver 是一个库( library )用于帮助找到模块的绝对路径... 模块将在 `resolve.modules` 中指定的所有目录内搜索。


## N

## O

- [**输出(Output)**](/concepts/output): 此选项指定编译后的文件，输出到硬盘的何处。
  > _注意, 虽然可以有多个入口点, 但规定只能配置一个输出(output)。_


## P

- [**插件(Plugin)**](/concepts/plugins): 一个含有 `apply` 属性的 JavaScript 对象。该 `apply` 属性会在 webpack 编译时被调用，并能在整个编译生命周期访问。这些插件包通常以某种方式扩展编译功能。


## Q

## R

## S

## T

- [**目标(Target)**](/configuration/target/): [这里列出](/configuration/target/) 了用户配置的部署目标，针对特定的环境（如浏览器，NodeJS或Electron）进行编译。
- [**Tree Shaking**](/guides/tree-shaking/): 移除未使用/多余的代码，或者更准确地说，只导入引用的代码。编译器(compiler)（例如 webpack）将通过分析各种 `import` 语句和引入代码的使用情况，来确定哪些部分的依赖关系被实际使用，删除不是“树”的部分，以实现此功能。


## U

## V

- [**第三方库入口点(Vendor Entry Point)**](/concepts/entry-points/#separate-app-and-vendor-entries):  从 app.js 和 vendors.js 开始创建依赖图(dependency graph)。这些依赖图是彼此完全分离、互相独立的，允许你使用 CommonsChunkPlugin 从「应用程序 bundle」中提取 vendor 引用(vendor reference) 到 vendor bundle。可以帮助你在 webpack 中实现被称为[长效缓存](/guides/caching/)的通用模式。


## W

- [**webpack**](/): 一个可高度配置的现代 JavaScript 应用程序[模块](/concepts/modules)([module](/concepts/modules))打包器。


## X

## Y

## Z
