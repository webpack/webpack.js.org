import React from 'react';
import Link from './Link';

const Sidebar = ({ sectionName, pages }) => (
  <nav className="sidebar">
    <Item url={ `/${sectionName}` } title="Introduction" />

    {
      pages.map(({ url, title }, i) =>
        <Item 
          key={ `sidebar-item-${i}` } 
          url={ `/${url}` } 
          title={ title } />
      )
    }
  </nav>
);

const Item = ({ url, title }) => (
  <div className="sidebar-item">
    <Link className="sidebar-item__title" to={ url }>{ title }</Link>
    <i className="sidebar-item__toggle icon-chevron-down" />
    <ul className="sidebar-item__sections">
      {/*
        page.sections.map((section, j) => (
          <li className="sidebar-item-section"
              key={ `sidebar-item-${i}-section-${j}` }>
            <Link to={ `/${page.url}#${section.id}` }>{ section.title }</Link>
          </li>
        )) : ''
      */}
    </ul>
  </div>
);

export default Sidebar;
