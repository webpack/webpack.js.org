---
title: Configuration Languages
sort: 2
contributors:
  - sokra
  - skipjack
  - tarang9211
  - simon04
  - peterblazejewicz
  - youta1119
  - byzyk
  - Nek-
  - liyiming22
translators:
  - NealST
  - lornally
  - QC-L
---

webpack 支持使用多种编程语言和数据描述格式来编写配置文件。在 [node-interpret](https://github.com/gulpjs/interpret) 中你可以找到当前所支持的文件类型列表，通过 [node-interpret](https://github.com/gulpjs/interpret)，webpack 能够处理这些类型的配置文件。

## TypeScript {#typescript}

要使用 [Typescript](https://www.typescriptlang.org/) 来编写 webpack 配置，你需要先安装必要的依赖，比如 Typescript 以及其相应的类型声明，类型声明可以从 [DefinitelyTyped](https://definitelytyped.org/) 项目中获取，依赖安装如下所示：

```bash
npm install --save-dev typescript ts-node @types/node @types/webpack
# 如果使用 webpack-dev-server，还需要安装以下依赖
npm install --save-dev @types/webpack-dev-server
```

完成依赖安装后便可以开始编写配置文件，示例如下：

**webpack.config.ts**

```typescript
import * as path from 'path';
import * as webpack from 'webpack';
// just in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server';

const config: webpack.Configuration = {
  mode: 'production',
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js',
  },
};

export default config;
```

该示例需要 typescript 版本在 2.7 及以上，并在 `tsconfig.json` 文件的 compilerOptions 中添加 `esModuleInterop` 和 `allowSyntheticDefaultImports` 两个配置项。

值得注意的是你需要确保 `tsconfig.json` 的 `compilerOptions` 中 `module` 选项的值为 `commonjs`,否则 webpack 的运行会失败报错，因为 `ts-node` 不支持 `commonjs` 以外的其他模块规范。

你可以通过两个途径来完成 module 的设置:

* 直接修改 `tsconfig.json` 文件
* 使用 `tsconfig-paths`

**第一种方法**就是打开你的 `tsconfig.json` 文件，找到 `compilerOptions` 的配置，然后设置 `target` 和 `module` 的选项分别为 `"ES5"` 和 `"CommonJs"` (在 `target` 设置为 `es5` 时你也可以不显示编写 `module` 配置)。

**第二种方法**需要先安装 `tsconfig-paths` 这个 npm 包，如下所示：

```bash
npm install --save-dev tsconfig-paths
```

安装后你可以为 webpack 配置创建一个单独的 TypeScript 配置文件，示例如下：

**tsconfig-for-webpack-config.json**

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "esModuleInterop": true
  }
}
```

T> ts-node 可以根据 `tsconfig-paths` 提供的环境变量 `process.env.TS_NODE_PROJECT` 来找到 `tsconfig.json` 文件路径。

`process.env.TS_NODE_PROJECT` 变量的设置如下所示:

**package.json**

```json
{
  "scripts": {
    "build": "cross-env TS_NODE_PROJECT=\"tsconfig-for-webpack-config.json\" webpack"
  }
}
```

之所以要添加 `cross-env`，是因为我们在直接使用 `TS_NODE_PROJECT` 时遇到过 `"TS_NODE_PROJECT" unrecognized command` 报错的反馈，添加 `cross-env` 之后该问题也似乎得到了解决，你可以查看[这个 issue](https://github.com/webpack/webpack.js.org/issues/2733)获取到关于该问题的更多信息。

## CoffeeScript {#coffeescript}

与 `Typescript` 类似，在使用 CoffeeScript 前需要先安装其依赖，如下所示:

```bash
npm install --save-dev coffeescript
```

完成安装之后便可以开始编写 webpack 配置，示例如下:

**webpack.config.coffee**

<!-- eslint-skip -->

```js
HtmlWebpackPlugin = require('html-webpack-plugin')
webpack = require('webpack')
path = require('path')

config =
  mode: 'production'
  entry: './path/to/my/entry/file.js'
  output:
    path: path.resolve(__dirname, 'dist')
    filename: 'my-first-webpack.bundle.js'
  module: rules: [ {
    test: /\.(js|jsx)$/
    use: 'babel-loader'
  } ]
  plugins: [
    new HtmlWebpackPlugin(template: './src/index.html')
  ]

module.exports = config
```

## Babel and JSX {#babel-and-jsx}

下述的示例中使用了 JSX（用于 React 的 JavaScript 标记语言）和 babel 来创建格式为 json 的 webpack 配置文件。

> 感谢 [Jason Miller](https://twitter.com/_developit) 提供示例代码

首先需要安装一些必要依赖，如下所示:

```bash
npm install --save-dev babel-register jsxobj babel-preset-es2015
```

**.babelrc**

```json
{
  "presets": ["es2015"]
}
```

**webpack.config.babel.js**

```js
import jsxobj from 'jsxobj';

// 插件引入示例
const CustomPlugin = (config) => ({
  ...config,
  name: 'custom-plugin',
});

export default (
  <webpack target="web" watch mode="production">
    <entry path="src/index.js" />
    <resolve>
      <alias
        {...{
          react: 'preact-compat',
          'react-dom': 'preact-compat',
        }}
      />
    </resolve>
    <plugins>
      <CustomPlugin foo="bar" />
    </plugins>
  </webpack>
);
```

如果你在其他地方也使用了 Babel 并且 `modules` 的值设置为 `false`，则必须维护两份 `.babelrc` 的文件，或者你也可以将上述示例中的 `import jsxobj from 'jsxobj';` 替换为 `const jsxobj = require('jsxobj');` 并将新的 `export` 语法替换为 `module.exports`，因为尽管 Node 目前已经支持了 ES6 的许多新特性，但是仍然没有支持 ES6 的模块语法。
