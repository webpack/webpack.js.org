import React from 'react';
import Link from './Link';

const Sidebar = ({ sectionName, pages }) => {
  return (
    <nav className="sidebar">
      <div className="sidebar__inner">
        <Item url={ `/${sectionName}` } title="Introduction" />
        {
          pages.map(({ url, title, anchors }, i) =>
            <Item
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
};

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  render() {
    let { index, url, title, anchors = [] } = this.props;
    let emptyMod = !anchors.length ? 'sidebar-item--empty' : '';
    let openMod = this.state.open ? 'sidebar-item--open' : '';

    return (
      <div className={ `sidebar-item ${emptyMod} ${openMod}` }>
        <Link className="sidebar-item__title" to={ url }>{ title }</Link>
        <i className="sidebar-item__toggle icon-chevron-down" onClick={ this.toggle.bind(this) } />
        <ul className="sidebar-item__anchors">
          {
            anchors.map((anchor, j) => (
              <li className="sidebar-item__anchor" key={ `anchor-${index}-${j}` }>
                <Link to={ `${url}#${anchor.id}` }>{ anchor.title }</Link>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }

  toggle(e) {
    this.setState({
      open: !this.state.open
    });
  }
}

export default Sidebar;
