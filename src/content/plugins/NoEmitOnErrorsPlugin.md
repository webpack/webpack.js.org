---
title: NoEmitOnErrorsPlugin
contributors:
  - jeffin
  - chenxsan
  - snitin315
---

The `NoEmitOnErrorsPlugin` allows you to avoid emitting assets when there are any errors. Enabled by default, you can disable using [`optimization.emitOnErrors`](/configuration/optimization/#optimizationemitonerrors)

__webpack.config.js__

``` javascript
module.exports = {
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ]
};

```
