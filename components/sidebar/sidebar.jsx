import React from 'react';
import SidebarItem from '../sidebar-item/sidebar-item';
import './sidebar-style';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this._scroll = this._onScroll.bind(this);
    this.state = {
      offset: 0
    };
  }

  render() {
    let { sectionName, pages } = this.props;
    let { offset } = this.state;

    return (
      <nav className="sidebar">
        <div className="sidebar__inner">
          <SidebarItem 
            url={ `/${sectionName}` } 
            title="Introduction" />

          {
            pages.map(({ url, title, anchors }, i) =>
              <SidebarItem
                key={ `sidebar-item-${i}` }
                index={i}
                url={ `/${url}` }
                title={ title }
                anchors={ anchors }
              />
            )
          }
        </div>
      </nav>
    );
  }

  componentDidMount() {
    window.addEventListener('scroll', this._scroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._scroll);
  }

  _onScroll(e) {
    let nav = document.querySelector('.navigation__inner');
    let styles = nav ? getComputedStyle(nav) : {};
    let overlayed = nav.parentNode.classList.contains('headroom--pinned');

    if ( document.body.scrollTop !== 0 && overlayed ) {
      this.setState({
        offset: parseInt(styles.height, 10)
      });

    } else {
      this.setState({
        offset: 0
      });
    }
  }
}