---
title: Content Security Policy
sort: 17
contributors:
  - EugeneHlushko
related:
  - title: Nonce purpose explained
    url: https://stackoverflow.com/questions/42922784/what-s-the-purpose-of-the-html-nonce-attribute-for-script-and-style-elements
  - title: On the Insecurity of Whitelists and the Future of Content Security Policy
    url: https://research.google.com/pubs/pub45542.html
---

Webpack is capable of adding `nonce` to all scripts that it loads.
To activate the feature set a `__webpack_nonce__` variable in your entry script. A unique hash based nonce should be generated and provided for each unique page view this is why `__webpack_nonce__` is specified in the entry file and not in the configuration.

Example:

```javascript
import React from 'react';
// ...
__webpack_nonce__ = 'GSJADfsabfsafYFJSA123617';
// ...
```