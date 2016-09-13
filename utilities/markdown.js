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
    var linksEnabled = false;
    var detailsEnabled = false;
    if(/-with-links/.test(lang)) {
      linksEnabled = true;
      lang = lang.replace(/-with-links/, "");
    }
    if(/-with-details/.test(lang)) {
      detailsEnabled = true;
      lang = lang.replace(/-with-details/, "");
    }
    var links = [];
    if(linksEnabled) {
      code = code.replace(/\[(.+?)\]\((.+?)\)/g, match => {
        match = /\[(.+?)\]\((.+?)\)/.exec(match);
        links.push('<a class="code-link" href="' + match[2] + '">' + match[1] + '</a>');
        return "MARKDOWNLINK_" + (links.length - 1) + "_";
      });
    }
    if(detailsEnabled) {
      code = code.replace(/<details>/g, "MARKDOWNDETAILSSTART\n");
      code = code.replace(/ *<\/details>(\n)?/g, "\nMARKDOWNDETAILSEND\n");
      code = code.replace(/<summary>/g, "\nMARKDOWNSUMMARYSTART\n");
      code = code.replace(/ *<\/summary>/g, "\nMARKDOWNSUMMARYEND");
      code = code.replace(/(?:{2})?( *)MARKDOWNDETAILSSTART([\s\S]*?)MARKDOWNSUMMARYSTART\n/g, "MARKDOWNDETAILSSTART$2MARKDOWNSUMMARYSTART\n$1");
    }
    var rendered = codeTemplate.call(this, code, lang, escaped);
    if(linksEnabled) {
      rendered = rendered.replace(/MARKDOWNLINK_(\d+)_/g, match => {
        var idx = +(/MARKDOWNLINK_(\d+)_/.exec(match)[1]);
        return links[idx];
      });
    }
    if(detailsEnabled) {
      rendered = rendered.replace(/MARKDOWNDETAILSSTART.*?\n/g, "<details>");
      rendered = rendered.replace(/\n.*?MARKDOWNDETAILSEND.*?\n/g, "</details>");
      rendered = rendered.replace(/\n.*?MARKDOWNSUMMARYSTART.*?\n/g, "<summary>");
      rendered = rendered.replace(/\n.*?MARKDOWNSUMMARYEND.*?\n/g, "</summary>");
    }
    return rendered;
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
