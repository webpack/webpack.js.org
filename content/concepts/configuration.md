---
title: 配置
contributors:
  - dear-lizhihua
---

你可能已经注意到，很少有 webpack 配置看起来很完全相同。这是因为 **webpack 的配置文件是 JavaScript 文件导出的一个对象。**此对象，由 webpack 根据对象定义的属性进行解析。

接下来的例子展示了 webpack 配置对象如何表达和配置，因为_配置对象是代码_：

## 最简单的配置

**webpack.config.js**

```javascript
module.exports = {
  entry: './foo.js',
  output: {
    path: 'dist',
    filename: 'foo.bundle.js'
  }
};
```

## 多个目标

**webpack.config.js**

```javascript
var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');

var baseConfig = {
  target: 'async-node',
  entry: {
    entry: './entry.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist')
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'inline',
      filename: 'inline.js',
      minChunks: Infinity
    }),
    new webpack.optimize.AggressiveSplittingPlugin({
        minSize: 5000,
        maxSize: 10000
    }),
  ]
};

let targets = ['web', 'webworker', 'node', 'async-node', 'node-webkit', 'electron-main'].map((target) => {
  let base = webpackMerge(baseConfig, {
    target: target,
    output: {
      path: path.resolve(__dirname, './dist/' + target),
      filename: '[name].' + target + '.js'
    }
  });
  return base;
});

module.exports = targets;
```

T> 作为这篇文档最重要的部分是，会有许多不同格式和风格的 webpack 配置。你和你的团队在理解和维护上能够保持一致才是关键。

## 使用 TypeScript

在下面的例子我们使用 TypeScript 创建一个类(class)，这个类使用了 angular-cli 的[生成配置](https://github.com/angular/angular-cli/)。

**webpack.config.ts**

```typescript
import * as webpackMerge from 'webpack-merge';
import { CliConfig } from './config';
import {
  getWebpackCommonConfig,
  getWebpackDevConfigPartial,
  getWebpackProdConfigPartial,
  getWebpackMobileConfigPartial,
  getWebpackMobileProdConfigPartial
} from './';

export class NgCliWebpackConfig {
  // TODO: When webpack2 types are finished lets replace all these any types
  // so this is more maintainable in the future for devs
  public config: any;
  private webpackDevConfigPartial: any;
  private webpackProdConfigPartial: any;
  private webpackBaseConfig: any;
  private webpackMobileConfigPartial: any;
  private webpackMobileProdConfigPartial: any;

  constructor(public ngCliProject: any, public target: string, public environment: string, outputDir?: string) {
    const config: CliConfig = CliConfig.fromProject();
    const appConfig = config.config.apps[0];

    appConfig.outDir = outputDir || appConfig.outDir;

    this.webpackBaseConfig = getWebpackCommonConfig(this.ngCliProject.root, environment, appConfig);
    this.webpackDevConfigPartial = getWebpackDevConfigPartial(this.ngCliProject.root, appConfig);
    this.webpackProdConfigPartial = getWebpackProdConfigPartial(this.ngCliProject.root, appConfig);

    if (appConfig.mobile){
      this.webpackMobileConfigPartial = getWebpackMobileConfigPartial(this.ngCliProject.root, appConfig);
      this.webpackMobileProdConfigPartial = getWebpackMobileProdConfigPartial(this.ngCliProject.root, appConfig);
      this.webpackBaseConfig = webpackMerge(this.webpackBaseConfig, this.webpackMobileConfigPartial);
      this.webpackProdConfigPartial = webpackMerge(this.webpackProdConfigPartial, this.webpackMobileProdConfigPartial);
    }

    this.generateConfig();
  }

  generateConfig(): void {
    switch (this.target) {
      case "development":
        this.config = webpackMerge(this.webpackBaseConfig, this.webpackDevConfigPartial);
        break;
      case "production":
        this.config = webpackMerge(this.webpackBaseConfig, this.webpackProdConfigPartial);
        break;
      default:
        throw new Error("Invalid build target. Only 'development' and 'production' are available.");
        break;
    }
  }
}
```

## 使用 JSX

在下面例子中，JSX（React JS 标记）和 Babel 创建了一个 webpack 可以识别的 JSON 配置。（由[Jason Miller](https://twitter.com/_developit)提供）

```javascript
import h from 'jsxobj';

// 导入插件的例子
const CustomPlugin = config => ({
  ...config,
  name: 'custom-plugin'
});

const CONFIG = (
  <webpack target="web" watch>
    <entry path="src/index.js" />
    <resolve>
      <alias {...{
        react: 'preact-compat',
        'react-dom': 'preact-compat'
      }} />
    </resolve>
    <plugins>
      <uglify-js opts={{
        compression: true,
        mangle: false
      }} />
      <CustomPlugin foo="bar" />
    </plugins>
  </webpack>
);

document.body.textContent = JSON.stringify(CONFIG, 0, '  ');
```