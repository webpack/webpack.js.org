---
title: webpack
---

## Write your code

<div class="splash__wrap">
<div class="splash__left">
__app.js__

```js
import bar from './bar';

bar();
```
</div>
<div class="splash__right">
__bar.js__

```js
export default function bar() {
  //
}
```
</div>
</div>


## Bundle with webpack

<div class="splash__wrap">
<div class="splash__left">
__webpack.config.js__

```js
module.exports = {
  entry: './app.js',
  output: {
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
    ...
  </head>
  <body>
    ...
    <script src="bundle.js"></script>
  </body>
</html>
```
</div>

Then run `webpack` on the command-line to create `bundle.js`.

## It's that simple

__[Get Started](/guides/getting-started)__ quickly in our __Guides__ section, or dig into the __[Concepts](/concepts)__ section for more high-level information on the core notions behind webpack.

</div>

