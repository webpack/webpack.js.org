import React from 'react';
import Link from '../link/link';
import './sidecar-style';

export default props => {
  return (
    <aside className="sidecar">
      <Link className="sidecar__link sidecar__link--github" to="//github.com/webpack/webpack">
        <span className="sidecar__label">Fork the Repo</span>
        <i className="sidecar__icon icon-github" />
      </Link>
      <Link className="sidecar__link sidecar__link--gitter js-gitter-toggle-chat-button" to="#">
        <span className="sidecar__label">Find Help</span>
        <i className="sidecar__icon icon-gitter" />
      </Link>
      <Link className="sidecar__link sidecar__link--medium" to="//medium.com/webpack">
        <span className="sidecar__label">Visit Our Blog</span>
        <i className="sidecar__icon icon-medium" />
      </Link>
      <Link className="sidecar__link sidecar__link--so" to="//stackoverflow.com/questions/tagged/webpack">
        <span className="sidecar__label">Stack Overflow</span>
        <i className="sidecar__icon icon-stack-overflow" />
      </Link>
    </aside>
  );
};