---
title: HashedModuleIdsPlugin
contributors:
  - shaodahong
---

该插件会根据模块的相对路径生成一个四位数的hash作为模块id, 建议用于生产环境。

``` js
new webpack.HashedModuleIdsPlugin({
  // 参数...
})
```


## 参数

该插件支持以下参数：

- `hashFunction`: 散列算法，默认为 'md5'。支持 Node.JS [`crypto.createHash`](https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm_options) 的所有功能。
- `hashDigest`: 在生成 hash 时使用的编码方式，默认为 'base64'。支持 Node.js [`hash.digest`](https://nodejs.org/api/crypto.html#crypto_hash_digest_encoding) 的所有编码。
- `hashDigestLength`: 散列摘要的前缀长度，默认为 4。


## 用法

下面是使用该插件的例子：

``` js
new webpack.HashedModuleIdsPlugin({
  hashFunction: 'sha256',
  hashDigest: 'hex',
  hashDigestLength: 20
})
```
