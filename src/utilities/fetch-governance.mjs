import fs from 'fs';
import path from 'path';
import { mkdirp } from 'mkdirp';
import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import api from './githubAPI.mjs';
import yamlHeadmatter from './yaml-headmatter.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const owner = 'webpack';
const repo = 'governance';

// Output directory for governance content
const outputDir = path.resolve(__dirname, '../content/contribute/Governance');

// Mapping GitHub files to local filenames
const fileMap = {
  'README.md': 'index.mdx',
  'CHARTER.md': 'charter.mdx',
  'MEMBER_EXPECTATIONS.md': 'member-expectations.mdx',
  'MODERATION_POLICY.md': 'moderation-policy.mdx',
  'WORKING_GROUPS.md': 'working-groups.mdx',
};

// Generate title for frontmatter
function generateTitle(filename) {
  if (filename === 'README.md') return 'Governance';
  return filename
    .replace('.md', '')
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Helper to get slug from filename
function destSlugFromFilename(destFile) {
  const name = path.basename(destFile, path.extname(destFile));
  return name.toLowerCase() === 'index' ? '/' : `/${name}/`;
}

// Replace related section block in index
function replaceRelatedSection(indexContent, relatedBlock) {
  const startMarker = '{/* GOV-RELATED-START */}';
  const endMarker = '{/* GOV-RELATED-END */}';
  const regex = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`, 'm');
  const wrappedBlock = `${startMarker}\n${relatedBlock}\n${endMarker}`;
  return regex.test(indexContent)
    ? indexContent.replace(regex, wrappedBlock)
    : `${indexContent}\n\n${wrappedBlock}\n`;
}

async function fetchGovernanceDocs() {
  console.log('Fetching governance markdown files from webpack/governance...');

  await mkdirp(outputDir);

  try {
    const { data: files } = await api.repos.getContent({
      owner,
      repo,
      path: '',
    });
    const markdownFiles = files.filter((file) => file.name.endsWith('.md'));

    for (const file of markdownFiles) {
      const filename = file.name;
      const destFile = fileMap[filename];
      if (!destFile) continue;

      const response = await fetch(file.download_url);
      const content = await response.text();
      const title = generateTitle(filename);

      const sortOrder =
        {
          'README.md': 0,
          'CHARTER.md': 1,
          'MEMBER_EXPECTATIONS.md': 2,
          'MODERATION_POLICY.md': 3,
          'WORKING_GROUPS.md': 4,
        }[filename] ?? 10;

      // Build frontmatter object: only add group for the index (README.md)
      const fm = {
        title,
        sort: sortOrder,
        source: `https://github.com/${owner}/${repo}/blob/main/${filename}`,
        edit: `https://github.com/${owner}/${repo}/edit/main/${filename}`,
      };

      if (filename === 'README.md') fm.group = 'Contribute';

      const frontmatter = yamlHeadmatter(fm);
      await writeFile(
        path.join(outputDir, destFile),
        frontmatter + content,
        'utf8'
      );
      console.log(`Synced: ${filename}`);
    }

    // Ensure index.mdx exists and is properly formatted
    const indexPath = path.resolve(outputDir, 'index.mdx');
    let indexContent = '';

    try {
      indexContent = fs.readFileSync(indexPath, 'utf8');
    } catch {
      indexContent =
        '---\n' +
        'title: Governance\n' +
        'group: Contribute\n' +
        'directory: true\n' +
        'sort: 0\n' +
        '---\n\n' +
        '# Governance\n\n';
      console.log('Created fallback index.mdx with metadata.');
    }

    const relatedItems = Object.entries(fileMap)
      .filter(([key]) => key !== 'README.md')
      .map(([key, dest]) => {
        const title = generateTitle(key);
        const slug = destSlugFromFilename(dest);
        return `- [${title}](/contribute/Governance${slug})`;
      })
      .join('\n');

    const relatedBlock = `## Related Documents\n\n${relatedItems}\n`;
    fs.writeFileSync(
      indexPath,
      replaceRelatedSection(indexContent, relatedBlock),
      'utf8'
    );
    console.log('Updated index.mdx with related governance links.');

    console.log('Governance content successfully synced.');
  } catch (error) {
    console.error('Error fetching governance files:', error.message);
    process.exitCode = 1;
  }
}

fetchGovernanceDocs();
