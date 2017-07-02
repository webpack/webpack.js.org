---
title: Hot Module Replacement
contributors:
  - sokra
  - skipjack
related:
  - title: Concepts - Hot Module Replacement
    url: /concepts/hot-module-replacement
  - title: Guides - Hot Module Replacement
    url: /guides/hot-module-replacement
---

If [Hot Module Replacement](/concepts/hot-module-replacement) has been enabled via the [`HotModuleReplacementPlugin`](/plugins/hot-module-replacement-plugin), it's interface will be exposed under the [`module.hot` property](/api/module-variables#module-hot-webpack-specific-). Typically, users will check to see if the interface is accessible, then begin working with it. As an example, here's how you might `accept` an updated module:

``` js
if (module.hot) {
  module.hot.accept('./library.js', function() {
    // Do something with the updated library module...
  })
}
```

The following methods are supported...


### `accept`

Accept updates for the given `dependencies` and fire a `callback` to react to those updates.

``` js
module.hot.accept(
  dependencies, // Either a string or an array of strings
  callback // Function to fire when the dependencies are updated
)
```


### `decline`

Reject updates for the given `dependencies` forcing the update to fail with a `'decline'` code.

``` js
module.hot.decline(
  dependencies // Either a string or an array of strings
)
```


### `dispose` (or `addDisposeHandler`)

Add a handler which is executed when the current module code is replaced. This should be used to destroy any persistent resource you have claimed or created. If you want to transfer state to the updated module, add it to given `data` parameter. This object will be available at `module.hot.data` after the update.

``` js
module.hot.dispose(data => {
  // Clean up and pass data to the updated module...
})
```


### `removeDisposeHandler`

Remove the callback added via `dispose` or `addDisposeHandler`.

``` js
module.hot.removeDisposeHandler(callback)
```


### `status`

Retrieve the current status of the hot module replacement process.

``` js
module.hot.status() // Will return one of the following strings...
```

| Status      | Description                                                                            |
| ----------- | -------------------------------------------------------------------------------------- |
| idle        | The process is waiting for a call to `check` (see below)                               |
| check       | The process is checking for updates                                                    |
| watch       | The process is in watch mode and will be automatically notified about changes          |
| watch-delay | Delaying for a specified time after the initial change to allow for any other updates  |
| prepare     | The process is getting ready for the update (e.g. downloading the updated module)      |
| ready       | The update is prepared and available                                                   |
| dispose     | The process is calling the `dispose` handlers on the modules that will be replaced     |
| apply       | The process is calling the `accept` handlers and re-executing self-accepted modules    |
| abort       | An update was aborted, but the system is still in it's previous state                  |
| fail        | An update has thrown an exception and the system's state has been compromised          |


### `check`

Test all loaded modules for updates and, if updates exist, `apply` them.

``` js
module.hot.check(autoApply, (error, outdatedModules) => {
  // Catch errors and outdated modules...
})
```

The `autoApply` parameter can either be a boolean or `options` to pass to the `apply` method when called.


### `apply`

Continue the update process (as long as `module.hot.status() === 'ready').

``` js
module.hot.apply(options, (error, outdatedModules) => {
  // Catch errors and outdated modules...
})
```

The optional `options` object can include the following properties:

- `ignoreUnaccepted` (boolean): Continue the update process even if some modules are not accepted.


### `addStatusHandler`

Register a function to listen for changes in `status`.

``` js
module.hot.addStatusHandler(status => {
  // React to the current status...
})
```


### `removeStatusHandler`

Remove a registered status handler.

``` js
module.hot.removeStatusHandler(callback)
```
