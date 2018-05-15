// Import External Dependencies
import React from 'react';

// Import Local Components
import Shield from '../Shield/Shield';
import SidebarItem from '../SidebarItem/SidebarItem';

// Load Styling
import '../Sidebar/Sidebar.scss';

// Create and export the component
export default ({
  className = '',
  pages,
  currentPage,
  ...props
}) => {
  let group;

  return (
    <nav className={`sidebar ${className}`}>
      <div className="sidebar__inner">
        <a href="https://github.com/webpack/webpack/releases">
          <Shield content="npm/v/webpack" label="webpack" />
        </a>

        {pages.map((page, index) => {
          let displayGroup = group !== page.group && page.group !== '-';
          group = page.group;

          return (
            <div key={`sidebar-item-${index}`}>
              {displayGroup ? <h4 className="sidebar__group">{group}</h4> : null}

              <SidebarItem
                index={index}
                url={page.url}
                title={page.title}
                anchors={page.anchors}
                currentPage={currentPage}
              />
            </div>
          );
        })}
      </div>
    </nav>
  );
};
