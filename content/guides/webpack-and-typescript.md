---
title: webpack & Typescript
contributors:
  - morsdyce
---

[TypeScript](https://www.typescriptlang.org) is a typed superset of JavaScript that compiles to plain JavaScript, in this guide we will learn how to integrate Typescript with webpack.


## Basic Setup

In order to get started with webpack and Typescript, first we must install webpack in our project.
If you didn't do so already please check out [webpack installation guide](/guides/installation/).

To start using webpack with Typescript you need a couple of things:

1. Install the Typescript compiler in your project.
2. Install a Typescript loader (in this case we're using `ts-loader`).
3. Create a __tsconfig.json__ file for our TypeScript configuration.
4. Create __webpack.config.js__ to contain our webpack configuration.

You can install the TypeScript compiler and the TypeScript loader from npm by running:

 ``` bash
 npm install --save-dev typescript ts-loader
 ```

__tsconfig.json__

The `tsconfig` file can start out empty, however here you can see an example of a basic configuration to compile TypeScript to ES5 allow JSX.

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

You can read more about the configuration options on the [TypeScript website](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html). Now let's set up a simple webpack configuration for TypeScript:

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

Here we specify our entry point to be __index.ts__ in our current directory, an output file called __bundle.js__ and our TypeScript loader that is in charge of compiling our TypeScript file to JavaScript. We also add `resolve.extensions` to instruct webpack what file extensions to use when resolving Typescript modules.


## Typescript loaders

Currently there are 2 loaders for TypeScript available:

* [`awesome-typescript-loader`](https://github.com/s-panferov/awesome-typescript-loader)
* [`ts-loader`](https://github.com/TypeStrong/ts-loader)

Awesome TypeScript loader has created a [wonderful explanation](https://github.com/s-panferov/awesome-typescript-loader#differences-between-ts-loader) of the difference between `awesome-typescript-loader` and `ts-loader`. In this guide we will be using `ts-loader` as currently it is easier enabling additional webpack features such as importing non code assets into your project.


## Enabling source maps

In order to enable source maps we first must configure TypeScript to output inline source maps to our compiled JavaScript files. This is done by setting the `sourceMap` property to true.

__tsconfig.json__

```json
{
  "sourceMap": true
}
```

Once TypeScript is configured to output source maps, we need to tell webpack to extract these source maps and pass them to the browser in order to view the source file exactly as it appears in our code editor.

__webpack.config.js__

``` js
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

First we add a new loader called `source-map-loader`.

To install it run:

``` bash
npm install --save-dev source-map-loader
```

Once the loader is installed we need to tell webpack we want to run this loader before any other loaders by using the `enforce: 'pre'` configuration flag.
Finally we need to enable source maps in webpack by specifying the `devtool` property.
Currently we use the 'inline-source-map' setting, to read more about this setting and see other options check out the [devtool documentation](/configuration/devtool/).


## Enabling Tree-shaking

[Tree-shaking](/guides/tree-shaking/) support in webpack relies on ES2015 module syntax (`import` and `export`). In order to enable it, we need to tell Typescript to compile `.ts` and `.tsx` files to ES2015 (or ES6, see [--lib](http://www.typescriptlang.org/docs/handbook/compiler-options.html) compiler option). We will then use [Babel](https://babeljs.io) in a way that preserves ES2015 modules and transpiles everything else.


### Prerequisites

``` bash
> npm install babel-core babel-loader babel-preset-env
```

`babel-preset-env` automatically determines the necessary babel plugins based on our configuration. `babel-loader` will take in code produced by TypeScript, and transpile it down to JavaScript that webpack can process.


### Setup Typescript

You can reuse your existing `tsconfig.json`. The only lines you need to change/add is `target` and `module`:

__tsconfig.json__

``` json
{
  "compilerOptions": {
    "target": "es6",
    "module": "es6",
    // any other compiler options...
  },
  // any other configuration...
}
```


### Setup Babel

Create a file named `.babelrc` in your project root (where you keep your `webpack.config.js` and `tsconfig.json`) with the following setup:

``` json
{
  "presets": [
    [
      "env",
      {
        "modules": false
      }
    ]
  ]
}
```

By setting `modules` to `false` we tell Babel _not_ to convert ES2015 modules to CommonJS modules. Refer to [babel's documentation](https://babeljs.io) for additional configuration options.


### Setup webpack

Everything else in your webpack configuration remains the same. The only thing you need to add/change is `babel-loader` for your `.ts` and `.tsx` files:

``` js
module.exports = {
 ... other options
 module: {
   rules: [
     {
       test: /\.tsx?$/,
       exclude: /node_modules/,
       use: [ 'babel-loader', 'ts-loader' ]
     }
   ]
 }
};
```

In this case we're using `ts-loader`. Note the order of loaders. They are applied [from right to left](/configuration/module/#rule-use).


## Using 3rd Party Libraries

When installing 3rd party libraries from npm, it is important to remember to install the typing definition for that library. You can install 3rd party library definitions from the @types repository. For example, if we want to install lodash we can run the following command to get the typings for it:

``` bash
npm install --save-dev @types/lodash
```

For more information see [this blog post](https://blogs.msdn.microsoft.com/typescript/2016/06/15/the-future-of-declaration-files/).


## Importing non code assets

To use non code assets with TypeScript, we need to tell TypeScript how to defer the type for these imports. To do this we need to create a __custom.d.ts__ file. This file signifies custom definitions for TypeScript in our project. For example, for `.svg` images, we'll need to provide a definition for these imports in our __custom.d.ts__ file:

``` typescript
declare module "*.svg" {
  const content: any;
  export default content;
}
```

Here we declare a new module for `*.svg` by specifying any import that ends in `.svg` and defining the type for this module as `any`. If we wanted to be more explicit about this being a url we could define the type as string. This concept applies not only to our `.svg` example but any custom loader you may want to use including `.css`, `.scss`, `.json` or any other file you may wish to load in your project.
