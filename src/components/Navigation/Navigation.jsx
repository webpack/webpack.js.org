// Import External Dependencies
import React from 'react';
import Banner from 'react-banner';

import LanguageIcon from '../../assets/language-icon.svg';
import ThemeIcon from '../../assets/theme-icon.svg';

// Import Components
import Link from '../Link/Link';
import Logo from '../Logo/Logo';
import Dropdown from '../Dropdown/Dropdown';

// Import helpers
import isClient from '../../utilities/is-client';

// Import constants
import { THEME  } from '../../constants/theme';

// Load Styling
import 'docsearch.js/dist/cdn/docsearch.css';
import './Navigation.scss';
import './Search.scss';

const onSearch = () => {};
const { DEVICE, DARK, LIGHT } = THEME;

export default class Navigation extends React.Component {
  render() {
    const { pathname, links, toggleSidebar, theme, switchTheme } = this.props;

    return (
      <Banner
        onSearch={onSearch}
        blockName="navigation"
        logo={ <Logo light={ true } /> }
        url={ pathname }
        items={[
          ...links,
          {
            title: 'GitHub Repository',
            url: 'https://github.com/webpack/webpack',
            className: 'navigation__item--icon',
            content: <i aria-hidden="true" className="icon-github" />
          },
          {
            title: 'webpack on Twitter',
            url: 'https://twitter.com/webpack',
            className: 'navigation__item--icon',
            content: <i aria-hidden="true" className="icon-twitter" />
          },
          {
            title: 'webpack on Stack Overflow',
            url: 'https://stackoverflow.com/questions/tagged/webpack',
            className: 'navigation__item--icon',
            content: <i aria-hidden="true" className="icon-stack-overflow" />
          },
          {
            className: 'navigation__item--icon navigation__item--dropdown',
            content: (
              <Dropdown
                icon={LanguageIcon}
                alt="Select language"
                items={[
                  { title: 'English', url: 'https://webpack.js.org/' },
                  { lang: 'zh', title: '中文', url: 'https://webpack.docschina.org/' }
                ]} />
            )
          },
          {
            className: 'navigation__item--icon navigation__item--dropdown',
            content: (
              <Dropdown
                icon={ThemeIcon}
                alt="Select theme"
                items={[
                  { title: 'Device theme', active: theme === DEVICE, onClick: () => switchTheme(DEVICE) },
                  { title: 'Dark theme', active: theme === DARK, onClick: () => switchTheme(DARK) },
                  { title: 'Light theme', active: theme === LIGHT, onClick: () => switchTheme(LIGHT) }
                ]} />
            )
          }
        ]}
        link={ Link }
        onMenuClick={ toggleSidebar } />
    );
  }

  componentDidMount() {
    if (isClient) {
      const DocSearch = require('docsearch.js');

      DocSearch({
        apiKey: 'fac401d1a5f68bc41f01fb6261661490',
        indexName: 'webpack-js-org',
        inputSelector: '.navigation-search__input'
      });
    }
  }
}
