---
title: webpack
---
## Write your code.

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

## Bundle with webpack.

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

## It's that simple.
## [Get Started](/get-started)
