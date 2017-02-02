---
title: ProvidePlugin
contributors:
  - sokra
  - simon04
---

```javascript
new webpack.ProvidePlugin({identifier1: 'module1', /* ... */})
```

Automatically loads modules. Whenever the `identifier` is encountered as free variable in a module, the `module` is loaded automatically and the `identifier` is filled with the exports of the loaded `module`.

## Typical use-cases

### Use jQuery

```javascript
new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery'
})
```

```javascript
// in a module
$('#item'); // <= just works
jQuery('#item'); // <= just works
// $ is automatically set to the exports of module "jquery"
```

### Use jQuery with Angular 1

Angular looks for `window.jQuery` in order to determine whether jQuery is present, see the [source code](https://github.com/angular/angular.js/blob/v1.5.9/src/Angular.js#L1821-L1823)

```javascript
new webpack.ProvidePlugin({
  'window.jQuery': 'jquery'
})
```
