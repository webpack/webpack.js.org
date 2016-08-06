import React from 'react';
import Link from './Link';

export default props => {
  return (
    <nav className="sidebar">
      {
        props.pages.map((page, i) => (
          <div key={ `sidebar-link-${i}` } className="sidebar-link">
            <Link className="sidebar-link-text" to={ `/${page.url}` }>{ page.title }</Link>
          </div>
        ))
      }
    </nav>
  );
};