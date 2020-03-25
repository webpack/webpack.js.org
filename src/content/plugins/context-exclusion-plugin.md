---
title: ContextExclusionPlugin
contributors:
  - jeffin
---

The `ContextExclusionPlugin` allows you to exclude some of the context. A regex could be provided to the plugin to configure it to exlude all context that matches it.

__webpack.config.js__

``` javascript
module.exports = {
	plugins: [
        new webpack.ContextExclusionPlugin(/dont/)
    ]
};

```
