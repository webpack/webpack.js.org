import React from 'react';
import Link from '../link/link';
import './sidebar-mobile-style';

export default class SidebarMobile extends React.Component {
  render() {
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