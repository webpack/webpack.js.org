---
title: generators
group: packages
sort: 4
contributors:
  - misterdev
---

## Description

This package contains all webpack-cli related yeoman generators. 

## Installation

```bash
npm i -D webpack-cli @webpack-cli/generators
```

## Usage

To run the package programmatically, install it as a dependency. When using the package programmatically, one does not have to install webpack-cli.

### Node

```js
const { addGenerator, addonGenerator, initGenerator, loaderGenerator, pluginGenerator, removeGenerator, updateGenerator } = require('@webpack-cli/generators');
// ... compose with yeoman env or add a generator to your own yeoman project
```
