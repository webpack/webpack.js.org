---
title: Glossary
contributors:
  - rouzbeh84
  - bebraw
  - skipjack
---

This index lists common terms used throughout the webpack ecosystem.


## A

- [**Asset**](/guides/asset-management/): This a general term for the images, fonts, media, and any other kind of files that are typically used in websites and other applications. These typically end up as individual files within the [output](/glossary#o) but can also be inlined via things like the [style-loader](/loaders/style-loader) or [url-loader](/loaders/url-loader).


## B

- [**Bundle**](/guides/getting-started/#creating-a-bundle): Produced from a number of distinct modules, bundles contain the final versions of source files that have already undergone the loading and compilation process.
- [**Bundle Splitting**](/guides/code-splitting): This process offers one way of optimizing a build, allowing webpack to generate multiple bundles for a single application. As a result, each bundle can be isolated from changes effecting others, reducing the amount of code that needs to be republished and therefore re-downloaded by the client and taking advantage of browser caching.


## C

- [**Code Splitting**](/guides/code-splitting/): Refers to dividing your code into various bundles/chunks which you can then load on demand instead of loading a single bundle containing everything.
- **Chunk**: This webpack-specific term is used internally to manage the bundling process. Bundles are composed out of chunks, of which there are several types (e.g. entry and child).
- [**Configuration**](/concepts/configuration/): webpack config file is a plain old JavaScript file that exports an object. This object is then processed by webpack based upon its defined properties.


## D

- [**Dependency Graph**](/concepts/dependency-graph): Any time one file depends on another, webpack treats this as a *dependency*. Starting from an entry point(s), webpack recursively builds a dependency graph that includes every module/asset your application needs.


## E

- [**Entry Point**](/concepts/entry-points): The entry point tells webpack where to start and follows the graph of dependencies to know what to bundle. You can think of your application's entry point(s) as the **contextual root(s)** of what you want bundled.


## F

## G

## H

- [**Hot Module Replacement (HMR)**](/concepts/hot-module-replacement): A process that exchanges, adds, or removes  `modules` while an application is running without a full page reload.


## I

## J

## K

## L

- [**Loaders**](/concepts/loaders): Transformations that are applied on the source code of a module. They allow you to pre-process files as you `require()` or "load" them. Similar to a 'task-runner'.


## M

- [**Module**](/concepts/modules): Discrete chunks of functionality that provide a smaller surface area than a full program. Well-written modules provide solid abstractions and encapsulation boundaries which make up a coherent design and clear purpose.
- [**Module Resolution**](/concepts/module-resolution/): A module can be required as a dependency from another module and a resolver is a library which helps in locating a module by its absolute path.. Modules are searched for inside all directories specified in `resolve.modules`.


## N

## O

- [**Output**](/concepts/output): Option(s) specifying where to the output of the compiled files to disk.
  > _Note, that while there can be multiple entry points, only one output configuration is specified._


## P

- [**Plugin**](/concepts/plugins): A JavaScript object that has an `apply` property. This `apply` property is called by the webpack compiler, giving access to the entire compilation lifecycle. These packages will typically extend compilation functionality in one way or another.


## Q

## R

## S

## T

- [**Target**](/configuration/target/): User configured deployment target(s) [listed here](/configuration/target/) to compile for a specific environment like the browser, NodeJS, or Electron.
- [**Tree Shaking**](/guides/tree-shaking/): Unused/Excess code elimination, or more precisely, live code importing. Compilers like webpack will accomplish this by analyzing the various kinds `import` statements and usage of the imported code to determine what parts of dependencies are actually being utilized, dropping parts of the "tree" that are not.


## U

## V

- [**Vendor Entry Point**](/concepts/entry-points/#separate-app-and-vendor-entries): Create dependency graphs starting at both `app.js` and `vendors.js`. These graphs are completely separate and independent of each other to allow leverage of `CommonsChunkPlugin` and extract any vendor references from your app bundle into your vendor bundle. Helps achieve a common pattern in webpack known as [long-term vendor-caching](/guides/caching/).


## W

- [**webpack**](/): A highly configurable [module](/concepts/modules) bundler for modern JavaScript applications


## X

## Y

## Z

