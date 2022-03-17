import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import { promisify } from 'util';
import _ from 'lodash';
import { Octokit as GithubAPI } from '@octokit/rest';
import { createActionAuth } from '@octokit/auth-action';
import { excludedLoaders, excludedPlugins } from './constants.mjs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);

const fetch = {
  loaders: [
    {
      organization: 'webpack-contrib',
      suffixes: ['-loader'],
      hides: excludedLoaders,
    },
    'babel/babel-loader',
  ],
  plugins: [
    {
      organization: 'webpack-contrib',
      suffixes: ['-webpack-plugin', '-extract-plugin'],
      hides: excludedPlugins,
    },
  ],
};

async function main() {
  let api;
  if (process.env.CI && process.env.CI === true) {
    const auth = createActionAuth();
    const authentication = await auth();
    api = new GithubAPI({
      auth: authentication,
    });
  } else {
    api = new GithubAPI();
  }

  async function paginate(org) {
    const data = await api.paginate('GET /orgs/:org/repos', {
      org: org,
      type: 'public',
    });
    return data;
  }
  mkdirp.sync(path.resolve(__dirname, '../../repositories/'));

  for (const [type, collection] of Object.entries(fetch)) {
    const jsonPath = path.resolve(__dirname, `../../repositories/${type}.json`);
    try {
      const result = await Promise.all(
        collection.map(async (item) => {
          if (typeof item === 'string') {
            return item;
          }

          const { organization, suffixes, hides } = item;

          const repos = await paginate(organization);

          return repos
            .map((repo) => repo.full_name)
            .filter((name) => suffixes.some((suffix) => name.endsWith(suffix)))
            .filter((name) => !hides.includes(name));
        })
      );

      const json = JSON.stringify(_.flatten(result), undefined, 2);

      await writeFile(jsonPath, json);
      console.log(`Fetched file: ${jsonPath}`);
    } catch (e) {
      try {
        const info = await stat(jsonPath);

        // error is acceptable if the data from cache is less than 48 hours old
        if (info.mtimeMs < Date.now() - 48 * 60 * 60 * 1000) {
          throw e;
        } else {
          console.warn(e.message);
        }
      } catch (e2) {
        throw e;
      }
    }
  }
}

main().catch((e) => {
  console.error(e.message);
  process.exitCode = 1;
});
