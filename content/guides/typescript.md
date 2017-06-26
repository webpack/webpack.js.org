---
title: Typescript
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
       loader: 'ts-loader',
       exclude: /node_modules/,
     }
   ]
 },
 output: {
   filename: 'bundle.js',
   path: __dirname
 }
};
```

这会直接将 webpack 的入口起点指定为 `./index.ts`，然后通过 `ts-loader` _加载_所有的 `.ts` 和 `.tsx` 文件，并且在当前目录_输出_一个 `bundle.js` 文件。


## Loaders

The following loaders for TypeScript:

- [`awesome-typescript-loader`](https://github.com/s-panferov/awesome-typescript-loader)
- [`ts-loader`](https://github.com/TypeStrong/ts-loader)

Awesome TypeScript Loader has created a [wonderful explanation](https://github.com/s-panferov/awesome-typescript-loader#differences-between-ts-loader) of the difference between `awesome-typescript-loader` and `ts-loader`.

We chose to use `ts-loader` in this guide as it makes enabling additional webpack features, such as importing other web assets, a bit easier.


## Source Maps

To enable source maps, we must configure TypeScript to output inline source maps to our compiled JavaScript files. The following line must be added to our `tsconfig.json`:

``` json
"sourceMap": true
```

Now we need to tell webpack to extract these source maps and into our final bundle:

__webpack.config.js__

```js
module.exports = {
 devtool: 'inline-source-map',
 // Remaining configuration...
};
```

See the [devtool documentation](/configuration/devtool/) for more information.


## Using 3rd Party Libraries

When installing 3rd party libraries from npm, it is important to remember to install the typing definition for that library. These definitions can be found in the [@types package](https://github.com/DefinitelyTyped/DefinitelyTyped).

For example if we want to install lodash we can run the following command to get the typings for it:

``` bash
npm install --save-dev @types/lodash
```

For more information see [this blog post](https://blogs.msdn.microsoft.com/typescript/2016/06/15/the-future-of-declaration-files/).


## Importing Other Assets

To use non code assets with TypeScript, we need to defer the type for these imports. This requires a `custom.d.ts` file which signifies custom definitions for TypeScript in our project. Let's set up a declaration for `.svg` files:

__custom.d.ts__

```typescript
declare module "*.svg" {
  const content: any;
  export default content;
}
```

Here we declare a new module for SVGs by specifying any import that ends in `.svg` and defining the module's `content` as `any`. We could be more explicit about it being a url by defining the type as string. The same concept applies to other assets including CSS, SCSS, JSON and more.
