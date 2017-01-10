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

## 使用 webpack 打包[模块](/concepts/modules)
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

然后在命令行运行 `webpack` 就会创建 `bundle.js`.

## 让一切变得简单
## 立即[开始](/get-started)
