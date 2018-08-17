const url = require('url');

const beginsWithDocsDomainRegex = /^https?:\/\/webpack\.js\.org/;

const redirects = {
  '/guides/migrating/#json-loader-is-not-required-anymore': '/migrate/3#json-loader-is-not-required-anymore'
};

module.exports = function processREADME(body, options = {}) {
  return body
    .replace(/[^]*?<div align="center">([^]*?)<\/div>/, (match, content) => {
      let parsed = content.match(/<p>([^]*?)<\/?p>/);
      return parsed ? parsed[1] : '';
    })
    // Replace lone h1 formats
    .replace(/<h1.*?>.+?<\/h1>/, '')
    .replace(/# .+/, '')
    .replace(/.*\n=+/, '')
    // Replace local github links with absolute links to the github location
    // EXAMPLE: [Contributing](./.github/CONTRIBUTING.md)
    // EXAMPLE: [Contributing](CONTRIBUTING.md)
    .replace(/\[([^\]]*)\]\(([^)]+)\)/g, (markdownLink, content, href) => {
      const oldHref = href;

      if (href.includes('//npmjs.com')) {
        href = href.replace('//www.npmjs.com');
      }

      if (!href.startsWith('#')) {
        href = url.resolve(options.source, href);
      }

      // Modify absolute documenation links to be root relative
      if (beginsWithDocsDomainRegex.test(href)) {
        href = href.replace(beginsWithDocsDomainRegex, '');
      }

      if (href in redirects) {
        href = redirects[href];
      }

      if (oldHref !== href) {
        console.log('REWRITE URL:', oldHref, '-->', href);
      }

      return `[${content}](${href})`;
    })
    // Modify links to keep them within the site
    .replace(/https?:\/\/github.com\/(webpack|webpack-contrib)\/([-A-za-z0-9]+-loader\/?)([)"])/g, '/loaders/$2/$3')
    .replace(/https?:\/\/github.com\/(webpack|webpack-contrib)\/([-A-za-z0-9]+-plugin\/?)([)"])/g, '/plugins/$2/$3')
    // Replace any <h2> with `##`
    .replace(/<h2[^>]*>/g, '## ')
    .replace(/<\/h2>/g, '')
    // Drop any comments
    .replace(/<!--[\s\S]*?-->/g, '');
};
