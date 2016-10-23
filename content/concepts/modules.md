---
title: 模块
contributors:
  - TheLarkInn
  - dear-lizhihua
---

?> 一切都是具有依赖、模块树、模块解析、静态构建和约束性的模块。

在[模块化编程](https://en.wikipedia.org/wiki/Modular_programming)，开发者将程序分解成称为_模块_的离散功能块。

每个模块具有比完整程序更小的接触面，使得校验、调试、测试轻而易举。
精心编写的_模块_提供了坚实的抽象和封装界限，使得应用程序中每个模块都具有一致的设计和明确的目的。

Node.js 从最一开始就支持模块化编程。
然而，在 web，_模块化_的支持正缓慢到来。
在 web 存在多种支持 JavaScript 模块化的工具，这些工具各有优势和限制。
webpack 基于从这些系统获得的经验教训，并将_模块_的概念应用于项目中的任何文件。

## 什么是 webpack 模块

对比 Node.js 模块，webpack _模块_能够以各种方式表达它们的依赖关系，几个例子如下：

* JavaScript `require()` 语句
* ECMAScript 2015 `import` 语句
* AMD `define` 和 `require` 语句
* css/sass/less 文件中的 `@import` 语句
* 样式或 HTML 文件中的图片链接(image url)

T> webpack 1 需要特定的 loader 来转换 ECMAScript 2015 `import`，然而通过 webpack 2 可以开箱即用。

## 支持的模块类型

webpack 通过_加载器(loader)_可以支持各种语言和预处理器编写模块。_加载器_描述了 webpack **如何**处理 非 JavaScript(non-JavaScript) _模块_，并且在_包_中引入这些_依赖_。
webpack 社区已经为以及各种流行语言和语言处理器构建了_加载器_，包括：

* [CoffeeScript](http://coffeescript.org)
* [TypeScript](https://www.typescriptlang.org)
* [ESNext (Babel)](https://babeljs.io)
* [Sass](http://sass-lang.com)
* [Less](http://lesscss.org)
* [Stylus](http://stylus-lang.com)

总的来说，webpack 提供了可定制的、强大和丰富的 API，允许**任何技术栈**使用 webpack，保持了在你的开发、测试和生成流程中**无侵入性**。

有关完整列表，请参考[**加载器列表**](https://webpack.github.io/docs/list-of-loaders.html) 或 [**自己编写**](/api/loaders)。
