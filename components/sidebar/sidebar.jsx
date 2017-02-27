import React, { Component } from 'react';
import SidebarItem from '../sidebar-item/sidebar-item';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fixed: false,
      availableHeight: null,
      maxWidth: null
    };
  }

  render() {
    let { sectionName, pages, currentPage } = this.props;
    let { fixed, availableHeight, maxWidth } = this.state;
    let isGuides = sectionName === 'guides';

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
          <h3 className="sidebar-item__version">Version 2.2</h3>

          <SidebarItem
            url={ `/${sectionName}` }
            title="Introduction"
            currentPage= { currentPage }
          />

          {
            pages.map(({ url, title, anchors }, i) =>
              <SidebarItem
                key={ `sidebar-item-${i}` }
                index={i}
                url={ `/${url}` }
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
    let headerHeight = document.querySelector('header').offsetHeight;
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
