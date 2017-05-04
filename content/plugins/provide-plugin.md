---
title: ProvidePlugin
contributors:
  - sokra
  - simon04
  - re-fort
---

```javascript
new webpack.ProvidePlugin({identifier1: 'module1', /* ... */})
// 或
new webpack.ProvidePlugin({identifier1: ['module1', 'property1'], /* ... */})
```

自动加载模块。任何时候，当 `identifier` 被当作未赋值的变量时，`module` 就会自动被加载，并且 `identifier` 会被这个 `module` 输出的内容所赋值。（模块的 `property` 用于支持命名导出(named export)）

W> 对于 ES2015 模块的 default export，你必须指定模块的 default 属性。

## 典型用例

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

Angular 会寻找 `window.jQuery` 来决定 jQuery 是否存在, 查看[源码](https://github.com/angular/angular.js/blob/v1.5.9/src/Angular.js#L1821-L1823)

```javascript
new webpack.ProvidePlugin({
  'window.jQuery': 'jquery'
})
```

### 使用 Lodash 中的 map

```javascript
new webpack.ProvidePlugin({
  _map: ['lodash', 'map']
})
```

### 使用 Vue.js

```javascript
new webpack.ProvidePlugin({
  Vue: ['vue/dist/vue.esm.js', 'default']
})
```

***

> 原文：https://webpack.js.org/plugins/provide-plugin/