---
title: ContextExclusionPlugin
contributors:
  - jeffin
---

_Context_ refers to a [require with an expression](/guides/dependency-management/#require-with-expression) such as `require('./locale/' + name + '.json')`.

The `ContextExclusionPlugin` allows you to exclude context. A regex could be provided to plugin to configure it to exclude all context that matches it.

__webpack.config.js__

``` javascript
module.exports = {
	plugins: [
        new webpack.ContextExclusionPlugin(/dont/)
    ]
};

```
