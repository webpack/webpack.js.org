import React from 'react';
import Link from '../Link/Link';
import Container from '../Container/Container';
import Dropdown from '../Dropdown/Dropdown';

import './Scaffolding.scss';

// TODO: Migrate to React Banner
export default class Scaffolding extends React.Component {
  render() {
    let { pageUrl = '' } = this.props;

    return (
      <header className="scaffold">
        <Container className="scaffold__inner">
          <div className="scaffold__mobile" onClick={ this._toggleSidebar }>
            <i className="icon-menu" />
          </div>

          <div className="scaffold__search">
            <input
              type="text"
              className="scaffold__search-input"
              placeholder="Search scaffolds..."
              onBlur={ this._toggleSearch.bind(this) } />
            <button
              className="scaffold__search-icon icon-magnifying-glass"
              onClick={ this._toggleSearch.bind(this) } />
            <button
              className="scaffold__search-icon icon-cross"
              onClick={ this._toggleSearch.bind(this) } />
          </div>

        </Container>

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
        inputSelector: '.scaffold__search-input'
      });

      window.addEventListener('keyup', e => {
        if (e.which === 9 && e.target.classList.contains('scaffold__search-input')) {
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
    let container = document.querySelector('.scaffold');
    let input = document.querySelector('.scaffold__search-input');
    let state = container.classList.toggle('scaffold--search-mode');

    if ( state === true ) input.focus();
  }

  /**
   * Expand the search input
   *
   */
  _openSearch() {
    let container = document.querySelector('.scaffold');

    container.classList.add('scaffold--search-mode');
  }
}
