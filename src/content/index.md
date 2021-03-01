---
title: webpack
sort: -1
---

## 编写代码 {#write-your-code}

<div class="splash__wrap">
<div class="splash__left">

**src/index.js**

```js
import bar from './bar.js';

bar();
```

</div>
<div class="splash__right">

**src/bar.js**

```js
export default function bar() {
  //
}
```

</div>
</div>

## 构建 {#bundle-it}

<div class="splash__wrap">
<div class="splash__left">

**[不使用配置](https://youtu.be/3Nv9muOkb6k?t=21293)** 或提供自定义的 **webpack.config.js**

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
```

</div>
<div class="splash__right">

**page.html**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    ...
  </head>
  <body>
    ...
    <script src="dist/bundle.js"></script>
  </body>
</html>
```

</div>
</div>

在控制台运行 `webpack` 命令，生成 `bundle.js`。

## 深入学习 {#awesome-isnt-it-lets-dive-in}

**[快速开始](/guides/getting-started)**部分在**指南**章节，如果有兴趣深入学习，可以查阅 **[概念](/concepts)** 章节，以了解 webpack 的核心概念以及底层实现。
