import React from 'react';
import Link from './Link';

const Sidebar = ({ paths, sectionName, pages }) => {
  // console.log('paths:', Object.keys(paths).map((key) => {
  //   console.log(paths[key]);
  //   return paths[key].title;
  // }));

  return (
    <nav className="sidebar">
      <div className="sidebar__inner">
      <Item url={ `/${sectionName}` } title="Introduction" />
      {
        pages.map(({ url, title }, i) =>
          <Item
            key={ `sidebar-item-${i}` }
            index={i}
            url={ `/${url}` }
            title={ title }
          />
        )
      }
      </div>
    </nav>
  );
};

const Item = ({ index, url, title }) => (
  <div className="sidebar-item">
    <Link className="sidebar-item__title" to={ url }>{ title }</Link>
    <i className="sidebar-item__toggle icon-chevron-down" />
    <ul className="sidebar-item__sections">
      {/*
       sections.map((section, j) => (
       <li className="sidebar-item-section"
       key={ `sidebar-item-${index}-section-${j}` }>
       <Link to={ `/${url}#${section.id}` }>{ section.title }</Link>
       </li>
       ))*/
      }
    </ul>
  </div>
);

export default Sidebar;
