'use strict';
var Prism = require('prismjs');
var languages = require('prism-languages');

var highlight = Prism.highlight;

module.exports = function(code, language) {
  language = language || 'bash';

  try {
    return highlight(code, languages[language]);

  } catch (error) {
    if (!languages[language]) {
      console.warn('Prism does not support this language: ', language);

    } else console.warn('Prism failed to highlight: ', error);
  }

  return code;
};
