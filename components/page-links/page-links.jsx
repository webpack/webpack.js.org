import React from 'react';
import TrimEnd from 'lodash/trimEnd';
import './page-links-style';

export default ({
  section = '',
  page = {}
}) => {
  let baseURL = 'https://github.com/webpack/webpack.js.org/edit/master/content';
  let editLink = page.edit || `${baseURL}/${TrimEnd(page.url, '/')}${page.type === 'index' ? '/index' : ''}.md`;

  return (
    <div className="page-links">
      { page.repo ? (
        <span>
          <a className="page-links__link" href={ page.repo }>
            Jump to Repository
          </a>

          <span className="page-links__gap">|</span>
        </span>
      ) : null }

      <a className="page-links__link" href={ editLink }>
        Edit Document
      </a>
    </div>
  );
};
