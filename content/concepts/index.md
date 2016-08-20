---
title: Introduction
---
## Overview

*webpack* is a _module bundler_ for modern JavaScript applications.

### What is a module?

In [modular programming](https://en.wikipedia.org/wiki/Modular_programming), developers break programs up into discrete chunks of functionality called a _module_.

Each module has a smaller surface area than a full program, making verification, debugging, and testing trivial. 
Well-written _modules_ provide solid abstractions and encapsulation boundaries, so that each module has a coherent design and a clear purpose within the overall application.

Node.js has supported modular programming almost since its inception. 
On the web, however, support for _modules_ has been slow to arrive.
Multiple tools exist that support modular JavaScript on the web, with a variety of benefits and limitations.
webpack builds on lessons learned from these systems and applies the concept of _modules_ to any file in your project. 

### What is a webpack module?

In contrast to Node.js modules, webpack _modules_ can express their _dependencies_ in a variety of ways. A few examples are:

* A JavaScript `require()` statement
* An ECMAScript2015 `import` statement
* An AMD `define` and `require` statement
* An `@import` statement inside of a css/sass/less file.
* An image url in a stylesheet or html file. 

T> webpack 1 requires a specific loader to convert ECMAScript2015 `import`, however this is possible out of the box via webpack 2

### webpack, dependency graph, and bundles

Any time one file depends on another, webpack treats this as a _dependency_. This allows webpack to take non-code assets, such as images or web fonts, and also provide them as _dependencies_ for your application.

When webpack processes your application, it starts from a list of modules defined on the command line or in its config file.
Starting from these _entry points_, webpack recursively builds a _dependency graph_ that includes every module your application needs, then packages all of those modules into a small number of _bundles_ - often, just one - to be loaded by the browser. 

T> Bundling your application is especially powerful for *HTTP/1.1* clients, as it minimizes the number of times your app has to wait while the browser starts a new request. For *HTTP/2*, you can also use Code Splitting and bundling through webpack for the [best optimization](https://medium.com/webpack/webpack-http-2-7083ec3f3ce6#.7y5d3hz59).

webpack supports modules written in a variety of languages and preprocessors, via _loaders_. _Loaders_ describe to webpack **how** to process non-JavaScript _modules_ and include these _dependencies_ into your _bundles_.
The webpack community has built _loaders_ for a wide variety of popular languages and language processors, including:

* [CoffeeScript](http://coffeescript.org)
* [TypeScript](https://www.typescriptlang.org)
* [ESNext (Babel)](https://babeljs.io)
* [Sass](http://sass-lang.com)
* [Less](http://lesscss.org)
* [Stylus](http://stylus-lang.com)

And many others! Overall, webpack provides a powerful and rich API for customization that allows one to use webpack for **any stack**, while staying **unopinionated** about your development, testing, and production workflows. 

For a full list, see [**the list of loaders**](https://webpack.github.io/docs/list-of-loaders.html) or [**write your own**](./api/loaders).

### Recap

We are just starting to scratch the surface of webpack and its features, but we are equipped with a great grasp on terminology you will frequent throughout this guide. It's time to now dive into the [Core Concepts (Entry, Output, Loaders, Plugins)](./concepts/core-concepts)!
