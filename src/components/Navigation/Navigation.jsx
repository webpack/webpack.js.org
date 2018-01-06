import React from 'react';
import Banner from 'react-banner';
import Link from '../Link/Link';
import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import Dropdown from '../Dropdown/Dropdown';
import './Navigation.scss';
import './Search.scss';

// TODO: Re-incorporate the icon links
//  <Link
//    className="navigation__icon"
//    title="GitHub Repository"
//    to="//github.com/webpack/webpack">
//    <i className="sidecar__icon icon-github" />
//  </Link>
//  <Link
//    className="navigation__icon"
//    title="See Questions on Stack Overflow"
//    to="//stackoverflow.com/questions/tagged/webpack">
//    <i className="sidecar__icon icon-stack-overflow" />
//  </Link>
//  <Dropdown
//    className="navigation__languages"
//    items={[
//      { title: 'English', url: 'https://webpack.js.org/' },
//      { title: '中文', url: 'https://doc.webpack-china.org/' }
//    ]} />

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
        logo={ <Logo light={ true } /> }
        url={ pathname }
        links={ links }
        link={ Link }
        onMenuClick={ toggleSidebar } />
    );
  }
}
