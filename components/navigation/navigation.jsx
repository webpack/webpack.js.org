import React from 'react';
import CustomEvent from 'custom-event';
import Link from '../link/link';
import Container from '../container/container';
import Logo from '../logo/logo';
import './navigation-style';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchMode: false
    };
  }

  render() {
    let { pageUrl, sections } = this.props;
    let isIndex = pageUrl === '/index';
    let transparentClass = isIndex ? 'navigation--transparent' : '';
    let searchClass = this.state.searchMode ? 'navigation--search-mode' : '';
    
    return (
      <header className={ `navigation ${transparentClass} ${searchClass}` }>
        <Container className="navigation__inner">
          <div className="navigation__mobile" onClick={ this._toggleSidebar }>
            <i className="icon-menu" />
          </div>

          <Link className="navigation__logo" to="/">
            <Logo light={ !isIndex } />
          </Link>

          <nav className="navigation__links">
            {
              sections.filter(section => section.title !== 'Other').map((link, i) => {
                let active = pageUrl.includes(`${link.url}/`);
                let activeClass = active ? 'navigation__link--active' : '';

                return (
                  <Link
                    key={ `navigation__link${i}` }
                    className={ `navigation__link ${activeClass}` }
                    to={ `/${link.url}` }>
                    { link.title }
                  </Link>
                );
              })
            }

            <Link className="navigation__link" to={ '//opencollective.com/webpack' }>
              Donate
            </Link>
          </nav>

          <div className="navigation__search">
            <input 
              type="text" 
              className="navigation__search-input"
              placeholder="Coming soon..."
              onFocus={ this._toggleSearch.bind(this, true) }
              onChange={ this._handleSearch.bind(this) } />
            <span 
              className="navigation__search-icon"
              ref={ ref => this.input = ref }
              onClick={ this._toggleSearch.bind(this, !this.state.searchMode) }>
              &#9906;
            </span>
          </div>
        </Container>
      </header>
    );
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
   * Toggle search mode
   * 
   * @param {boolean} state - True/false or null to toggle
   */
  _toggleSearch(state) {
    this.setState({
      searchMode: state
    });
  }

  /**
   * Handle searching
   * 
   * @param {object} - Native click event
   */
  _handleSearch(e) {
    window.dispatchEvent(
      new CustomEvent('search', {
        detail: {
          text: e.target.value
        }
      })
    );
  }
}
