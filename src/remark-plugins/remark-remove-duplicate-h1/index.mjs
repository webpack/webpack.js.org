import frontMatter from "front-matter";

/**
 * Extracts plain text content from a node and its children.
 */
function extractText(node) {
  if (node.type === "text") return node.value;
  if (node.children) return node.children.map(extractText).join("");
  return "";
}

/**
 * Remark plugin that removes a leading H1 heading from MDX content when its
 * text matches the page's frontmatter `title` (case-insensitive).
 *
 * This prevents duplicate headings on pages where both the MDX content
 * contains an H1 AND Page.jsx renders <h1>{title}</h1> from the frontmatter.
 *
 * Must be registered AFTER remark-frontmatter so the yaml AST node is present.
 */
export default function remarkRemoveDuplicateH1() {
  return function transformer(ast) {
    // Extract the title from the frontmatter yaml node
    let title = null;
    for (const node of ast.children) {
      if (node.type === "yaml") {
        try {
          const { attributes } = frontMatter(`---\n${node.value}\n---`);
          if (attributes && attributes.title) {
            title = String(attributes.title).trim().toLowerCase();
          }
        } catch {
          // Ignore malformed frontmatter
        }
        break;
      }
    }

    if (!title) return;

    // Find the first h1 heading and remove it if its text matches the title
    for (let i = 0; i < ast.children.length; i++) {
      const node = ast.children[i];
      if (node.type === "heading" && node.depth === 1) {
        const headingText = extractText(node).trim().toLowerCase();
        if (headingText === title) {
          ast.children.splice(i, 1);
        }
        // Only inspect the very first h1 — stop regardless
        break;
      }
    }
  };
}
