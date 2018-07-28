const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const GithubAPI = require('@octokit/rest');

const fetch = {
  loaders: [
    {
      organization: 'webpack-contrib',
      suffixes: ['-loader']
    },
    'babel/babel-loader',
    'postcss/postcss-loader',
    'peerigon/extract-loader'
  ],

  plugins: [
    {
      organization: 'webpack-contrib',
      suffixes: ['-webpack-plugin', '-extract-plugin']
    }
  ]
};

const api = new GithubAPI();

async function paginate (org) {
  let response = await api.repos.getForOrg({ org, type: 'public', per_page: 100});
  let {data} = response;

  while (api.hasNextPage(response)) {
    response = await api.getNextPage(response);
    data = data.concat(response.data);
  }

  return data;
}

async function main() {
  if (process.env.GITHUB_TOKEN) {
    api.authenticate({
      type: 'token',
      token: process.env.GITHUB_TOKEN
    });

    const rateLimit = await api.misc.getRateLimit({});

    console.log('Github API rate limit:', rateLimit.data.rate);
  }

  for (const [type, collection] of Object.entries(fetch)) {
    const result = await Promise.all(collection.map(async (item) => {
      if (typeof item === 'string') {
        return item;
      }

      const { organization, suffixes } = item;

      const repos = await paginate(organization);

      return repos
        .map(repo => repo.full_name)
        .filter(name => suffixes.some(suffix => name.endsWith(suffix)));
    }));

    const json = JSON.stringify(_.flatten(result), undefined, 2);
    const jsonPath = path.resolve(__dirname, `../../repositories/${type}.json`);

    fs.writeFile(jsonPath, json, (err) => {
      if (err) {
        throw err;
      }
    });
  }
}

main();
