---
title: NpmInstallWebpackPlugin
source: https://raw.githubusercontent.com/webpack-contrib/npm-install-webpack-plugin/master/README.md
edit: https://github.com/webpack-contrib/npm-install-webpack-plugin/edit/master/README.md
---
# npm-install-webpack-plugin

> 用Webpack**自动安装&保存依赖**来加快开发速度。
>
> [![npm-install-webpack-plugin mp4](https://cloud.githubusercontent.com/assets/15182/12540538/6a4e8f1a-c2d0-11e5-97ee-4ddaf6892645.gif)](https://dl.dropboxusercontent.com/u/55764/npm-install-webpack-plugin.mp4)

## 特性

- [x] 适用于Webpack`^v1.12.0`和`^2.1.0-beta.0`。
- [x] 自动安装`.babelrc`文件里边的插件&预设。
- [x] 支持ES5&ES6模块。（如：`require`, `import`）
- [x] 支持带有命名空间的包（Namespaced packages）。（如：`@cycle/dom`）
- [x] 支持名称用点分隔的包（Dot-delimited packages）。（如：`lodash.capitalize`）
- [x] 支持CSS的引入。（如：`@import "~bootstrap"`）
- [x] 支持Webpack加载器（loaders）。（如：`babel-loader`, `file-loader`等等）
- [x] 支持内联Webpack加载器（loaders）。（如：`require("bundle?lazy!./App"`）
- [x] 自动安装缺少的`peerDependencies`。（如：`@cycle/core`会自动安装`rx@*`）
- [x] 支持Webpack`resolve.alias`&`resolve.root`的配置。（如：`require("react")`可以别名成`react-lite`）

[![travis build](https://img.shields.io/travis/ericclemmons/npm-install-webpack-plugin.svg)](https://travis-ci.org/ericclemmons/npm-install-webpack-plugin)
[![Coverage Status](https://coveralls.io/repos/ericclemmons/npm-install-webpack-plugin/badge.svg?branch=master&service=github)](https://coveralls.io/github/ericclemmons/npm-install-webpack-plugin?branch=master)
[![version](https://img.shields.io/npm/v/npm-install-webpack-plugin.svg)](http://npm.im/npm-install-webpack-plugin)
[![downloads](https://img.shields.io/npm/dm/npm-install-webpack-plugin.svg)](http://npm-stat.com/charts.html?package=npm-install-webpack-plugin)
[![MIT License](https://img.shields.io/npm/l/npm-install-webpack-plugin.svg)](http://opensource.org/licenses/MIT)

- - -

### 为什么?

只是为了安装一个不知道什么时候需要用到的依赖而<kbd>Ctrl-C</kbd>去中断构建脚本&服务，非常坑。

相反，如果使用`require`或者`import`正常引入，构建脚本和服务在运行的时候，`npm install`就会**自动安装&保存缺少的依赖**。


### 安装

```shell
$ npm install --save-dev npm-install-webpack-plugin
```


### 使用

在`webpack.config.js`文件中写入：

```js
plugins: [
  new NpmInstallPlugin();
],
```

**相当于**:

```js
plugins: [
  new NpmInstallPlugin({
    // 使用--save或者--save-dev
    dev: false,
    // 安装缺少的peerDependencies
    peerDependencies: true,
    // 减少控制台日志记录的数量
    quiet: false,
  });
],
```

可以提供一个`Function`来动态设置`dev`：

```js
plugins: [
  new NpmInstallPlugin({
    dev: function(module, path) {
      return [
        "babel-preset-react-hmre",
        "webpack-dev-middleware",
        "webpack-hot-middleware",
      ].indexOf(module) !== -1;
    },
  }),
],
```


### License

> MIT License 2016 © Eric Clemmons
