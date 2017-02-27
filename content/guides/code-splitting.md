---
title: Code Splitting
sort: 30
contributors:
  - pksjce
  - pastelsky
  - simon04
---

Code splitting is one of the most compelling features of webpack. It allows you to split your code into various bundles which you can then load on demand — like when a user navigates to a matching route, or on an event from the user. This allows for smaller bundles, and allows you to control resource load prioritization, which if used correctly, can have a major impact on your application load time.

There are mainly two kinds of code splitting that can be accomplished with webpack:

## Resource splitting for caching and parallel loads

### Vendor code splitting

A typical application can depend on many third party libraries for framework/functionality needs. Unlike application code, code present in these libraries does not change often.

If we keep code from these libraries in its own bundle, separate from the application code, we can leverage the browser's caching mechanism to cache these files for longer durations on the end user's machine.

For this to work, the `[hash]` portion in the vendor filename must remain constant, regardless of application code changes. Learn [how to split vendor/library](/guides/code-splitting-libraries) code using the `CommonsChunkPlugin`.

### CSS splitting

You might also want to split your styles into a separate bundle, independent from application logic.
This enhances cacheability of your styles and allows the browser to load the styles in-parallel with your application code, thus preventing a FOUC ([flash of unstyled content](https://en.wikipedia.org/wiki/Flash_of_unstyled_content)).

Learn [how to split CSS](/guides/code-splitting-css) using the `ExtractTextWebpackPlugin`.

## On demand code-splitting

While resource splitting of the previous kind requires the user to specify the split points upfront in the configuration, one can also create dynamic split points in the application code.

This can be used for more granular chunking of code, for example, per our application routes or as per predicted user behaviour. This allows the user to load non-essential assets on demand.

* [Code Splitting - Using `import()`](/guides/code-splitting-import) – proposal for ECMAScript
* [Code Splitting - Using `require.ensure`](/guides/code-splitting-require) – CommonJS way
