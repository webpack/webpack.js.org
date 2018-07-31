```jslinks
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
  // defaults to ./src
  // Here the application starts executing
  // and webpack starts bundling
  [output](/configuration/output): {
    // options related to how webpack emits results
    [path](/configuration/output#output-path): path.resolve(__dirname, "dist"), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    <details>
      <summary>
        [filename](/configuration/output#output-filename): "bundle.js", // string
      </summary>
      [filename](/configuration/output#output-filename): "[name].js", // for multiple entry points
      [filename](/configuration/output#output-filename): "[chunkhash].js", // for [long term caching](/guides/caching)
    </details>
  }
}
```
