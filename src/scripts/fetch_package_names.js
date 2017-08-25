#!/usr/bin/env node
// ./fetch_package_names <suffix> > output
// ./fetch_package_names "-loader" > output.json
const GitHubApi = require("github");

if (require.main === module) {
    main();
} else {
    module.exports = fetchPackageNames;
}

function main() {
  const organization = process.argv[2];
  const suffix = process.argv[3];

  if(!organization) {
    return console.error('Missing organization!');
  }
  if(!suffix) {
    return console.error('Missing suffix!');
  }

  fetchPackageNames({
    organization: organization,
    suffix: suffix
  }, function(err, d) {
    if (err) {
      return console.error(err);
    }

    console.log(JSON.stringify(d, null, 4));
  });
}

function fetchPackageNames(options, cb) {
  const github = new GitHubApi();

  // XXX: weak since this handles only one page
  github.repos.getForOrg({
    org: options.organization,
    per_page: 100
  }, function (err, d) {
    if (err) {
      return cb(err);
    }

    return cb(null, d.data.filter(function(o) {
      return o.name.endsWith(options.suffix);
    }));
  });
}
