import React from 'react';
import Link from '../link/link';
import './sidebar-mobile-style';

export default class SidebarMobile extends React.Component {
  constructor(props) {
    super(props);

    this._handleBodyClick = this._handleBodyClick.bind(this);
  }

  render() {
    return (
      <nav className="sidebar-mobile" ref={ ref => this.container = ref }>
        <i className="sidebar-mobile__close icon-cross"
          onClick={ this._close.bind(this) } />

        { this._getSections() }
      </nav>
    );
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('click', this._handleBodyClick);
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('click', this._handleBodyClick);
    }
  }

  _getSections() {
    return this.props.sections.map(section => (
      <div key={ section.url }>
        <h3 className="sidebar-mobile__section">{ section.title }</h3>
        { this._getPages(section.pages) }
      </div>
    ));
  }

  _getPages(pages) {
    let pathname;

    if (typeof window !== 'undefined') {
      pathname = window.location.pathname;
    }

    return pages.map(page => {
      let url = `/${page.url}`,
        active = pathname === url;

      return (
        <Link
          key={ url } 
          className={ `sidebar-mobile__page ${active ? 'sidebar-mobile__page--active' : ''}` } 
          to={ url }>
          { page.title }
        </Link>
      );
    });
  }

  /**
   * Handle clicks 
   *
   * @param {object} e - Native click event
   */
  _handleBodyClick(e) {
    if (
      !e.target.classList.contains('icon-menu') &&
      !this.container.contains(e.target)
    ) {
      this._close();
    }
  }

  /**
   * Hide the sidebar
   *
   */
  _close() {
    this.container.classList.remove(
      'sidebar-mobile--visible'
    );
  }
}