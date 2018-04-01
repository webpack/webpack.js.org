import React, { Component } from 'react';
import Shield from '../Shield/Shield';
import SidebarItem from '../SidebarItem/SidebarItem';
import '../Sidebar/Sidebar.scss';

export default class Sidebar extends Component {
  render() {
    let { className = '', pages, currentPage } = this.props;
    let group;

    return (
      <nav className={`sidebar ${className}`}>
        <div className="sidebar__inner">
          <a href="https://github.com/webpack/webpack/releases">
            <Shield content="npm/v/webpack" label="webpack" />
          </a>

          {pages.map((page, index) => {
            let displayGroup = group !== page.group && page.group !== '-';
            group = page.group;

            return (
              <div key={`sidebar-item-${index}`}>
                {displayGroup ? <h4 className="sidebar__group">{group}</h4> : null}

                <SidebarItem
                  index={index}
                  url={page.url}
                  title={page.title}
                  anchors={page.anchors}
                  currentPage={currentPage}
                />
              </div>
            );
          })}
        </div>
      </nav>
    );
  }
}
