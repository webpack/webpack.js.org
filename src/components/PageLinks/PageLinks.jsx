import React from 'react';
import Url from 'url';
import './PageLinks.scss';

const baseURL = 'https://github.com/webpack/webpack.js.org/edit/master/';

export default ({
  page = {},
  ...props
}) => {
  const editLink = page.edit || Url.resolve(baseURL, page.path);

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
