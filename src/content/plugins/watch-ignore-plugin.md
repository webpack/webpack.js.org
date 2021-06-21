---
title: WatchIgnorePlugin
group: webpack
contributors:
  - skipjack
  - byzyk
  - EugeneHlushko
---

Ignore the specified files, i.e. those matching the provided paths or regular expressions, while in [watch mode](/configuration/watch).

```javascript
new webpack.WatchIgnorePlugin({ paths });
```

## Options

- `paths` (`Array<string | RegExp>`): A list of RegExps or absolute paths to directories or files that should be ignored.
