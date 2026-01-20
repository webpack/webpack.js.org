import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mkdirp } from "mkdirp";
import api from "./githubAPI.mjs";
import yamlHeadmatter from "./yaml-headmatter.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const owner = "webpack";
const repo = "governance";

// Output directly under /contribute (no Governance subfolder)
const outputDir = path.resolve(__dirname, "../content/contribute");

// Generate readable title from filename
function generateTitle(filename) {
  if (filename === "README.md") return "Governance Overview";
  return filename
    .replace(".md", "")
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .toLowerCase()
    .replaceAll(/\b\w/g, (char) => char.toUpperCase());
}

// Fix internal markdown links (.md → /)
function fixMarkdownLinks(content) {
  return content.replaceAll(/(\]\([A-Z0-9_-]+)\.md(\))/gi, "$1/$2");
}

console.log("Fetching governance markdown files from webpack/governance...");

await mkdirp(outputDir);

try {
  // Get markdown files from governance repo
  const { data: files } = await api.repos.getContent({
    owner,
    repo,
    path: "",
  });

  const markdownFiles = files.filter((file) => file.name.endsWith(".md"));

  for (const file of markdownFiles) {
    const filename = file.name;

    // Create Capitalized prefixed filenames
    const baseName = filename
      .replace(".md", "")
      .replaceAll("_", "-")
      .toLowerCase();

    const destFile =
      filename === "README.md"
        ? "Governance-Overview.mdx"
        : `Governance-${baseName}.mdx`;

    // Fetch content from GitHub and fix markdown links
    const response = await fetch(file.download_url);
    let content = await response.text();
    content = fixMarkdownLinks(content);

    // Generate title and sorting order
    const title = generateTitle(filename);
    const sortOrder =
      {
        "README.md": 0,
        "CHARTER.md": 1,
        "MEMBER_EXPECTATIONS.md": 2,
        "MODERATION_POLICY.md": 3,
        "WORKING_GROUPS.md": 4,
      }[filename] ?? 10;

    // Build YAML frontmatter
    const fm = {
      title,
      group: "Contribute",
      sort: sortOrder,
      source: `https://github.com/${owner}/${repo}/blob/main/${filename}`,
      edit: `https://github.com/${owner}/${repo}/edit/main/${filename}`,
    };

    const frontmatter = yamlHeadmatter(fm);

    // Write .mdx file
    const destPath = path.join(outputDir, destFile);
    await writeFile(destPath, frontmatter + content, "utf8");
    console.log(`Synced: ${filename} → ${destFile}`);
  }

  console.log(
    "\nGovernance content generated successfully with Capitalized prefix!",
  );
} catch (error) {
  console.error("Error fetching governance files:", error.message);
  process.exitCode = 1;
}
