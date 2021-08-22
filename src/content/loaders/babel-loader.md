---
title: babel-loader
source: https://raw.githubusercontent.com/babel/babel-loader/master/README.md
edit: https://github.com/babel/babel-loader/edit/master/README.md
repo: https://github.com/babel/babel-loader
translators:
  - flytam
  - QC-L
---




此 package 允许你使用 [Babel](https://github.com/babel/babel) 和 [webpack](https://github.com/webpack/webpack) 转译 `JavaScript` 文件。

**注意**：请在 Babel [Issues](https://github.com/babel/babel/issues) tracker 上报告输出时遇到的问题。

## 安装 $#install$

> webpack 4.x | babel-loader 8.x | babel 7.x

```bash
npm install -D babel-loader @babel/core @babel/preset-env webpack
```

## 用法 $#usage$

webpack 文档：[Loaders](/loaders/)

在 webpack 配置对象中，需要将 babel-loader 添加到 module 列表中，就像下面这样：

```javascript
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
```

### 选项 $#options$

查看 babel [选项](https://babeljs.io/docs/en/options)。

你可以使用 options 属性，来向 loader 传递 options [选项](/configuration/module/#ruleoptions--rulequery)：

```javascript
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-object-rest-spread']
        }
      }
    }
  ]
}
```

此 loader 也支持下面这些 loader 特有的选项：

* `cacheDirectory`：默认值为 `false`。当有设置时，指定的目录将用来缓存 loader 的执行结果。之后的 webpack 构建，将会尝试读取缓存，来避免在每次执行时，可能产生的、高性能消耗的 Babel 重新编译过程(recompilation process)。如果设置了一个空值 (`loader: 'babel-loader?cacheDirectory'`) 或者 `true` (`loader: 'babel-loader?cacheDirectory=true'`)，loader 将使用默认的缓存目录 `node_modules/.cache/babel-loader`，如果在任何根目录下都没有找到 `node_modules` 目录，将会降级回退到操作系统默认的临时文件目录。

* `cacheIdentifier`：默认是由 `@babel/core` 版本号，`babel-loader` 版本号，`.babelrc` 文件内容（存在的情况下），环境变量 `BABEL_ENV` 的值（没有时降级到 `NODE_ENV`）组成的一个字符串。可以设置为一个自定义的值，在 identifier 改变后，来强制缓存失效。

* `cacheCompression`：默认值为 `true`。当设置此值时，会使用 Gzip 压缩每个 Babel transform 输出。如果你想要退出缓存压缩，将它设置为 `false` -- 如果你的项目中有数千个文件需要压缩转译，那么设置此选项可能会从中收益。

* `customize`: 默认值为 `null`。导出 `custom` 回调函数的模块路径，[例如传入 `.custom()` 的 callback 函数](#自定义-loader)。由于你必须创建一个新文件才能使用它，建议改为使用 `.custom` 来创建一个包装 loader。只有在你_必须_继续直接使用 `babel-loader` 但又想自定义的情况下，才使用这项配置。

## 疑难解答 $#troubleshooting$

### babel-loader 很慢！ $#babel-loader-is-slow$

确保转译尽可能少的文件。你可能使用 `/\.m?js$/` 来匹配，这样也许会去转译 `node_modules` 目录或者其他不需要的源代码。

要排除 `node_modules`，参考文档中的 `loaders` 配置的 `exclude` 选项。

你也可以通过使用 `cacheDirectory` 选项，将 babel-loader 提速至少两倍。这会将转译的结果缓存到文件系统中。

### Babel 在每个文件都插入了辅助代码，使代码体积过大！ $#babel-is-injecting-helpers-into-each-file-and-bloating-my-code$

Babel 对一些公共方法使用了非常小的辅助代码，比如 `_extend`。默认情况下会被添加到每一个需要它的文件中。

你可以引入 Babel runtime 作为一个独立模块，来避免重复引入。

下面的配置禁用了 Babel 自动对每个文件的 runtime 注入，而是引入 `@babel/plugin-transform-runtime` 并且使所有辅助代码从这里引用。

更多信息请查看 [文档](https://babel.docschina.org/docs/en/babel-plugin-transform-runtime/)。

**注意**：你必须执行 `npm install -D @babel/plugin-transform-runtime` 来把它包含到你的项目中，然后使用 `npm install @babel/runtime` 把 `@babel/runtime` 安装为一个依赖。

```javascript
rules: [
  // 'transform-runtime' 插件告诉 Babel
  // 要引用 runtime 来代替注入。
  {
    test: /\.m?js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-transform-runtime']
      }
    }
  }
]
```

#### **注意**：transform-runtime 和自定义 polyfills (例如 Promise library) $#note-transform-runtime--custom-polyfills-eg-promise-library$

由于 [@babel/plugin-transform-runtime](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-runtime) 包含了一个 polyfill，含有自定义的 [regenerator-runtime](https://github.com/facebook/regenerator/blob/master/packages/regenerator-runtime/runtime.js) 和 [core-js](https://github.com/zloirock/core-js), 下面使用 `webpack.ProvidePlugin` 来配置 shimming 的常用方法将没有作用：

```javascript
// ...
        new webpack.ProvidePlugin({
            'Promise': 'bluebird'
        }),
// ...
```

下面这样的写法也没有作用：

```javascript
require('@babel/runtime/core-js/promise').default = require('bluebird');

var promise = new Promise;
```

它其实会生成下面这样 (使用了 `runtime` 后)：

```javascript
'use strict';

var _Promise = require('@babel/runtime/core-js/promise')['default'];

require('@babel/runtime/core-js/promise')['default'] = require('bluebird');

var promise = new _Promise();
```

前面的 `Promise` library 在被覆盖前已经被引用和使用了。

一种可行的办法是，在你的应用程序中加入一个“引导(bootstrap)”步骤，在应用程序开始前先覆盖默认的全局变量。

```javascript
// bootstrap.js

require('@babel/runtime/core-js/promise').default = require('bluebird');

// ...

require('./app');
```

### `babel` 的 Node.js API 已经被移到 `babel-core` 中。 $#the-nodejs-api-for-babel-has-been-moved-to-babel-core$

如果你收到这个信息，这说明你有一个已经安装的 `babel` npm package，并且在 webpack 配置中使用 loader 简写方式（在 webpack 2.x 版本中将不再支持这种方式）：
```javascript
  {
    test: /\.m?js$/,
    loader: 'babel',
  }
```

webpack 将尝试读取 `babel` package 而不是 `babel-loader`。

想要修复这个问题，你需要卸载 `babel` npm package，因为它在 Babel v6 中已经被废除。（安装 `@babel/cli` 或者 `@babel/core` 来替代它）
在另一种场景中，如果你的依赖于 `babel` 而无法删除它，可以在 webpack 配置中使用完整的 loader 名称来解决：
```javascript
  {
    test: /\.m?js$/,
    loader: 'babel-loader',
  }
```

### 排除不应参与转码的库 $#exclude-libraries-that-should-not-be-transpiled$

`core-js` 和 `webpack/buildin` 如果被 Babel 转码会发生错误。

你需要在 `babel-loader` 中排除它们：

```js
{
  "loader": "babel-loader",
  "options": {
    "exclude": [
      // \\ for Windows, \/ for Mac OS and Linux
      /node_modules[\\\/]core-js/,
      /node_modules[\\\/]webpack[\\\/]buildin/,
    ],
    "presets": [
      "@babel/preset-env"
    ]
  }
}
```

## 根据 webpack 部署目标(target)的自定义配置 $#customize-config-based-on-webpack-target$

Webpack 支持打包成多种 [部署目标](/concepts/targets/) 。例如，当需要为不同的部署目标（例如 `web` _和_ `node`）指定不同的 Babel 配置时， babel-loader 通过 Babel 的[caller](https://babeljs.io/docs/en/config-files#apicallercb) API 提供了 `target`属性。

例如，根据 webpack 的部署目标改变传给`@babel/preset-env`的 targets选项

```javascript
// babel.config.js

module.exports = api => {
  return {
    plugins: [
      "@babel/plugin-proposal-nullish-coalescing-operator",
      "@babel/plugin-proposal-optional-chaining"
    ],
    presets: [
      [
        "@babel/preset-env",
        {
          useBuiltIns: "entry",
          // caller.target 等于 webpack 配置的 target 选项
          targets: api.caller(caller => caller && caller.target === "node")
            ? { node: "current" }
            : { chrome: "58", ie: "11" }
        }
      ]
    ]
  }
}
```

## 自定义 loader $#customized-loader$

`babel-loader` 提供了一个 loader-builder 工具函数，
允许用户为 Babel 处理过的每个文件添加自定义处理选项

`.custom` 接收一个 callback 函数，
它将被调用，并传入 loader 中的 `babel` 实例，
因此，此工具函数才能够完全确保它使用与 loader 的 `@babel/core` 相同的实例。

如果你想自定义，但实际上某个文件又不想调用 `.custom`，
可以向 `customize` 选项传入一个字符串，
此字符串指向一个导出 `custom` 回调函数的文件。

### 示例 $#example$

```js
// 从 "./my-custom-loader.js" 中导出，或者任何你想要的文件中导出。
module.exports = require("babel-loader").custom(babel => {
  function myPlugin() {
    return {
      visitor: {},
    };
  }

  return {
    // 传给 loader 的选项。
    customOptions({ opt1, opt2, ...loader }) {
      return {
        // 获取 loader 可能会有的自定义选项
        custom: { opt1, opt2 },

        // 传入"移除了两个自定义选项"后的选项
        loader,
      };
    },

    // 提供 Babel 的 'PartialConfig' 对象
    config(cfg) {
      if (cfg.hasFilesystemConfig()) {
        // 使用正常的配置
        return cfg.options;
      }

      return {
        ...cfg.options,
        plugins: [
          ...(cfg.options.plugins || []),

          // 在选项中包含自定义 plugin
          myPlugin,
        ],
      };
    },

    result(result) {
      return {
        ...result,
        code: result.code + "\n// 自定义loader生成",
      };
    },
  };
});
```

```js
// 然后，在你的 webpack config 文件中
module.exports = {
  // ..
  module: {
    rules: [{
      // ...
      loader: path.join(__dirname, 'my-custom-loader.js'),
      // ...
    }]
  }
};
```

### `customOptions(options: Object): { custom: Object, loader: Object }` $#customoptionsoptions-object--custom-object-loader-object-$

指定的 loader 的选项，
从 `babel-loader` 选项中分离出自定义选项。


### `config(cfg: PartialConfig): Object` $#configcfg-partialconfig-object$

指定的 Babel 的 `PartialConfig` 对象，
返回应该被传递给 `babel.transform` 的 `option` 对象。


### `result(result: Result): Result` $#resultresult-result-result$

指定的 Babel 结果对象，允许 loaders 对它进行额外的调整。


## License $#license$
[MIT](https://couto.mit-license.org/)
