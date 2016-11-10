## 编写代码

**app.js**

```js
import bar from './foo';

bar():
```

**foo.js**

```js
export function bar() {
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

## 很简单
## 即刻[起步](/get-started)
