---
title: 起步
sort: 3
contributors:
  - bebraw
  - varunjayaraman
  - cntanglijun
  - chrisVillanueva
---

webpack 是构建我们应用程序中 JavaScript 模块的工具。从使用 `webpack` [cli](/api/cli) 或 [api](/api/node) ，并按照[安装说明](/get-started/install-webpack)开始。
webpack 简化快速构建应用程序依赖图表的流程，以正确的顺序打包他们。webpack 能够配置自定义优化代码，在生产环境构建时拆分 vendor/css/js 代码，运行开发服务实现页面无刷新、代码热重载，以及其他非常酷炫的特性。了解更多关于[为什么使用 wepback](/get-started/why-webpack)。

## 创建一个包文件

创建一个示例目录来尝试 wepback。[安装 webpack](/get-started/install-webpack)。

```bash
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install --save-dev webpack@beta
./node_modules/.bin/webpack --help # 显示有效的命令行列表
.\node_modules\.bin\webpack --help # windows 用户请使用此路径
npm install --save lodash
```

现在在 `app` 子目录下创建一个 `index.js` 文件。

__app/index.js__

```javascript
function component () {
  var element = document.createElement('div');

  /* 需要引入 lodash，下一行才能正常工作 */
  element.innerHTML = _.map(['Hello','webpack'], function(item){
    return item + ' ';
  });

  return element;
}

document.body.appendChild(component());
```

要运行这段代码，通常需要有以下 html

__index.html__

```html
<html>
  <head>
    <title>Webpack 2 demo</title>
    <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
    <script src="app/index.js"></script>
  </body>
</html>
```

在此示例中，脚本标签之间存在隐式依赖关系。

在运行 `index.js` 之前，会依赖于页面中引入的 `lodash`。由于 `index.js` 并未显式声明需要引入 `lodash`；只是假定推测已经存在一个全局变量 `_`。

使用这种方式去管理 JavaScript 项目会有一些问题：
  - 如果依赖不存在，或者引入顺序错误，应用程序将功能异常。
  - 如果引入依赖但是并没有使用，那样就会存在许多浏览器下载好却无用的代码。

在 `index.js` 中打包 `lodash` 依赖，我们需要导入 `lodash`。

__app/index.js__

```diff
+ import _ from 'lodash';

function component () {
  ...
```

此外，按照预期我们需要修改 `index.html` 中去引入单个 js 打包文件。

```diff
<html>
  <head>
    <title>Webpack 2 demo</title>
-   <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
-   <script src="app/index.js"></script>
+   <script src="dist/bundle.js"></script>
  </body>
</html>
```

这里，`index.js` 显式要求引入的 `lodash` 必须存在，然后将它以 `_` 的别名绑定（不会造成全局范围变量名污染）。

通过展示出模块所需依赖，webpack 能够利用这些信息去构建依赖图表。然后 webpack 使用图表生成一个优化过的包文件，脚本还将以正确的顺序执行。并且没有用到的依赖将不会被包文件引入。

现在在此文件夹下运行 `webpack`，其中 `index.js` 是输入文件，并输出 `bundle.js` 文件，此文件已打包页面所需的所有代码。

```bash
webpack app/index.js dist/bundle.js

Hash: a3c861a7d42fc8944524
Version: webpack 2.2.0
Time: 90ms
   Asset     Size  Chunks             Chunk Names
index.js  1.56 kB       0  [emitted]  main
   [0] ./app/index.js 170 bytes {0} [built]

```

T> 如果你创建了局部的 `webpack@beta` 版本，要通过其进行构建过程，请务必在命令行中通过 `./node_modules/.bin/webpack` 来引用 `webpack`。

在浏览器中打开 `webpack.config.js`，查看成功后 bundle 的结果。
你应该看到带有以下文本的页面：'Hello webpack'。

## 使用带有配置的 webpack

对于更复杂的配置，我们可以使用配置文件，webpack 会引用它来打包代码。
然后创建一个 `webpack.config.js` 文件，上面的 CLI 命令可以以下面的配置表示

__webpack.config.js__
```javascript
module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: './dist'
  }
}
```

此文件可以由 webpack 运行

```bash
webpack --config webpack.config.js

Hash: a3c861a7d42fc8944524
Version: webpack 2.2.0
Time: 90ms
   Asset     Size  Chunks             Chunk Names
index.js  1.56 kB       0  [emitted]  main
   [0] ./app/index.js 170 bytes {0} [built]

```

T> 如果存在 `webpack.config.js`，`webpack` 命令将默认选择使用它。

T> 如果使用上面"创建一个包文件"章节，已经成功创建过 `dist/bundle.js` 文件，请删除 `dist` 子目录，来验证通过 `webpack.config.js` 文件的设置，所输出内容是否符合预期。

配置文件可以更加灵活地使用 webpack。使用配置文件，我们可以对我们的包文件添加加载器规则、插件、解析选项，以及许多其他增强功能。

## 使用引入 npm 的 webpack

考虑到用 CLI 这种方式来运行 webpack 不是特别方便，我们可以设置一个快捷方式。像这样调整 *package.json*：

```json
{
  ...
  "scripts": {
    "build": "webpack"
  },
  ...
}
```

现在你可以通过使用 `npm run build` 命令来实现与上面相同的效果。npm 通过命令选取脚本，并临时修补执行环境，使脚本可以在运行时包含 bin 命令。你可以看到很多项目都如此约定。

T> 你可以通过向 `npm run build` 命令添加两个中横线，给 webpack 传递自定义参数，例如：`npm run build -- --colors`。

## 结论

现在你已经一起学习了基本的构建过程，你应该深入 webpack [基本概念](/concepts)和[配置](/configuration)来更好地理解其设计。还要查看[指南](/guides)来学习如何处理常见问题。[API](/api) 章节可以深入底层。

***

> 原文：https://webpack.js.org/get-started/