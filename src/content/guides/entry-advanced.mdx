---
title: entry 高级用法
sort: 25
contributors:
  - EugeneHlushko
translators:
  - QC-L
  - dear-lizhihua
---

## 每个入口使用多种文件类型 {#multiple-file-types-per-entry}

在不使用 `import` 样式文件的应用程序中（预单页应用程序或其他原因），使用一个值数组结构的 [entry](/configuration/entry-context/#entry)，并且在其中传入不同类型的文件，可以实现将 CSS 和 JavaScript（和其他）文件分离在不同的 bundle。

举个例子。我们有一个具有两种页面类型的 PHP 应用程序：home(首页) 和 account(帐户)。home 与应用程序其余部分（account 页面）具有不同的布局和不可共享的 JavaScript。我们想要从应用程序文件中输出 home 页面的 `home.js` 和 `home.css`，为 account 页面输出 `account.js` 和 `account.css`。

**home.js**

```javascript
console.log('home page type');
```

**home.scss**

```scss
// home page individual styles
```

**account.js**

```javascript
console.log('account page type');
```

**account.scss**

```scss
// account page individual styles
```

我们将在 `production(生产)` 模式中使用 [`MiniCssExtractPlugin`](/plugins/mini-css-extract-plugin/) 作为 CSS 的一个最佳实践。

**webpack.config.js**

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    home: ['./home.js', './home.scss'],
    account: ['./account.js', './account.scss'],
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // fallback to style-loader in development
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
```

由于我们未指定其他输出路径，因此使用以上配置运行 webpack 将输出到 `./dist`。`./dist` 目录下现在包含四个文件：

- home.js
- home.css
- account.js
- account.css
