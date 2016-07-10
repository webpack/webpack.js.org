'use strict';
var Prism = require('prismjs');
var languages = require('prism-languages');

attachPrismHooks(Prism);

var highlight = Prism.highlight;

module.exports = function(code, language) {
  try {
    language = language || 'bash';

    return leanpubify(highlight(code, languages[language]));
  }
  catch(err) {
    console.warn('Failed to highlight', language, code, err);
  }

  return code;
};

function attachPrismHooks(Prism) {
  // detect leanpub specific syntax
  Prism.hooks.add('before-highlight', function(env) {
    env.code = env.code.replace(/leanpub-start-insert/ig, function(match) {
      return '_LEANPUB_START_INSERT';
    });

    env.code = env.code.replace(/leanpub-end-insert/ig, function(match) {
      return '_LEANPUB_END';
    });

    env.code = env.code.replace(/leanpub-start-delete/ig, function(match) {
      return '_LEANPUB_START_DELETE';
    });

    env.code = env.code.replace(/leanpub-end-delete/ig, function(match) {
      return '_LEANPUB_END';
    });
  });
}

function leanpubify(code) {
  return code.replace(/_LEANPUB_START_INSERT/g, '<div class="leanpub-insert">')
    .replace(/_LEANPUB_START_DELETE/g, '<div class="leanpub-delete">')
    .replace(/_LEANPUB_END/g, '</div>');
}

module.exports.leanpubify = leanpubify;
