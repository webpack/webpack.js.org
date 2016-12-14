import React, { Component } from 'react';
import SidebarItem from '../sidebar-item/sidebar-item';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {shouldFixSidebar: false};
  }

  componentDidMount() {
    document.addEventListener('scroll', this.onScroll.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll() {
    let { scrollY } = window;
    let offsetY = document.querySelector('header').offsetHeight || 55;
    let shouldFixSidebar = scrollY >= offsetY;

    this.setState({shouldFixSidebar});
  }

  render() {
    let { sectionName, pages, currentPage } = this.props;
    let { shouldFixSidebar } = this.state;
    let stickyStyle = {
      position: 'fixed',
      top: 0
    };
    let style = shouldFixSidebar ? stickyStyle : null;

    return (
      <nav className="sidebar" style={ style }>
        <div className="sidebar__inner">
          <h3 className="sidebar-item__version">Version 2.1</h3>
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
              />
            )
          }
        </div>
      </nav>
    );
  }
}
