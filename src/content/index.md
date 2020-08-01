---
title: webpack
sort: -1
---

## 编写代码 {#write-your-code}

<div class="splash__wrap">
<div class="splash__left">

__src/index.js__

```js
import bar from './bar';

bar();
```

</div>
<div class="splash__right">

__src/bar.js__

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

__[不使用配置](https://youtu.be/3Nv9muOkb6k?t=21293)__ 或提供自定义的 __webpack.config.js__

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};
```

</div>
<div class="splash__right">

__page.html__

```html
<!doctype html>
<html>
  <head>
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

**[快速开始](/guides/getting-started)**部分在**指南**章节，如果有兴趣深入学习，可以查阅**[概念](/concepts)**章节，以了解 webpack 的核心概念以及底层实现。
