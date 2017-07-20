---
title: TypeScript
sort: 14
contributors:
  - morsdyce
  - kkamali
  - mtrivera
---

[TypeScript](https://www.typescriptlang.org) is a typed superset of JavaScript that compiles to plain JavaScript. In this guide we will learn how to integrate TypeScript with webpack.


## Basic Setup

In order to get started with webpack and TypeScript, first we must [install webpack](/guides/installation/) in our project.

To start using webpack with TypeScript you need a couple of things:

1. Install the TypeScript compiler in your project.
2. Install a TypeScript loader (in this case we're using `ts-loader`).
3. Create a __tsconfig.json__ file to contain our TypeScript compilation configuration.
4. Create __webpack.config.js__ to contain our webpack configuration.

You can install the TypeScript compiler and loader by running:

 ``` bash
 npm install --save-dev typescript ts-loader
 ```

__tsconfig.json__

Let's set up a simple configuration to support JSX and compile TypeScript down to ES5...

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

See [TypeScript's documentation](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) to learn more about `tsconfig.json` configuration options.

__webpack.config.js__

To learn more about webpack configuration, see the [configuration concepts](/concepts/configuration/).

Now let's configure webpack to handle TypeScript:

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

This will direct webpack to _enter_ through `./index.ts`, _load_ all `.ts` and `.tsx` files through the `ts-loader`, and _output_ a `bundle.js` file in our current directory.


## Loader

[`ts-loader`](https://github.com/TypeStrong/ts-loader)

We will use `ts-loader` in this guide as it makes enabling additional webpack features, such as importing other web assets, a bit easier.


## Source Maps

To learn more about source maps, see the [development guide](/guides/development).

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


## Using Third Party Libraries

When installing third party libraries from npm, it is important to remember to install the typing definition for that library. These definitions can be found at [TypeSearch](http://microsoft.github.io/TypeSearch/).

For example if we want to install lodash we can run the following command to get the typings for it:

``` bash
npm install --save-dev @types/lodash
```

For more information see [this blog post](https://blogs.msdn.microsoft.com/typescript/2016/06/15/the-future-of-declaration-files/).


## Importing Other Assets

To use non-code assets with TypeScript, we need to defer the type for these imports. This requires a `custom.d.ts` file which signifies custom definitions for TypeScript in our project. Let's set up a declaration for `.svg` files:

__custom.d.ts__

```typescript
declare module "*.svg" {
  const content: any;
  export default content;
}
```

Here we declare a new module for SVGs by specifying any import that ends in `.svg` and defining the module's `content` as `any`. We could be more explicit about it being a url by defining the type as string. The same concept applies to other assets including CSS, SCSS, JSON and more.


## Performance Loader

[`awesome-typescript-loader`](https://github.com/s-panferov/awesome-typescript-loader)

Awesome TypeScript Loader has a [wonderful explanation](https://github.com/s-panferov/awesome-typescript-loader#differences-between-ts-loader) of the difference between it and the `ts-loader`. The one downside is that setting up the `awesome-typescript-loader` is a bit more complex than configuring the `ts-loader`.
