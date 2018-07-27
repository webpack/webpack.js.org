#!/usr/bin/env node
// ./fetch_package_names <suffix> > output
// ./fetch_package_names "-loader" > output.json
const GitHubApi = require('@octokit/rest');
const fs = require('fs');
const urlModule = require('url');
const path = require('path');
const async = require('async');
const mkdirp = require('mkdirp');
const request = require('request-promise');
const { promisify } = require('util');
const _ = require('lodash');

const yamlHeadmatter = require('./yaml-headmatter.js');
const processReadme = require('./process-readme.js');

const asyncWriteFile = promisify(fs.writeFile);

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
          output: path.resolve(process.cwd(), output)
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
  const allPromises = options.input.map(pkg => {
    // fetch from master branch
    const branch = 'master';

    // build fetch url
    const file = options.file;
    const baseUrl = 'https://raw.githubusercontent.com';
    const url = `${baseUrl}/${pkg.full_name}/${branch}/${file}`;

    return request(url)
      .then(body => {
        // modify README to fit page structure in site
        if (body && file.toLowerCase() === 'readme.md') {
          body = processReadme(body, { source: url });
        }

        let title = pkg.name;

        // process titles for plugins
        if (title.match(/-plugin$/)) {
          title = _.camelCase(title);
          title = _.upperFirst(title);
          title = title.replace(/I18N/, 'I18n');
        }

        // generate yaml matter for file
        let headmatter = yamlHeadmatter({
          title: title,
          source: url,
          edit: `${pkg.html_url}/edit/${branch}/${file}`,
          repo: pkg.html_url
        });

        return asyncWriteFile(path.resolve(options.output, `_${pkg.name}` + path.extname(file)), headmatter + body).then(done => {
          return pkg;
        });
      })
      .catch(error => {
        console.log(error);
      });
  });

  return Promise.all(allPromises).then(data => finalCb(null, data)).catch(err => finalCb(err));
}
