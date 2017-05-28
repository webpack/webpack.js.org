import React from 'react';
import { uniqueId } from 'lodash';
import Link from '../link/link';

const block = 'sidebar-item';

export default class SidebarItem extends React.Component {
  state = {
    open: this._isOpen(this.props)
  };

  render() {
    let { title, anchors = [] } = this.props;
    let openMod = this.state.open ? `${block}--open` : '';
    let disabledMod = anchors.length == 0 ? `${block}--disabled` : '';

    return (
      <div className={ `${block} ${openMod} ${disabledMod}` }>
        { anchors.length > 0 ? (
          <i
            className={ `${block}__toggle icon-chevron-right` }
            onClick={ this._toggle.bind(this) } />
        ) : (
          <i className={ `${block}__toggle icon-vertical-bar` } />
        )}

        <Link
          className={ `${block}__title` }
          to={ this.props.url }>
          { title }
        </Link>

        { anchors.length > 0 ? (
          <ul className={ `${block}__anchors` }>
            {
              anchors.map(anchor => (
                <li
                  key={ `anchor-${title}-${uniqueId()}` }
                  className={ `${block}__anchor` }
                  title={ anchor.title }>
                  <a href={ this._generateAnchorURL(anchor) }>
                    { anchor.title }
                  </a>
                </li>
              ))
            }
          </ul>
        ) : null }
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if ( nextProps.currentPage !== this.props.currentPage ) {
      this.setState({
        open: this._isOpen(nextProps)
      });
    }
  }

  /**
   * Checks whether the item should be expanded
   *
   * @param {object} props - The current props
   */
  _isOpen(props) {
    return RegExp(`${props.currentPage}/?$`).test(props.url);
  }

  /**
   * Toggles the open state (expanded/collapsed)
   *
   * @param {object} e - Click event
   */
  _toggle(e) {
    let { onToggle } = this.props;

    this.setState({
      open: !this.state.open
    }, () => {
      if (typeof onToggle === 'function') {
        onToggle();
      }
    });
  }

  /**
   * Generate the url for the given [anchor] depending on the current page
   *
   * @return {object} anchor - The anchor object containing its id
   */
  _generateAnchorURL(anchor) {
    let { currentPage, url } = this.props;

    if ( `/${currentPage}` === url ) {
      return `#${anchor.id}`;

    } else return `${url}#${anchor.id}`;
  }
}
