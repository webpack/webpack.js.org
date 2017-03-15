---
title: webpack
---
## 编写代码

<div class="homepage__wrap">
<div class="homepage__left">

**app.js**

```js
import bar from './bar';

bar();
```

</div><div class="homepage__right">

**bar.js**

```js
export default function bar() {
  //
}
```

</div>
</div>

## 使用 webpack 打包

<div class="homepage__wrap">
<div class="homepage__left">

**webpack.config.js**

```js
module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  }
}
```

</div><div class="homepage__right">

**page.html**

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

然后在命令行运行 `webpack` 就会创建 `bundle.js`.

</div>
</div>

## 让一切变得简单
## 立即[开始](/guides/get-started)
