---
title: Loaders
sort: -1
contributors:
  - simon04
  - bajras
  - rhys-vdw
  - EugeneHlushko
  - hemal7735
  - snitin315
  - anshumanv
---

webpack 支持使用 [loader](/concepts/loaders) 对文件进行预处理。你可以构建包括 JavaScript 在内的任何静态资源。并且可以使用 Node.js 轻松编写自己的 loader。

在 `require()` 语句中使用 `loadername!` 作为前缀的方式来使用 loader，或者在 webpack 配置中配置 regex 来自动应用它们 - 请参阅 [配置](/concepts/loaders/#configuration) 。

<<<<<<< HEAD

## 文件 {#files}
=======
## Files
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

- [`raw-loader`](/loaders/raw-loader) 用于加载文件的原始内容（utf-8）
- [`val-loader`](/loaders/val-loader) 将代码作为模块执行，并将其导出为 JS 代码
- [`url-loader`](/loaders/url-loader) 与 `file-loader` 类似，但是如果文件大写小于一个设置的值，则会返回 [data URL](https://tools.ietf.org/html/rfc2397)
- [`file-loader`](/loaders/file-loader) 将文件保存至输出文件夹中并返回（相对）URL
- [`ref-loader`](https://www.npmjs.com/package/ref-loader) 用于手动建立文件之间的依赖关系

<<<<<<< HEAD

## JSON {#json}
=======
## JSON
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

- [`json5-loader`](/loaders/json5-loader) 加载并转换 [JSON 5](https://json5.org/) 文件
- [`cson-loader`](https://github.com/awnist/cson-loader) 加载并转换 [CSON](https://github.com/bevry/cson#what-is-cson) 文件

<<<<<<< HEAD

## 语法转换 {#transpiling}
=======
## Transpiling
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

- [`babel-loader`](/loaders/babel-loader) 使用 [Babel](https://babeljs.io/) 加载 ES2015+ 代码并将其转换为 ES5
- [`buble-loader`](https://github.com/sairion/buble-loader) 使用 [Bublé](https://buble.surge.sh/guide/) 加载 ES2015+ 代码并将其转换为 ES5
- [`traceur-loader`](https://github.com/jupl/traceur-loader) 使用 [Traceur](https://github.com/google/traceur-compiler#readme) 加载 ES2015+ 代码并将其转换为 ES5
- [`ts-loader`](https://github.com/TypeStrong/ts-loader) 像加载 JavaScript 一样加载 [TypeScript](https://www.typescriptlang.org/) 2.0+
- [`coffee-loader`](/loaders/coffee-loader) 像加载 JavaScript 一样加载 [CoffeeScript](http://coffeescript.org/)
- [`fengari-loader`](https://github.com/fengari-lua/fengari-loader/) 使用 [fengari](https://fengari.io/) 加载 Lua 代码
- [`elm-webpack-loader`](https://github.com/elm-community/elm-webpack-loader) 像加载 JavaScript 一样加载 [Elm](https://elm-lang.org/)

<<<<<<< HEAD

## 模板 {#templating}
=======
## Templating
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

- [`html-loader`](/loaders/html-loader) 将 HTML 导出为字符串，需要传入静态资源的引用路径
- [`pug-loader`](https://github.com/pugjs/pug-loader) 加载 Pug 和 Jade 模板并返回一个函数
- [`markdown-loader`](https://github.com/peerigon/markdown-loader) 将 Markdown 编译为 HTML
- [`react-markdown-loader`](https://github.com/javiercf/react-markdown-loader) 使用 markdown-parse 解析器将 Markdown 编译为 React 组件
- [`posthtml-loader`](https://github.com/posthtml/posthtml-loader) 使用 [PostHTML](https://github.com/posthtml/posthtml) 加载并转换 HTML 文件
- [`handlebars-loader`](https://github.com/pcardune/handlebars-loader) 将 Handlebars 文件编译为 HTML
- [`markup-inline-loader`](https://github.com/asnowwolf/markup-inline-loader) 将 SVG/MathML 文件内嵌到 HTML 中。在将图标字体或 CSS 动画应用于 SVG 时，此功能非常实用。
- [`twig-loader`](https://github.com/zimmo-be/twig-loader) 编译 Twig 模板并返回一个函数
- [`remark-loader`](https://github.com/webpack-contrib/remark-loader) 通过 `remark` 加载 markdown，且支持解析内容中的图片

<<<<<<< HEAD

## 样式 {#styling}
=======
## Styling
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

- [`style-loader`](/loaders/style-loader) 将模块导出的内容作为样式并添加到 DOM 中
- [`css-loader`](/loaders/css-loader) 加载 CSS 文件并解析 import 的 CSS 文件，最终返回 CSS 代码
- [`less-loader`](/loaders/less-loader) 加载并编译 LESS 文件
- [`sass-loader`](/loaders/sass-loader) 加载并编译 SASS/SCSS 文件
- [`postcss-loader`](/loaders/postcss-loader) 使用 [PostCSS](http://postcss.org) 加载并转换 CSS/SSS 文件
- [`stylus-loader`](/loaders/stylus-loader/) 加载并编译 Stylus 文件

<<<<<<< HEAD

## Linting 和测试 {#linting--testing}
=======
## Linting && Testing
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

- [`mocha-loader`](/loaders/mocha-loader) 使用 [mocha](https://mochajs.org/) (Browser/NodeJS) 进行测试
- [`eslint-loader`](https://github.com/webpack-contrib/eslint-loader) 使用 [ESLint](https://eslint.org/) 对代码进行格式化

## 框架 {#frameworks}

- [`vue-loader`](https://github.com/vuejs/vue-loader) 加载并编译 [Vue 组件](https://vuejs.org/v2/guide/components.html)
- [`polymer-loader`](https://github.com/webpack-contrib/polymer-webpack-loader) 使用支持配置的预处理程序处理 HTML 和 CSS，并使用 `require()` 加载模块的方式处理 Web Components
- [`angular2-template-loader`](https://github.com/TheLarkInn/angular2-template-loader) 加载并编译 [Angular](https://angular.io/) 组件

## Awesome {#awesome}

有关更多第三方加载器，请参阅 [awesome-webpack](https://github.com/webpack-contrib/awesome-webpack#loaders) 中的列表。
