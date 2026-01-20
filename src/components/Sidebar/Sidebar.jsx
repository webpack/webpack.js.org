// Import External Dependencies
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import DownIcon from "../../styles/icons/chevron-down.svg";
import LoadingIcon from "../../styles/icons/loading.svg";
import Print from "../Print/Print.jsx";
import SidebarItem from "../SidebarItem/SidebarItem.jsx";

// Load Styling
import "./Sidebar.scss";

const versions = [5, 4];
const currentDocsVersion = 5;

// Create and export the component
export default function Sidebar({ className = "", pages, currentPage }) {
  const [version, setVersion] = useState(currentDocsVersion);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (version === currentDocsVersion) return;
    const { href } = window.location;
    const url = new URL(href);
    url.hostname = `v${version}.webpack.js.org`;

    // redirect
    window.location.href = url.href;
  }, [version]);
  let group;

  return (
    <nav className={`sidebar ${className}`}>
      <div className="sidebar__inner">
        <div className="relative z-0 bg-white dark:bg-gray-100 ">
          <select
            className="text-gray-600 text-14 px-5 py-5 appearance-none box-border border border-gray-200 border-solid flex-col flex w-full rounded-none bg-transparent bg-none"
            value={version}
            onChange={(event) => {
              setVersion(Number(event.target.value));
              if (Number(event.target.value) !== currentDocsVersion) {
                setLoading(true);
              }
            }}
          >
            {versions.map((version) => (
              <option key={version} value={version}>
                webpack {version}
              </option>
            ))}
          </select>
          {loading ? (
            <LoadingIcon
              className="absolute right-5 top-5 fill-current text-gray-300 z-[-1]"
              width={20}
              height={20}
            />
          ) : (
            <DownIcon
              className="absolute right-5 top-5 fill-current text-gray-300 z-[-1]"
              width={20}
              height={20}
            />
          )}
        </div>
        <Print url={currentPage} />

        {pages.map((page, index) => {
          const displayGroup = group !== page.group && page.group !== "-";
          // eslint-disable-next-line react-hooks/immutability
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

Sidebar.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array,
  currentPage: PropTypes.string,
};
