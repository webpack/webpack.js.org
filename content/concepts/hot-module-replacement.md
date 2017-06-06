---
title: Hot Module Replacement
sort: 11
contributors:
  - SpaceK33z
  - sokra
  - GRardB
  - rouzbeh84
  - skipjack
---

Hot Module Replacement (HMR) exchanges, adds, or removes [modules](/concepts/modules/) while an application is running, without a full reload. This can speed up significantly speed up development in a few ways:

- Retain application state which is lost during a full reload.
- Save valuable development time by only updating what's changed.
- Tweak styling faster -- almost comparable to changing styles in the browser's debugger.


## How It Works

Let's go through some different viewpoints to understand exactly how HMR works...

### In the Application

The following steps allow modules to be swapped in and out of an application:

1. The application asks the HMR runtime to check for updates.
2. The runtime asynchronously downloads the updates and notifies the application.
3. The application then asks the runtime to apply the updates.
4. The runtime synchronously applies the updates.

You can set up HMR so that this process happens automatically, or you can choose to require user interaction for updates to occur.


### In the Compiler

In addition to normal assets, the compiler needs to emit an "update" to allow updating from previous version to the new version. The "update" consists of two parts:

1. The updated [manifest](/concepts/manifest) (JSON)
2. One or more updated chunks (JavaScript)

The manifest contains the new compilation hash and a list of all updated chunks. Each of these chunks contains the new code for all updated modules (or a flag indicating that the module was removed).

The compiler ensures that module IDs and chunk IDs are consistent between these builds. It typically stores these IDs in memory (e.g. with [webpack-dev-server](/configuration/dev-server/)), but it's also possible to store them in a JSON file.


### In a Module

HMR is an opt-in feature that only affects modules containing HMR code. One example would be patching styling through the [`style-loader`](https://github.com/webpack/style-loader). In order for patching to work, the `style-loader` implements the HMR interface; when it receives an update through HMR, it replaces the old styles with the new ones.

Similarly, when implementing the HMR interface in a module, you can describe what should happen when the module is updated. However, in most cases, it's not mandatory to write HMR code in every module. If a module has no HMR handlers, the update bubbles up. This means that a single handler can update a complete module tree. If a single module from the tree is updated, the entire set of dependencies is reloaded.

See the [HMR API page](/api/hot-module-replacement) for details on the `module.hot` interface.


### In the Runtime

Here things get a bit more technical... if you're not interested in the internals, feel free to jump to the [HMR API page](/api/hot-module-replacement) or [HMR guide](/guides/hot-module-replacement).

For the module system runtime, additional code is emitted to track module `parents` and `children`. On the management side, the runtime supports two methods: `check` and `apply`.

A `check` makes an HTTP request to the update manifest. If this request fails, there is no update available. If it succeeds, the list of updated chunks is compared to the list of currently loaded chunks. For each loaded chunk, the corresponding update chunk is downloaded. All module updates are stored in the runtime. When all update chunks have been downloaded and are ready to be applied, the runtime switches into the `ready` state.

The `apply` method flags all updated modules as invalid. For each invalid module, there needs to be an update handler in the module or in its parent(s). Otherwise, the invalid flag bubbles up and invalidates parent(s) as well. Each bubble continues until the app's entry point or a module with an update handler is reached (whichever comes first). If it bubbles up from an entry point, the process fails.

Afterwards, all invalid modules are disposed (via the dispose handler) and unloaded. The current hash is then updated and all `accept` handlers are called. The runtime switches back to the `idle` state and everything continues as normal.


## Get Started

HMR can be used in development as a LiveReload replacement. [webpack-dev-server](/configuration/dev-server/) supports a `hot` mode in which it tries to update with HMR before trying to reload the whole page. See the [Hot Module Replacement guide](/guides/hot-module-replacement) for details.

T> As with many other features, webpack's power lies in its customizability. There are _many_ ways of configuring HMR depending on the needs of a particular project. However, for most purposes, `webpack-dev-server` is a good fit and will allow you to get started with HMR quickly.
