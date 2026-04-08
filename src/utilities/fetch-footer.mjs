import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const ARTWORK_README_URL =
  'https://raw.githubusercontent.com/openjs-foundation/artwork/main/README.md';
const OUTPUT_PATH = path.resolve(
  'src/components/Footer/_footer-legal.json'
  );

async function fetchFooter() {
  console.log('Fetching OpenJS Foundation footer template...');

const response = await fetch(ARTWORK_README_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch artwork README: ${response.status}`);
  }
  const readme = await response.text();

// Extract the HTML block under "### HTML"
const htmlSectionMatch = readme.match(
  /### HTML\s*\n+```html\s*\n([\s\S]*?)\n```/
  );

if (!htmlSectionMatch) {
  throw new Error(
    'Could not find HTML footer template in artwork README'
    );
}

const html = htmlSectionMatch[1].trim();

// Parse links from the footer HTML
const linkRegex = /<a\s+href="([^"]+)">([^<]+)<\/a>/g;
  const paragraphs = html.split('</p>');

// Second paragraph contains the links bar
const linksSection = paragraphs.length > 1 ? paragraphs[1] : '';
  const links = [];
  let match;
  while ((match = linkRegex.exec(linksSection)) !== null) {
    links.push({ url: match[1], label: match[2] });
  }

const data = { links };

await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, JSON.stringify(data, null, 2));

console.log(`Footer data written to ${OUTPUT_PATH}`);
  console.log(`Found ${links.length} footer links`);
}

fetchFooter().catch((err) => {
  console.error('Error fetching footer:', err);
  process.exit(1);
});
