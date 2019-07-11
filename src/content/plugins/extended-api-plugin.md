---
title: ExtendedAPIPlugin
contributors:
  - shaodahong
---

The `ExtendedAPIPlugin` adds two free vars to the bundle

- `__webpack_hash__` The hash of chunk
- `__webpack_chunkname__` The name of chunk

W> Don't combine it with the HotModuleReplacementPlugin. Because HotModuleReplacementPlugin do same thing.

W> Don't combine it with the `[chunkhash]` or `[contenthash]`. See this [PR](https://github.com/webpack/webpack/pull/7987#pullrequestreview-153760830).

## Usage

```javascript
new webpack.ExtendedAPIPlugin();
```
