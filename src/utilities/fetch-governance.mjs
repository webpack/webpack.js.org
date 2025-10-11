import fs from 'fs';
import path from 'path';
import { mkdirp } from 'mkdirp';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import api from './githubAPI.mjs';
import yamlHeadmatter from './yaml-headmatter.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const writeFile = promisify(fs.writeFile);

const owner = 'webpack';
const repo = 'governance';

// Local output directory inside webpack.js.org
const outputDir = path.resolve(__dirname, '../content/contribute/governance');

// Map source files to destination filenames
const fileMap = {
  'README.md': 'index.mdx',
  'CHARTER.md': 'charter.mdx',
  'MEMBER_EXPECTATIONS.md': 'member-expectations.mdx',
  'MODERATION_POLICY.md': 'moderation-policy.mdx',
  'WORKING_GROUPS.md': 'working-groups.mdx',
};

// Generate frontmatter titles automatically
function generateTitle(filename) {
  if (filename === 'README.md') return 'Governance Overview';
  return filename
    .replace('.md', '')
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

async function fetchGovernanceDocs() {
  console.log(
    '📦 Fetching governance markdown files from webpack/governance...\n'
  );

  await mkdirp(outputDir);

  try {
    // Get list of files in the governance repo
    const { data: files } = await api.repos.getContent({
      owner,
      repo,
      path: '',
    });

    // Filter markdown files
    const markdownFiles = files.filter((file) => file.name.endsWith('.md'));

    for (const file of markdownFiles) {
      const filename = file.name;
      const destFile = fileMap[filename];

      if (!destFile) {
        console.log(`Skipping ${filename} — not mapped`);
        continue;
      }

      const rawUrl = file.download_url;
      const response = await fetch(rawUrl);
      const content = await response.text();

      // Add YAML frontmatter
      const title = generateTitle(filename);
      const frontmatter = yamlHeadmatter({
        title,
        source: `https://github.com/${owner}/${repo}/blob/main/${filename}`,
        edit: `https://github.com/${owner}/${repo}/edit/main/${filename}`,
      });

      const finalContent = frontmatter + content;

      const destPath = path.join(outputDir, destFile);
      await writeFile(destPath, finalContent, 'utf8');

      console.log(
        `Synced: ${filename} → ${path.relative(process.cwd(), destPath)}`
      );
    }

    console.log('\n Governance content successfully synced!');
  } catch (error) {
    console.error('Error fetching governance files:', error.message);
    process.exitCode = 1;
  }
}

fetchGovernanceDocs();
