---
title: Migrating Versions
sort: 15
contributors:
  - sokra
  - jhnns
  - grgur
  - domfarolino
  - johnnyreilly
  - jouni-kantola
  - frederikprijck
  - chrisVillanueva
  - bebraw
  - howdy39
  - selbekk
  - ndelangen
---

The following sections describe the major changes from webpack 3 to 4.

T> If you are running into issues, please see [the changelog](https://github.com/webpack/webpack/releases) for details.

W> Are you looking to migrating from v1 to v2? Here is the blog post detailing how to do it.

## `NoEmitOnErrorsPlugin`

This plugin has been replaced with `optimization.noEmitErrors`. This is on by default in `production` `mode`. Not sure what `mode` is? Check out [here](https://webpack.js.org/concepts/mode/).
