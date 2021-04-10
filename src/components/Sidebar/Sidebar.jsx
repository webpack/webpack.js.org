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
        <div
          style={{
            display: 'flex',
          }}
        >
          <label
            htmlFor="version-selector"
            style={{
              background: '#1f71b3',
              color: '#e8f1f9',
              fontSize: '12px',
              padding: '2px 5px',
            }}
          >
            webpack
          </label>
          <span
            style={{
              padding: '2px 5px',
              fontSize: '12px',
            }}
          >
            <select
              name="version-selector"
              style={{
                border: 'none',
                borderRadius: 0,
              }}
              value={version}
              onChange={(e) => setVersion(+e.target.value)}
            >
              <option value={5}>5</option>
              <option value={4}>4</option>
            </select>
          </span>
        </div>
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
