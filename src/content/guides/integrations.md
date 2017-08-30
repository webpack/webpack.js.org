---
title: 集成(Integrations)
sort: 25
contributors:
  - pksjce
  - bebraw
  - tashian
  - skipjack
---

首先我们要消除一个常见的误解。webpack 是一个模块打包器(module bundler)（例如，[Browserify](http://browserify.org/) 或 [Brunch](http://brunch.io/)）。它不是一个任务执行器(task runner)（例如，[Make](https://www.gnu.org/software/make/), [Grunt](https://gruntjs.com/) 或者 [Gulp](https://gulpjs.com/) ）。任务执行器就是用来自动化处理常见的开发任务，例如项目的检查(lint)、构建(build)、测试(test)。相对于*打包器(bundler)*，任务执行器则聚焦在偏重上层的问题上面。你可以得益于，使用上层的工具，而将打包部分的问题留给 webpack。

打包器(bundler)帮助您取得准备用于部署的 JavaScript 和样式表，将它们转换为适合浏览器的可用格式。例如，JavaScript 可以[压缩](/plugins/uglifyjs-webpack-plugin)、[拆分 chunk](/guides/code-splitting) 和[懒加载](/guides/lazy-loading)，以提高性能。打包是 web 开发中最重要的挑战之一，解决此问题可以消除开发过程中的大部分痛点。

好消息是，虽然有一些功能重复，但如果以正确的方式处理，任务运行器和模块打包器能够一起协同工作。本指南提供了关于如何将 webpack 与一些流行的任务运行器集成在一起的高度概述。


## NPM Scripts

通常 webpack 用户使用 npm [`scripts`](https://docs.npmjs.com/misc/scripts) 来作为任务执行器。这是比较好的开始。然而跨平台支持是一个问题，为此有一些解决方案。许多用户，但不是大多数用户，直接使用 npm `scripts` 和各种级别的 webpack 配置和工具，来应对构建任务。

因此，当 webpack 的核心焦点专注于打包时，有多种扩展可以供你使用，可以将其用于任务运行者常见的工作。集成一个单独的工具会增加复杂度，所以一定要权衡集成前后的利弊。


## Grunt

For those using Grunt, we recommend the [`grunt-webpack`](https://www.npmjs.com/package/grunt-webpack) package. With `grunt-webpack` you can run webpack or [webpack-dev-server](https://github.com/webpack/webpack-dev-server) as a task, get access to stats within [template tags](https://gruntjs.com/api/grunt.template), split development and production configurations and more. Start by installing `grunt-webpack` as well as `webpack` itself if you haven't already:

``` bash
npm i --save-dev grunt-webpack webpack
```

Then register a configuration and load the task:

__Gruntfile.js__

``` js
const webpackConfig = require('./webpack.config.js');

module.exports = function(grunt) {
  grunt.initConfig({
    webpack: {
      options: {
        stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      },
      prod: webpackConfig,
      dev: Object.assign({ watch: true }, webpackConfig)
    }
  });

  grunt.loadNpmTasks('grunt-webpack');
};
```

For more information, please visit the [repository](https://github.com/webpack-contrib/grunt-webpack).


## Gulp

Gulp is also a fairly straightforward integration with the help of the [`webpack-stream`](https://github.com/shama/webpack-stream) package (a.k.a. `gulp-webpack`). In this case, it is unnecessary to install `webpack` separately as it is a direct dependency of `webpack-stream`:

``` bash
npm i --save-dev webpack-stream
```

Just `require('webpack-stream')` instead of `webpack` and optionally pass it an configuration:

__gulpfile.js__

``` js
var gulp = require('gulp');
var webpack = require('webpack-stream');
gulp.task('default', function() {
  return gulp.src('src/entry.js')
    .pipe(webpack({
      // Any configuration options...
    }))
    .pipe(gulp.dest('dist/'));
});
```

For more information, please visit the [repository](https://github.com/shama/webpack-stream).


## Mocha

The [`mocha-webpack`](https://github.com/zinserjan/mocha-webpack) utility can be used for a clean integration with Mocha. The repository offers more details on the pros and cons but essentially `mocha-webpack` is a simple wrapper that provides almost the same CLI as Mocha itself and provides various webpack functionality like an improved watch mode and improved path resolution. Here is a small example of how you would install it and use it to run a test suite (found within `./test`):

``` bash
npm i --save-dev webpack mocha mocha-webpack
mocha-webpack 'test/**/*.js'
```

For more information, please visit the [repository](https://github.com/zinserjan/mocha-webpack).


## Karma

The [`karma-webpack`](https://github.com/webpack-contrib/karma-webpack) package allows you to use webpack to pre-process files in [Karma](http://karma-runner.github.io/1.0/index.html). It also makes use of [`webpack-dev-middleware`](https://github.com/webpack/webpack-dev-middleware) and allows passing configurations for both. A simple example may look something like this:

``` bash
npm i --save-dev webpack karma karma-webpack
```

__karma.conf.js__

``` js
module.exports = function(config) {
  config.set({
    files: [
      { pattern: 'test/*_test.js', watched: false },
      { pattern: 'test/**/*_test.js', watched: false }
    ],
    preprocessors: {
      'test/*_test.js': [ 'webpack' ],
      'test/**/*_test.js': [ 'webpack' ]
    },
    webpack: {
      // Any custom webpack configuration...
    },
    webpackMiddleware: {
      // Any custom webpack-dev-middleware configuration...
    }
  });
};
```

For more information, please visit the [repository](https://github.com/webpack-contrib/karma-webpack).
