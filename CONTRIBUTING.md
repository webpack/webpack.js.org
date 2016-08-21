# Contributing

From opening a bug report to creating a pull request: every contribution is
appreciated and welcome. If you're planning to implement a new section or page 
please create an issue first. This way we can ensure that your precious
work is not in vain.

There are two types of contributions for the wiki:

* Content Changes  
  *Additions and changes to the content of the Wiki.*  

* Code Changes  
  *Enhancements and fixes to the code that runs the Wiki.*

We greatly appreciate contributions to either one!

## Setup

* Install [Node.js](https://nodejs.org/) if you have not already
* Fork the **webpack.io** repo at [https://github.com/webpack/webpack.io](https://github.com/webpack/webpack.io).
* `git clone <your-clone-url> && cd docs`
* `npm install`
* `npm run build`
* `npm start`
* Visit [http://localhost:3000](http://localhost:3000) to preview your changes before making a pull request.

## Branching Your Changes

Making a branch in your fork for you contribution is helpful in the following ways:  
* It allows you to have multiple contributions in as PRs at once.
* It allows us to identify what your contribution is about from the branch name.

There are two types of branches:
* Feature
* Hotfix

### Features
If your contribution is something new, like a new section or page or a new chunk 
to an existing page or a code enhancement, you can create a branch with the 
following naming convetion:  
```
feature/<the-new-feature>
```
So, for example, if you are adding a page on how to write a custom loader your 
branch could have the name:
```
feature/add-custom-loaders-page
```

### Fixes
If you are fixing existing content or code you can create a branch with the 
following naming convention:
```
hotfix/<the-fix>
```
So, for example, if you are fixing base hrefs for navigation in the footer 
to use the top level path, your branch could have the name:
```
hotfix/fix-base-path-in-footer-links
```

## Submitting Changes

After getting some feedback, push to your fork branch and submit a pull request. We
may suggest some changes or improvements or alternatives, but for small changes
your pull request should be accepted quickly.

There are two different pipelines for submitting contributions based on what the 
contribution is for:

* Code Changes  
  Issue the PR to the **develop** branch.  
  *A contribution that is adding/changing the code that runs the wiki.*
* Content Changes  
  Issue the PR to the **master** branch.  
  *A contribution that is adding/changing content on the wiki.*

## Thank you!

Webpack is insanely feature rich and documentation is a huge time sink. We
greatly appreciate any time spent fixing typos or clarifying sections in the
documentation.