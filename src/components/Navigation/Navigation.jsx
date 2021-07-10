// Import External Dependencies
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DocSearch } from '@docsearch/react';

// Import Components
import Link from '../Link/Link';
import Logo from '../Logo/Logo';
import Dropdown from '../Dropdown/Dropdown';

// Import constants
import { THEME } from '../../constants/theme';

// Load Styling
import '@docsearch/css';

import GithubIcon from '../../styles/icons/github.svg';
import TwitterIcon from '../../styles/icons/twitter.svg';
import StackOverflowIcon from '../../styles/icons/stack-overflow.svg';
import Hamburger from '../../styles/icons/hamburger.svg';
import { NavLink, useLocation } from 'react-router-dom';

const { DARK, LIGHT } = THEME;

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
      className="text-gray-100 dark:text-gray-100 text-sm font-light uppercase mr-[18px] hover:text-blue-200"
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
      className="mr-[18px] inline-flex items-center"
      title={`webpack on ${title}`}
    >
      {children}
    </Link>
  );
}

Navigation.propTypes = {
  pathname: PropTypes.string,
  hash: PropTypes.string,
  links: PropTypes.array,
  toggleSidebar: PropTypes.func,
  theme: PropTypes.string,
  switchTheme: PropTypes.func,
};

function Navigation({
  links,
  pathname,
  hash = '',
  toggleSidebar,
  theme,
  switchTheme,
}) {
  const themeSwitcher = () => switchTheme(theme === DARK ? LIGHT : DARK);
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
          <nav className="hidden md:inline-flex md:items-center">
            {links.map(({ content, url, isActive }) => (
              <NavigationItem key={url} url={url} isActive={isActive}>
                {content}
              </NavigationItem>
            ))}
            {[
              {
                to: 'https://github.com/webpack/webpack',
                title: 'GitHub',
                children: (
                  <GithubIcon aria-hidden="true" fill="#fff" width={16} />
                ),
              },
              {
                to: 'https://twitter.com/webpack',
                title: 'Twitter',
                children: (
                  <TwitterIcon aria-hidden="true" fill="#fff" width={16} />
                ),
              },
              {
                to: 'https://stackoverflow.com/questions/tagged/webpack',
                title: 'StackOverflow',
                children: (
                  <StackOverflowIcon
                    aria-hidden="true"
                    fill="#fff"
                    width={16}
                  />
                ),
              },
            ].map(({ to, title, children }) => (
              <NavigationIcon key={to} to={to} title={title}>
                {children}
              </NavigationIcon>
            ))}

            <Dropdown
              className="mr-[18px]"
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
            <button
              className="bg-transparent border-none cursor-pointer"
              onClick={themeSwitcher}
              data-testid="hello-darkness"
            >
              {theme === DARK ? '🌙' : '☀️'}
            </button>
          </nav>
          <DocSearch
            apiKey={'fac401d1a5f68bc41f01fb6261661490'}
            indexName="webpack-js-org"
          />
        </div>
        {/* sub navigation */}
        {links
          .filter((link) => {
            return link.children;
          })
          .map((link) => {
            if (link.isActive) {
              if (!link.isActive({}, location)) {
                return null;
              }
            }
            return (
              <div
                key={link.url}
                className="bg-gray-100 dark:bg-gray-800 hidden md:block"
              >
                <div className="md:max-w-[1024px] md:mx-auto md:flex md:justify-end md:px-[24px]">
                  {link.children.map((child) => (
                    <NavLink
                      key={child.url}
                      to={child.url}
                      title={child.title}
                      className="text-blue-400 ml-20 py-5 text-sm capitalize"
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
