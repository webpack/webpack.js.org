'use strict';
var marked = require('marked');

module.exports = function() {
  var renderer = new marked.Renderer();

  renderer.image = function(href, title, text) {
    return `<img src='${href}' alt='${text}'>`;
  };

  // Patch IDs (this.options.headerPrefix can be undefined!)
  renderer.heading = function(text, level, raw) {
    var parsed = parseAnchor(raw);
    var id = parsed.id;

    return (
      `<h${level} class='header'>
        <a class='anchor' aria-hidden='true' href='#${id}' id='${id}'></a>
        <span class='text'>${text}</span>
        <a aria-label='${text}' class='icon-link' href='#${id}'></a>
      </h${level}>\n`
    );
  };

  var codeTemplate = renderer.code;

  renderer.code = function(code, lang, escaped) {
    var linksEnabled = false;
    var detailsEnabled = false;
    var links = [];

    if (/-with-links/.test(lang)) {
      linksEnabled = true;
      lang = lang.replace(/-with-links/, '');
    }

    if (/-with-details/.test(lang)) {
      detailsEnabled = true;
      lang = lang.replace(/-with-details/, '');
    }

    if (linksEnabled) {
      code = code.replace(/\[([^[\]]+?)\]\((.+?)\)/g, match => {
        match = /\[([^[\]]+?)\]\((.+?)\)/.exec(match);
        links.push(`<a class="code-link" href="${match[2]}">${match[1]}</a>`);
        return `MARKDOWNLINK_${(links.length - 1)}_`;
      });
    }

    if (detailsEnabled) {
      code = code.replace(/<details>/g, 'MARKDOWNDETAILSSTART\n');
      code = code.replace(/ *<\/details>(\n)?/g, '\nMARKDOWNDETAILSEND\n');
      code = code.replace(/<summary>/g, '\nMARKDOWNSUMMARYSTART\n');
      code = code.replace(/ *<\/summary>/g, '\nMARKDOWNSUMMARYEND');
      code = code.replace(/(?:)?( *)MARKDOWNDETAILSSTART([\s\S]*?)MARKDOWNSUMMARYSTART\n/g, 'MARKDOWNDETAILSSTART$2MARKDOWNSUMMARYSTART\n$1');
    }

    var rendered = codeTemplate.call(this, code, lang, escaped);

    if (linksEnabled) {
      rendered = rendered.replace(/MARKDOWNLINK_(\d+)_/g, match => {
        var idx = +(/MARKDOWNLINK_(\d+)_/.exec(match)[1]);
        return links[idx];
      });
    }

    if (detailsEnabled) {
      rendered = rendered.replace(/MARKDOWNDETAILSSTART.*?\n/g, '<details>');
      rendered = rendered.replace(/\n.*?MARKDOWNDETAILSEND.*?\n/g, '</details>');
      rendered = rendered.replace(/\n.*?MARKDOWNSUMMARYSTART.*?\n/g, '<summary><span class="code-details-summary-span">');
      rendered = rendered.replace(/\n.*?MARKDOWNSUMMARYEND.*?\n/g, '</span></summary>');
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

      var tokens = parseContent(content);
      tokens.links = [];

      marked.Parser.prototype.tok = function () {
        if (this.token.type === 'table') {
          return handleTable.call(this, this.token);
        } else {
          return handleTok.call(this);
        }
      };

      return marked.parser(tokens, markedDefaults);
    },

    // Note that this should correspond with renderer.heading
    getAnchors: function(content) {
      return marked.lexer(content)
        .filter(chunk => chunk.type === 'heading')
        .map(chunk => parseAnchor(chunk.text));
    }
  };
};

function parseContent(data) {
  var tokens = [];

  marked.lexer(data).forEach(function(t) {
    // add custom quotes
    if (t.type === 'paragraph') {
      var quote = parseCustomQuote(t, 'T>', 'tip') ||
        parseCustomQuote(t, 'W>', 'warning') ||
        parseCustomQuote(t, '?>', 'todo') ||
        t;

      tokens.push(quote);
    }
    // handle html
    else if (t.type === 'html') {
      tokens = tokens.concat(handleHTML(t));
    }
    // just add other types
    else {
      tokens.push(t);
    }
  });

  return tokens;
}

