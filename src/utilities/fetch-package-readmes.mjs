import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import mkdirp from 'mkdirp';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

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

async function main() {
  for (const type of types) {
    const outputDir = pathMap[type];

    await mkdirp(outputDir);

    const repos = JSON.parse(
      await readFile(path.resolve(__dirname, `../../repositories/${type}.json`))
    );

    for (const repo of repos) {
      const [, packageName] = repo.split('/');
      const url = `https://raw.githubusercontent.com/${repo}/master/README.md`;
      const htmlUrl = `https://github.com/${repo}`;
      const editUrl = `${htmlUrl}/edit/master/README.md`;
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
        headmatter = yamlHeadmatter({
          title: title,
          group: 'webpack contrib',
          source: url,
          edit: editUrl,
          repo: htmlUrl,
        });
      } else {
        // TODO we need other categories for loaders
        headmatter = yamlHeadmatter({
          title: title,
          source: url,
          edit: editUrl,
          repo: htmlUrl,
        });
      }

      const response = await fetch(url);
      const content = await response.text();
      const body = processReadme(content, { source: url });
      await writeFile(fileName, headmatter + body);
      console.log('Generated:', path.relative(cwd, fileName));
    }
  }
}

main();
