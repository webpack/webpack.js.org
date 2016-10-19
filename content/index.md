**index.js**

```js
const foo = require('./foo.js')

foo.bar()
```

**foo.js**

```js
module.exports = {
  bar: function () {
    //
  }
}
```

## 用 webpack 打包[模块](/concepts/modules)。
**webpack.config.js**

```js
module.exports = {
  entry: './index.js',
  output: {
    path: 'bundle.js'
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
    <script src="/bundle.js"></script>
  </body>
</html>
```

## 很简单。 即刻[起步](/get-started)！
