---
title: Plugins API
sort: 1
---

webpack provides flexible and powerful customization api in the form of plugins. Using plugins, we can plug functionality into webpack. Additionaly, webpack provides lifecycle hooks into which plugins can be registered. At each of these lifecycle points, webpack will run all of the registered plugins and provide them with the current state of the webpack compilation.

## Tapable & Tapable instances

The plugin architecture is mainly possible for webpack due to an internal library named `Tapable`.
**Tapable Instances** are classes in the webpack source code which have been extended or mixed in from class `Tapable`.

For plugin authors, it is important to know which are the `Tapable` instances in the webpack source code. These instances provide a variety of event hooks into which custom plugins can be attached.
Hence, throughout this section are a list of all of the webpack `Tapable` instances (and their event hooks), which plugin authors can utilize.

For more information on `Tapable` visit the [tapable repository](https://github.com/webpack/tapable) or visit the [complete overview](./tapable)

## Creating a Plugin



### Different Plugin Shapes