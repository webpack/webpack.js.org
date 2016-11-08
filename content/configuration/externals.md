---
title: 外部扩展(external)
contributors:
  - sokra
  - skipjack
  - dear-lizhihua
---

?> Description

## `externals`

`string` `regex` `function` `array` `object`

**防止打包**某些 `import` 的包(package)，而是*在运行时再去获取这些外部扩展包(package)*。例如，从 CDN 引入 [jQuery](https://jquery.com/)，而不是把它打包在源文件中：

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

这样就脱离了那些不需要改动的独立模块，换句话，下面展示的代码还可以正常运行：

```js
import $ from 'jquery';

$('.my-element').animate(...);
```

?> TODO: Add more details on the various ways of doing this using an `object`, `function`, etc. Also add how this is connected to [`output.libraryTarget`](/configuration/output#output-librarytarget) and maybe how it's useful when building libraries if this isn't already evident.
