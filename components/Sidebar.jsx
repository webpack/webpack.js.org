import React from 'react';
import Link from './Link';

// Just for testing
let sections = [
  { title: 'Overview', id: 'overview' },
  { title: 'Usage', id: 'usage' },
  { title: 'Options', id: 'options' },
  { title: 'Multiple Targets', id: 'multiple-targets' }
];

export default props => {
  return (
    <nav className="sidebar">
      {
        props.pages.map((page, i) => (
          <div className="sidebar-page" key={ `sidebar-section-${i}` }>
            <span className="sidebar-page-title">
              <Link to={ `/${page.url}` }>{ page.title }</Link>
              <i className="sidebar-page-toggle icon-chevron-down" />
            </span>

            <ul className="sidebar-page-sections">
              {
                // Temporary for testing, should just be page.sections.map(...)
                page.title === 'Targets' ? sections.map(section => (
                  <li className="sidebar-page-section">
                    <Link to={ `/${page.url}#${section.id}` }>{ section.title }</Link>
                  </li>
                )) : ''
              }
            </ul>
          </div>
        ))
      }
    </nav>
  );
};