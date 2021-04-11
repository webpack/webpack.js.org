// Import External Dependencies
import SidebarItem from '../SidebarItem/SidebarItem';
import Print from '../Print/Print';
import PropTypes from 'prop-types';

// Load Styling
import './Sidebar.scss';
import { useEffect, useState } from 'react';

const currentDocsVersion = 5;

Sidebar.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array,
  currentPage: PropTypes.string,
};
// Create and export the component
export default function Sidebar({ className = '', pages, currentPage }) {
  const [version, setVersion] = useState(currentDocsVersion);
  useEffect(() => {
    if (version === currentDocsVersion) return;
    const href = window.location.href;
    const url = new URL(href);
    url.hostname = `v${version}.webpack.js.org`;

    // redirect
    window.location.href = url.href;
  }, [version]);
  let group;

  return (
    <nav className={`sidebar ${className}`}>
      <div className="sidebar__inner">
        <select
          name="version-selector"
          style={{
            border: '1px solid #dedede',
            borderRadius: 0,
            fontSize: 14,
            color: '#535353',
            display: 'flex',
            width: '100%',
            padding: '5px 10px',
          }}
          value={version}
          onChange={(e) => setVersion(+e.target.value)}
        >
          <option value={5}>Webpack 5</option>
          <option value={4}>Webpack 4</option>
        </select>
        <Print url={currentPage} />

        {pages.map((page, index) => {
          let displayGroup = group !== page.group && page.group !== '-';
          group = page.group;

          return (
            <div key={page.url}>
              {displayGroup ? (
                <h4 className="sidebar__group">{group}</h4>
              ) : null}

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
}
