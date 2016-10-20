---
title: 扩展
contributors:
  - sokra
  - skipjack
---

?> Description

## `externals`

`string` `regex` `function` `array` `object`

**Prevent bundling** of certain `import`ed packages and instead retrieve these *external packages at runtime*. For example, to include [jQuery](https://jquery.com/) from a CDN instead of bundling it:

**index.html**

```html
...
<script src="https://code.jquery.com/jquery-3.1.0.js"
  integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk="
  crossorigin="anonymous"></script>
...
```

**webpack.config.js**

```js
externals: {
  jquery: 'jQuery'
}
```

This leaves any dependant modules unchanged, i.e. the code shown below will still work:

```js
import $ from 'jquery';

$('.my-element').animate(...);
```

?> TODO: Add more details on the various ways of doing this using an `object`, `function`, etc. Also add how this is connected to [`output.libraryTarget`](/configuration/output#output-librarytarget) and maybe how it's useful when building libraries if this isn't already evident.
