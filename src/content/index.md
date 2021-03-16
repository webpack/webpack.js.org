---
title: webpack
sort: -1
---

## Write Your Code

<div class="splash__wrap">
<div class="splash__left">

**src/index.js**

```js
import bar from './bar.js';

bar();
```

</div>
<div class="splash__right">

**src/bar.js**

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

**[Without config](https://youtu.be/3Nv9muOkb6k?t=21293)** or provide custom **webpack.config.js**

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
```

</div>
<div class="splash__right">

**page.html**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
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

**[Get Started](/guides/getting-started)** quickly in our **Guides** section, or dig into the **[Concepts](/concepts)** section for more high-level information on the core notions behind webpack.
