---
title: istanbul-instrumenter-loader
source: https://raw.githubusercontent.com/webpack-contrib/istanbul-instrumenter-loader/master/README.md
edit: https://github.com/webpack-contrib/istanbul-instrumenter-loader/edit/master/README.md
---
## [webpack](https://webpack.js.org/) 的 Istanbul instrumenter loader

[![npm](http://img.shields.io/npm/v/istanbul-instrumenter-loader.svg?style=flat-square)](https://www.npmjs.org/package/istanbul-instrumenter-loader)
[![deps](http://img.shields.io/david/deepsweet/istanbul-instrumenter-loader.svg?style=flat-square)](https://david-dm.org/deepsweet/istanbul-instrumenter-loader#info=dependencies)

通过 [istanbul-lib-instrument](https://github.com/istanbuljs/istanbul-lib-instrument) 监测 JS 文件，以便生成代码覆盖率报告。

### 安装

```sh
npm install --save-dev istanbul-instrumenter-loader
# or
yarn add --dev istanbul-instrumenter-loader
```

### 配置

#### 参考

* [Loaders](https://webpack.js.org/concepts/loaders/)
* [karma-webpack](https://github.com/webpack/karma-webpack)
* [karma-coverage-istanbul-reporter](https://github.com/mattlewis92/karma-coverage-istanbul-reporter)

#### 项目结构

假设你的项目结构如下：

```
├── src/
│   └── components/
│       ├── bar/
│       │   └── index.js
│       └── foo/
│           └── index.js
└── test/
    └── src/
        └── components/
            └── foo/
                └── index.js
```

为生成所有组件（包括你没写测试的那些）的代码覆盖率报告，你需要 require 所有**业务**和**测试**的代码。相关内容在 [karma-webpack 其他用法](https://github.com/webpack/karma-webpack#alternative-usage)中有涉及。


#### test/index.js

```js
// require 所有 `project/test/src/components/**/index.js`
const testsContext = require.context('./src/components/', true, /index\.js$/);

testsContext.keys().forEach(testsContext);

// require 所有 `project/src/components/**/index.js`
const componentsContext = require.context('../src/components/', true, /index\.js$/);

componentsContext.keys().forEach(componentsContext);
```

以下为 Karma 的唯一入口起点文件。

#### karma.conf.js

```js
config.set({
    …
    files: [
        'test/index.js'
    ],
    preprocessors: {
        'test/index.js': 'webpack'
    },
    webpack: {
        …
        module: {
            rules: [
                // 用 Istanbul 只监测业务代码
                {
                    test: /\.js$/,
                    include: path.resolve('src/components/'),
                    loader: 'istanbul-instrumenter-loader'
                }
            ]
        }
        …
    },
    reporters: [ 'progress', 'coverage-istanbul' ],
    coverageIstanbulReporter: {
        reports: [ 'text-summary' ],
        fixWebpackSourcePaths: true
    },
    …
});
```

#### 配置选项
此 loader 支持 [istanbul-lib-instrument](https://github.com/istanbuljs/istanbul-lib-instrument/blob/master/api.md#instrumenter) 的所有配置选项。

### License
MIT

***

> 原文：https://webpack.js.org/loaders/istanbul-instrumenter-loader/
