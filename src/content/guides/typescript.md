---
title: TypeScript
sort: 21
contributors:
  - morsdyce
  - kkamali
  - mtrivera
  - byzyk
  - EugeneHlushko
---

T> 本指南继续沿用 [_起步_](/guides/getting-started/) 中的代码示例。

[TypeScript](https://www.typescriptlang.org) 是 JavaScript 的超集，为其增加了类型系统，可以编译为普通 JavaScript 代码。这篇指南里我们将会学习是如何将 webpack 和 TypeScript 进行集成。

## 基础配置 {#basic-setup}

首先，执行以下命令安装 TypeScript compiler 和 loader：

```bash
npm install --save-dev typescript ts-loader
```

现在，我们将修改目录结构和配置文件：

**project**

```diff
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

**tsconfig.json**

这里我们设置一个基本的配置，来支持 JSX，并将 TypeScript 编译到 ES5……

```json
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

查看 [TypeScript 官方文档](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) 了解更多关于 `tsconfig.json` 的配置选项。

想要了解 webpack 配置的更多信息，请查看 [配置](/concepts/configuration/) 概念。

现在，配置 webpack 处理 TypeScript：

**webpack.config.js**

```js
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

这会让 webpack 直接从 `./index.ts` _进入_，然后通过 `ts-loader` _加载_所有的 `.ts` 和 `.tsx` 文件，并且在当前目录_输出_一个 `bundle.js` 文件。

现在让我们改变 `lodash` 在 `./index.ts` 文件中的引入，
因为在 `lodash` 的定义中没有默认(default)的导出。

**./index.ts**

```diff
- import _ from 'lodash';
+ import * as _ from 'lodash';

  function component() {
    const element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
```

T> 如果想在 TypeScript 中保留如`import _ from 'lodash';`的语法被让它作为一种默认的导入方式，需要在文件 **tsconfig.json** 中设置 `"allowSyntheticDefaultImports" : true` 和 `"esModuleInterop" : true` 。这个是与 TypeScript 相关的配置，在本文档中提及仅供参考。

## Loader {#loader}

[`ts-loader`](https://github.com/TypeStrong/ts-loader)

在本指南中，我们使用 `ts-loader`，因为它能够很方便地启用额外的 webpack 功能，例如将其他 web 资源导入到项目中。

W> `ts-loader` uses `tsc`, the TypeScript compiler, and relies on your `tsconfig.json` configuration. Make sure to avoid setting [`module`](https://www.typescriptlang.org/tsconfig#module) to "CommonJS", or webpack won't be able to [tree-shake your code](/guides/tree-shaking).

Note that if you're already using [`babel-loader`](https://github.com/babel/babel-loader) to transpile your code, you can use [`@babel/preset-typescript`](https://babeljs.io/docs/en/babel-preset-typescript) and let Babel handle both your JavaScript and TypeScript files instead of using an additional loader. Keep in mind that, contrary to `ts-loader`, the underlying [`@babel/plugin-transform-typescript`](https://babeljs.io/docs/en/babel-plugin-transform-typescript) plugin does not perform any type checking.

## Source Maps {#source-maps}

想要了解 source map 的更多信息，请查看 [开发](/guides/development) 指南。

想要启用 source map，我们必须配置 TypeScript，以将内联的 source map 输出到编译后的 JavaScript 文件中。必须在 TypeScript 配置中添加下面这行：

**tsconfig.json**

```diff
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

**webpack.config.js**

```diff
  const path = require('path');

  module.exports = {
    entry: './src/index.ts',
+   devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
```

查看 [devtool](/configuration/devtool/) 文档以了解更多信息。

## 使用第三方类库 {#using-third-party-libraries}

在从 npm 安装 third party library(第三方库) 时，一定要记得同时安装此 library 的类型声明文件(typing definition)。你可以从 [TypeSearch](https://microsoft.github.io/TypeSearch/) 中找到并安装这些第三方库的类型声明文件。

举个例子，如果想安装 lodash 类型声明文件，我们可以运行下面的命令：

```bash
npm install --save-dev @types/lodash
```

想了解更多，可以查看 [这篇文章](https://blogs.msdn.microsoft.com/typescript/2016/06/15/the-future-of-declaration-files/)。

## 导入其他资源 {#importing-other-assets}

想要在 TypeScript 中使用非代码资源(non-code asset)，我们需要告诉 TypeScript 推断导入资源的类型。在项目里创建一个 `custom.d.ts` 文件，这个文件用来表示项目中 TypeScript 的自定义类型声明。我们为 `.svg` 文件设置一个声明：

**custom.d.ts**

```typescript
declare module '*.svg' {
  const content: any;
  export default content;
}
```

H这里，我们通过指定任何以 `.svg` 结尾的导入(import)，将 SVG 声明(declare) 为一个新的模块(module)，并将模块的 `content` 定义为 `any`。我们可以通过将类型定义为字符串，来更加显式地将它声明为一个 url。同样的概念适用于其他资源，包括 CSS, SCSS, JSON 等。

## 构建性能 {#build-performance}

W> 这可能会降低构建性能。

关于构建工具，请查看[构建性能](/guides/build-performance/)指南。
