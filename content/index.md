---
title: webpack
---
## Write your code.

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

## Bundle with webpack.

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

## It's that simple.
## [Get Started](/guides/get-started)
