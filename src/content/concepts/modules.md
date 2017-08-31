---
title: Modules
sort: 7
contributors:
  - TheLarkInn
  - simon04
  - rouzbeh84
---

In [modular programming](https://en.wikipedia.org/wiki/Modular_programming), developers break programs up into discrete chunks of functionality called a _module_.

Each module has a smaller surface area than a full program, making verification, debugging, and testing trivial.
Well-written _modules_ provide solid abstractions and encapsulation boundaries, so that each module has a coherent design and a clear purpose within the overall application.

Node.js has supported modular programming almost since its inception.
On the web, however, support for _modules_ has been slow to arrive.
Multiple tools exist that support modular JavaScript on the web, with a variety of benefits and limitations.
webpack builds on lessons learned from these systems and applies the concept of _modules_ to any file in your project.

## What is a webpack Module

In contrast to [Node.js modules](https://nodejs.org/api/modules.html), webpack _modules_ can express their _dependencies_ in a variety of ways. A few examples are:

* An [ES2015 `import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) statement
* A [CommonJS](http://www.commonjs.org/specs/modules/1.0/) `require()` statement
* An [AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md) `define` and `require` statement
* An [`@import` statement](https://developer.mozilla.org/en-US/docs/Web/CSS/@import) inside of a css/sass/less file.
* An image url in a stylesheet (`url(...)`) or html (`<img src=...>`) file.

T> webpack 1 requires a specific loader to convert ES2015 `import`, however this is possible out of the box via webpack 2

## Supported Module Types

webpack supports modules written in a variety of languages and preprocessors, via _loaders_. _Loaders_ describe to webpack **how** to process non-JavaScript _modules_ and include these _dependencies_ into your _bundles_.
The webpack community has built _loaders_ for a wide variety of popular languages and language processors, including:

* [CoffeeScript](http://coffeescript.org)
* [TypeScript](https://www.typescriptlang.org)
* [ESNext (Babel)](https://babeljs.io)
* [Sass](http://sass-lang.com)
* [Less](http://lesscss.org)
* [Stylus](http://stylus-lang.com)

And many others! Overall, webpack provides a powerful and rich API for customization that allows one to use webpack for **any stack**, while staying **non-opinionated** about your development, testing, and production workflows.

For a full list, see [**the list of loaders**](/loaders) or [**write your own**](/api/loaders).
