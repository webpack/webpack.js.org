'use strict';
var Prism = require('prismjs');
var languages = require('prism-languages');

var highlight = Prism.highlight;

module.exports = function(code, language) {
  try {
    language = language || 'bash';

    return highlight(code, languages[language]);
  }
  catch(err) {
    console.warn('Failed to highlight', language, code, err);
  }

  return code;
};
