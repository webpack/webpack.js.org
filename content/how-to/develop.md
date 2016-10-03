---
title: How to Develop?
contributors:
  - SpaceK33z
---

- Show the three ways to develop: webpack --watch, webpack-dev-server, webpack-dev-middleware and explain the differences (keep it short!). dev-server is the easiest one to get started.
- dev-server and dev-middleware use in-memory compilation

W> Explain that IT SHOULD NOT BE USED IN PRODUCTION, NEVER.

Adjusting your text editor

- Explain that some editors use "atomic save"; this needs to be disabled in order to see all file changes.

Choose a devtool

- Explain shortly what source maps are and why they come in handy when devving
- Link to devtool page for more info about source maps

webpack watch mode

- show one use case
- show how to use in CLI
- show how to use API
- explain that you need to use your own server (maybe show the python server)

webpack-dev-server

- show one use case
- how to install
- show how to use in CLI
- show how to use API
- refer to `devServer` configuration page
- explain `inline` and `iframe` mode, and explain `inline` requires more config in API
- make clear that there are some differences in CLI and API
- after explaining live reload, link to HMR article

webpack-dev-middleware

- show one use case
- how to install
- show how to use API
- refer to `devServer` configuration page

