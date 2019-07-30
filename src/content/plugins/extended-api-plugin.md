---
title: ExtendedAPIPlugin
contributors:
  - shaodahong
---

The `ExtendedAPIPlugin` adds two free variables to the compilation, which adds the global hash to the [runtime](/concepts/manifest/#runtime).

- `__webpack_hash__`: The hash of chunk
- `__webpack_chunkname__`: The name of chunk

W> Don't combine `ExtendedAPIPlugin` with the [`HotModuleReplacementPlugin`](/plugins/hot-module-replacement-plugin) to avoid conflicts, they both add hashes to runtime.

W> Don't combine `ExtendedAPIPlugin` with the usage of `[chunkhash]` or `[contenthash]` in [output configuration](/configuration/output/#outputfilename). See this [pull request](https://github.com/webpack/webpack/pull/7987#pullrequestreview-153760830) for details.

## Usage

```javascript
new webpack.ExtendedAPIPlugin();
```
