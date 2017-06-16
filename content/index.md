---
title: webpack
---
## 編寫程式碼

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

## 使用 Webpack 包裝

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

Then run `webpack` on the command-line to create `bundle.js`.

</div>
</div>

## 這就是這麼簡單
## [開始使用](/guides/get-started)
