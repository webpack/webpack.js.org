---
title: Lazy Loading
sort: 10
contributors:
  - iammerrick
  - chrisVillanueva
  - skipjack
---

T> This guide is a small follow-up to [Code Splitting](/guides/code-splitting). If you have not yet read through that guide, please do so now.

Lazy, or "on demand", loading is a great way to optimize your site or application. This practice essentially boils down to splitting your code at logical breakpoints, and then loading it once the user has done something that requires, or will require, a new block of code. This speeds up the initial load of the application and makes the lightens its overall weight as some blocks may never even be loaded.


## Example

...


## Frameworks

Many frameworks and libraries have their own recommendations of how this should be accomplished within their methodologies. Here are a few examples:

- React: [Code Splitting and Lazy Loading](https://reacttraining.com/react-router/web/guides/code-splitting)
