---
title: 内容安全策略
sort: 10
contributors:
  - EugeneHlushko
  - probablyup
  - wizardofhogwarts
related:
  - title: 解释 nonce 设计目的
    url: https://stackoverflow.com/questions/42922784/what-s-the-purpose-of-the-html-nonce-attribute-for-script-and-style-elements
  - title: 白名单的不安全性和内容安全政策的未来
    url: https://ai.google/research/pubs/pub45542
  - title: 使用 CSP, Hash, Nonce 和 Report URI 锁定你的网站脚本
    url: https://www.troyhunt.com/locking-down-your-website-scripts-with-csp-hashes-nonces-and-report-uri/
  - title: MDN 的 CSP 文档
    url: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
---

webpack 能够为其加载的所有脚本添加 `nonce`。要启用此功能，需要在引入的入口脚本中设置一个 `__webpack_nonce__` 变量。应该为每个唯一的页面视图生成和提供一个唯一的基于 hash 的 nonce，这就是为什么 `__webpack_nonce__` 要在入口文件中指定，而不是在配置中指定的原因。注意，`nonce` 应该是一个 base64 编码的字符串。

<<<<<<< HEAD

## 示例 {#examples}
=======
## Examples
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

在 entry 文件中：

```js
// ...
__webpack_nonce__ = 'c29tZSBjb29sIHN0cmluZyB3aWxsIHBvcCB1cCAxMjM=';
// ...
```

<<<<<<< HEAD

## 启用 CSP {#enabling-csp}
=======
## Enabling CSP
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

注意，默认情况下不启用 CSP。需要与文档(document)一起发送相应的 `CSP` header 或 meta 标签 `<meta http-equiv="Content-Security-Policy" ...>`，以告知浏览器启用 CSP。以下是一个包含 CDN 白名单 URL 的 CSP header 的示例：

```html
Content-Security-Policy: default-src 'self'; script-src 'self'
https://trusted.cdn.com;
```

<<<<<<< HEAD
有关 CSP 和 `nonce` 属性的更多信息，请查看页面底部的__延伸阅读__部分。
=======
For more information on CSP and `nonce` attribute, please refer to **Further Reading** section at the bottom of this page.
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5
