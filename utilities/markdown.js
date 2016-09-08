'use strict';
var marked = require('marked');

module.exports = function(section) {
  // alter marked renderer to add slashes to beginning so images point at root
  // leanpub expects images without slash...
  section = section ? '/' + section + '/' : '/';

  var renderer = new marked.Renderer();

  renderer.image = function(href, title, text) {
    return '<img src="' + section + href + '" alt="' + text + '">';
  };

  // patch ids (this.options.headerPrefix can be undefined!)
  renderer.heading = function(text, level, raw) {
    var id = raw.toLowerCase().replace(/`/g, '').replace(/[^\w]+/g, '-');

    return '<h'
      + level
      + ' class="header">'
      + '<a class="header-anchor" href="#' + id + '" id="' + id + '"></a>'
      + '<span class="text">'
      + text
      + '</span><a class="header-anchor-select" href="#' + id + '">#</a>'
      + '</h'
      + level
      + '>\n';
  };

  var codeTemplate = renderer.code;
  renderer.code = function(code, lang, escaped) {
    if(lang === 'js-with-links') {
      var links = [];
      code = code.replace(/\[(.+?)\]\((.+?)\)/g, match => {
        match = /\[(.+?)\]\((.+?)\)/.exec(match);
        links.push('<a class="code-link" href="' + match[2] + '">' + match[1] + '</a>');
        return "MARKDOWNLINK_" + (links.length - 1) + "_";
      });
      var rendered = codeTemplate.call(this, code, "js", escaped);
      rendered = rendered.replace(/MARKDOWNLINK_(\d+)_/g, match => {
        var idx = +(/MARKDOWNLINK_(\d+)_/.exec(match)[1]);
        return links[idx];
      });
      return rendered;
    }
    return codeTemplate.call(this, code, lang, escaped);
  };

  return {
    process: function(content, highlight) {
      var markedDefaults = {
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        sanitizer: null,
        mangle: true,
        smartLists: false,
        silent: false,
        highlight: highlight || false,
        langPrefix: 'lang-',
        smartypants: false,
        headerPrefix: '',
        renderer: renderer,
        xhtml: false
      };
      
      var tokens = parseQuotes(content);

      return marked.parser(tokens, markedDefaults);
    }
  };
};

function parseQuotes(data) {
  var tokens = marked.lexer(data).map(function(t) {
    if (t.type === 'paragraph') {
      return parseCustomQuote(t, 'T>', 'tip') ||
        parseCustomQuote(t, 'W>', 'warning') ||
        parseCustomQuote(t, '?>', 'todo') ||
        t;
    }

    return t;
  });

  tokens.links = [];

  return tokens;
}

function parseCustomQuote(token, match, className) {
  if (token.type === 'paragraph') {
    var text = token.text;

    if (text.indexOf(match) === 0) {
      var icon;
      switch(className) {
        case 'tip':
          icon = 'icon-info tip-icon';
          break;
        case 'warning':
          icon = 'icon-warning tip-icon';
          break;
        default:
          icon = 'icon-chevron-right tip-icon';
          break;
      }

      return {
        type: 'html',
        text: '<blockquote class="' + className + '"><i class="' + icon + '"></i>' + text.slice(2).trim() + '</blockquote>',
      };
    }
  }
}
