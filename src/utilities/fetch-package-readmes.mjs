import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { mkdirp } from 'mkdirp';
import { fileURLToPath } from 'url';
import api from './githubAPI.mjs';

import yamlHeadmatter from './yaml-headmatter.mjs';
import processReadme from './process-readme.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const cwd = process.cwd();

const types = ['loaders', 'plugins'];

const pathMap = {
  loaders: path.resolve(__dirname, '../content/loaders'),
  plugins: path.resolve(__dirname, '../content/plugins'),
};

const loaderGroup = {
  'css-loader': 'CSS',
  'less-loader': 'CSS',
  'postcss-loader': 'CSS',
  'sass-loader': 'CSS',
  'style-loader': 'CSS',
  'stylus-loader': 'CSS',
};
const communityPackages = [{
  name: 'svg-chunk-webpack-plugin',
  contributors: ['yoriiis', 'alexander-akait']
}, {
  name: 'chunks-webpack-plugin',
  contributors: ['yoriiis', 'alexander-akait']
}];

async function main() {
  for (const type of types) {
    const outputDir = pathMap[type];

    await mkdirp(outputDir);

    /** @type string[] */
    const repos = JSON.parse(
      await readFile(path.resolve(__dirname, `../../repositories/${type}.json`))
    );

    for (const repo of repos) {
      const [owner, packageName] = repo.split('/');

      const response = await api.repos.get({
        owner,
        repo: packageName,
      });

      const defaultBranch =  response.data.default_branch;
      const url = `https://raw.githubusercontent.com/${repo}/${defaultBranch}/README.md`;
      const htmlUrl = `https://github.com/${repo}`;
      const editUrl = `${htmlUrl}/edit/${defaultBranch}/README.md`;
      const fileName = path.resolve(outputDir, `_${packageName}.mdx`);

      let title = packageName;

      if (type === 'plugins') {
        title = _.camelCase(title);
        title = _.upperFirst(title);
        title = title.replace(/I18N/, 'I18n');
      }

      // generate yaml matter for file
      let headmatter;

      if (type === 'plugins') {
        let group = 'webpack contrib';
        let contributors = [];
        const packageFromCommunity = communityPackages.find((item) => item.name === packageName);
        if (packageFromCommunity) {
            group = 'Community';
            contributors = packageFromCommunity.contributors;
        }
        headmatter = yamlHeadmatter({
          title: title,
          group,
          contributors,
          source: url,
          edit: editUrl,
          repo: htmlUrl,
          thirdParty: true,
        });
      } else {
        let basic = {
          title: title,
          source: url,
          edit: editUrl,
          repo: htmlUrl,
          thirdParty: true,
        };

        if (loaderGroup[packageName]) {
          basic.group = loaderGroup[packageName];
        }
        headmatter = yamlHeadmatter(basic);
      }

      const { data: content } = await api.repos.getReadme({
        owner,
        repo: packageName,
        mediaType: {
          format: 'raw',
        },
      });
      const body = processReadme(content, { source: url });
      await writeFile(fileName, headmatter + body);
      console.log('Generated:', path.relative(cwd, fileName));
    }
  }
}

main();
