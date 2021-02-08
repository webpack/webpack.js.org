---
title: PrefetchPlugin
contributors:
  - skipjack
  - byzyk
---

Prefetch normal module requests, causing them to be resolved and built before the first `import` or `require` of that module occurs. Using this plugin can boost performance. Try to profile the build first to determine clever prefetching points.

```javascript
new webpack.PrefetchPlugin([context], request);
```

<<<<<<< HEAD

## Options {#options}
=======
## Options
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

- `context`: An absolute path to a directory
- `request`: A request string for a normal module
