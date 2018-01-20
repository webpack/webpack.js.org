import React from 'react';
import TrimEnd from 'lodash/trimEnd';
import './PageLinks.scss';

export default ({
  page = {},
  ...props
}) => {
  let baseURL = 'https://github.com/webpack/webpack.js.org/edit/master/src/content';
  let indexPath = page.type === 'index' ? '/index' : '';
  let mainPath = page.url.startsWith('/') ? page.url : `/${page.url}`;
  let editLink = page.edit || baseURL + TrimEnd(mainPath, '/') + indexPath + '.md';

  // TODO: Make sure we add `repo` / `edit` and address `type` (above)
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
        <i className="page-links__icon icon-edit" />
      </a>
    </div>
  );
};
