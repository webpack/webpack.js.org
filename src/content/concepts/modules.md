---
title: Modules
sort: 7
contributors:
  - TheLarkInn
  - simon04
  - rouzbeh84
  - EugeneHlushko
related:
   - title: JavaScript Module Systems Showdown
     url: https://auth0.com/blog/javascript-module-systems-showdown/
   - title: <link rel=”prefetch/preload”> in webpack
     url: https://medium.com/webpack/link-rel-prefetch-preload-in-webpack-51a52358f84c
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


## Prefecting/Preloading modules

webpack 4.6.0+ adds support for prefetching and preloading.

Using these inline directives while declaring your imports allows webpack to output “Resource Hint” which tells the browser that this resource is probably(prefetch)/definitely(preload) needed for some navigation in the future.

Simple prefecth example can be having a `HomePage` component, which renders a `LoginButton` component which then on demand loads a `LoginModal` component after being clicked.

__LoginButton.js__

```js
//...
import(/* webpackPrefetch: true */ "LoginModal");

```


This will result `<link rel="prefetch" href="login-chunk.js">` printed in the HTML page. Which will instruct webpack to prefetch (in browser idle time) this On-Demand-Loaded chunk when the parent chunk finish loading.

Preload directive has a bunch of differences compared to prefetch.

- A preloaded chunk starts loading in parallel to the parent chunk. A prefetched chunk starts after the parent chunk finish.
- A preloaded chunk has medium priority and instantly downloaded. A prefetched chunk is downloaded in browser idle time.
- A preloaded chunk should be instantly requested by the parent chunk. A prefetched chunk can be used anytime in the future.
- Browser support is different.

Simple preload example can be having a `Component` which always depends on a big library that should be in a separate chunk.

Lets image component `ChartComponent` which needs huge `ChartingLibrary`. It displays a `LoadingIndicator` when rendered and instantly does an on demand import of `ChartingLibrary`:

__ChartComponent.js__

```js
//...
import(/* webpackPreload: true */ "ChartingLibrary")
```


When a page which uses the `ChartComponent` is requested, the charting-library-chunk is also requested via <link rel="preload">. Assuming the page-chunk is smaller and finishes faster, the page will be displayed with a `LoadingIndicator`, until the already requested `charting-library-chunk` finishes. This will give a little load time boost since it only needs one round-trip instead of two. Especially in high-latency environments.

T> Using webpackPreload incorrectly can actually hurt performance, so be careful when using it.

Learn more about [prefetch\preload in webpack](https://medium.com/webpack/link-rel-prefetch-preload-in-webpack-51a52358f84c)
