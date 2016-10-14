# Contributing

From adding an issue for a documentation suggestion to creating a pull request: every contribution is appreciated and welcome. If you're planning to implement a new section or page please create an issue first.

## Setup

* Install [Node.js](https://nodejs.org/) if you have not already.  
  *Note: Node 6 or greater may be required for "best results".*
* Fork the **webpack.js.org** repo at [https://github.com/webpack/webpack.js.org](https://github.com/webpack/webpack.js.org).
* `git clone <your-clone-url> && cd webpack.js.org`
* `git checkout develop`
* `npm install`
* `npm run build`
* `npm start`
* Visit [http://localhost:3000](http://localhost:3000) to preview your changes before making a pull request.

## Editor Config

The [.editorconfig](https://github.com/webpack/webpack.js.org/blob/develop/.editorconfig) in the root should ensure consistent formatting. Please make sure you've [installed the plugin](http://editorconfig.org/#download) if your text editor needs one.

## Git Flow

We are using the [git flow](http://nvie.com/posts/a-successful-git-branching-model/) branching model. Please direct all pull requests to the [develop](https://github.com/webpack/webpack.js.org/tree/develop) branch.

## Branching Your Changes

Making a branch in your fork for your contribution is helpful in the following ways:  

* It allows you to have multiple contributions in as PRs at once.
* It allows us to identify what your contribution is about from the branch name.

You will want to checkout the `develop` branch locally before creating your new branch.

There are two types of branches:

* Feature
* Hotfix

### Features

If your contribution is something new, like a new section or page or a new chunk to an existing page, you can create a branch with the following naming convetion:  

`feature/<the-new-feature>`

So, for example, if you are adding a page on how to write a custom loader your branch could have the name:

`feature/add-custom-loaders-page`

### Fixes

If you are fixing existing content or code you can create a branch with the following naming convention:

`hotfix/<the-fix>`

So, for example, if you are fixing spelling on the api configuration page for an option, your branch could have the name:

`hotfix/fix-option-property-spelling-on-api-configuration`

## Submitting Changes

After getting some feedback, push to your fork branch and submit a pull request. We may suggest some changes or improvements or alternatives, but for small changes your pull request should be accepted quickly.

Issue the PR to the [develop](https://github.com/webpack/webpack.js.org/tree/develop) branch.

## Contribution Recognition

Any document that you edit, you can choose to add your Github username at the top of the document for recognition: 

**example.md**

```markdown
===
title: Some Example Page
contributors:
  - TheLarkInn
  - Sokra
  - Bebraw
  - Jhnns
  - SpaceK33z
===

## Some Documentation

```

This will add your name and Github profile photo to the document in production. This is a great way to own the awesome work that you do and encourage that you remember to do this in your PR's. 


## Thank you

Webpack is insanely feature rich and documentation is a huge time sink. We greatly appreciate any time spent fixing typos or clarifying sections in the documentation.
