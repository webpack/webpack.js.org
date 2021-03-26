## Contributing

From opening an issue for a documentation suggestion to creating a pull request: every
contribution is appreciated and welcome. If you're planning to implement a new section or
page please create an issue first.

## Setup

Start by ensuring that you have Node.js installed and forking the repository:

- Install [Node.js][1] if you have not already.
- Install [Yarn][13] if you have not already. Yarn is an alternative to npm, and it is required for building the site.
- Fork the **webpack.js.org** repo from [the main repository][2].
- `git clone <your-clone-url> && cd webpack.js.org`

Once you are in the project directory, run the following commands:

- `yarn` to pull all dependencies.
- `yarn build` to create a production version of the site.
- `yarn start` to develop on a local webpack-dev-server: [localhost:3000][3].

> NOTE: run `yarn fetch` before running `yarn start` command for the first time

- `yarn fetch` to retrieve external documentation/data.

The final command, `yarn fetch`, is optional as both `yarn build` and `yarn start`
will do this automatically. This step pulls in documentation for loaders/plugins hosted
in separate repositories such as the ones found in the [webpack-contrib][4] organization.
See the `package.json` for the full list of `scripts`.

> Note that **Node 6.9.x** or above is required for the build process to run properly.

> On Debian and Ubuntu operating systems you may have to use `node >= 7.0.0` to avoid build errors with `node-sass`. Please note that we don't officially support building on these systems.

## Contributor License Agreement

When submitting your contribution, a CLA (Contributor License Agreement) bot will come by
to verify that you signed the CLA. If it is your first time, it will link you to the right
place to sign it. However, if you have committed your contributions using an email that is
not the same as your email used on GitHub, the CLA bot can't accept your contribution.

Run `git config user.email` to see your Git email, and verify it with your [GitHub email][5].

## Editor Config

The [.editorconfig][6] in the root should ensure consistent formatting. Please make sure
you've [installed the plugin][7] if your text editor needs one.

## Branching Your Changes

Making a branch in your fork for your contribution is helpful in the following ways:

- It allows you to have multiple contributions in as PRs at once.
- It allows us to identify what your contribution is about from the branch name.

## Committing Your Changes

Please follow the [conventional commits][10] specification. For example, for documentation
changes, a short commit message may resemble the following:

```md
docs(config): clarify `output.filename` usage
```

Note that you can add a body/footer if more details are necessary. Soon we will
start utilizing [`standard-version`][11] for releases/changelog generation. This
will also potentially tie in to having archived docs for each major version.

## Submitting Changes

After getting some feedback, push to your fork branch and submit a pull request. We may
suggest some changes or improvements or alternatives, but for small changes your pull
request should be accepted and merged fairly quick.

Issue the PR to the [master][8] branch.

> See [GitHub documentation][9] for more help.

## Recognition

You can choose to add your GitHub username for recognition at the top of any markdown
document you edit:

**example.md**

```markdown
---
title: Some Example Page
contributors:
  - TheLarkInn
  - Sokra
  - bebraw
  - Jhnns
  - SpaceK33z
---

Some documentation...
```

This will add your name and GitHub profile photo to the document in production. It's a
great way to own the awesome work that you do and we encourage you to do this in your PRs.

## Thank You

webpack is a feature rich, low level tool and documentation is a huge time sink. We appreciate
any time spent fixing typos or clarifying sections in the documentation.

[1]: https://nodejs.org/
[2]: https://github.com/webpack/webpack.js.org
[3]: http://localhost:3000/
[4]: https://github.com/webpack-contrib
[5]: https://github.com/settings/emails
[6]: https://github.com/webpack/webpack.js.org/blob/master/.editorconfig
[7]: http://editorconfig.org/#download
[8]: https://github.com/webpack/webpack.js.org/tree/master
[9]: https://help.github.com/articles/proposing-changes-to-your-work-with-pull-requests/
[10]: http://conventionalcommits.org/
[11]: https://github.com/conventional-changelog/standard-version
[13]: https://yarnpkg.com/lang/en/docs/install
