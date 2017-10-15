import React, { Component } from 'react';
import Shield from '../Shield/Shield';
import SidebarItem from '../SidebarItem/SidebarItem';

export default class Sidebar extends Component {
  state = {
    fixed: false,
    availableHeight: null,
    maxWidth: null
  };

  render() {
    let { pages, currentPage } = this.props;
    let { fixed, availableHeight, maxWidth } = this.state;
    let group;

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
            <Shield content="npm/v/webpack" label="webpack" />
          </a>

          { pages.map((page, index) => {
            let displayGroup = group !== page.group && page.group !== '-';
            group = page.group;

            return (
              <div key={ `sidebar-item-${index}` }>
                { displayGroup ? (
                  <h4 className="sidebar__group">
                    { group }
                  </h4>
                ) : null }

                <SidebarItem
                  index={ index }
                  url={ page.url }
                  title={ page.title }
                  anchors={ page.anchors }
                  currentPage= { currentPage }
                  onToggle={ this._recalculate.bind(this) } />
              </div>
            );
          })}
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
