---
title: Why webpack
sort: 7
contributors:
- debs-obrien
- montogeek
- jeremenichelli
- EugeneHlushko
---

To understand why you should use webpack let's do a recap of how we used JavaScript on the web before bundlers were a thing.

There are two ways to run JavaScript in a browser. First, include a script for each functionality you want to implement, the issue is that the solution is hard to scale as loading too many scripts causes a network bottleneck. The other alternative is to load a big .js file containing all your project code, but this results in an unmaintainable scripts that causes problems in scope, size, readability, fragility and monolith files.


## IIFE's - Immediately invoked function expressions

IIFEs solve scoping issues for large projects. When script files are wrapped by an IIFE, you can safely concatenate or safely combine files without concern of scope collision. 

This lead to tools like Make, Gulp, Grunt, Broccoli or Brunch. These tools are known as task runners and they are used, among other purposes, to concatenate all your project files together in order to solve some of the issues mentioned before.

However, anytime you want to change one file you have to rebuild the whole thing. Concatenating makes it trivial to reuse scripts across files and makes build optimizations more difficult to implement. How do you even know what code is being used and which is not?

If you are only using one function from lodash or one date utility from moment.js you are actually adding the entire library and just squishing it together. How do you treeshake the dependencies on your code? Also, lazy loading chunks of code can be hard to achieve at scale and requires a lot of manual work from the developer.


## Birth of JavaScript Modules happened thanks to Node.js

webpack runs on Node.js, a JavaScript runtime that can be used in computers and servers outside a browser environment.

When Node.js was released a new era started, and it came with new challenges. Now that JavaScript is not running in a browser, how are Node applications supposed to load new chunks of code? There is no html files and scripts tags that can be added to it.

CommonJS came out and introduced `require`, which allows you to load and use a module in the current file. This solves scope issues out of the box and which code is used becomes clear since we need to import each module that we are going to need.


## npm + Node.js + modules -- mass distribution

JavaScript is taking over the world as a language, as a platform and as a way to rapidly develop and create fast running applications. 

But there is no browser support for CommonJS. There are no [live bindings](https://medium.com/webpack/the-state-of-javascript-modules-4636d1774358). There are problems with circular references. Sync module resolution loader is slow. While CommonJS was a great solution for Node.js projects, browsers didn't support modules. That's when bundlers and tools like Browserify, RequireJS and SystemJS were created to solve this limitation making it possible to write CommonJS modules that run in a browser.


## ESM - ECMAScript Modules

The good news for web projects is that modules are becoming an official feature in ECMAScript standard, though browser support is still short and early implementations show that bundling is still faster and recommended today.


## Wouldn't it be nice…

...to have something that will not only let us write modules but also support any module format (at least until we get to ESM) and that can handle resources and assets at the same time.

This is why webpack exists. It's a tool that not only let's you bundle your JavaScript applications, supporting both ESM and CommonJS, but can be extended to support all different kind of assets like images, fonts and stylesheets.

webpack cares a lot about performance and it's always adding and improving features like async chunk loading and prefetching to help you deliver the best possible version of your project to the user, always caring about loading times and performance.
