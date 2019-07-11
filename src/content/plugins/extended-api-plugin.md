---
title: ExtendedAPIPlugin
contributors:
  - shaodahong
---

The `ExtendedAPIPlugin` adds two free vars to the bundle

- `__webpack_hash__` The hash of chunk
- `__webpack_chunkname__` The name of chunk

> WARNING: Don't combine it with the HotModuleReplacementPlugin. Because HotModuleReplacementPlugin do same thing.

## Usage

```javascript
new webpack.ExtendedAPIPlugin();
```
