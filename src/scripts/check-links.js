#!/usr/bin/env node
// Check piped links while allowing a fixed amount to fail
// Adapted from tap-json.
var Parser = require('tap-parser');
var through = require('through2');
var duplexer = require('duplexer');
var minimist = require('minimist');

process.stdin
  .pipe(checkLinks())
  .pipe(process.stdout);

function checkLinks(args) {
  var argv = minimist(process.argv.slice(2));
  var skip = argv.skip || 0;

  var tap = new Parser();
  var out = through.obj();
  var dup = duplexer(tap, out);

  var data = [];
  var name = null;

  tap.on('complete', function(res) {
    const failures = res.failures.filter(failure => {
      return failure.diag && failure.diag.at ? !(
        /class="support__[^"]*"/.test(failure.diag.at) ||
        /src="https:\/\/img\.shields\.io[^"]*"/.test(failure.diag.at)
      ) : false;
    });

    if (failures.length > 0) {
      console.log(formatFailures(failures));
    }

    // Fail hard only if over skip threshold
    if (failures.length > skip) {
      process.exit(1);
    }
  });

  return dup;
}

function formatFailures(failures) {
  return failures.map(failure => {
    let { diag = {} } = failure;
    return failure.name + '\n' + diag.actual + ' at ' + diag.at;
  }).join('\n\n');
}
