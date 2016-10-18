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

## Bundle your [modules](/concepts/modules) with webpack.

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

## It's really that simple. [Get started](/get-started) now!
