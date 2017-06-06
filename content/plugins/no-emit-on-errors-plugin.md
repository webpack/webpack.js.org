---
title: NoEmitOnErrorsPlugin
contributors:
  - simon04
---

Use the `NoEmitOnErrorsPlugin` to skip the emitting phase whenever there are errors while compiling. This ensures that no assets are emitted that include errors. The `emitted` flag in the stats is `false` for all assets.

``` js
new webpack.NoEmitOnErrorsPlugin()
```

T> This supersedes the (now deprecated) webpack 1 plugin `NoErrorsPlugin`.

W> If you are using the [CLI](/api/cli/), the webpack process will not exit with an error code by enabling this plugin. If you want webpack to "fail" when using the CLI, please check out the [`bail` option](/api/cli/#advanced-options).
