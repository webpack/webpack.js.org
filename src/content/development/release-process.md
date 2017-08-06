---
title: webpack merge, tag and release process
contributors:
  - d3viant0ne
  - sokra
---

## Pull requests into `master`

When you land commits on your `master` branch, select the _Create Merge-Commit_ option.

## Cut a release

```sh
npm version patch && git push --follow-tags && npm publish
npm version minor && git push --follow-tags && npm publish
npm version major && git push --follow-tags && npm publish
```

_This will increment the package version, commits the changes, cuts a **local tag**, push to github & publish the npm package._

After that go to the github releases page and write a Changelog for the new tag.
