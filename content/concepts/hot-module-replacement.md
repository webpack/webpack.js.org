---
title: Hot Module Replacement
sort: 11
contributors:
- SpaceK33z
- sokra
- GRardB
- rouzbeh84
---

Hot Module Replacement (HMR) exchanges, adds, or removes
[modules](/concepts/modules/) while an application is running without a
page reload. This allows you to speed up development time by updating
individual modules when they are changed without refreshing the page.

## How Does It Work?

### From The App View

1. The app code asks the HMR runtime to check for updates.
2. The HMR runtime downloads the updates (asynchronously) and tells the app
code that an update is available.
3. The app code then asks the HMR runtime to apply the updates.
4. The HMR runtime applies the update (synchronously).

You can set up HMR so that this process happens automatically, or you can
choose to require user interaction for updates to occur.

### From The Compiler (webpack) View

In addition to the normal assets, the compiler needs to emit an "update"
to allow updating from previous version to the new version. The "update"
consists of two parts:

1. The update manifest (JSON)
2. One or more update chunks (JavaScript)

The manifest contains the new compilation hash and a list of all update chunks.

Each update chunk contains code for all updated modules in the respective chunk
(or a flag indicating that the module was removed).

The compiler makes sure that module IDs and chunk IDs are consistent
between these builds. It typically stores these IDs in memory (for example, when
using [webpack-dev-server](/configuration/dev-server/)), but it's also possible to
store them in a JSON file.

### From The Module View

HMR is an opt-in feature that only affects modules containing HMR code. One example
would be patching styling through the [`style-loader`](https://github.com/webpack/style-loader).
In order for patching to work, `style-loader` implements the HMR interface; when it
receives an update through HMR, it replaces the old styles with the new ones.

Similarly, when implementing the HMR interface in a module, you can describe what should
happen when the module is updated. However, in most cases, it's not mandatory to write
HMR code in every module. If a module has no HMR handlers, the update bubbles up. This
means that a single handler can handle an update to a complete module tree. If a single
module in this tree is updated, the complete module tree is reloaded (only reloaded,
not transferred).

### From The HMR Runtime View (Technical)

For the module system runtime, additional code is emitted to track module `parents` and `children`.

On the management side, the runtime supports two methods: `check` and `apply`.

A `check` makes an HTTP request to the update manifest. If this request fails,
there is no update available. If it succeeds, the list of updated chunks is compared
to the list of currently loaded chunks. For each loaded chunk, the corresponding
update chunk is downloaded. All module updates are stored in the runtime.
When all update chunks have been downloaded and are ready to be applied, the runtime
switches into the `ready` state.

The `apply` method flags all updated modules as invalid. For each invalid module,
there needs to be an update handler in the module or update handlers in its parent(s).
Otherwise, the invalid flag bubbles up and marks its parent(s) as invalid too. Each bubble
continues until the app's entry point or a module with an update handler is reached
(whichever comes first). If it bubbles up from an entry point, the process fails.

Afterwards, all invalid modules are disposed (via the dispose handler) and unloaded.
The current hash is then updated and all "accept" handlers are called. The runtime
switches back to the `idle` state and everything continues as normal.

## What can I do with it?

You can use it in development as a LiveReload replacement.
[webpack-dev-server](/configuration/dev-server/) supports a
hot mode in which it tries to update with HMR before trying to reload the whole page. See how
to implement [HMR with React](/guides/hmr-react) as an example.


Some loaders already generate modules that are hot-updatable. For example, the `style-loader`
can swap out a page's stylesheets. For modules like this, you don't need to do anything special.

webpack's power lies in its customizability, and there are *many* ways of configuring HMR
depending on the needs of a particular project.
