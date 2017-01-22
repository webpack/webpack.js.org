---
title: provide-plugin
contributors:
  - sokra
  - simon04
---

```javascript
new webpack.ProvidePlugin({identifier1: 'module1', /* ... */})
```

自动加载模块。 任何时候，当 `identifier` 被当作未赋值的变量时， `module` 就会自动被加载，并且 `identifier` 会被这个 `module` 输出的内容所赋值。

## 典型的例子

### 使用 jQuery

```javascript
new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery'
})
```

```javascript
// in a module
$('#item'); // <= 起作用
jQuery('#item'); // <= 起作用
// $ 自动被设置为 "jquery" 输出的内容
```

### 使用 jQuery 和 Angular 1

Angular 会寻找 `window.jQuery` 来决定 jQuery 是否存在, 查看 [源码](https://github.com/angular/angular.js/blob/v1.5.9/src/Angular.js#L1821-L1823)

```javascript
new webpack.ProvidePlugin({
  'window.jQuery': 'jquery'
})
```

***

> 原文：https://webpack.js.org/plugins/provide-plugin/