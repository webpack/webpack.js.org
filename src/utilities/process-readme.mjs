import url from 'url';
import { excludedLoaders, excludedPlugins } from './constants.mjs';

const beginsWithDocsDomainRegex = /^(?:https?:)\/\/webpack\.js\.org/;
const inlineLinkRegex = /\[[^\]]*\]\(([^)]+)\)/g;

const fragmentLinkMap = {
  '/api/module-variables/#__webpack_public_path__-webpack-specific-':
    '/api/module-variables/#__webpack_public_path__-webpack-specific',
  '/configuration/module/#rule-exclude': '/configuration/module/#ruleexclude',
  '/configuration/module/#rule-include': '/configuration/module/#ruleinclude',
  '/configuration/module/#rule-options-rule-query':
    '/configuration/module/#ruleoptions--rulequery',
  '/configuration/module/#rule-use': '/configuration/module/#ruleuse',
  '/configuration/optimization/#optimization-concatenatemodules':
    '/configuration/optimization/#optimizationconcatenatemodules',
  '/configuration/output/#output-chunkfilename':
    '/configuration/output/#outputchunkfilename',
  '/configuration/output/#output-publicpath':
    '/configuration/output/#outputpublicpath',
  '/configuration/resolve/#resolve-modules':
    '/configuration/resolve/#resolvemodules',
  '/guides/shimming/#exports-loader': '/loaders/exports-loader',
  '/guides/shimming/#imports-loader': '/loaders/imports-loader',
  '/guides/shimming/#provideplugin': '/plugins/provide-plugin/',
};

function linkFixerFactory(sourceUrl) {
  return function linkFixer(markdownLink, href) {
    const oldHref = href;

    if (href.includes('//npmjs.com')) {
      href = href.replace('//www.npmjs.com');
    }

    // Only resolve non-absolute urls from their source if they are not a document fragment link
    if (!href.startsWith('#')) {
      // Convert Github raw links to rendered links
      let rendered_url = sourceUrl
        .replace(/raw.githubusercontent.com/, 'github.com')
        .replace(/master/, 'blob/master');

      href = url.resolve(rendered_url, href);
    }

    // Modify absolute documentation links to be root relative
    if (beginsWithDocsDomainRegex.test(href)) {
      href = href.replace(beginsWithDocsDomainRegex, '');
    }

    const fragmentLinkMapMatch = Object.keys(fragmentLinkMap).find((mapFrom) =>
      href.includes(mapFrom)
    );
    if (fragmentLinkMapMatch) {
      href = href.replace(
        fragmentLinkMapMatch,
        fragmentLinkMap[fragmentLinkMapMatch]
      );
      console.error(`DEPRECATED EXTERNAL README LINK:
  URL: ${sourceUrl}
  ACTUAL: ${oldHref}
  EXPECTED: ${oldHref.replace(
    fragmentLinkMapMatch,
    fragmentLinkMap[fragmentLinkMapMatch]
  )}`);
    }

    // Lowercase all fragment links, since markdown generators do the same
    if (href.includes('#')) {
      const [urlPath, urlFragment] = href.split('#');

      href = `${urlPath}#${urlFragment.toLowerCase()}`;
    }

    if (oldHref !== href) {
      console.log('REWRITE URL:', oldHref, '-->', href);
    }

    return markdownLink.replace(oldHref, href);
  };
}

function getMatches(string, regex) {
  const matches = [];
  let match;
  // eslint-disable-next-line
  while ((match = regex.exec(string))) {
    matches.push(match);
  }
  return matches;
}

export default function processREADME(body, options = {}) {
  let processingString = body
    // close <img> tags
    .replace(
      /<(img\s[^>]*?src\s*=\s*['"][^'"]*?['"][^>/]*?)>(?![^<]*<\/img)/g,
      '<$1/>'
    )
    // Replace lone h1 formats
    .replace(/<h1.*?>.+?<\/h1>/, '')
    .replace(/^# .+/m, '')
    .replace(/.*\n=+/, '')
    // Replace local github links with absolute links to the github location
    // EXAMPLE: [Contributing](./.github/CONTRIBUTING.md)
    // EXAMPLE: [Contributing](CONTRIBUTING.md)
    // EXAMPLE: [line-identifier]: https://webpack.js.org/loaders/
    .replace(inlineLinkRegex, linkFixerFactory(options.source))
    // Replace any <h2> with `##`
    .replace(/<h2[^>]*>/g, '## ')
    .replace(/<\/h2>/g, '')
    // Drop any comments
    .replace(/<!--[\s\S]*?-->/g, '');

  // find the laoders links
  const loaderMatches = getMatches(
    processingString,
    /https?:\/\/github.com\/(webpack|webpack-contrib)\/([-A-za-z0-9]+-loader\/?)([)"])/g
  );
  // dont make relative links for excluded loaders
  loaderMatches.forEach((match) => {
    if (!excludedLoaders.includes(`${match[1]}/${match[2]}`)) {
      processingString = processingString.replace(
        match[0],
        `/loaders/${match[2]}/)`
      );
    }
  });

  const pluginMatches = getMatches(
    processingString,
    /https?:\/\/github.com\/(webpack|webpack-contrib)\/([-A-za-z0-9]+-plugin\/?)([)"])/g
  );
  // dont make relative links for excluded loaders
  pluginMatches.forEach((match) => {
    if (!excludedPlugins.includes(`${match[1]}/${match[2]}`)) {
      processingString = processingString.replace(
        match[0],
        `/plugins/${match[2]}/)`
      );
    }
  });

  return processingString;
}
