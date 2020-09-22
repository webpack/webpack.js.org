import React from 'react';
import Link from '../Link/Link';
import './SidebarItem.scss';
import list2Tree from '../../utilities/list2Tree';

const block = 'sidebar-item';

export default class SidebarItem extends React.Component {
  state = {
    open: this._isOpen(this.props)
  };

  renderAnchors(anchors) {
    return (
      <ul className={`${block}__anchors`}>
        {
          anchors.map((anchor, i) => {
            anchor = this._handleAnchor(anchor);
            return (<li
              key={this._generateAnchorURL(anchor)}
              className={`${block}__anchor`}
              title={anchor.title}
            >
              <a href={this._generateAnchorURL(anchor)}>{anchor.title}</a>
              {anchor.children && this.renderAnchors(anchor.children)}
            </li>
            );
          })
        }
      </ul>
    );
  }

  _handleAnchor(anchor) {
    let id = anchor.id;
    let title = anchor.title;
    const match = /^.+(\s*\{#([a-z0-9\-_]+?)\}\s*)$/.exec(title);
    id = match ? match[2] : id;
    title = match ? title.replace(match[1], '').trim() : title;
    anchor.id = id;
    anchor.title = title;
    return anchor;
  }

  scrollTop() {
    window.scrollTo(0, 0);
  }

  render() {
    let {title, anchors = []} = this.props;
    let openMod = this.state.open ? `${block}--open` : '';
    let disabledMod = anchors.length == 0 ? `${block}--disabled` : '';

    const filteredAnchors = anchors.filter(anchor => anchor.level > 1);
    const tree = list2Tree(filteredAnchors);
    
    return (
      <div className={`${block} ${openMod} ${disabledMod}`}>
        {anchors.length > 0 ? (
          <i
            className={`${block}__toggle icon-chevron-right`}
            onClick={this._toggle.bind(this)} />
        ) : (
          <i className={`${block}__toggle icon-vertical-bar`} />
        )}

        <Link
          key={this.props.url}
          className={`${block}__title`}
          to={this.props.url}
          onClick={this.scrollTop}>
          {title}
        </Link>

        {anchors.length > 0 ? this.renderAnchors(tree) : null}
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
    this.setState({
      open: !this.state.open
    });
  }

  /**
   * Generate the url for the given [anchor] depending on the current page
   *
   * @param {object} anchor - The anchor object containing its id
   * @returns {string}
   */
  _generateAnchorURL(anchor) {
    let {url} = this.props;
    return anchor.id ? `${url}#${anchor.id}` : url;
  }
}
