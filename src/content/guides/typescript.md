---
title: TypeScript
sort: 14
contributors:
  - morsdyce
  - kkamali
  - mtrivera
---

T> 本指南示例来源于[*起步*](/guides/getting-started/)指南。

[TypeScript](https://www.typescriptlang.org) 是 JavaScript 的超集，为其增加了类型系统，可以编译为普通的 JavaScript 代码。这篇指南里我们将会学习 webpack 是如何跟 TypeScript 进行集成。


## 基础安装

首先，执行以下命令，安装 TypeScript 编译器(compiler)和 loader：

``` bash
npm install --save-dev typescript ts-loader
```

现在，我们将修改目录结构和配置文件：

__project__

``` diff
  webpack-demo
  |- package.json
+ |- tsconfig.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
    |- index.js
+   |- index.ts
  |- /node_modules
```

__tsconfig.json__

这里我们设置一个基本的配置，来支持 JSX，并将 TypeScript 编译到 ES5……

``` json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true
  }
}
```

查看 [TypeScript 官方文档](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)了解更多关于 `tsconfig.json` 的配置选项。

想要了解 webpack 配置的更多信息，请查看[配置相关概念](/concepts/configuration/)。

现在让我们在 webpack 配置中处理 TypeScript：

__webpack.config.js__

``` js
const path = require('path');

module.exports = {
  entry: './src/index.ts',
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
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

这会直接将 webpack 的入口起点指定为 `./index.ts`，然后通过 `ts-loader` _加载_所有的 `.ts` 和 `.tsx` 文件，并且在当前目录_输出_一个 `bundle.js` 文件。


## Loader

[`ts-loader`](https://github.com/TypeStrong/ts-loader)

在本指南中，我们使用 `ts-loader`，因为它能够很方便地启用额外的 webpack 功能，例如将其他 web 资源导入到项目中。


## source map

想要了解 source map 的更多信息，请查看[开发指南](/guides/development)。

要启用 source map，我们必须配置 TypeScript，以将内联的 source map 输出到编译过的 JavaScript 文件。必须在 TypeScript 配置中添加下面这行：

__tsconfig.json__

``` diff
  {
    "compilerOptions": {
      "outDir": "./dist/",
+     "sourceMap": true,
      "noImplicitAny": true,
      "module": "commonjs",
      "target": "es5",
      "jsx": "react",
      "allowJs": true
    }
  }
```

现在，我们需要告诉 webpack 提取这些 source map，并内联到最终的 bundle 中。

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.ts',
+   devtool: 'inline-source-map',
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
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

查看 [devtool 文档](/configuration/devtool/)以了解更多信息。


## 使用第三方库

当从 npm 安装第三方库时，一定要牢记同时安装这个库的类型声明文件。你可以从 [TypeSearch](http://microsoft.github.io/TypeSearch/) 中找到并安装这些第三方库的类型声明文件。

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


## 构建性能

W> 这可能会降低构建性能。

关于构建工具，请查看[构建性能](/guides/build-performance/)指南。

***

> 原文：https://webpack.js.org/guides/typescript/
