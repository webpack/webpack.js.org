import PropTypes from "prop-types";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import ChevronRightIcon from "../../styles/icons/chevron-right.svg";
import BarIcon from "../../styles/icons/vertical-bar.svg";
import list2Tree from "../../utilities/list2Tree/index.js";

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

  renderAnchors(anchors, isOpen) {
    return (
      <ul
        className={`relative my-[0.35em] basis-full list-none flex-wrap overflow-hidden pl-6 leading-[19px] before:absolute before:left-6 before:top-0 before:h-[calc(100%-0.6em)] before:border-l before:border-dashed before:border-[#999999] before:content-[''] ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        {anchors.map((anchor) => (
          <li
            key={this._generateAnchorURL(anchor)}
            className="relative my-[0.25em] basis-full truncate pl-4 first:mt-0 last:mb-0 before:absolute before:left-0 before:top-[10px] before:w-[0.5em] before:border-b before:border-dashed before:border-[#999999] before:content-['']"
            title={anchor.title}
          >
            <NavLink
              to={this._generateAnchorURL(anchor)}
              className="text-slate-700 hover:text-[#175d96]"
            >
              {anchor.title2}
            </NavLink>
            {anchor.children && this.renderAnchors(anchor.children, isOpen)}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { title, anchors = [] } = this.props;
    const isOpen = this.state.open;
    const hasAnchors = anchors.length > 0;

    const filteredAnchors = anchors.filter((anchor) => anchor.level > 1);
    const tree = list2Tree(title, filteredAnchors);

    return (
      <div className="relative my-[0.6em] flex flex-wrap text-[15px]">
        {hasAnchors ? (
          <button
            className="flex items-center border-0 bg-transparent p-0"
            onClick={this._toggle.bind(this)}
            aria-label={`Toggle ${title} section`}
            aria-expanded={isOpen}
          >
            <ChevronRightIcon
              width={15}
              height={17}
              fill="#175d96"
              className={`mr-2 basis-auto shrink-0 self-center text-[#175d96] transition-all duration-[250ms] hover:text-[#333333] ${
                isOpen ? "origin-center rotate-90" : ""
              }`}
            />
          </button>
        ) : (
          <BarIcon
            className="mr-2 basis-auto shrink-0 self-center text-[#aaaaaa]"
            width={15}
            height={17}
            fill="#aaaaaa"
          />
        )}

        <NavLink
          end
          key={this.props.url}
          className={({ isActive }) =>
            `min-w-0 flex-1 truncate text-slate-700 ${
              isActive ? "font-semibold text-[#333333]" : ""
            }`
          }
          to={this.props.url}
          onClick={this.scrollTop}
        >
          {title}
        </NavLink>

        {hasAnchors ? this.renderAnchors(tree, isOpen) : null}
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
