---
title: Get Started with Webpack
---

`webpack` is a module bundler.A bundler is a tool that builds all your project files to a single asset file that can be loaded onto a browser.It requires that your application files be written as [modules](/concepts/modules).
The project structure consists of a single entry file with references to other modules as dependencies creating a tree like dependency graph.The dependency modules can belong to your application or can be third party libraries.

The bundler creates this dependency graph and parses through it to include all the required modules in the final bundle.The final bundle file will contain all the modules in the right order of dependency and none of the modules will be duplicated.
Other examples of module bundlers are [browserify]() and [rollupjs]()

Unlike module bundlers, [Grunt](http://grunt),[Gulp](),[Broccoli]() are task runners.
These tools perform a set of configured tasks in the order that the config file specifies.
In fact, `webpack` can be run as [one of the tasks](/how-to/use-with-third-party-tools) by a task runner.

`webpack` can bundle Javascript files written using Commonjs, AMD and ES2015 modules.
It can also transform other assets(css, png, fonts..) to a module and bundle it together with the Javascript.This is done using [loaders](/concepts/loaders).
`webpack` can perform customised operations before, after or during bundle creation using [plugins](/concepts/plugins).
You can also do advanced operations like [Hot module reloading](/how-to/hot-module-reload) and [Code splitting](/how-to/split-code) using `webpack`.

