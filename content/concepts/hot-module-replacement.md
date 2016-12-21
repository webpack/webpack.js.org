---
title: Hot Module Replacement
sort: 11
contributors:
- SpaceK33z
- sokra
---

Hot Module Replacement (HMR) exchanges, adds, or removes modules while an
application is running without a page reload. You basically can update changed modules without a full page reload.

## How Does It Work?

### From The App View

The app code asks the HMR runtime to check for updates. The HMR runtime downloads the updates (async) and tell the app code that an update is available. The app code asks the HMR runtime to apply updates. The HMR runtime applies the update (sync). The app code may or may not require user interaction in this process (you decide).

### From The Compiler (webpack) View

In addition to the normal assets the compiler need to emit the "Update" to allow updating from previous version to this version. The "Update" contains two parts:

1. the update manifest (JSON)
2. one or multiple update chunks (JavaScript)

The manifest contains the new compilation hash and a list of all update chunks (2.).

The update chunks contain code for all updated modules in this chunk (or a flag if a module was removed).

The compiler addtionally makes sure that module and chunk ids are consistent between these builds. It uses a "records" json file to store them between builds (or it stores them in memory).

### From The Module View

HMR is an opt-in feature that affects only modules containing HMR code. You can consider patching styling through style-loader as a good example. To make this work, style-loader implements the HMR interface. Implementing it you describe what should happen when a module is updated. In this case we simply replace the styling with the one received through HMR.

In most cases it's not mandatory to write HMR code in every module. If a module has no HMR handlers the update bubbles up. This means a single handler can handle an update to a complete module tree. If a single module in this tree is updated, the complete module tree is reloaded (only reloaded not transferred).

### From The HMR Runtime View (Technical)

For the module system runtime additional code is emitted to track module `parents` and `children`.

On the management side the runtime supports two methods: `check` and `apply`.

A `check` does a HTTP request to the update manifest. When this request fails, there is no update available. Elsewise the list of updated chunks is compared to the list of currently loaded chunks. For each loaded chunk the corresponding update chunk is downloaded. All module updates as stored in the runtime as update. The runtime switches into the `ready` state, meaning an update has been downloaded and is ready to be applied.

For each new chunk request in the ready state the update chunk is also downloaded.

The `apply` method flags all updated modules as invalid. For each invalid module there need to be a update handler in the module or update handlers in every parent. Else the invalid buddles up and marks all parents as invalid too. This process continues until no more "bubble up" occurs. If it bubbles up from an entry point the process fails.

Now all invalid modules are disposed (dispose handler) and unloaded. Then the current hash is updated and all "accept" handlers are called. The runtime switches back to the `idle` state and everything continues as normal.

## What can I do with it?

You can use it in development as a LiveReload replacement. webpack-dev-server supports a hot mode which tries to update with HMR before trying to reload the whole page. See how to implement [HMR with React](/guides/hmr-react) for example.

Some loaders already generate modules that are hot-updateable. i.e. the `style-loader` can exchange the stylesheet. You don't need to do anything special.

webpack's power lies in its customizability, and there are *many* ways of configuring HMR given the needs of a particular project.
