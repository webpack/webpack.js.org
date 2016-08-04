import React from 'react';

export default props => {
  return (
    <aside className="sidecar">
      <a href="https://github.com/webpack/webpack.io" className="sidecar-item -github">
        <i className="entypo-github" />
      </a>
      <a href="#" className="sidecar-item -gitter">
        <i className="entypo-gitter" />
      </a>
      <a href="#" className="sidecar-item -medium">
        <i className="entypo-medium" />
      </a>
    </aside>
  );
};