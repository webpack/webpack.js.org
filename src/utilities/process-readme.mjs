import { excludedLoaders, excludedPlugins } from "./constants.mjs";

const beginsWithDocsDomainRegex = /^(?:https?:)\/\/webpack\.js\.org/;
const inlineLinkRegex = /\[[^\]]*\]\(([^)]+)\)/g;

const fragmentLinkMap = {
  "/api/module-variables/#__webpack_public_path__-webpack-specific-":
    "/api/module-variables/#__webpack_public_path__-webpack-specific",
  "/configuration/module/#rule-exclude": "/configuration/module/#ruleexclude",
  "/configuration/module/#rule-include": "/configuration/module/#ruleinclude",
  "/configuration/module/#rule-options-rule-query":
    "/configuration/module/#ruleoptions--rulequery",
  "/configuration/module/#rule-use": "/configuration/module/#ruleuse",
  "/configuration/optimization/#optimization-concatenatemodules":
    "/configuration/optimization/#optimizationconcatenatemodules",
  "/configuration/output/#output-chunkfilename":
    "/configuration/output/#outputchunkfilename",
  "/configuration/output/#output-publicpath":
    "/configuration/output/#outputpublicpath",
  "/configuration/resolve/#resolve-modules":
    "/configuration/resolve/#resolvemodules",
  "/guides/shimming/#exports-loader": "/loaders/exports-loader",
  "/guides/shimming/#imports-loader": "/loaders/imports-loader",
  "/guides/shimming/#provideplugin": "/plugins/provide-plugin/",
};

function linkFixerFactory(sourceUrl) {
  return function linkFixer(markdownLink, href) {
    const oldHref = href;

    if (href.includes("//npmjs.com")) {
      href = href.replace("//npmjs.com", "//www.npmjs.com");
    }

    // Only resolve non-absolute urls from their source if they are not a document fragment link
    if (!href.startsWith("#")) {
      // Convert Github raw links to rendered links
      const renderedUrl = sourceUrl
        .replace(/raw.githubusercontent.com/, "github.com")
        .replace(/master/, "blob/master");

      href = new URL(href, renderedUrl).href;
    }

    // Modify absolute documentation links to be root relative
    if (beginsWithDocsDomainRegex.test(href)) {
      href = href.replace(beginsWithDocsDomainRegex, "");
    }

    const fragmentLinkMapMatch = Object.keys(fragmentLinkMap).find((mapFrom) =>
      href.includes(mapFrom),
    );
    if (fragmentLinkMapMatch) {
      href = href.replace(
        fragmentLinkMapMatch,
        fragmentLinkMap[fragmentLinkMapMatch],
      );
      console.error(`DEPRECATED EXTERNAL README LINK:
  URL: ${sourceUrl}
  ACTUAL: ${oldHref}
  EXPECTED: ${oldHref.replace(
    fragmentLinkMapMatch,
    fragmentLinkMap[fragmentLinkMapMatch],
  )}`);
    }

    // Lowercase all fragment links, since markdown generators do the same
    if (href.includes("#")) {
      const [urlPath, urlFragment] = href.split("#");

      href = `${urlPath}#${urlFragment.toLowerCase()}`;
    }

    if (oldHref !== href) {
      console.log("REWRITE URL:", oldHref, "-->", href);
    }

    return markdownLink.replaceAll(oldHref, href);
  };
}

function getMatches(string, regex) {
  const matches = [];
  let match;

  while ((match = regex.exec(string))) {
    matches.push(match);
  }
  return matches;
}

// A README may link to a repository the site builds no page for, because the
// repository was renamed or moved after that README was written. `repos` is the
// list the pages are generated from, so a package missing from it keeps its
// GitHub link, which redirects, rather than becoming a link to a page that does
// not exist. Rewrite everything when no list is given.
function hasPage(repos, packageName) {
  if (!Array.isArray(repos)) {
    return true;
  }

  return repos.some(
    (repo) => repo.slice(repo.indexOf("/") + 1) === packageName,
  );
}

export default function processREADME(body, options = {}) {
  let processingString = body
    // close <img> tags
    .replaceAll(
      /<(img\s[^>]*?src\s*=\s*['"][^'"]*?['"][^>/]*?)>(?![^<]*<\/img)/g,
      "<$1/>",
    )
    // Replace lone h1 formats
    .replace(/<h1.*?>.+?<\/h1>/, "")
    .replace(/^# .+/m, "")
    .replace(/.*\n=+/, "")
    // Replace local github links with absolute links to the github location
    // EXAMPLE: [Contributing](./.github/CONTRIBUTING.md)
    // EXAMPLE: [Contributing](CONTRIBUTING.md)
    // EXAMPLE: [line-identifier]: https://webpack.js.org/loaders/
    // EXAMPLE: [`./src/config.d.ts`](./src/config.d.ts)
    .replaceAll(inlineLinkRegex, linkFixerFactory(options.source))
    // Replace any <h2> with `##`
    .replaceAll(/<h2[^>]*>/g, "## ")
    .replaceAll("</h2>", "");

  // Drop any comments that are not in code blocks
  // EXAMPLE: <!-- some comment --> should be dropped
  // EXAMPLE: `<!-- webpackIgnore: true -->` should  not be dropped
  // EXAMPLE: ```html <!-- webpackIgnore: true -->  <!-- some comment -->``` should not be dropped
  processingString = processingString.replaceAll(
    /<!--[\s\S]*?-->/g,
    (match) => {
      const codeBlockPattern = /```([\s\S]*?)```|`([\s\S]*?)`/g;
      const contents = [];
      let matches;
      while ((matches = codeBlockPattern.exec(processingString)) !== null) {
        // Content inside triple backticks
        if (matches[1] !== undefined) {
          contents.push(matches[1]);
        }
        // Content inside single backticks
        else if (matches[2] !== undefined) {
          contents.push(matches[2]);
        }
      }

      // If the comment is inside a code block, return the match
      if (contents.join("").includes(match)) {
        return match;
      }

      return "";
    },
  );

  // find the loaders links
  const loaderMatches = getMatches(
    processingString,
    /https?:\/\/github.com\/(webpack|webpack-contrib)\/([-A-za-z0-9]+-loader\/?)([)"])/g,
  );
  // dont make relative links for excluded loaders
  for (const match of loaderMatches) {
    const packageName = match[2].replace(/\/$/, "");

    if (
      !excludedLoaders.includes(`${match[1]}/${packageName}`) &&
      hasPage(options.loaders, packageName)
    ) {
      processingString = processingString.replace(
        match[0],
        `/loaders/${packageName}/)`,
      );
    }
  }

  const pluginMatches = getMatches(
    processingString,
    /https?:\/\/github.com\/(webpack|webpack-contrib)\/([-A-za-z0-9]+-plugin\/?)([)"])/g,
  );
  // dont make relative links for excluded loaders
  for (const match of pluginMatches) {
    const packageName = match[2].replace(/\/$/, "");

    if (
      !excludedPlugins.includes(`${match[1]}/${packageName}`) &&
      hasPage(options.plugins, packageName)
    ) {
      processingString = processingString.replace(
        match[0],
        `/plugins/${packageName}/)`,
      );
    }
  }

  return processingString;
}
