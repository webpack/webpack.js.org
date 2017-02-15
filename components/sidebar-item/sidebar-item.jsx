import React from 'react';
import Link from '../link/link';

export default class SidebarItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: this.isOpen(props)
    };
  }

  render() {
    let { index, url, title, anchors = [] } = this.props;

    let emptyMod = !anchors.length ? 'sidebar-item--empty' : '';
    let openMod = (this.state.open) ? 'sidebar-item--open' : '';
    let anchorUrl = url + '#';

    return (
      <div className={ `sidebar-item ${emptyMod} ${openMod}` }>
        <Link className="sidebar-item__title" to={ url }>{ title }</Link>
        <i className="sidebar-item__toggle icon-chevron-down" onClick={ this.toggle.bind(this) } />
        <ul className="sidebar-item__anchors">
          {
            anchors.map((anchor, j) => (
              <li className="sidebar-item__anchor" key={ `anchor-${index}-${j}` }>
                <a href={ anchorUrl + anchor.id }>{ anchor.title}</a>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentPage == this.props.currentPage) return;

    this.setState({ open: this.isOpen(nextProps) });
  }

  isOpen(props) {
    return `/${props.currentPage}` === props.url;
  }

  toggle(e) {
    let { onToggle } = this.props;

    this.setState({
      open: !this.state.open
    }, () => {
      if (typeof onToggle === 'function') {
        onToggle();
      }
    });
  }
}