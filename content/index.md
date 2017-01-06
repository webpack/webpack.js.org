---
title: webpack
---
## 编写代码

**app.js**

```js
import bar from './bar';

bar();
```

**bar.js**

```js
export default function bar() {
  //
}
```

## 用 webpack 打包[模块]
**webpack.config.js**

```js
module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  }
}
```

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

## 很简单
## 即刻[起步](/get-started)
