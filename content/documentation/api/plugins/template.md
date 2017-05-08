---
title: Templates
sort: 8
---

## MainTemplate

### `startup(source, module, hash)`
```javascript
    compilation.mainTemplate.plugin('startup', function(source, module, hash) {
      if (!module.chunks.length && source.indexOf('__ReactStyle__') === -1) {
        var originName = module.origins && module.origins.length ? module.origins[0].name : 'main';
        return ['if (typeof window !== "undefined") {',
            '  window.__ReactStyle__ = ' + JSON.stringify(classNames[originName]) + ';',
            '}'
          ].join('\n') + source;
      }
      return source;
    });
```

## HotUpdateChunkTemplate

TODO

## ChunkTemplate

TODO

## ModuleTemplate

TODO

## FunctionModuleTemplate

TODO
