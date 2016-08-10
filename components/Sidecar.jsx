import React from 'react';

export default props => {
  return (
    <aside className="sidecar">
      <a href="https://github.com/webpack/webpack" className="sidecar-item -github">
        <span>See the Repo</span>
        <i className="icon-github" />
      </a>
      <a href="#" className="sidecar-item -gitter">
        <span>Get Help on Gitter</span>
        <i className="icon-gitter" />
      </a>
      <a href="https://medium.com/webpack" className="sidecar-item -medium">
        <span>Visit Our Blog</span>
        <i className="icon-medium" />
      </a>
    </aside>
  );
};