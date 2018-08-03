```js-with-links-with-details

const path = require('path');

module.exports = {
  <details>
    <summary>
      [mode](/concepts/mode): "production", // "production" | "development" | "none"
    </summary>
    [mode](/concepts/mode): "production", // enable many optimizations for production builds
    [mode](/concepts/mode): "development", // enabled useful tools for development
    [mode](/concepts/mode): "none", // no defaults
  </details>
  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  <details>
    <summary>
      [entry](/configuration/entry-context#entry): "./app/entry", // string | object | array
    </summary>
    [entry](/configuration/entry-context#entry): ["./app/entry1", "./app/entry2"],
    [entry](/configuration/entry-context#entry): {
      a: "./app/entry-a",
      b: ["./app/entry-b1", "./app/entry-b2"]
    },
  </details>
  <details>
    <summary>
      /* Advanced configuration (click to show) */
    </summary>
    [resolveLoader](/configuration/resolve#resolveloader): { /* same as resolve */ }
    // separate resolve options for loaders
    [parallelism](other-options#parallelism): 1, // number
    // limit the number of parallel processed modules
    [profile](other-options#profile): true, // boolean
    // capture timing information
    [bail](other-options#bail): true, //boolean
    // fail out on the first error instead of tolerating it.
    [cache](other-options#cache): false, // boolean
    // disable/enable caching
    [watch](watch#watch): true, // boolean
    // enables watching
    [watchOptions](watch#watchoptions): {
      [aggregateTimeout](watch#watchoptions-aggregatetimeout): 1000, // in ms
      // aggregates multiple changes to a single rebuild
      [poll](watch#watchoptions-poll): true,
      [poll](watch#watchoptions-poll): 500, // intervall in ms
      // enables polling mode for watching
      // must be used on filesystems that doesn't notify on change
      // i. e. nfs shares
    },
    [node](node): {
      // Polyfills and mocks to run Node.js-
      // environment code in non-Node environments.
      [console](node#node-console): false, // boolean | "mock"
      [global](node#node-global): true, // boolean | "mock"
      [process](node#node-process): true, // boolean
      [__filename](node#node-__filename): "mock", // boolean | "mock"
      [__dirname](node#node-__dirname): "mock", // boolean | "mock"
      [Buffer](node#node-buffer): true, // boolean | "mock"
      [setImmediate](node#node-setimmediate): true // boolean | "mock" | "empty"
    },
    [recordsPath](other-options#recordspath): path.resolve(__dirname, "build/records.json"),
    [recordsInputPath](other-options#recordsinputpath): path.resolve(__dirname, "build/records.json"),
    [recordsOutputPath](other-options#recordsoutputpath): path.resolve(__dirname, "build/records.json"),
    // TODO
  </details>
}
```
