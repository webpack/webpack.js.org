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
2. Install a Typescript loader (in this case we're using ts-loader).
3. Create a __tsconfig.json__ file to contain our TypeScript compilation configuration.
3. Create __webpack.config.js__ to contain our webpack configuration.

You can install the TypeScript compiler and the TypeScript loader from npm by running:
 `npm install --save-dev typescript ts-loader`

__tsconfig.json__

The tsconfig file can start as an empty configuration file, here you can see an example of a basic configuration for TypeScript to compile to es5 as well as providing support for JSX.

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

You can read more about tsconfig.json configuration options at the [TypeScript documentation website](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

__webpack.config.js__

A basic webpack with TypeScript config should look along these lines:
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
     },
   ]
 },
 resolve: {
   extensions: [".tsx", ".ts", ".js"]
 },
};
```

Here we specify our entry point to be __index.ts__ in our current directory,
an output file called __bundle.js__
and our TypeScript loader that is in charge of compiling our TypeScript file to JavaScript. We also add `resolve.extensions` to instruct webpack what file extensions to use when resolving Typescript modules.

## Typescript loaders

Currently there are 2 loaders for TypeScript available:
* [`awesome-typescript-loader`](https://github.com/s-panferov/awesome-typescript-loader)
* [`ts-loader`](https://github.com/TypeStrong/ts-loader)

Awesome TypeScript loader has created a wonderful explanation of the
difference between `awesome-typescript-loader` and `ts-loader`.

You can read more about it [here](https://github.com/s-panferov/awesome-typescript-loader#differences-between-ts-loader).

In this guide we will be using `ts-loader` as currently it is easier enabling additional webpack features such as importing non code assets into your project.

## Enabling source maps

In order to enable source maps we first must configure TypeScript to output inline source maps to our compiled JavaScript files.
This is done by setting the sourceMap property to true.

__tsconfig.json__
```json
{
  "sourceMap": true
}
```

Once TypeScript is configured to output source maps we need to tell webpack
to extract these source maps and pass them to the browser, this way we will get the source file
exactly as we see it in our code editor.

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

First we add a new loader called `source-map-loader`.

To install it run:

`npm install --save-dev source-map-loader`.

Once the loader is installed we need to tell webpack we want to run this loader before any other loaders by using the `enforce: 'pre'` configuration flag.
Finally we need to enable source maps in webpack by specifying the `devtool` property.
Currently we use the 'inline-source-map' setting, to read more about this setting and see other options check out the [devtool documentation](/configuration/devtool/).





## Using 3rd Party Libraries

When installing 3rd party libraries from npm, it is important to remember
to install the typing definition for that library.

You can install 3rd party library definitions from the @types repository.

For example if we want to install lodash we can run the following command to get the typings for it:
`npm install --save-dev @types/lodash`

For more information see [this blog post](https://blogs.msdn.microsoft.com/typescript/2016/06/15/the-future-of-declaration-files/)

## Importing non code assets

To use non code assets with TypeScript, we need to tell TypeScript how to defer the type for these imports.

To do this we need to create a __custom.d.ts__ file.
This file signifies custom definitions for TypeScript in our project.

In our __custom.d.ts__ file we need to provide a definition for svg imports, to do this we need to put the following content in this file:

```typescript
declare module "*.svg" {
  const content: any;
  export default content;
}
```

Here we declare a new module for svg by specifying any import that ends in __.svg__ and define the type for this module as any.
If we wanted to be more explicit about this being a url we could define the type as string.

This applies not only to svg but any custom loader you may want to use which includes css, scss, json or any other file you may wish to load in your project.
