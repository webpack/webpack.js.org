import React from 'react';

export default props => {
  return (
    <aside className="sidecar">
      <a href="https://github.com/webpack/webpack.io" className="sidecar-item -github">
        <span>See the Repo</span>
        <i className="webpack-icon-github" />
      </a>
      <a href="#" className="sidecar-item -gitter">
        <span>Get Help on Gitter</span>
        <i className="webpack-icon-gitter" />
      </a>
      <a href="#" className="sidecar-item -medium">
        <span>Visit Our Blog</span>
        <i className="webpack-icon-medium" />
      </a>
    </aside>
  );
};