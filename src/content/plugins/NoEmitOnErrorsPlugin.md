---
title: NoEmitOnErrorsPlugin
contributors:
  - jeffin
---

The `NoEmitOnErrorsPlugin` allows you to avoid emiting when there are any errors. Enabled by deafult, you can disable using `optimization.noEmitOnErrors`(/configuration/optimization/#optimizationnoemitonerrors)

__webpack.config.js__

``` javascript
module.exports = {
	plugins: [
        new webpack.NoEmitOnErrorsPlugin()
    ]
};

```
