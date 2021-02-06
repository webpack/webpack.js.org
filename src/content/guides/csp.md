---
title: Content Security Policies
sort: 10
contributors:
  - EugeneHlushko
  - probablyup
  - wizardofhogwarts
related:
  - title: Nonce purpose explained
    url: https://stackoverflow.com/questions/42922784/what-s-the-purpose-of-the-html-nonce-attribute-for-script-and-style-elements
  - title: On the Insecurity of Whitelists and the Future of Content Security Policy
    url: https://ai.google/research/pubs/pub45542
  - title: Locking Down Your Website Scripts with CSP, Hashes, Nonces and Report URI
    url: https://www.troyhunt.com/locking-down-your-website-scripts-with-csp-hashes-nonces-and-report-uri/
  - title: CSP on MDN
    url: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
---

webpack is capable of adding `nonce` to all scripts that it loads. To activate the feature set a `__webpack_nonce__` variable needs to be included in your entry script. A unique hash based nonce should be generated and provided for each unique page view this is why `__webpack_nonce__` is specified in the entry file and not in the configuration. Please note that `nonce` should always be a base64-encoded string.

## Examples

In the entry file:

```js
// ...
__webpack_nonce__ = 'c29tZSBjb29sIHN0cmluZyB3aWxsIHBvcCB1cCAxMjM=';
// ...
```

## Enabling CSP

Please note that CSPs are not enabled by default. A corresponding header `Content-Security-Policy` or meta tag `<meta http-equiv="Content-Security-Policy" ...>` needs to be sent with the document to instruct the browser to enable the CSP. Here's an example of what a CSP header including a CDN white-listed URL might look like:

```html
Content-Security-Policy: default-src 'self'; script-src 'self'
https://trusted.cdn.com;
```

For more information on CSP and `nonce` attribute, please refer to **Further Reading** section at the bottom of this page.
