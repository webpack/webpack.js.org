import React from 'react';
import SidebarItem from '../sidebar-item/sidebar-item';
import './sidebar-style';

export default props => {
  let { sectionName, pages } = props;

  return (
    <nav className="sidebar">
      <div className="sidebar__inner">
        <SidebarItem 
          url={ `/${sectionName}` } 
          title="Introduction" />

        {
          pages.map(({ url, title, anchors }, i) =>
            <SidebarItem
              key={ `sidebar-item-${i}` }
              index={i}
              url={ `/${url}` }
              title={ title }
              anchors={ anchors }
            />
          )
        }
      </div>
    </nav>
  );
};
