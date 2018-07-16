import React from 'react';
import Link from '../Link/Link';
import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import Dropdown from '../Dropdown/Dropdown';
import Links from './Links.json';

// TODO: Migrate to React Banner
export default class Navigation extends React.Component {
  render() {
    let { pageUrl = '' } = this.props;

    return (
      <header className="navigation" ref={ container => this.container = container }>
        <Container className="navigation__inner">
          <div className="navigation__mobile" onClick={ this._toggleSidebar }>
            <i className="icon-menu" />
          </div>

          <Link className="navigation__logo" to="/">
            <Logo light={ true } />
          </Link>

          <nav className="navigation__links">
            { Links.map(link => {
              let active = this._isActive(link);
              let activeMod = active ? 'navigation__link--active' : '';

              return (
                <Link
                  key={ `navigation__link-${link.title}` }
                  className={ `navigation__link ${activeMod}` }
                  to={ `/${link.url}/` }>
                  { link.title }
                </Link>
              );
            }) }
          </nav>

          <div role="search" className="navigation__search">
            <input
              aria-label="Search documentation"
              type="search"
              className="navigation__search-input"
              placeholder="Search documentation…"
              ref={ searchInput => this.searchInput = searchInput }
              onBlur={ this._toggleSearch.bind(this) } />
            <button
              aria-label="Open search"
              className="navigation__search-icon icon-magnifying-glass"
              onClick={ this._toggleSearch.bind(this) } />
            <button
              aria-label="Close search"
              className="navigation__search-icon icon-cross"
              onClick={ this._toggleSearch.bind(this) } />
          </div>

          <Link
            className="navigation__icon"
            title="GitHub Repository"
            aria-label="GitHub Repository"
            to="//github.com/webpack/webpack">
            <i aria-hidden="true" className="sidecar__icon icon-github" />
          </Link>

          <Link
            className="navigation__icon"
            title="See Questions on Stack Overflow"
            aria-label="See Questions on Stack Overflow"
            to="//stackoverflow.com/questions/tagged/webpack">
            <i aria-hidden="true" className="sidecar__icon icon-stack-overflow" />
          </Link>

          <Dropdown
            className="navigation__languages"
            items={[
              { title: 'English', url: 'https://webpack.js.org/' },
              { title: '中文', url: 'https://webpack.docschina.org/' }
            ]} />
        </Container>

        { Links.filter(link => this._isActive(link) && link.children).map(link => (
          <div className="navigation__bottom" key={ link.title }>
            <nav className="container navigation__inner">
              {
                link.children.map(child => {
                  let activeMod = this._isActive(child) ? 'navigation__child--active' : '';

                  return (
                    <Link
                      key={ `navigation__child-${child.title}` }
                      className={ `navigation__child ${activeMod}` }
                      to={ `/${child.url}/` }>
                      { child.title }
                    </Link>
                  );
                })
              }
            </nav>
          </div>
        )) }
      </header>
    );
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      let docsearch = () => {};

      // XXX: hack around docsearch
      if (window.docsearch) {
        docsearch = window.docsearch.default || window.docsearch;
      }

      docsearch({
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
   * Check if the given `link` is active
   *
   * @param  {object} link - An object describing the `link`
   * @return {bool}        - Whether or not the given `link` is active
   */
  _isActive(link) {
    let { pageUrl = '' } = this.props;

    if (link.children) {
      return link.children.some(child => {
        return (new RegExp("^/" + child.url + ".*")).test(pageUrl);
      });

    } else return (new RegExp("^/" + link.url +".*")).test(pageUrl);
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
    let state = this.container.classList.toggle('navigation--search-mode');

    if ( state === true ) this.searchInput.focus();
  }

  /**
   * Expand the search input
   *
   */
  _openSearch() {
    this.container.classList.add('navigation--search-mode');
  }
}