function parseAnchor(string) {
  var stripped = string.replace(/\[(.+)\]\(.+\)/gi, '$1').replace(/(<([^>]+)>)/ig, '');
  var clean = stripped.replace(/`/g, '');

  return {
    title: clean,
    id: clean.replace(/[^\w\u4e00-\u9fa5]+/g, '-').toLowerCase()
  };
}

function handleHTMLSplit(tokens, htmlArray, merging) {
  const htmlItem =  htmlArray[0];
  const tickSplit = htmlItem.split('`');
  const tickLength = tickSplit.length;

  htmlArray = htmlArray.slice(1);

  // detect start of the inline code
  if(merging.length === 0 && tickLength%2 === 0) {
    merging = htmlItem;
  }
  // append code inside the inline code
  else if(merging.length > 0 && tickLength === 1) {
    merging += htmlItem;
  }
  // finish inline code
  else if(merging.length > 0 && tickLength > 1) {
    htmlArray.unshift(tickSplit.slice(1, tickLength).join('`'));
    merging += tickSplit[0]+'`';
    tokens = tokens.concat(parseContent(merging));
    merging = '';
  }  else if (merging.length === 0) {
    tokens = tokens.concat(parseContent(htmlItem));
  }

  if(htmlArray.length === 0) {
    return tokens;
  }

  return handleHTMLSplit(tokens, htmlArray, merging);
}

function handleHTML(t) {
    let tokens = [];

    // Split code in markdown, so that HTML inside code is not parsed
    const codeArray = t.text.split(/(```(.|\n)*```)/g).filter(v => (v && v !== '' && v !== '\n'));

    // if only one item in codeArray, then it's already parsed
    if(codeArray.length == 1) {
      const htmlArray = codeArray[0].split(/\s*(<[^>]*>)/g).filter(v => (v !== '' && v !== '\n'));

      if (htmlArray.length == 1) {
        return t;
      }
    }

    codeArray.forEach(item => {
      // if item is not code, then check for html tags and parse accordingly
      if (item.indexOf('```') !== 0) {
        // split all html tags
        const htmlArray = item.split(/\s*(<[^>]*>)/g).filter(v => (v !== '' && v !== '\n'));
        tokens = handleHTMLSplit(tokens, htmlArray, '');
      }
      // normally parse code block
      else {
        tokens = tokens.concat(parseContent(item));
      }
    });

    return tokens;
}

function handleTable(t) {
  let cell = '';
  let header = '';
  let body = '';

  for (let i = 0; i < t.header.length; i++) {
    cell += handleTableCell(this.inline.output(t.header[i]), {
      header: true,
      align: t.align[i]
    });
  }

  header += handleTableRow(cell);

  for (let i = 0; i < t.cells.length; i++) {
    let row = t.cells[i];

    row = fixPipesEscapingForTableRow(row);
    cell = '';

    for (let j = 0; j < row.length; j++) {
      cell += handleTableCell(this.inline.output(row[j]), {
        header: false,
        headerTitle: this.inline.output(t.header[j]),
        align: t.align[j]
      });
    }

    body += handleTableRow(cell);
  }

  return `
    <div class="table">
        <div class="table-wrap">
          <div class="table-header">
              ${header}
          </div>
          <div class="table-body">
              ${body}
          </div>
        </div>
    </div>`;
}

function handleTableRow(content) {
  return `<div class="table-tr">${content}</div>`;
}

function handleTableCell(content, flags) {
  if(flags.header) {
    return `<div class="table-th">${content}</div>`;
  }

  return `<div class="table-td">
    <div class="table-td-title">
        ${flags.headerTitle}
    </div>
    <div class="table-td-content">
        ${content}
    </div>
  </div>`;
}

function parseCustomQuote(token, match, className) {
  if (token.type === 'paragraph') {
    var text = token.text;

    if (text.indexOf(match) === 0) {
      return {
        type: 'html',
        text: (
          `<blockquote class="${className}">` +
          `<div class="tip-content"> ${text.slice(2).trim()} </div>` +
          '</blockquote>'
        )
      };
    }
  }
}

// Code is copied from here (only table type was removed)
// https://github.com/chjj/marked/blob/master/lib/marked.js#L975
function handleTok() {
  let body = '';

  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return this.renderer.hr();
    }
    case 'heading': {
      return this.renderer.heading(
        this.inline.output(this.token.text),
        this.token.depth,
        this.token.text);
    }
    case 'code': {
      return this.renderer.code(this.token.text,
        this.token.lang,
        this.token.escaped);
    }
    case 'blockquote_start': {
      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }

      return this.renderer.blockquote(body);
    }
    case 'list_start': {
      let ordered = this.token.ordered;

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return this.renderer.list(body, ordered);
    }
    case 'list_item_start': {
      while (this.next().type !== 'list_item_end') {
        body += this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'loose_item_start': {
      while (this.next().type !== 'list_item_end') {
        body += this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'html': {
      let html = !this.token.pre && !this.options.pedantic
        ? this.inline.output(this.token.text)
        : this.token.text;
      return this.renderer.html(html);
    }
    case 'paragraph': {
      return this.renderer.paragraph(this.inline.output(this.token.text));
    }
    case 'text': {
      return this.renderer.paragraph(this.parseText());
    }
  }
}


/**
 * Fixes escaped '|' characters in table cells.
 * @link https://github.com/chjj/marked/issues/595
 */
function fixPipesEscapingForTableRow(row) {
  const fixedRow = [];
  let index = 0;
  let handlingBroken = false;

  while (index < row.length) {
    const cellString = row[index];

    if (isBroken(cellString) && !handlingBroken) {
      // Starting to handle broken chain by creating first cell to append content to.
      handlingBroken = true;
      fixedRow.push(fixBroken(cellString));

    } else if (!isBroken(cellString) && handlingBroken) {
      // Finishing to handle broken chain by appending the last element to the current cell.
      fixedRow[fixedRow.length - 1] += cellString;
      handlingBroken = false;

    } else if (isBroken(cellString) && handlingBroken) {
      // Appending next broken cell to the current cell.
      fixedRow[fixedRow.length - 1] += fixBroken(cellString);

    } else {
      // Just adding cell normally.
      fixedRow.push(cellString);

    }

    index++;
  }

  return fixedRow;

  function isBroken (cellString) {
    return cellString.endsWith('\\');
  }

  function fixBroken (cellString) {
    return cellString.replace(/\\$/, '|');
  }
}
