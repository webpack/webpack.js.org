---
title: Webpack & Typescript
sort: 20
contributors:
  - morsdyce
---

Typescript is a typed superset of javascript that compiles to plain javascript, in this guide we will learn how to integrate Typescript with webpack.
To learn more about Typescript [click here](https://www.typescriptlang.org).

## Basic Setup

In order to get started with Webpack and Typescript, first we must install webpack in our project.
If you didn't do so already please check out [Webpack Installation Guide](http://localhost:3000/guides/installation).

To start using webpack with Typescript you need a couple of things:
1. Install the Typescript compiler in your project.
2. Install a Typescript loader. (in this case we're using ts-loader)
3. Create a tsconfig.json file to contain our typescript compilation configuration.
3. Create webpack.config.js to contain our webpack configuration.

You can install the typescript compiler and the typescript loader from npm by running:
 `npm install --save-dev typescript ts-loader`
 
__tsconfig.json__ 

The tsconfig file can start as an empty configuration file, here you can see an example of a basic configuration for typescript to compile to es5 as well as providing support for JSX.

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

You can read more about tsconfig.json configuration options at the [typescript documentation website](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

__webpack.config.js__

A basic webpack with typescript config should look along these lines:
```js
module.exports = {
 entry: './index.ts',
 output: {
   filename: '/bundle.js',
   path: '/'
 },
 module: {
   rules: [
     {
       test: /\.tsx?$/,
       loader: 'ts-loader',
       exclude: /node_modules/,
     }
   ]
 }
};
```
 
Here we specify our entry point to be index.ts in our current directory, 
an output file called bundle.js 
and our typescript loader that is in charge of compiling our typescript file to javascript.

## Typescript loaders

Currently there are 2 loaders for typescript available:
* [awesome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader)
* [ts-loader](https://github.com/TypeStrong/ts-loader)

Awesome typescript loader has created a wonderful explanation of the 
difference between awesome-typescript-loader and ts-loader. 

You can read more about it [here](https://github.com/s-panferov/awesome-typescript-loader#differences-between-ts-loader).

In this guide we will be using ts-loader as currently it is easier enabling additional webpack features such as importing non code assets into your project.

## Using 3rd Party Libraries

When installing 3rd party libraries from npm, it is important to remember
to install the typing definition for that library.

You can install 3rd party library definitions from the @types repository.

For example if we want to install lodash we can run the following command to get the typings for it:
`npm install --save-dev @types/lodash`

For more information see [this blog post](https://blogs.msdn.microsoft.com/typescript/2016/06/15/the-future-of-declaration-files/)

## Importing non code assets

One of webpack most awesome features is that it allows us to import non code assets using custom loaders.
For example if we wanted to import an SVG file and get the url for this resource in our application all we need to do is:

```js
import svgUrl from './svgIcon.svg';
```

To do this we need to install the url-loader and configure webpack to use it:
`npm install --save-dev url-loader`

__webpack.config.js__
```js
module.exports = {
   module: {
     rules: [
       {
         test: /\.tsx?$/,
         loader: 'ts-loader',
         exclude: /node_modules/,
       },
       {
         test: /\.svg$/,
         loader: 'url-loader'
       }
     ]
   }
 };
```

Here we instruct webpack to include this file in our build and return a url reference in our Typescript code.

There is an issue with this method. Typescript does not know how to defer the type of an svg file and will throw an error.

To fix this we need to create a `custom.d.ts` file.
This file signifies custom definitions for typescript in our project.

In our custom.d.ts file we need to provide a definition for svg imports, to do this we need to put the following content in this file:

```typescript
declare module "*.svg" {
  const content: any;
  export default content;
}
```

Here we declare a new module for svg by specifying any import that ends in .svg and define the type for this module as any.
If we wanted to be more explicit about this being a url we could define the type as string.

This applies not only to svg but any custom loader you may want to use which includes css, scss, json or any other file you may wish to load in your project.
 