import React, { Component } from 'react';
import SidebarItem from '../sidebar-item/sidebar-item';

export default class Sidebar extends Component {
  state = {
    fixed: false,
    availableHeight: null,
    maxWidth: null
  };

  render() {
    let { sectionName, pages, currentPage } = this.props;
    let { fixed, availableHeight, maxWidth } = this.state;

    return (
      <nav
        className="sidebar"
        ref={ ref => this._container = ref }
        style={{
          position: fixed ? 'fixed' : null,
          top: fixed ? 0 : null,
          width: fixed ? maxWidth : null,
          maxHeight: availableHeight
        }}>

        <div className="sidebar__inner">
          <a href="https://github.com/webpack/webpack/releases">
            <img src="https://img.shields.io/github/release/webpack/webpack.svg?style=flat-square" alt="GitHub release" />
          </a>

          <SidebarItem
            url={ `/${sectionName}/` }
            title="Introduction"
            currentPage= { currentPage } />

          {
            pages.map(({ url, title, anchors }, i) =>
              <SidebarItem
                key={ `sidebar-item-${i}` }
                index={i}
                url={ `${url}` }
                title={ title }
                anchors={ anchors }
                currentPage= { currentPage }
                onToggle={ this._recalculate.bind(this) } />
            )
          }
        </div>

      </nav>
    );
  }

  componentDidMount() {
    setTimeout(
      this._recalculate.bind(this),
      250
    );

    document.addEventListener(
      'scroll',
      this._recalculate.bind(this)
    );
  }

  componentWillUnmount() {
    document.removeEventListener(
      'scroll',
      this._recalculate.bind(this)
    );
  }

  /**
   * Re-calculate fixed state and position
   *
   */
  _recalculate() {
    let { scrollY, innerHeight } = window;
    let { scrollHeight } = document.body;
    let { offsetHeight: sidebarHeight } = this._container;
    let { offsetWidth: parentWidth, offsetHeight: parentHeight } = this._container.parentNode;
    let headerHeight = document.querySelector('header').offsetHeight + document.querySelector('.notification-bar').offsetHeight;
    let footerHeight = document.querySelector('footer').offsetHeight;
    let distToBottom = scrollHeight - scrollY - innerHeight;

    // Calculate the space that the footer and header are actually occupying
    let headerSpace = scrollY > headerHeight ? 0 : headerHeight - scrollY;
    let footerSpace = distToBottom > footerHeight ? 0 : footerHeight - distToBottom;

    this.setState({
      fixed: scrollY >= headerHeight && sidebarHeight < parentHeight,
      availableHeight: innerHeight - headerSpace - footerSpace,
      maxWidth: parentWidth
    });
  }
}
