---
title: TypeScript
sort: 18
contributors:
  - morsdyce
  - kkamali
---

[TypeScript](https://www.typescriptlang.org) 是 JavaScript 的超集，为其增加了类型系统，可以编译为普通的 JavaScript 代码。这篇指南里我们将会学习 webpack 是如何跟 TypeScript 进行集成。


## 基础安装

在开始使用 webpack 和 Typescript 之前，首先，我们必须在项目中[安装 webpack](/guides/installation/)。

要想要 webpack 里集成 TypeScript，您需要预先准备如下：

1. 在项目里安装 TypeScript 编译器。
2. 安装一个 Typescript loader（这个示例里使用的是 `ts-loader`）。
3. 创建 __tsconfig.json__ 文件，这是 TypeScript 的编译配置。
4. 创建 __webpack.config.js__ 文件，这是 webpack 的配置。

可以通过运行下面这个命令，来安装 TypeScript 编译器和 loader：

 ``` bash
 npm install --save-dev typescript ts-loader
 ```

__tsconfig.json__

这里我们设置一个基本的配置，来支持 JSX，并将 TypeScript 编译到 ES5……

``` json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "commonjs",
    "target": "es5",
    "jsx": "react",
    "allowJs": true
  }
}
```

查看 [TypeScript 官方文档](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)了解更多关于 `tsconfig.json` 的配置选项。

__webpack.config.js__

现在让我们在 webpack 配置中处理 TypeScript：

```js
module.exports = {
 entry: './index.ts',
 module: {
   rules: [
     {
       test: /\.tsx?$/,
       use: 'ts-loader',
       exclude: /node_modules/
     }
   ]
 },
 resolve: {
   extensions: [".tsx", ".ts", ".js"]
 },
 output: {
   filename: 'bundle.js',
   path: __dirname
 }
};
```

这会直接将 webpack 的入口起点指定为 `./index.ts`，然后通过 `ts-loader` _加载_所有的 `.ts` 和 `.tsx` 文件，并且在当前目录_输出_一个 `bundle.js` 文件。


## Loader

以下是可用的 TypeScript loader：

- [`awesome-typescript-loader`](https://github.com/s-panferov/awesome-typescript-loader)
- [`ts-loader`](https://github.com/TypeStrong/ts-loader)

关于 `awesome-typescript-loader` 和 `ts-loader` 的区别，Awesome TypeScript Loader 作了[精彩的解释](https://github.com/s-panferov/awesome-typescript-loader#differences-between-ts-loader)。

在本指南中，我们选择使用 `ts-loader`，因为它能够很方便地启用额外的 webpack 功能，例如将其他 web 资源导入到项目中。


## Source Map

要启用 source map，我们必须配置 TypeScript，以将内联的 source map 输出到编译过的 JavaScript 文件。必须在 `tsconfig.json` 中添加下面这行：

``` json
"sourceMap": true
```

现在，我们需要告诉 webpack 提取这些 source map，并内联到最终的 bundle 中。

__webpack.config.js__

```js
module.exports = {
 devtool: 'inline-source-map',
 // 剩余配置……
};
```

更多信息请查看 [devtool 文档](/configuration/devtool/)。


## 使用第三方库

当从 npm 安装第三方库时，一定要牢记同时安装这个库的类型声明文件。你可以从 [@types 仓库](https://github.com/DefinitelyTyped/DefinitelyTyped)找到并安装这些第三方库的类型声明文件。

举个例子，如果想安装 lodash 这个库的类型声明文件，我们可以运行下面的命令：

``` bash
npm install --save-dev @types/lodash
```

想了解更多，可以查看[这篇文章](https://blogs.msdn.microsoft.com/typescript/2016/06/15/the-future-of-declaration-files/)。


## 导入其他资源

要在 TypeScript 里使用非代码资源，我们需要告诉 TypeScript 如何兼容这些导入类型。那么首先，我们需要在项目里创建 `custom.d.ts` 文件，这个文件用来编写自定义的类型声明。让我们将 `.svg` 文件进行声明设置：

__custom.d.ts__

```typescript
declare module "*.svg" {
  const content: any;
  export default content;
}
```

这里，我们通过指定任何以 `.svg` 结尾的导入，并将模块的 `content` 定义为 `any`，将 SVG 声明一个新的模块。我们可以通过将类型定义为字符串，来更加显式地将它声明为一个 url。同样的理念适用于其他资源，包括 CSS, SCSS, JSON 等。

***

> 原文：https://webpack.js.org/guides/typescript/
