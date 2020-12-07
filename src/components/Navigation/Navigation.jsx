// Import External Dependencies
import { Component } from 'react';
import Banner from 'react-banner';
import PropTypes from 'prop-types';
import { DocSearch } from '@docsearch/react';

// Import Components
import Link from '../Link/Link';
import Logo from '../Logo/Logo';
import Dropdown from '../Dropdown/Dropdown';

// Load Styling
import './Navigation.scss';
import '@docsearch/css';

import GithubIcon from '../../styles/icons/github.svg';
import TwitterIcon from '../../styles/icons/twitter.svg';
import StackOverflowIcon from '../../styles/icons/stack-overflow.svg';
const onSearch = () => {};

export default class Navigation extends Component {
  static propTypes = {
    pathname: PropTypes.string,
    links: PropTypes.array,
    toggleSidebar: PropTypes.func
  }
  render() {
    let { pathname, links, toggleSidebar } = this.props;

    return (
      <>
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
            content: <GithubIcon aria-hidden="true" fill="#fff" width={16} />
          },
          {
            title: 'webpack on Twitter',
            url: 'https://twitter.com/webpack',
            className: 'navigation__item--icon',
            content: <TwitterIcon aria-hidden="true" fill="#fff" width={16} />
          },
          {
            title: 'webpack on Stack Overflow',
            url: 'https://stackoverflow.com/questions/tagged/webpack',
            className: 'navigation__item--icon',
            content: <StackOverflowIcon aria-hidden="true" fill="#fff" width={16} />
          },
          {
            className: 'navigation__item--icon',
            content: (
              <Dropdown
                className="navigation__languages"
                items={[
                  { title: 'English', url: 'https://webpack.js.org/' },
                  { lang: 'zh', title: '中文', url: 'https://webpack.docschina.org/' }
                ]} />
            )
          }
        ]}
        link={ Link }
        onMenuClick={ toggleSidebar } />
        <DocSearch apiKey={'fac401d1a5f68bc41f01fb6261661490'} indexName='webpack-js-org' />
        </>
    );
  }
}
