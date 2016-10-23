---
title: How to Split Code?
contributors:
  - pksjce
---

Code splitting is the most compelling feature for  `webpack` usage. You can split your code into various bundles and load them on demand with`webpack`. It allows to tweak an application for these optimisations using the configuration.
You can load them at a later time in your code or in a specific route only or on an event from the user even.

There are mainly two kind of code-splits that need to be accomplished with `webpack`

## On demand code-splitting

`webpack` can help us split our code into logical pieces or chunks as per our application routes or as per predicted user behaviour. This means that we can load non-essential assets when the user performs an action like route change and demands for it.

#### Code splitting with require.ensure
#### Code splitting with System.import
#### Making Common chunks
#### Code splitting using bundle loader

## Resource splitting for cacheing and parallel loads

#### CSS splitting

An application owner would want to split all the css into a separate bundle. This enhances cacheability of the resource bundle and also allows the browser to parallely load the bundle which makes for a solid performance improvement.
Learn [how to split your css using Extract-Text-Webpack-Plugin](/how-to/code-splitting/splitting-css)


#### Vendor code splitting

