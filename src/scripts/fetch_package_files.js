#!/usr/bin/env node
// ./fetch_package_files <file> <output> < input
// ./fetch_package_files "README.md" "./output" < input
const fs = require('fs');
const path = require('path');
const async = require('async');
const mkdirp = require('mkdirp');
const request = require('request');
const _ = require('lodash');

if (require.main === module) {
    main();
} else {
    module.exports = fetchPackageFiles;
}

function main() {
  const file = process.argv[2];
  const output = process.argv[3];

  if ( !file ) {
    return console.error('Missing file!');
  }

  if ( !output ) {
    return console.error('Missing output!');
  }

  mkdirp.sync(output);

  const stdin = process.openStdin();
  var input = '';

  stdin.setEncoding('utf8');
  stdin.on('data', function(d) {
    input += d;
  });

  stdin.on('end', function() {
    fetchPackageFiles({
      input: JSON.parse(input),
      file: file,
      output: path.resolve(process.cwd(), output),
      limit: 4
    }, function(err, d) {
      if (err) {
        return console.error(err);
      }

      const msg = d.length === 0
        ? 'Fetched 0 files'
        : d.length === 1
        ? 'Fetched 1 file: '
        : `Fetched ${d.length} files: `;
      console.log(msg + _.map(d, 'full_name'));
    });
  });
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

        if (body && file === 'README.md') {
          body = body
            // Remove all but the description from lead-in (XXX: Optional `\/?` should be unnecessary)
            .replace(/[^]*?<div align="center">([^]*?)<\/div>/, (match, content) => {
              let parsed = content.match(/<p>([^]*?)<\/?p>/);
              return parsed ? parsed[1] : '';
            })
            // Replace lone h1 formats
            .replace(/<h1.*?>.+?<\/h1>/, '')
            .replace(/# .+/, '')
            // Modify links to keep them within the site
            .replace(/https?:\/\/github.com\/(webpack|webpack-contrib)\/([-A-za-z0-9]+-loader\/?)([)"])/g, '/loaders/$2/$3')
            .replace(/https?:\/\/github.com\/(webpack|webpack-contrib)\/([-A-za-z0-9]+-plugin\/?)([)"])/g, '/plugins/$2/$3')
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
            fs.writeFile.bind(null,
              path.resolve(options.output, pkg.name + path.extname(file)),
              headmatter + body
            ),
            fs.writeFile.bind(null,
              path.resolve(options.output, pkg.name + '.json'),
              JSON.stringify(pkg, null, 2)
            )
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
