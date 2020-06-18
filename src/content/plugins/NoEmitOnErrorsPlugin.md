---
title: NoEmitOnErrorsPlugin
contributors:
  - jeffin
---

The `NoEmitOnErrorsPlugin` allows you to avoid emitting assets when there are any errors. Enabled by default, you can disable using `optimization.noEmitOnErrors`(/configuration/optimization/#optimizationnoemitonerrors)

__webpack.config.js__

``` javascript
module.exports = {
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ]
};

```
