import React from 'react';
import Link from '../link/link';
import Container from '../container/container';
import Logo from '../logo/logo';
import './navigation-style';
import './search-style';

let Links = [
  { 
    title: 'Concepts', 
    url: '/concepts' 
  },
  { 
    title: 'Guides', 
    url: '/guides' 
  },
  { 
    title: 'Documentation', 
    url: '/configuration',
    children: [
      { title: 'Configuration', url: '/configuration' },
      { title: 'Loaders', url: '/loaders' },
      { title: 'Plugins', url: '/plugins' },
      { title: 'API', url: '/api' }
    ]
  },
  { 
    title: 'Donate', 
    url: '//opencollective.com/webpack' 
  }
];

export default class Navigation extends React.Component {
  render() {
    let { pageUrl, sections } = this.props;
    let isIndex = pageUrl === '/index';
    let transparentClass = isIndex ? 'navigation--transparent' : '';
    
    return (
      <header className={ `navigation ${transparentClass}` }>
        <Container className="navigation__inner">
          <div className="navigation__mobile" onClick={ this._toggleSidebar }>
            <i className="icon-menu" />
          </div>

          <Link className="navigation__logo" to="/">
            <Logo light={ !isIndex } />
          </Link>

          <nav className="navigation__links">
            {
              // sections.filter(section => ['Other', 'Get-Started'].indexOf(section.title) === -1).map((link, i) => {
              //   let active = pageUrl.includes(`${link.url}/`);
              //   let activeClass = active ? 'navigation__link--active' : '';

              Links.map(link => (
                <Link
                  key={ `navigation__link-${link.title}` }
                  className="navigation__link"
                  to={ link.url }>
                  { link.title }
                </Link>
              ))
            }
          </nav>

          <div className="navigation__search">
            <input 
              type="text" 
              className="navigation__search-input"
              placeholder="Search documentation…" />
            <button 
              className="navigation__search-icon"
              onClick={ this._toggleSearch.bind(this) }>
              &#9906;
            </button>
          </div>
        </Container>
      </header>
    );
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.docsearch({
        apiKey: 'fac401d1a5f68bc41f01fb6261661490',
        indexName: 'webpack-js-org',
        inputSelector: '.navigation__search-input'
      });

      window.addEventListener('keyup', e => {
        if (e.which === 9 && e.target.classList.contains('navigation__search-input')) {
          this._openSearch();
        }
      });
    }
  }

  /**
   * Toggle the SidebarMobile component
   * 
   * @param {object} e - Native click event
   */
  _toggleSidebar(e) {
    let sidebar = document.querySelector('.sidebar-mobile');
    let modifier = 'sidebar-mobile--visible';

    sidebar.classList.toggle(modifier);
  }

  /**
   * Toggle the search input
   * 
   */
  _toggleSearch() {
    let container = document.querySelector('.navigation');
    let input = document.querySelector('.navigation__search-input');
    let state = container.classList.toggle('navigation--search-mode');

    if ( state === true ) input.focus();
  }

  /**
   * Expand the search input
   * 
   */
  _openSearch() {
    let container = document.querySelector('.navigation');
    
    container.classList.add('navigation--search-mode');
  }
}
