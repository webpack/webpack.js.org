#!/usr/bin/env node
// ./fetchPackageFiles <file> <output> < input
// ./fetchPackageFiles "README.md" "./output" < input
const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const mkdirp = require('mkdirp');
const { promisify } = require('util');
const request = require('request-promise');

const asyncWriteFile = promisify(fs.writeFile);

const yamlHeadmatter = require('./yaml-headmatter.js');
const processReadme = require('./process-readme.js');

if (require.main === module) {
  main();
} else {
  module.exports = fetchPackageFiles;
}

function main() {
  const file = process.argv[2];
  const output = process.argv[3];

  mkdirp.sync(output);

  const stdin = process.openStdin();
  let input = '';

  stdin.setEncoding('utf8');
  stdin.on('data', function(chunk) {
    input += chunk;
  });

  stdin.on('end', function() {
    fetchPackageFiles({
      input: JSON.parse(input),
      file: file,
      output: path.resolve(process.cwd(), output)
    }, (error, data) => {
      if (error) {
        return console.error(`utilities/fetch-package-files: ${ error }`);
      }

      const msg = d.length === 0
        ? 'Fetched 0 files'
        : d.length === 1
        ? 'Fetched 1 file: '
        : `Fetched ${d.length} files: `;
      console.log(msg + _.map(data, 'full_name'));
    });
  });
}

function fetchPackageFiles(options, cb) {
  if (typeof options.file !== 'string') {
    return console.error('utilities/fetch-package-files: missing file');
  }

  if (typeof options.output !== 'string') {
    return console.error('utilities/fetch-package-files: missing output');
  }

  const allPromises = options.input.map(pkg => {
    // fetch from master branch
    const branch = 'master';

    // build fetch url
    const file = options.file;
    const baseUrl = 'https://raw.githubusercontent.com';
    const url = `${ baseUrl }/${ pkg.full_name }/${ branch }/${ file }`;

    return request(url)
      .then(body => {
        // modify README to fit page structure in site
        if (body && file === 'README.md') {
          body = processReadme(body);
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
          edit: `${pkg.html_url}/edit/${ branch }/${ file }`,
          repo: pkg.html_url
        });

        return asyncWriteFile(
          path.resolve(options.output, `_${pkg.name}` + path.extname(file)),
          headmatter + body
        );
      })
      .catch(error => {
        console.log('utilities/fetch-package-piles', error);
      })
    });
}
