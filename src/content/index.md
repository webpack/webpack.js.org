---
title: webpack
sort: -1
---

## Write Your Code

<div class="splash__wrap">
<div class="splash__left">

__src/index.js__

```js
import bar from './bar.js';

bar();
```

</div>
<div class="splash__right">

__src/bar.js__

```js
export default function bar() {
  //
}
```

</div>
</div>


## Bundle It

<div class="splash__wrap">
<div class="splash__left">

__[Without config](https://youtu.be/3Nv9muOkb6k?t=21293)__ or provide custom __webpack.config.js__

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};
```

</div>
<div class="splash__right">

__page.html__

```html
<!doctype html>
<html>
  <head>
    <meta charset='utf-8' />
    ...
  </head>
  <body>
    ...
    <script src="dist/bundle.js"></script>
  </body>
</html>
```

</div>
</div>

Then run `webpack` on the command-line to create `bundle.js`.

## Awesome isn't it? Let's dive in!

__[Get Started](/guides/getting-started)__ quickly in our __Guides__ section, or dig into the __[Concepts](/concepts)__ section for more high-level information on the core notions behind webpack.
