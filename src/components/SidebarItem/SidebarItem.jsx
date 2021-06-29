import { Component } from 'react';
import './SidebarItem.scss';
import list2Tree from '../../utilities/list2Tree';
import ChevronRightIcon from '../../styles/icons/chevron-right.svg';
import BarIcon from '../../styles/icons/vertical-bar.svg';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const block = 'sidebar-item';

export default class SidebarItem extends Component {
  static propTypes = {
    title: PropTypes.string,
    anchors: PropTypes.array,
    url: PropTypes.string,
    currentPage: PropTypes.string,
  };
  state = {
    open: this._isOpen(this.props),
  };

  scrollTop(event) {
    // there're two cases
    // 1. location.pathname or location.hash changes which will be handled by useEffect in Page.jsx
    // 2. location.pathname and location.hash doesn't change at all
    if (window.location.hash !== '') {
      // case 1
      return;
    }
    if (!event.metaKey && !event.ctrlKey) {
      // case 2
      window.scrollTo(0, 0);
    }
  }

  renderAnchors(anchors) {
    return (
      <ul className={`${block}__anchors`}>
        {anchors.map((anchor) => {
          anchor = this._handleAnchor(anchor);
          return (
            <li
              key={this._generateAnchorURL(anchor)}
              className={`${block}__anchor`}
              title={anchor.title}
            >
              <NavLink to={this._generateAnchorURL(anchor)}>
                {anchor.title}
              </NavLink>
              {anchor.children && this.renderAnchors(anchor.children)}
            </li>
          );
        })}
      </ul>
    );
  }

  _handleAnchor(anchor) {
    let id = anchor.id;
    let title = anchor.title2;
    const match = /^.+(\s*\{#([a-z0-9\-_]+?)\}\s*)$/.exec(title);
    id = match ? match[2] : id;
    title = match ? title.replace(match[1], '').trim() : title;
    anchor.id = id;
    anchor.title = title;
    return anchor;
  }

  render() {
    let { title, anchors = [] } = this.props;
    let openMod = this.state.open ? `${block}--open` : '';
    let disabledMod = anchors.length == 0 ? `${block}--disabled` : '';

    const filteredAnchors = anchors.filter((anchor) => anchor.level > 1);
    const tree = list2Tree(title, filteredAnchors);

    return (
      <div className={`${block} ${openMod} ${disabledMod}`}>
        {anchors.length > 0 ? (
          <ChevronRightIcon
            width={15}
            height={17}
            fill="#175d96"
            className={`${block}__toggle`}
            onClick={this._toggle.bind(this)}
          />
        ) : (
          <BarIcon
            className={`${block}__toggle`}
            width={15}
            height={17}
            fill="#175d96"
          />
        )}

        <NavLink
          exact
          key={this.props.url}
          className={`${block}__title`}
          to={this.props.url}
          onClick={this.scrollTop}
        >
          {title}
        </NavLink>

        {anchors.length > 0 ? this.renderAnchors(tree) : null}
      </div>
    );
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.currentPage !== this.props.currentPage) {
      this.setState({
        open: this._isOpen(nextProps),
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
  _toggle() {
    this.setState({
      open: !this.state.open,
    });
  }

  /**
   * Generate the url for the given [anchor] depending on the current page
   *
   * @param {object} anchor - The anchor object containing its id
   * @returns {string}
   */
  _generateAnchorURL(anchor) {
    let { url } = this.props;
    return anchor.id ? `${url}#${anchor.id}` : url;
  }
}
