import PropTypes from "prop-types";
import { Component } from "react";
import "./SidebarItem.scss";
import { NavLink } from "react-router-dom";
import ChevronRightIcon from "../../styles/icons/chevron-right.svg";
import BarIcon from "../../styles/icons/vertical-bar.svg";
import list2Tree from "../../utilities/list2Tree/index.js";

const block = "sidebar-item";

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
    if (window.location.hash !== "") {
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
        {anchors.map((anchor) => (
          <li
            key={this._generateAnchorURL(anchor)}
            className={`${block}__anchor`}
            title={anchor.title}
          >
            <NavLink to={this._generateAnchorURL(anchor)}>
              {anchor.title2}
            </NavLink>
            {anchor.children && this.renderAnchors(anchor.children)}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { title, anchors = [] } = this.props;
    const openMod = this.state.open ? `${block}--open` : "";
    const disabledMod = anchors.length === 0 ? `${block}--disabled` : "";

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
          end
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

  // eslint-disable-next-line camelcase
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
    return new RegExp(`${props.currentPage}/?$`).test(props.url);
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
    const { url } = this.props;
    return anchor.id ? `${url}#${anchor.id}` : url;
  }
}
