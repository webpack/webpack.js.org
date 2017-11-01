---
title: webpack
---

## 编写代码

<div class="splash__wrap">
<div class="splash__left">
__app.js__

```js
import bar from './bar';

bar();
```
</div>
<div class="splash__right">
__bar.js__

```js
export default function bar() {
  //
}
```
</div>
</div>


## 使用 webpack 打包

<div class="splash__wrap">
<div class="splash__left">
__webpack.config.js__

```js
module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  }
};
```
</div>
<div class="splash__right">
__page.html__

```html
<html>
  <head>
    ...
  </head>
  <body>
    ...
    <script src="bundle.js"></script>
  </body>
</html>
```
</div>

然后在命令行运行 `webpack` 就会创建 `bundle.js`。

## 让一切变得简单

__[立即开始](/guides/getting-started)__更多关于 webpack 核心概念的高级信息，请通过快速查阅__指南__部分，或深入__[概念](/concepts)__部分来了解。

</div>

