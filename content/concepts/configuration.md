---
title: Configuration
sort: 6
contributors:
- TheLarkInn
---

You may have noticed that few webpack configurations look exactly alike. This is because **webpack's configuration file is a JavaScript file that exports an object.** This object is then processed by webpack based upon its defined properties.

Because it's a standard Node.js CommonJS module, you **can do the following**:

* import other files via `require(...)`
* use utilities on npm via `require(...)`
* use JavaScript control flow expressions i. e. the `?:` operator
* use constants or variables for often used values
* write and execute functions to generate a part of the configuration

Use these features when appropriate.

**You should NOT use the following things**. Technically you could use them, but it's **not recommended**:

* Access CLI arguments, when using the webpack CLI (instead write your own CLI, or use `--env`)
* Export non-deterministic values (calling webpack twice should result in the same output files)
* Write long configurations (instead split the configuration into multiple files)

The following examples below describe how webpack's configuration object can be both expressive and configurable because _it is code_:

## The Simplest Configuration

**webpack.config.js**

```javascript
var path = require('path');

module.exports = {
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js'
  }
};
```

## Multiple Targets

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
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
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
      path: path.resolve(__dirname, 'dist/' + target),
      filename: '[name].' + target + '.js'
    }
  });
  return base;
});

module.exports = targets;
```

T> The most important part to take away from this document is that there are many different ways to format and style your webpack configuration. The key is to stick with something consistent that you and your team can understand and maintain.

## Using TypeScript

In the example below we use TypeScript to create a class which the angular-cli uses to [generate configs](https://github.com/angular/angular-cli/).

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
  // TODO: When webpack2 types are finished let's replace all these any types
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

## Using JSX

In the example below JSX (React JavaScript Markup) and Babel are used to create a JSON Configuration that webpack can understand. (Courtesy of [Jason Miller](https://twitter.com/_developit))

```javascript
import h from 'jsxobj';

// example of an imported plugin
const CustomPlugin = config => ({
  ...config,
  name: 'custom-plugin'
});

export default (
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
```
