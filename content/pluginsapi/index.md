---
title: 插件 API
sort: 1
---

## Tapable & Tapable instances
**Tapable Instances** are classes in the webpack source code which have been extended or mixed in from class `Tapable`. 
For more information on `Tapable` visit the [tapable repository](https://github.com/webpack/tapable) or visit the [complete overview](./tapable)

Throughout this section are a list of all of the webpack Tapable instances (and their event hooks), which plugin authors can utilize. 

## Creating a Plugins

### Different Plugin Shapes