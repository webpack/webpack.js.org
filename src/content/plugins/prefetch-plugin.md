---
title: PrefetchPlugin
group: webpack
contributors:
  - skipjack
  - byzyk
---

Prefetch normal module requests, causing them to be resolved and built before the first `import` or `require` of that module occurs. Using this plugin can boost performance. Try to profile the build first to determine clever prefetching points.

```javascript
new webpack.PrefetchPlugin([context], request);
```

## Options

- `context`: An absolute path to a directory
- `request`: A request string for a normal module
