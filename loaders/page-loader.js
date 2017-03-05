const _ = require('lodash');
const frontmatter = require('front-matter');
const loaderUtils = require('loader-utils');
const markdown = require('../utilities/markdown');
const highlight = require('../utilities/highlight');

module.exports = function (source) {
  const result = frontmatter(source);

  result.attributes = result.attributes || {};
  result.attributes.anchors = markdown().getAnchors(result.body);
  result.attributes.contributors = (result.attributes.contributors || []).sort();
  result.attributes.related = Array.isArray(result.attributes.related) ? result.attributes.related : [];
  result.body = markdown().process(result.body, highlight);

  delete result.frontmatter;

  const context = this;

  return `module.exports = ${JSON.stringify(result)};`.replace(
    /__IMG_START__([^,\]]+)__IMG_END__/g, (match, src) => {
      if (_.startsWith(src, 'http')) {
        return src;
      }

      return `" + require(${loaderUtils.stringifyRequest(context, src)}) + "`;
    }
  );
};
