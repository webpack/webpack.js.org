import React from 'react';
import TrimEnd from 'lodash/trimEnd';
import './PageLinks.scss';

export default ({
  section = '',
  page = {}
}) => {
  let enURL = 'https://webpack.js.org';
  let baseURL = 'https://github.com/docschina/webpack.js.org/edit/cn/src/content';
  let indexPath = page.type === 'index' ? '/index' : '';
  let mainPath = page.url.startsWith('/') ? page.url : `/${page.url}`;
  let editLink = page.file.attributes.edit || baseURL + TrimEnd(mainPath, '/') + indexPath + '.md';

  return (
    <div className="page-links">
      <span>
        <a className="page-links__link" href={ enURL + mainPath } target="_blank">
          查看原文
        </a>
        <span className="page-links__gap">|</span>
      </span>

      { page.file.attributes.repo ? (
        <span>
          <a className="page-links__link" href={ page.file.attributes.repo }>
            查看仓库
          </a>

          <span className="page-links__gap">|</span>
        </span>
      ) : null }

      <a className="page-links__link" href={ editLink }>
        编辑此页
        <i className="page-links__icon icon-edit" />
      </a>
    </div>
  );
};
