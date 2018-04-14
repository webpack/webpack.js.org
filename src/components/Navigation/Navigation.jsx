// Import External Dependencies
import React from 'react';
import Banner from 'react-banner';

// Import Utilities/Images
import GitHubIcon from '../../styles/icons/github.svg';

// Import Components
import Link from '../Link/Link';
import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import Dropdown from '../Dropdown/Dropdown';

// Load Styling
import './Navigation.scss';
import './Search.scss';

// TODO: Re-incorporate docsearch (see `react-banner` docs and `SearchResults` component/discussion)
//   componentDidMount() {
//     if (typeof window !== 'undefined') {
//       let docsearch = () => {};

//       // XXX: hack around docsearch
//       if (window.docsearch) {
//         docsearch = window.docsearch.default || window.docsearch;
//       }

//       docsearch({
//         apiKey: 'fac401d1a5f68bc41f01fb6261661490',
//         indexName: 'webpack-js-org',
//         inputSelector: '.navigation__search-input'
//       });

//       window.addEventListener('keyup', e => {
//         if (e.which === 9 && e.target.classList.contains('navigation__search-input')) {
//           this._openSearch();
//         }
//       });
//     }
//   }

export default class Navigation extends React.Component {
  render() {
    let { pathname, links, toggleSidebar } = this.props;

    return (
      <Banner
        blockName="navigation"
        logo={ <Logo light={ true } /> }
        url={ pathname }
        items={[
          ...links,
          {
            title: 'GitHub Repository',
            url: '//github.com/webpack/webpack',
            className: 'navigation__item--icon',
            content: <i className="icon-github" />
          },
          {
            title: 'Webpack on Stack Overflow',
            url: '//stackoverflow.com/questions/tagged/webpack',
            className: 'navigation__item--icon',
            content: <i className="icon-stack-overflow" />
          },
          {
            className: 'navigation__item--icon',
            content: (
              <Dropdown
                className="navigation__languages"
                items={[
                  { title: 'English', url: 'https://webpack.js.org/' },
                  { title: '中文', url: 'https://doc.webpack-china.org/' }
                ]} />
            )
          }
        ]}
        link={ Link }
        onMenuClick={ toggleSidebar } />
    );
  }
}
