import React from 'react';
import Link from './Link';

// Just for testing
let sections = [
  { title: 'Overview', id: 'overview' },
  { title: 'Usage', id: 'usage' },
  { title: 'Options', id: 'options' },
  { title: 'Multiple Targets', id: 'multiple-targets' }
];

const Sidebar = ({ sectionName, pages }) => (
  <nav className="sidebar">
    <SidebarPage url={`/${sectionName}`} title="Introduction" />
    {
      pages.map(({ url, title }, i) =>
        <SidebarPage key={`sidebar-page-${i}`} url={`/${url}`} title={title} />
      )
    }
  </nav>
);

const SidebarPage = ({ url, title }) => (
  <div className="sidebar-page">
    <span className="sidebar-page-title">
      <Link to={url}>{title}</Link>
      <i className="sidebar-page-toggle icon-chevron-down" />
    </span>

    <ul className="sidebar-page-sections">
      {/*
        page.title === 'Targets' ? sections.map((section, j) => (
          <li className="sidebar-page-section"
              key={ `sidebar-page-${i}-section-${j}` }>
            <Link to={ `/${page.url}#${section.id}` }>{ section.title }</Link>
          </li>
        )) : ''
      */}
    </ul>
  </div>
);

export default Sidebar;
