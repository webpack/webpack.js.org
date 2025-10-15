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

// --- Helpers for index link generation ---

function destSlugFromFilename(destFile) {
  const name = path.basename(destFile, path.extname(destFile));
  if (name.toLowerCase() === 'index') return '/';
  return `/${name}/`;
}

function replaceRelatedSection(indexContent, relatedBlock) {
  const startMarker = '{/* GOV-RELATED-START */}';
  const endMarker = '{/* GOV-RELATED-END */}';
  const regex = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`, 'm');
  const wrappedBlock = `${startMarker}\n${relatedBlock}\n${endMarker}`;

  if (regex.test(indexContent)) {
    return indexContent.replace(regex, wrappedBlock);
  } else {
    return `${indexContent}\n\n${wrappedBlock}\n`;
  }
}

async function fetchGovernanceDocs() {
  console.log(
    'Fetching governance markdown files from webpack/governance...\n'
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
      // Add YAML frontmatter for better sidebar integration
      const title = generateTitle(filename);

      // Optional ordering logic for sidebar
      const sortOrder =
        {
          'README.md': 0,
          'CHARTER.md': 1,
          'MEMBER_EXPECTATIONS.md': 2,
          'MODERATION_POLICY.md': 3,
          'WORKING_GROUPS.md': 4,
        }[filename] ?? 10;

      const frontmatter = yamlHeadmatter({
        title,
        group: 'Governance',
        sort: sortOrder,
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

    // After all files are written: update index with related document links
    try {
      const indexPath = path.resolve(outputDir, 'index.mdx');
      let indexContent = '';

      try {
        indexContent = fs.readFileSync(indexPath, 'utf8');
      } catch (err) {
        indexContent =
          '---\ntitle: Governance Overview\n---\n\n# Governance Overview\n\n';
        console.log(err);
      }

      const relatedItems = Object.entries(fileMap)
        .filter(([key]) => key !== 'README.md')
        .map(([key, dest]) => {
          const title = generateTitle(key);
          const slug = destSlugFromFilename(dest);
          const url = `/contribute/governance${slug}`;
          return `- [${title}](${url})`;
        })
        .join('\n');

      const relatedBlock = `## Related Documents\n\n${relatedItems}\n`;
      const newIndex = replaceRelatedSection(indexContent, relatedBlock);

      fs.writeFileSync(indexPath, newIndex, 'utf8');
      console.log('Updated index.mdx with related governance links.');
    } catch (err) {
      console.error('Failed to update index links:', err);
    }

    console.log('\nGovernance content successfully synced!');
  } catch (error) {
    console.error('Error fetching governance files:', error.message);
    process.exitCode = 1;
  }
}

fetchGovernanceDocs();
