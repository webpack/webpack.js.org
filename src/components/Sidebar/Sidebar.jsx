// Import External Dependencies
import Shield from '../Shield/Shield';
import SidebarItem from '../SidebarItem/SidebarItem';
import Print from '../Print/Print';
import PropTypes from 'prop-types';

// Load Styling
import './Sidebar.scss';

const docs = [
  {
    version: 5,
    url: 'https://webpack.docschina.org',
  },
  {
    version: 4,
<<<<<<< HEAD
    url: 'https://v4.webpack.docschina.org',
  }
=======
    url: 'https://v4.webpack.js.org',
  },
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5
];

const currentDocsVersion = 5;
Sidebar.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array,
  currentPage: PropTypes.string,
};
// Create and export the component
export default function Sidebar({ className = '', pages, currentPage }) {
  let group;

  return (
    <nav className={`sidebar ${className}`}>
      <div className="sidebar__inner">
        <div className="sidebar__shields">
          <a href="https://github.com/webpack/webpack/releases">
            <Shield
              content="github/package-json/v/webpack/webpack"
              label="webpack"
            />
          </a>
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
        <div className="sidebar__docs-version">
          You are reading webpack {currentDocsVersion} documentation. Change
          here to:
          <ul>
            {docs
              .filter((item) => item.version !== currentDocsVersion)
              .map(({ version, url }) => (
                <li key={`webpack-${version}-docs`}>
                  <a rel="nofollow" href={url}>
                    webpack {version} documentation
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
