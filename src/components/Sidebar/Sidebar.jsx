// Import External Dependencies
import React from 'react';

// Import Local Components
import Shield from '../Shield/Shield';
import SidebarItem from '../SidebarItem/SidebarItem';

// Load Styling
import './Sidebar.scss';

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
        <div className="sidebar__shields">
          <a href="https://github.com/webpack/webpack/releases">
            <Shield content="npm/v/webpack" label="webpack" />
          </a>
        </div>

        {pages.map((page, index) => {
          let displayGroup = group !== page.group && page.group !== '-';
          group = page.group;

          return (
            <React.Fragment key={`sidebar-item-${index}`}>
              {displayGroup ? <h4 className="sidebar__group">{group}</h4> : null}

              <SidebarItem
                index={index}
                url={page.url}
                title={page.title}
                anchors={page.anchors}
                currentPage={currentPage}
              />
            </React.Fragment>
          );
        })}

        <a href={_printPageUrlFromUrl(currentPage)} rel="nofollow">Print Section</a>
      </div>
    </nav>
  );
};

function _printPageUrlFromUrl(urlRaw) {
  // for now support both trailing slash and without it
  // when https://github.com/webpack/webpack.js.org/pull/3064 is merged, this is simplified.
  let url = urlRaw[urlRaw.length-1] === '/' ? urlRaw.substring(0, urlRaw.length-1) : urlRaw;
  let urlSplit = url.split('/');
  return (urlSplit.length > 2) ? `/${url.split('/')[1]}/printable/` : `${url}/printable/`;
}