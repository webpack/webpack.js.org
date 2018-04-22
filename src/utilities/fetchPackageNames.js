#!/usr/bin/env node
// ./fetchPackageNames <suffix> > output
// ./fetchPackageNames "-loader" > output.json
const GitHubAPI = require('@octokit/rest');

if (require.main === module) {
    main();
} else {
    module.exports = fetchPackageNames;
}

function main() {
  const organization = process.argv[2];
  const suffix = process.argv[3];

  fetchPackageNames({
      organization: organization,
      suffix: suffix
    })
    .then(data => {
      console.log(JSON.stringify(data, null, 4));
    })
    .catch(error => {
      return console.error(error);
    });
}

function fetchPackageNames(options, cb) {
  // sanity check
  if(typeof options.organization !== 'string') {
    return console.error('utilities/fetchPackageNames: missing organization');
  }

  if(typeof options.suffix !== 'string') {
    return console.error('utilities/fetchPackageNames: missing suffix');
  }

  // FIX: this handles only one page
  return new Promise((resolve, reject) => {
    const github = new GitHubAPI();

    github.repos.getForOrg({
      org: options.organization,
      per_page: 100
    }, function (error, response) {
      if (error) {
        reject(error);
      }

      const filteredNames = response.data.filter(function(organization) {
        return organization.name.endsWith(options.suffix);
      });

      resolve(filteredNames);
    });
  })
}
