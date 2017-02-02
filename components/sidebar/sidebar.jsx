import React, { Component } from 'react';
import SidebarItem from '../sidebar-item/sidebar-item';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fixed: false,
      top: 0
    };
  }

  componentDidMount() {
    document.addEventListener('scroll', this._recalculate.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this._recalculate.bind(this));
  }

  /**
   * Re-calculate fixed state and position
   * 
   */
  _recalculate() {
    let { scrollY, innerHeight } = window;
    let { scrollHeight } = document.body;
    let { offsetHeight } = this._container;
    let distToBottom = scrollHeight - scrollY - innerHeight;
    let headerHeight = document.querySelector('header').offsetHeight;
    let footerHeight = document.querySelector('footer').offsetHeight;
    let allowedHeight = distToBottom < footerHeight ? innerHeight - (footerHeight - distToBottom) : offsetHeight;
    let extraHeight = offsetHeight > allowedHeight ? offsetHeight - allowedHeight : 0;
    let fixed = scrollY >= headerHeight;

    this.setState({ 
      fixed,
      top: scrollY - headerHeight - extraHeight
    });
  }

  render() {
    let { sectionName, pages, currentPage } = this.props;
    let { fixed, top, allowedHeight } = this.state;
    let isGuides = sectionName === 'guides';

    return (
      <nav 
        className="sidebar" 
        ref={ ref => this._container = ref }
        style={ fixed ? {
          top: top
        } : null }>

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
}
