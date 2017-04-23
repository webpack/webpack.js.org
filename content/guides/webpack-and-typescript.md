---
title: webpack 和 Typescript
contributors:
  - morsdyce
---

[TypeScript](https://www.typescriptlang.org) 是 JavaScript 的超集，为其增加了类型系统，可以编译为普通的 JavaScript 代码。这篇指南里我们将会学习 webpack 是如何跟 TypeScript 进行结合。


## 基础构建

在开始 webpack 和 TypeScript 整合之前，我们首先必须在项目里安装 webpack。
如果你还没安装，请查阅 [webpack 安装指南](https://webpack.js.org/guides/installation/)。

要能在 webpack 里使用 TypeScript，你需要准备好下面这些事情：

1. 在项目里安装 TypeScript 编译器；
2. 选择一个 TypeScript loader 安装（这个示例里使用的是 ts-loader）;
3. 创建 __tsconfig.json__ 文件，这是 TypeScript 编译器的配置文件；
4. 创建 __webpack.config.js__ 文件，这是 webpack 的配置文件。

你可以通过 npm 安装 TypeScript 编译器和 TypeScript loader，运行下面这个命令来安装：
 `npm install --save-dev typescript ts-loader`

__tsconfig.json__

tsconfig 配置文件可以从一个空白的文件逐一添加配置项，下面有一个基本的配置示例，用来把 TypeScript 代码编译成 es5 代码，同时支持 JSX。

```json
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

可以查看 [TypeScript 官方文档](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)了解更多关于 tsconfig.json 的配置选项。

__webpack.config.js__

使用 TypeScript 编写的 webpack 基本配置大概是这样：

```js
module.exports = {
  entry: './index.ts',
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
};
```

这个例子里我们指定了入口起点为当前目录的 __index.ts__ 文件，输出文件命名为 __bundle.js__，以及负责把 TypeScript 编译成 JavaScript的 TypeScript loader，同时也添加了 `resolve.extensions` 来告诉 webpack 在解析查找 TypeScript 模块时该检索哪些文件扩展名。


## TypeScript loaders

当前有 2 个可用的 TypeScript loader：

* [`awesome-typescript-loader`](https://github.com/s-panferov/awesome-typescript-loader)
* [`ts-loader`](https://github.com/TypeStrong/ts-loader)

Awesome TypeScript loader 文档里已经很好的解释了 `awesome-typescript-loader` 和 `ts-loader` 的区别。

可以阅读 [这篇文章](https://github.com/s-panferov/awesome-typescript-loader#differences-between-ts-loader) 了解更多。

在本指南中，我们将使用 `ts-loader`，因为它更简便地启用额外的 webpack 功能，例如将非代码资源导入到项目中。


## 启用 source maps 功能

为了启用 source maps 功能，首先必须配置 TypeScript 将 source maps 内联输出到编译好的 JavaScript 文件，可通过将 sourceMap 属性设置为 true 来实现。

__tsconfig.json__

```json
{
  "sourceMap": true
}
```

当开启了 TypeScript 的 source maps 输出特性后，我们需要告诉 webpack
来提取这些 source maps 并发送给浏览器，这样我们在浏览器看到的源码文件，就跟在代码编辑器中看到的一样。

__webpack.config.js__

```js
module.exports = {
 entry: './index.ts',
 output: {
   filename: 'bundle.js',
   path: __dirname
 },
 module: {
   rules: [
     {
       enforce: 'pre',
       test: /\.js$/,
       loader: "source-map-loader"
     },
     {
       enforce: 'pre',
       test: /\.tsx?$/,
       use: "source-map-loader"
     }
   ]
 },
 resolve: {
   extensions: [".tsx", ".ts", ".js"]
 },
 devtool: 'inline-source-map',
};
```

首先我们添加一个新 loader，名为 source-map-loader。

运行下面的命令安装：

``` bash
npm install --save-dev source-map-loader
```

这个 loader 安装完成后，我们想让这个 loader 比其他任何 loader 都要先运行，可以使用 `enforce: 'pre'` 这个配置项来标记。
最后，我们需要通过指定 `devtool` 来启用 webpack 的 source maps 功能。
当前我们使用的是 'inline-source-map' 这个属性值。想了解更多关于这个属性值的特性和其他属性值选项，可以查看 [devtool 文档](/configuration/devtool/)。


## 使用第三方库

当从 npm安装第三方库时，记住一定要同时安装这个库的类型声明文件。

你可以从 @types 仓库找到并安装这些第三方库的类型声明文件。

举个例子，如果想安装 lodash 这个库的类型声明文件，我们可以运行下面的命令：

``` bash
npm install --save-dev @types/lodash
```

想了解更多，可以查看[这篇文章](https://blogs.msdn.microsoft.com/typescript/2016/06/15/the-future-of-declaration-files/)


## 导入非代码资源

要在 TypeScript 里使用非代码资源，我们需要告诉 TypeScript 如何兼容这些导入类型。

那么首先，我们需要在项目里创建 __custom.d.ts__ 文件，这个文件用来编写自定义的类型声明。

我们要想兼容 svg 类型的资源导入，就需要在 __custom.d.ts__ 文件里添加以下内容：

```typescript
declare module "*.svg" {
  const content: any;
  export default content;
}
```

上面代码为 svg 声明了一个新模块，使得 TypeScript 能够识别到 以 __.svg__ 结尾的资源导入，同时定义了这个模块的类型为任意类型（any）。如果我们想指定更加明确模块类型，假如可以判断出这是一个 url，那么我们可以将类型定义为字符串。

这不仅适用于 svg，也适用于其他任何你想使用的自定义 loader，包括css，scss，json或是你希望加载到项目中的其他任何文件。

***


> 原文：https://webpack.js.org/guides/webpack-and-typescript/