---
title: Public Path
sort: 24
contributors:
  - rafaelrinaldi
  - chrisVillanueva
  - gonzoyumo
---

webpack 提供一个非常有用的配置，该配置能帮助你为项目中的所有资源指定一个基础路径。它被称为`公共路径(publicPath)`。

## 示例

这里提供一些示例，在实际应用中，这些示例的特性在实现的同时，还能保持高度整洁。

### 在构建项目时设置路径值

在开发模式中，我们通常有一个`assets/`文件夹，它往往存放在和首页一个级别的目录下。这样是挺方便；
但是如果在生产环境下，你想把这些静态文件统一使用CDN加载，那该怎么办？

想要解决这个问题，你可以使用有着悠久历史的环境变量。比如说，我们设置了一个名为`ASSET_PATH`
的变量：

```js
import webpack from 'webpack';

// 如果预先定义过环境变量，就将其赋值给`ASSET_PATH`变量，否则赋值为根目录
const ASSET_PATH = process.env.ASSET_PATH || '/';

export default {
  output: {
    publicPath: ASSET_PATH
  },

  plugins: [
    //该插件帮助我们安心地使用环境变量
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
    })
  ]
};
```

### 即时设定路径值

另一个可能出现的情况是，我们需要即时设置公共路径。webpack 提供一个全局变量供你设置，它名叫
`__webpack_public_path__`。所以在你的项目入口，你可以简单地设置如下：

```js
__webpack_public_path__ = process.env.ASSET_PATH;
```

一切设置完成。因为我们已经在我们的配置项中使用了`DefinePlugin`，`process.env.ASSET_PATH`
就已经被定义了，所以让我们能够安心地使用它了。

**警告：**请注意，如果您在入口文件中使用 ES6 模块导入，则在导入后对 `__webpack_public_path__` 进行赋值。在这种情况下，您必须将公共路径(public path)赋值移至自己的专属模块，然后将其导入到您的 entry.js 之上：

```js
// entry.js
import './public-path';
import './app';
```

***

> 原文：https://webpack.js.org/guides/public-path/
