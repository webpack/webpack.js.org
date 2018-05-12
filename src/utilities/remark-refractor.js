const refractor = require('refractor/core.js');
const visit = require('unist-util-visit');
const languages = require('prism-languages');

refractor.register(require('refractor/lang/bash.js'));
refractor.register(require('refractor/lang/diff.js'));
refractor.register(require('refractor/lang/yaml.js'));
refractor.register(require('refractor/lang/json.js'));
refractor.register(require('refractor/lang/typescript.js'));
refractor.register(require('refractor/lang/nginx.js'));
refractor.register(require('refractor/lang/ruby.js'));

module.exports = function attacher({ include, exclude } = {}) {
  function visitor(node) {
    const { lang } = node;

    if (
      !lang ||
      (include && !~include.indexOf(lang)) ||
      (exclude && ~exclude.indexOf(lang))
    ) {
      return;
    }

    let { data } = node;

    if (!data) {
      node.data = data = {};
    }

    try {
      data.hChildren = refractor.highlight(node.value, lang);
    } catch (e) {
      if (!languages[lang]) {
        console.warn('Prism does not support this language: ', lang);
      } else {
        console.warn('Prism failed to highlight: ', e);
      }
    }

    data.hProperties = data.hProperties || {};
    data.hProperties.className = [
      'hljs',
      ...(data.hProperties.className || []),
      `language-${lang}`
    ];
  }

  return ast => visit(ast, 'code', visitor);
};
