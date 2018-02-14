---
title: ProfilingPlugin
contributors:
  - EugeneHlushko
---

Generate Chrome profile file which includes timings of plugins execution. Outputs `events.json` file by default. It is possible to provide custom file path using `outputPath` option.

## Options

- `outputPath`: A relative path to a custom output file (json)

## Usage: default

``` js
module.exports = {
  // ...
  plugins: [
    new webpack.debug.ProfilingPlugin()
  ]
}
```

## Usage: custom `outputPath`

``` js
module.exports = {
  // ..
  plugins: [
    new webpack.debug.ProfilingPlugin({
      outputPath: "profiling/profileEvents.json"
    })
  ]
}
```

In order to view the profile file:

- run webpack with `ProfilingPlugin`
- go to Chrome, open the `Profile Tab`
- can drag and drop generated file (`events.json` by default) into the profiler. It will then display timeline stats and calls per plugin!
