---
title: Get Started with Webpack
---
#### Why `webpack`?

It has traditionally been difficult to efficiently bundle and optimise front end applications and make them browser ready.
The problems have generally been about not having a standard module system in client side javascript, having varied static assets such 
as css, html, pngs, svgs, fonts which are essential to a web app. All of these static assets have to be transpiled(es2015 to es5),
bundled(concatenate js and libraries) and optimised(uglified/minified) for the web.

There are various tools that help us to do this(grunt, gulp, browserify etc). The modern ones can be roughly divided into two types of tools.
##### Task runners
Grunt and gulp fall into this category. In this eco system, transformations are applied on your code using task configuration.
Each task can be performed using the respective plugin (grunt-concat, grunt-babel etc). A file is required to configure each of the tasks
and to specify the order of the tasks for execution.
##### Module bundlers
Webpack, browserify, rollup are module bundlers.
A module bundler is different in the sense that firstly, it mandates that your app is split into modules starting with an entry point file. Secondly, it creates a dependency
graph by statically analysing your code for modular dependencies. Lastly, it bundles your application by following the dependency graph from the entry point.

Module bundlers are generally accepted to be a superior and reliable way of bundling all your static assets.

Webpack can also
* Transform the asset files to modules using loaders.(Eg-convert css files to modules, convert es2015 to commonjs modules)
* Customise optimizations granularly on the created bundle through plugins.
* Provide stats on the dependency graph of your application.
* Provide code-splitting capabilities, so that you can load assets for your application as and when required by the end user.

