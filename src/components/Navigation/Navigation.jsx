// Import External Dependencies
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DocSearch } from '@docsearch/react';
import { Link as ReactDOMLink } from 'react-router-dom';

// Import Components
import Link from '../Link/Link';
import Logo from '../Logo/Logo';
import Dropdown from '../Dropdown/Dropdown';

// Load Styling
import '@docsearch/css';

import GithubIcon from '../../styles/icons/github.svg';
import TwitterIcon from '../../styles/icons/twitter.svg';
import StackOverflowIcon from '../../styles/icons/stack-overflow.svg';
import Hamburger from '../../styles/icons/hamburger.svg';
import { NavLink, useLocation } from 'react-router-dom';
import HelloDarkness from '../HelloDarkness';

NavigationItem.propTypes = {
  children: PropTypes.node.isRequired,
  url: PropTypes.string.isRequired,
  isActive: PropTypes.func,
};

function NavigationItem({ children, url, isActive }) {
  let obj = {};
  // decide if the link is active or not by providing a function
  // otherwise we'll let react-dom makes the decision for us
  if (isActive) {
    obj = {
      isActive,
    };
  }
  return (
    <NavLink
      {...obj}
      activeClassName="active-menu"
      to={url}
      className="text-gray-100 dark:text-gray-100 text-sm font-light uppercase hover:text-blue-200"
    >
      {children}
    </NavLink>
  );
}

NavigationIcon.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
function NavigationIcon({ children, to, title }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center"
      title={`webpack on ${title}`}
    >
      {children}
    </Link>
  );
}
const navigationIconProps = {
  'aria-hidden': true,
  fill: '#fff',
  width: 16,
};

Navigation.propTypes = {
  pathname: PropTypes.string,
  hash: PropTypes.string,
  links: PropTypes.array,
  toggleSidebar: PropTypes.func,
  theme: PropTypes.string,
  switchTheme: PropTypes.func,
};

function Navigation({ links, pathname, hash = '', toggleSidebar }) {
  const [locationHash, setLocationHash] = useState(hash);

  const location = useLocation();

  useEffect(() => {
    setLocationHash(hash);
  }, [hash]);

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
            {[
              {
                to: 'https://github.com/webpack/webpack',
                title: 'GitHub',
                children: <GithubIcon {...navigationIconProps} />,
              },
              {
                to: 'https://twitter.com/webpack',
                title: 'Twitter',
                children: <TwitterIcon {...navigationIconProps} />,
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
              apiKey={'fac401d1a5f68bc41f01fb6261661490'}
              indexName="webpack-js-org"
              disableUserPersonalization={true}
              placeholder="Search webpack documentation"
              hitComponent={({ hit, children }) => {
                return <ReactDOMLink to={hit.url}>{children}</ReactDOMLink>;
              }}
            />
          </div>
        </div>
        {/* sub navigation */}
        {links
          .filter((link) => {
            // only those with children are displayed
            return link.children;
          })
          .map((link) => {
            if (link.isActive) {
              // hide the children if the link is not active
              if (!link.isActive({}, location)) {
                return null;
              }
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
                  {link.children.map((child) => (
                    <NavLink
                      key={child.url}
                      to={child.url}
                      title={child.title}
                      className="text-blue-400 py-5 text-sm capitalize"
                      activeClassName="active-submenu"
                    >
                      {child.content}
                    </NavLink>
                  ))}
                </div>
              </div>
            );
          })}
      </header>
    </>
  );
}

export default Navigation;
