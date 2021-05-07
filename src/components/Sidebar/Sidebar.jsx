// Import External Dependencies
import SidebarItem from '../SidebarItem/SidebarItem';
import Print from '../Print/Print';
import PropTypes from 'prop-types';

// Load Styling
import './Sidebar.scss';
import { useEffect, useState } from 'react';

const versions = [5, 4];
const currentDocsVersion = 5;

Sidebar.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array,
  currentPage: PropTypes.string,
};
// Create and export the component
export default function Sidebar({ className = '', pages, currentPage }) {
  const [version, setVersion] = useState(currentDocsVersion);
  const [visible, setVisible] = useState(false);
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
        <div className="z-10 border border-solid border-gray-200 text-gray-600 relative text-14 px-[5px] py-[5px]">
          <div
            className="cursor-pointer flex items-center justify-between text-black"
            onClick={() => setVisible((prev) => !prev)}
          >
            <span>Webpack {version} </span>
          </div>
          <div
            className={`bg-white box-border border border-gray-200 border-solid absolute flex-col left-[-1px] right-[-1px] top-[30px] ${
              visible ? 'flex' : 'hidden'
            }`}
          >
            {versions.map((version) => (
              <button
                key={version}
                onClick={() => setVersion(version)}
                className={`cursor-pointer border-none bg-transparent text-left px-[5px] py-[10px] transition-colors duration-200 hover:bg-gray-100 ${
                  version === currentDocsVersion ? 'font-bold' : ''
                }`}
                value={version}
              >
                Webpack {version}
              </button>
            ))}
          </div>
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
