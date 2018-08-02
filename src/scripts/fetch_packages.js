#!/usr/bin/env node
// ./fetch_package_names <suffix> > output
// ./fetch_package_names "-loader" > output.json
const GitHubApi = require('github');
const fs = require('fs');
const urlModule = require('url');
const path = require('path');
const async = require('async');
const mkdirp = require('mkdirp');
const request = require('request');
const _ = require('lodash');

if (require.main === module) {
  main();
} else {
  module.exports = fetchPackageNames;
}

function main() {
  const organization = process.argv[2];
  const suffix = process.argv[3];
  const file = process.argv[4];
  const output = process.argv[5];

  if (!organization) {
    return console.error('Missing organization!');
  }
  if (!suffix) {
    return console.error('Missing suffix!');
  }

  if (!file) {
    return console.error('Missing file!');
  }

  if (!output) {
    return console.error('Missing output!');
  }

  mkdirp.sync(output);

  fetchPackageNames(
    {
      organization: organization,
      suffix: suffix
    },
    function(err, d) {
      if (err) {
        return console.error(err);
      }

      fetchPackageFiles(
        {
          input: d,
          file: file,
          output: path.resolve(process.cwd(), output),
          limit: 4
        },
        function(err, d) {
          if (err) {
            return console.error(err);
          }

          const msg =
            d.length === 0 ? 'Fetched 0 files' : d.length === 1 ? 'Fetched 1 file: ' : `Fetched ${d.length} files: `;
          console.log(msg + _.map(d, 'full_name'));
        }
      );
    }
  );
}

function fetchPackageNames(options, cb) {
  const github = new GitHubApi();

  if (process.env.GITHUB_TOKEN) {
    github.authenticate({
      type: 'token',
      token: process.env.GITHUB_TOKEN
    });

    github.misc.getRateLimit({}, (err, res) => {
      if (err) throw err;
      console.log(res.data.rate);
    });
  }

  // XXX: weak since this handles only one page
  github.repos.getForOrg(
    {
      org: options.organization,
      per_page: 100
    },
    function(err, d) {
      if (err) {
        return cb(err);
      }

      return cb(
        null,
        d.data.filter(function(o) {
          return o.name.endsWith(options.suffix);
        })
      );
    }
  );
}

function fetchPackageFiles(options, finalCb) {
  const file = options.file;

  async.mapLimit(
    options.input,
    options.limit,
    function(pkg, cb) {
      const branch = 'master';
      const url = ['https://raw.githubusercontent.com', pkg.full_name, branch, file].join('/');

      request(url, function(err, response, body) {
        if (err) {
          return cb(err);
        }

        if (body && file.toLowerCase() === 'readme.md') {
          body = body
            // Remove all but the description from lead-in (XXX: Optional `\/?` should be unnecessary)
            .replace(/[^]*?<div align="center">([^]*?)<\/div>/, (match, content) => {
              let parsed = content.match(/<p>([^]*?)<\/?p>/);
              return parsed ? parsed[1] : '';
            })
            // Replace lone h1 formats
            .replace(/<h1.*?>.+?<\/h1>/, '')
            .replace(/# .+/, '')
            // Resolve anchor hrefs to avoid broken relative references in the docs
            // Examples:
            // - [click here](LICENSE) --> [click here](https://raw.githubusercontent.com/user/repository/branch/LICENSE)
            // - [click here](./LICENSE) --> [click here](https://raw.githubusercontent.com/user/repository/branch/LICENSE)
            // - [click here](#LICENSE) --> [click here](#LICENSE)
            .replace(
              /\[([^[\]]*)\]\(([^)#]+)\)/g,
              (match, textContent, href) => `[${textContent}](${urlModule.resolve(url, href)})`
            )
            // Modify links to keep them within the site
            .replace(
              /https?:\/\/github.com\/(webpack|webpack-contrib)\/([-A-za-z0-9]+-loader\/?)([)"])/g,
              '/loaders/$2/$3'
            )
            .replace(
              /https?:\/\/github.com\/(webpack|webpack-contrib)\/([-A-za-z0-9]+-plugin\/?)([)"])/g,
              '/plugins/$2/$3'
            )
            // Replace any <h2> with `##`
            .replace(/<h2[^>]*>/g, '## ')
            .replace(/<\/h2>/g, '')
            // Drop any comments
            .replace(/<!--[\s\S]*?-->/g, '');
        }

        var title = pkg.name;
        if (title.match(/-plugin$/)) {
          title = _.camelCase(title);
          title = _.upperFirst(title);
          title = title.replace(/I18N/, 'I18n');
        }

        // TODO: push this type of stuff to a script of its own to keep this standard
        let headmatter = yamlHeadmatter({
          title: title,
          source: url,
          edit: [pkg.html_url, 'edit', branch, file].join('/'),
          repo: pkg.html_url
        });

        return async.parallel(
          [
            fs.writeFile.bind(null, path.resolve(options.output, pkg.name + path.extname(file)), headmatter + body),
            fs.writeFile.bind(null, path.resolve(options.output, pkg.name + '.json'), JSON.stringify(pkg, null, 2))
          ],
          function(err) {
            if (err) {
              return cb(err);
            }

            return cb(null, pkg);
          }
        );
      });
    },
    finalCb
  );
}

// TODO: push this type of to a script of its own to keep this generic
function yamlHeadmatter(fields) {
  var ret = '---\n';

  Object.keys(fields).forEach(function(field) {
    ret += field + ': ' + fields[field] + '\n';
  });

  return ret + '---\n';
}
