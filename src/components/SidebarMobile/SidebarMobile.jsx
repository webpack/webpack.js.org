import React from 'react';
import Link from '../Link/Link';
import './SidebarMobile.scss';

// TODO: Finish updating close and swipe behaviors
export default class SidebarMobile extends React.Component {
  _container = null
  _initialTouchPosition = {}
  _lastTouchPosition = {}

  render() {
    let { open } = this.props;
    let openMod = open ? 'sidebar-mobile--visible' : '';

    return (
      <nav
        className={ `sidebar-mobile ${openMod}` }
        ref={ ref => this._container = ref }
        onTouchStart={ this._handleTouchStart }
        onTouchMove={ this._handleTouchMove }
        onTouchEnd={ this._handleTouchEnd }>

        <div
          className="sidebar-mobile__toggle"
          onTouchStart={ this._handleTouchStart }
          onTouchMove={ this._handleOpenerTouchMove }
          onTouchEnd={ this._handleTouchEnd } />

        <div className="sidebar-mobile__content">
          <i
            className="sidebar-mobile__close icon-cross"
            onClick={ this.props.toggle } />

          { this._getSections() }
        </div>
      </nav>
    );
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      // window.addEventListener('click', this._handleBodyClick);
      window.addEventListener('touchstart', this._handleBodyClick);
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      // window.removeEventListener('click', this._handleBodyClick);
      window.removeEventListener('touchstart', this._handleBodyClick);
    }
  }

  /**
   * Get markup for each section
   *
   * @return {array} - Markup containing sections and links
   */
  _getSections() {
    let pathname = '';

    if (window.location !== undefined) {
      pathname = window.location.pathname;
    }

    return this.props.sections.map(section => {
      let active = pathname === section.url || pathname.includes(`/${section.url}`),
          absoluteUrl = (section.url == '/') ? '/' : `/${section.url}`;

      return (
        <div
          className={ `sidebar-mobile__section ${active ? 'sidebar-mobile__section--active' : ''}` }
          key={ absoluteUrl }>
          <Link
            className="sidebar-mobile__section-header"
            key={ absoluteUrl }
            to={ absoluteUrl }
            onClick={ this._close.bind(this) }>
            <h3>{ section.title || section.url }</h3>
          </Link>

          { this._getPages(section.pages) }
        </div>
      );
    });
  }

  /**
   * Retrieve markup for page links
   *
   * @param {array} pages - A list of page objects
   * @return {array} - Markup containing the page links
   */
  _getPages(pages) {
    let pathname = '';

    if (window.location !== undefined) {
      pathname = window.location.pathname;
    }

    return pages.map(page => {
      let url = `${page.url}`,
        active = pathname === url || pathname.includes(`${url}/`);

      return (
        <Link
          key={ url }
          className={ `sidebar-mobile__page ${active ? 'sidebar-mobile__page--active' : ''}` }
          to={ url }
          onClick={ this._close.bind(this) }>
          { page.title }
        </Link>
      );
    });
  }

  /**
   * Handle clicks on content
   *
   * @param {object} e - Native click event
   */
  // _handleBodyClick = e => {
  //   if (
  //     this.props.open &&
  //     !this._container.contains(e.target)
  //   ) {
  //     this._close();
  //   }
  // }

  /**
   * Hide the sidebar
   *
   */
  // _close() {
  //   this._container.classList.remove(
  //     'sidebar-mobile--visible'
  //   );
  // }

  // _open() {
  //   this._container.classList.add(
  //     'sidebar-mobile--visible'
  //   );
  // }

  _handleTouchStart = e => {
    this._initialTouchPosition.x = e.touches[0].pageX;
    this._initialTouchPosition.y = e.touches[0].pageY;

    // For instant transform along with the touch
    this._container.classList.add('no-delay');
  }

  _handleTouchMove = e => {
    let xDiff = this._initialTouchPosition.x - e.touches[0].pageX;
    let yDiff = this._initialTouchPosition.y - e.touches[0].pageY;
    let factor = Math.abs(yDiff / xDiff);

    // Factor makes sure horizontal and vertical scroll dont take place together
    if (xDiff>0 && factor < 0.8) {
      e.preventDefault();
      this._container.style.transform = `translateX(-${xDiff}px)`;
      this._lastTouchPosition.x = e.touches[0].pageX;
      this._lastTouchPosition.y = e.touches[0].pageY;
    }
  }

  _handleOpenerTouchMove = e => {
    let xDiff = e.touches[0].pageX - this._initialTouchPosition.x;
    let yDiff = this._initialTouchPosition.y - e.touches[0].pageY;
    let factor = Math.abs(yDiff / xDiff);

    // Factor makes sure horizontal and vertical scroll dont take place together
    if (xDiff > 0 && xDiff < 295 && factor < 0.8) {
      e.preventDefault();
      this._container.style.transform = `translateX(calc(-100% + ${xDiff}px))`;
      this._lastTouchPosition.x = e.touches[0].pageX;
      this._lastTouchPosition.y = e.touches[0].pageY;
    }
  }

  _handleTouchEnd = e => {
    // Free up all the inline styling
    this._container.classList.remove('no-delay');
    this._container.style.transform = '';

    if (this._initialTouchPosition.x - this._lastTouchPosition.x > 100) {
      this._close();
    } else if (this._lastTouchPosition.x - this._initialTouchPosition.x > 100) {
      this._open();
    }
  }
}
