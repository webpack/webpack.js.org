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

    return `<h${level} class="header">` +
      `<a class="anchor" href="#${id}" id="${id}"></a>` +
      `<span class="text">${text}</span>` +
      `<a class="icon-link" href="#${id}"></a>` +
      `</h${level}>\n`;
  };

  var codeTemplate = renderer.code;
  renderer.code = function(code, lang, escaped) {
    if(lang === "stats") {
      var rows = code.split("\n").filter(Boolean).map(function(line) {
        line = line.split("|");
        var githubProject = line[0];
        var npmPackage = line[1];
        var responsible = line[2];
        var comment = line[3];
        function shield(content, label) {
          return "<img src='//img.shields.io/" + content + ".svg?label=" + label + "&style=flat-square&maxAge=3600'>";
        }
        var cells = [
          "<a href='https://github.com/" + githubProject + "'>" + githubProject + "</a>",
          shield("npm/dm/" + npmPackage, "npm") + " " +
          shield("github/stars/" + githubProject, "★"),
          shield("github/commits-since/" + githubProject + "/" + encodeURIComponent("master@{6 months ago}"), "6m") + " " +
          shield("github/commits-since/" + githubProject + "/" + encodeURIComponent("master@{3 months ago}"), "3m") + " " +
          shield("github/commits-since/" + githubProject + "/" + encodeURIComponent("master@{1 month ago}"), "1m") + " " +
          shield("github/commits-since/" + githubProject + "/" + encodeURIComponent("master@{1 week ago}"), "1w"),
          shield("github/issues-raw/" + githubProject, "issues") + " " +
          shield("github/issues-pr-raw/" + githubProject, "prs"),
          responsible && ("<a href='https://github.com/" + responsible + "'>" +
            "<img src='https://github.com/" + responsible + ".png?size=20'> <span style='vertical-align: top'>@" + responsible + "</span></a>"),
          comment
        ];
        return "<tr><td>" + cells.join("</td><td>") + "</td></tr>";
      });
      var thead = "<thead><tr><th>project</th><th>downloads/stars</th><th>activity</th><th>issues/prs</th><th>responsible</th><th>comment</th></tr></thead>";
      return "<table>" + thead + "<tbody>" + rows.join("") + "</tbody></table>";
    }
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
      code = code.replace(/\[([^\[\]]+?)\]\((.+?)\)/g, match => {
        match = /\[([^\[\]]+?)\]\((.+?)\)/.exec(match);
        links.push('<a class="code-link" href="' + match[2] + '">' + match[1] + '</a>');
        return "MARKDOWNLINK_" + (links.length - 1) + "_";
      });
    }
    if(detailsEnabled) {
      code = code.replace(/<details>/g, "MARKDOWNDETAILSSTART\n");
      code = code.replace(/ *<\/details>(\n)?/g, "\nMARKDOWNDETAILSEND\n");
      code = code.replace(/<summary>/g, "\nMARKDOWNSUMMARYSTART\n");
      code = code.replace(/ *<\/summary>/g, "\nMARKDOWNSUMMARYEND");
      code = code.replace(/(?:)?( *)MARKDOWNDETAILSSTART([\s\S]*?)MARKDOWNSUMMARYSTART\n/g, "MARKDOWNDETAILSSTART$2MARKDOWNSUMMARYSTART\n$1");
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
      rendered = rendered.replace(/\n.*?MARKDOWNSUMMARYSTART.*?\n/g, "<summary><span class='code-details-summary-span'>");
      rendered = rendered.replace(/\n.*?MARKDOWNSUMMARYEND.*?\n/g, "</span></summary>");
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
    },

    // Note that this should correspond with renderer.heading
    getAnchors: function(content) {
      return marked.lexer(content)
        .filter(chunk => chunk.type === 'heading')
        .map(chunk => ({
          title: chunk.text.replace(/`/g, ''),
          id: chunk.text.toLowerCase().replace(/`/g, '').replace(/[^\w]+/g, '-')
        }));
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
          icon = 'icon-info';
          break;
        case 'warning':
          icon = 'icon-warning';
          break;
        default:
          icon = 'icon-chevron-right';
          break;
      }

      return {
        type: 'html',
        text: `<blockquote class="${className}">` +
          `<div class="tip-title"><i class="tip-icon ${icon}"></i>${className}</div>` +
          text.slice(2).trim() +
          '</blockquote>'
      };
    }
  }
}
