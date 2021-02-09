---
title: 集成
sort: 24
contributors:
  - pksjce
  - bebraw
  - tashian
  - skipjack
  - AnayaDesign
---

首先，我们要消除一个常见的误解。webpack 是一个模块打包工具(module bundler)（例如，[Browserify](http://browserify.org/) 或 [Brunch](https://brunch.io/)）。而_不是一个任务执行工具(task runner)_（例如，[Make](https://www.gnu.org/software/make/), [Grunt](https://gruntjs.com/) 或者 [Gulp](https://gulpjs.com/) ）。任务执行工具用来自动化处理常见的开发任务，例如，lint(代码检测)、build(构建)、test(测试)。相比模块打包工具，任务执行工具则聚焦在偏重上层的问题上面。你仍然可以得益于这种用法：使用上层的工具，而将打包部分的问题留给 webpack。

打包工具帮助你取得准备用于部署的 JavaScript 和 stylesheet，将它们转换为适合浏览器的可用格式。例如，可以通过 [压缩](/plugins/terser-webpack-plugin)、[分离 chunk](/guides/code-splitting) 和 [惰性加载](/guides/lazy-loading) 我们的 JavaScript 来提高性能。打包是 web 开发中最重要的挑战之一，解决此问题可以消除开发过程中的大部分痛点。

好的消息是，虽然有一些功能重叠，但是如果使用方式正确，任务运行工具和模块打包工具还是能够一起协同工作。本指南提供了关于如何将 webpack 与一些流行的任务运行工具集成在一起的高度概述。

## NPM Scripts {#npm-scripts}

通常 webpack 用户使用 npm [`scripts`](https://docs.npmjs.com/misc/scripts) 来作为任务执行工具。这是比较好的开始。然而跨平台支持可能是个问题，但是有几种解决方案。许多用户（但不是大多数用户）直接使用 npm `scripts` 和各种级别的 webpack 配置和工具。

因此，虽然 webpack 核心重点是打包，但是可以通过各种扩展，将它用于任务运行工具的常见工作。集成一个单独的工具会增加复杂度，因此在开始前一定要权衡利弊。

## Grunt {#grunt}

对于那些使用 Grunt 的人，我们推荐使用 [`grunt-webpack`](https://www.npmjs.com/package/grunt-webpack) package。使用 `grunt-webpack` 你可以将 webpack 或 [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 作为一项任务(task)执行，访问 [grunt template tags](https://gruntjs.com/api/grunt.template) 中的统计信息，拆分开发和生产配置等等。如果还没有安装 `grunt-webpack` 和 `webpack`，请先安装它们：

```bash
npm install --save-dev grunt-webpack webpack
```

然后，注册一个配置并加载任务：

**Gruntfile.js**

```js
const webpackConfig = require('./webpack.config.js');

module.exports = function (grunt) {
  grunt.initConfig({
    webpack: {
      options: {
        stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
      },
      prod: webpackConfig,
      dev: Object.assign({ watch: true }, webpackConfig),
    },
  });

  grunt.loadNpmTasks('grunt-webpack');
};
```

获取更多信息，请查看 [仓库](https://github.com/webpack-contrib/grunt-webpack)。

## Gulp {#gulp}

在 [`webpack-stream`](https://github.com/shama/webpack-stream) package（也称作 `gulp-webpack`） 的帮助下，可以相当直接地将 Gulp 与 webpack 集成。在这种情况下，不需要单独安装 `webpack`，因为它是 `webpack-stream` 直接依赖：

```bash
npm install --save-dev webpack-stream
```

只要将 `webpack` 替换为 `require('webpack-stream')`，并传递一个配置：

**gulpfile.js**

```js
const gulp = require('gulp');
const webpack = require('webpack-stream');
gulp.task('default', function () {
  return gulp
    .src('src/entry.js')
    .pipe(
      webpack({
        // Any configuration options...
      })
    )
    .pipe(gulp.dest('dist/'));
});
```

获取更多信息，请查看 [仓库](https://github.com/shama/webpack-stream)。

## Mocha {#mocha}

[`mocha-webpack`](https://github.com/zinserjan/mocha-webpack) 可以将 Mocha 与 webpack 完全集成。这个仓库提供了很多关于其优势和劣势的细节，基本上 `mocha-webpack` 只是一个简单封装，提供与 Mocha 几乎相同的 CLI，并提供各种 webpack 功能，例如改进了 watch mode 和改进了路径分析。这里是一个如何安装并使用它来运行测试套件的示例（在 `./test` 中找到）：

```bash
npm install --save-dev webpack mocha mocha-webpack
mocha-webpack 'test/**/*.js'
```

获取更多信息，请查看 [仓库](https://github.com/zinserjan/mocha-webpack)。

## Karma {#karma}

[`karma-webpack`](https://github.com/webpack-contrib/karma-webpack) package 允许你使用 webpack 预处理 [Karma](https://karma-runner.github.io/1.0/index.html) 中的文件。

```bash
npm install --save-dev webpack karma karma-webpack
```

**karma.conf.js**

```js
module.exports = function (config) {
  config.set({
    frameworks: ['webpack'],
    files: [
      { pattern: 'test/*_test.js', watched: false },
      { pattern: 'test/**/*_test.js', watched: false },
    ],
    preprocessors: {
      'test/*_test.js': ['webpack'],
      'test/**/*_test.js': ['webpack'],
    },
    webpack: {
      // Any custom webpack configuration...
    },
    plugins: ['karma-webpack'],
  });
};
```

获取更多信息，请查看 [仓库](https://github.com/webpack-contrib/karma-webpack)。
