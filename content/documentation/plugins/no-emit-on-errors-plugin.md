---
title: NoEmitOnErrorsPlugin
contributors:
  - simon04
---

```javascript
new webpack.NoEmitOnErrorsPlugin()
```

Use the `NoEmitOnErrorsPlugin` to skip the emitting phase whenever there are errors while compiling. This ensures that no assets are emitted that include errors. The `emitted` flag in the stats is `false` for all assets.

If you are using the [CLI](/documentation/api/cli/), the webpack process will not exit with an error code by enabling this plugin. If you want webpack to "fail" when using the CLI, please check out the [`bail` option](/documentation/api/cli/#advanced-options).

Note: This supersedes the (now deprecated) webpack 1 plugin `NoErrorsPlugin`.
