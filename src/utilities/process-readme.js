const url = require('url');

const beginsWithDocsDomainRegex = /^(?:https?:)\/\/webpack\.js\.org/;
const inlineLinkRegex = /\[[^\]]*\]\(([^)]+)\)/g;
const externalLinkRegex = /^[ \t]*\[[^\]]+\]:[ \t]+([^ \n]+)/gm;

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
  '/guides/shimming/#provideplugin': '/plugins/provide-plugin/'
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

    const fragmentLinkMapMatch = Object.keys(fragmentLinkMap).find(mapFrom =>
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

module.exports = function processREADME(body, options = {}) {
  return (
    body
      .replace(/[^]*?<div align="center">([^]*?)<\/div>/, (match, content) => {
        let parsed = content.match(/<p>([^]*?)<\/?p>/);
        return parsed ? parsed[1] : '';
      })
      // Replace lone h1 formats
      .replace(/<h1.*?>.+?<\/h1>/, '')
      .replace(/^# .+/m, '')
      .replace(/.*\n=+/, '')
      // Replace local github links with absolute links to the github location
      // EXAMPLE: [Contributing](./.github/CONTRIBUTING.md)
      // EXAMPLE: [Contributing](CONTRIBUTING.md)
      // EXAMPLE: [line-identifier]: https://webpack.js.org/loaders/
      .replace(inlineLinkRegex, linkFixerFactory(options.source))
      .replace(externalLinkRegex, linkFixerFactory(options.source))
      // Modify links to keep them within the site
      .replace(
        /https?:\/\/github.com\/(webpack|webpack-contrib)\/([-A-za-z0-9]+-loader\/?)([)"])/g,
        '/loaders/$2/$3'
      )
      .replace(
        /https?:\/\/github.com\/(webpack|webpack-contrib)\/([-A-za-z0-9]+-plugin\/?)([)"])/g,
        '/plugins/$2/$3'
      )
      // Replace any <h2> with `##`
      .replace(/<h2[^>]*>/g, '## ')
      .replace(/<\/h2>/g, '')
      // Drop any comments
      .replace(/<!--[\s\S]*?-->/g, '')
  );
};
