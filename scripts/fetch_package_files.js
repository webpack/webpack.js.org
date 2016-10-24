#!/usr/bin/env node
// ./fetch_package_files <file> <output> < input
// ./fetch_package_files "README.md" "./output" < input
const fs = require('fs');
const path = require('path');
const async = require('async');
const mkdirp = require('mkdirp');
const request = require('request');

if (require.main === module) {
    main();
} else {
    module.exports = fetchPackageFiles;
}

function main() {
  const file = process.argv[2];
  const output = process.argv[3];

  if(!file) {
    return console.error('Missing file!');
  }

  if(!output) {
    return console.error('Missing output!');
  }

  mkdirp.sync(output);

  const stdin = process.openStdin();
  let input = '';

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

      console.log('Fetched ' + d.length + ' files');
    });
  });
}

function fetchPackageFiles(options, finalCb) {
  const file = options.file;

  async.mapLimit(
    options.input,
    options.limit,
    function(pkg, cb) {
      const url = (
        'https://raw.githubusercontent.com/' + pkg.full_name + '/master/' + file
      );

      request(url, function(err, response, body) {
        if (err) {
          return cb(err);
        }

        return fs.writeFile(
          path.resolve(options.output, pkg.name + path.extname(file)),
          body,
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
