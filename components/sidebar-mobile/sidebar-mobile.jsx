import React from 'react';
import Link from '../link/link';
import './sidebar-mobile-style';

export default class SidebarMobile extends React.Component {
  constructor(props) {
    super(props);

    this._handleBodyClick = this._handleBodyClick.bind(this);
  }

  render() {
    let pathname;

    // TODO: Use this to show active sidebar-mobile__page
    if (typeof window !== 'undefined') {
      pathname = window.location.pathname;
    }

    return (
      <nav className="sidebar-mobile" ref={ ref => this.container = ref }>
        <i className="sidebar-mobile__close icon-cross"
          onClick={ this._close.bind(this) } />

        {
          this.props.sections.map(section => (
            <div key={ section.url }>
              <h3 className="sidebar-mobile__section">{ section.title }</h3>
              <Link className="sidebar-mobile__page" to="#">Page 1</Link>
              <Link className="sidebar-mobile__page" to="#">Page 2</Link>
              <Link className="sidebar-mobile__page" to="#">Page 3</Link>
            </div>
          ))
        }
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