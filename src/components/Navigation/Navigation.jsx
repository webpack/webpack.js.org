import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DocSearch } from '@docsearch/react';
import { Link as ReactDOMLink, NavLink, useLocation } from 'react-router-dom';
import Link from '../Link/Link';
import Logo from '../Logo/Logo';
import Dropdown from '../Dropdown/Dropdown';
import '@docsearch/css';

import GithubIcon from '../../styles/icons/github.svg';
import XIcon from '../../styles/icons/x.svg';
import StackOverflowIcon from '../../styles/icons/stack-overflow.svg';
import Hamburger from '../../styles/icons/hamburger.svg';
import HelloDarkness from '../HelloDarkness';

// NavigationItem Component
function NavigationItem({ children, url, isActive }) {
  let obj = {};
  if (isActive) {
    obj = {
      isActive,
    };
  }

  const classes =
    'text-gray-100 dark:text-gray-100 text-sm font-light uppercase hover:text-blue-200';

  if (url.startsWith('http') || url.startsWith('//')) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <NavLink
      {...obj}
      className={({ isActive }) =>
        isActive ? `${classes} !text-blue-200` : classes
      }
      to={url}
    >
      {children}
    </NavLink>
  );
}

NavigationItem.propTypes = {
  children: PropTypes.node.isRequired,
  url: PropTypes.string.isRequired,
  isActive: PropTypes.func,
};

// NavigationIcon component with tooltip
function NavigationIcon({ children, to, title }) {
  return (
    <div className="relative group inline-flex flex-col items-center">
      <Link
        to={to}
        className="inline-flex items-center text-gray-100 dark:text-gray-200 hover:text-blue-200"
        title={`webpack on ${title}`}
      >
        {children}
      </Link>
      <div className="absolute top-full mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        {title}
      </div>
    </div>
  );
}

NavigationIcon.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const navigationIconProps = {
  'aria-hidden': true,
  fill: 'currentColor',
  width: 16,
};

function Navigation({ links, pathname, hash = '', toggleSidebar }) {
  const [locationHash, setLocationHash] = useState(hash);
  const location = useLocation();

  useEffect(() => {
    setLocationHash(hash);
  }, [hash]);

  // Helper function to check if we're on the home page
  const isHomePage = location.pathname === '/';

  return (
    <>
      <header className="bg-blue-800 dark:bg-gray-900">
        <div className="flex items-center py-10 px-[16px] justify-between md:px-[24px] md:max-w-[1024px] md:mx-auto md:justify-start">
          <button
            className="bg-transparent border-none md:hidden"
            onClick={toggleSidebar}
          >
            <Hamburger
              width={20}
              height={20}
              className="fill-current text-white"
            />
          </button>
          <Link to="/" className="md:mr-auto">
            <Logo />
          </Link>
          <nav className="hidden md:inline-grid md:grid-flow-col md:gap-x-[18px]">
            {links.map(({ content, url, isActive }) => (
              <NavigationItem key={url} url={url} isActive={isActive}>
                {content}
              </NavigationItem>
            ))}
            {/* Social Media Icons with Tooltips */}
            {[
              {
                to: 'https://github.com/webpack/webpack',
                title: 'GitHub',
                children: <GithubIcon {...navigationIconProps} />,
              },
              {
                to: 'https://x.com/webpack',
                title: 'X',
                children: <XIcon {...navigationIconProps} />,
              },
              {
                to: 'https://stackoverflow.com/questions/tagged/webpack',
                title: 'StackOverflow',
                children: <StackOverflowIcon {...navigationIconProps} />,
              },
            ].map(({ to, title, children }) => (
              <NavigationIcon key={to} to={to} title={title}>
                {children}
              </NavigationIcon>
            ))}

            <Dropdown
              className=""
              items={[
                {
                  title: 'English',
                  url: `https://webpack.js.org${pathname}${locationHash}`,
                },
                {
                  lang: 'zh',
                  title: '中文',
                  url: `https://webpack.docschina.org${pathname}${locationHash}`,
                },
                {
                  lang: 'ko',
                  title: '한국어',
                  url: `https://webpack.kr${pathname}${locationHash}`,
                },
              ]}
            />
          </nav>
          <div className="inline-flex items-center ml-[18px]">
            <HelloDarkness />
            <DocSearch
              appId="BH4D9OD16A"
              apiKey={'fac401d1a5f68bc41f01fb6261661490'}
              indexName="webpack-js-org"
              disableUserPersonalization={true}
              placeholder="Search webpack documentation"
              transformItems={(items) =>
                items.map(({ url, ...others }) => {
                  const { origin } = new URL(url);
                  return {
                    ...others,
                    url: url.replace(new RegExp(`^${origin}`), ''),
                  };
                })
              }
              hitComponent={({ hit, children }) => {
                return <ReactDOMLink to={hit.url}>{children}</ReactDOMLink>;
              }}
            />
          </div>
        </div>

        {/* Sub navigation - Updated with fixed logic */}
        {!isHomePage &&
          links
            .filter((link) => link.children)
            .map((link) => {
              if (link.isActive && !link.isActive({}, location)) {
                return null;
              }

              return (
                <div
                  key={link.url}
                  className="bg-gray-100 dark:bg-gray-800 hidden md:block"
                >
                  <div
                    className="md:max-w-[1024px] md:mx-auto md:grid md:grid-flow-col md:justify-end md:gap-x-[20px] md:px-[24px]"
                    data-testid="sub-navigation"
                  >
                    {link.children.map((child) => {
                      const classNames =
                        'text-blue-400 py-5 text-sm capitalize hover:text-black dark:hover:text-white';
                      const isActive = location.pathname.startsWith(child.url);
                      return (
                        <NavLink
                          key={child.url}
                          to={child.url}
                          title={child.title}
                          className={() =>
                            isActive
                              ? `!text-black dark:!text-white ${classNames}`
                              : classNames
                          }
                        >
                          {child.content === 'api'
                            ? child.content.toUpperCase()
                            : child.content}
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              );
            })}
      </header>
    </>
  );
}

Navigation.propTypes = {
  pathname: PropTypes.string,
  hash: PropTypes.string,
  links: PropTypes.array,
  toggleSidebar: PropTypes.func,
};

export default Navigation;
