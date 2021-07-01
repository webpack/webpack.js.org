// Import External Dependencies
import { useEffect, useState } from 'react';
import Banner from 'react-banner';
import PropTypes from 'prop-types';

// Import Components
import Link from '../Link/Link';
import Logo from '../Logo/Logo';
import Dropdown from '../Dropdown/Dropdown';

// Import helpers
import isClient from '../../utilities/is-client';

// Import constants
import { THEME } from '../../constants/theme';

// Load Styling
import 'docsearch.js/dist/cdn/docsearch.css';
import './Navigation.scss';
import './Search.scss';

import GithubIcon from '../../styles/icons/github.svg';
import TwitterIcon from '../../styles/icons/twitter.svg';
import StackOverflowIcon from '../../styles/icons/stack-overflow.svg';

const onSearch = () => {};
const { DARK, LIGHT } = THEME;

Navigation.propTypes = {
  pathname: PropTypes.string,
  hash: PropTypes.string,
  links: PropTypes.array,
  toggleSidebar: PropTypes.func,
  theme: PropTypes.string,
  switchTheme: PropTypes.func,
};

function Navigation({
  pathname,
  hash = '',
  links,
  toggleSidebar,
  theme,
  switchTheme,
}) {
  const themeSwitcher = () => switchTheme(theme === DARK ? LIGHT : DARK);
  const [locationHash, setLocationHash] = useState(hash);

  useEffect(() => {
    if (isClient) {
      const DocSearch = require('docsearch.js');

      DocSearch({
        apiKey: 'fac401d1a5f68bc41f01fb6261661490',
        indexName: 'webpack-js-org',
        inputSelector: '.navigation-search__input',
      });
    }
  }, []);

  useEffect(() => {
    setLocationHash(hash);
  }, [hash]);

  return (
    <Banner
      onSearch={onSearch}
      blockName="navigation"
      logo={<Logo light={true} />}
      url={pathname}
      items={[
        ...links,
        {
          title: 'GitHub Repository',
          url: 'https://github.com/webpack/webpack',
          className: 'navigation__item--icon',
          content: <GithubIcon aria-hidden="true" fill="#fff" width={16} />,
        },
        {
          title: 'webpack on Twitter',
          url: 'https://twitter.com/webpack',
          className: 'navigation__item--icon',
          content: <TwitterIcon aria-hidden="true" fill="#fff" width={16} />,
        },
        {
          title: 'webpack on Stack Overflow',
          url: 'https://stackoverflow.com/questions/tagged/webpack',
          className: 'navigation__item--icon',
          content: (
            <StackOverflowIcon aria-hidden="true" fill="#fff" width={16} />
          ),
        },
        {
          className: 'navigation__item--icon',
          content: (
            <Dropdown
              className="navigation__languages"
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
          ),
        },
        {
          className: 'navigation__item--icon',
          content: (
            <button
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={themeSwitcher}
              data-testid="hello-darkness"
            >
              {theme === DARK ? '🌙' : '☀️'}
            </button>
          ),
        },
      ]}
      link={Link}
      onMenuClick={toggleSidebar}
    />
  );
}

export default Navigation;
