---
title: Configuration
---

You may have noticed that few webpack configurations look exactly alike. This is because **webpack's configuration file is a JavaScript file that exports an object.** This object, is then parsed by webpack based upon its defined properties.

## Examples
The following examples below describe how webpacks configuration object can be both expressive and configurable because _it is code_: 

### The simplest of examples
**webpack.config.js**
```javascript 
module.exports = {
  entry: './foo.js',
  output: {
    path: 'dist',
    filename: 'foo.bundle.js'
  }
}

```

### Generating multiple targets and configs and exporting the entire array.
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

### Using TypeScript to create a class which the angular-cli uses to [generate configs](https://github.com/angular/angular-cli/blob/master/addon/ng2/models/webpack-config.ts)
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

### Using JSX (React JS Markup) and Babel to create a JSON Configuration that webpack can understand. (Courtesy of [Jason Miller](https://twitter.com/_developit))

```javascript
import h from 'jsxobj';

/** @jsx h */
function h(name, attrs, ...children) {
  let obj = { name, ...attrs };
  if (typeof name==='function') obj = name(obj);
  [].concat(...children).forEach( child => {
    let { name } = child;
    if (name) {
      obj[name] = child;
      delete child.name;
    }
    else obj.value = child;
  });
  return obj;
}

// example of an import'd plugin
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