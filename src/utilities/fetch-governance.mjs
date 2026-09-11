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

// Output directly under /contribute (no Governance subfolder). The pages are
// grouped under their own "Governance" heading in that section's sidebar, which
// is what `group` below controls.
const outputDir = path.resolve(__dirname, "../content/contribute");

// Words to keep upper-cased in titles, so AI_POLICY.md reads "AI Policy"
// rather than "Ai Policy". Listed explicitly rather than detected by length,
// which would also catch ordinary words like "CODE" and "OF".
const ACRONYMS = new Set(["AI", "API", "CLI", "FAQ", "OSS", "TSC"]);

// Generate readable title from filename
function generateTitle(filename) {
  if (filename === "README.md") return "Governance Overview";
  return filename
    .replace(".md", "")
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .split(" ")
    .map((word) =>
      ACRONYMS.has(word.toUpperCase())
        ? word.toUpperCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join(" ");
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

    // Generate title and sorting order. These sit above the range the
    // hand-written /contribute pages use, so the governance docs stay one
    // contiguous block below them instead of interleaving with the guides.
    const title = generateTitle(filename);
    const sortOrder =
      {
        "README.md": 100,
        "CHARTER.md": 101,
        "MEMBER_EXPECTATIONS.md": 102,
        "MODERATION_POLICY.md": 103,
        "WORKING_GROUPS.md": 104,
        "AI_POLICY.md": 105,
      }[filename] ?? 199;

    // Build YAML frontmatter
    const fm = {
      title,
      group: "Governance",
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
    "Governance content generated successfully with Capitalized prefix!",
  );
} catch (error) {
  console.error("Error fetching governance files:", error.message);
  process.exitCode = 1;
}
