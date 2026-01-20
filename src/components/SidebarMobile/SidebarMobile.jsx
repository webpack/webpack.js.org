import PropTypes from "prop-types";
import { Component } from "react";
import CloseIcon from "../../styles/icons/cross.svg";
import Link from "../Link/Link.jsx";
import "./SidebarMobile.scss";

// TODO: Check to make sure all pages are shown and properly sorted
export default class SidebarMobile extends Component {
  _container = null;

  _initialTouchPosition = {};

  _lastTouchPosition = {};

  static propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func,
    sections: PropTypes.array,
  };

  render() {
    const { isOpen, toggle } = this.props;
    const openMod = isOpen ? " sidebar-mobile--visible" : "";

    this._toggleBodyListener(isOpen);

    return (
      <nav
        className={`sidebar-mobile${openMod}`}
        ref={(ref) => (this._container = ref)}
        onTouchStart={this._handleTouchStart}
        onTouchMove={this._handleTouchMove}
        onTouchEnd={this._handleTouchEnd}
      >
        <div
          className="sidebar-mobile__toggle"
          onTouchStart={this._handleTouchStart}
          onTouchMove={this._handleOpenerTouchMove}
          onTouchEnd={this._handleTouchEnd}
        />

        <div className="sidebar-mobile__content">
          <span
            role="button"
            className="sidebar-mobile__close"
            onClick={toggle.bind(null, false)}
          >
            <CloseIcon fill="#fff" width={20} />
          </span>

          {this._getSections()}
        </div>
      </nav>
    );
  }

  _toggleBodyListener = (add) => {
    const actionName = add ? "addEventListener" : "removeEventListener";
    window[actionName]("touchstart", this._handleBodyClick);
    window[actionName]("mousedown", this._handleBodyClick);
  };

  /**
   * Get markup for each section
   *
   * @return {array} - Markup containing sections and links
   */
  _getSections() {
    let pathname = "";

    if (window && window.location !== undefined) {
      pathname = window.location.pathname;
    }

    return this.props.sections.map((section) => {
      const active = section.url !== "/" && pathname.startsWith(section.url);

      return (
        <div
          className={`sidebar-mobile__section ${
            active ? "sidebar-mobile__section--active" : ""
          }`}
          key={section.url}
        >
          <Link
            className="sidebar-mobile__section-header"
            key={section.url}
            to={section.url}
            onClick={this.props.toggle.bind(null, false)}
          >
            <h3>{section.title || section.url}</h3>
          </Link>

          {this._getPages(section.children)}
        </div>
      );
    });
  }

  /**
   * Retrieve markup for page links
   *
   * @param {array} pages - A list of page objects
   * @return {array} - Markup containing the page links
   */
  _getPages(pages) {
    let pathname = "";

    if (window.location !== undefined) {
      pathname = window.location.pathname;
    }

    return pages.map((page) => {
      const url = `${page.url}`;
      const active = pathname === url;

      return (
        <Link
          key={url}
          className={`sidebar-mobile__page sidebar-mobile__section-child ${
            active ? "sidebar-mobile__page--active" : ""
          }`}
          to={url}
          onClick={this.props.toggle.bind(null, false)}
        >
          {page.title}
        </Link>
      );
    });
  }

  /**
   * Handle clicks on content
   *
   * @param {object} event - Native click event
   */
  _handleBodyClick = (event) => {
    const { isOpen, toggle } = this.props;
    if (isOpen && !this._container.contains(event.target)) {
      toggle(false);
    }
  };

  _handleTouchStart = (event) => {
    this._initialTouchPosition.x = event.touches[0].pageX;
    this._initialTouchPosition.y = event.touches[0].pageY;

    // For instant transform along with the touch
    this._container.classList.add("no-delay");
  };

  _handleTouchMove = (event) => {
    const xDiff = this._initialTouchPosition.x - event.touches[0].pageX;
    const yDiff = this._initialTouchPosition.y - event.touches[0].pageY;
    const factor = Math.abs(yDiff / xDiff);

    // Factor makes sure horizontal and vertical scroll dont take place together
    if (xDiff > 0 && factor < 0.8) {
      event.preventDefault();
      this._container.style.transform = `translateX(-${xDiff}px)`;
      this._lastTouchPosition.x = event.touches[0].pageX;
      this._lastTouchPosition.y = event.touches[0].pageY;
    }
  };

  _handleOpenerTouchMove = (event) => {
    const xDiff = event.touches[0].pageX - this._initialTouchPosition.x;
    const yDiff = this._initialTouchPosition.y - event.touches[0].pageY;
    const factor = Math.abs(yDiff / xDiff);

    // Factor makes sure horizontal and vertical scroll dont take place together
    if (xDiff > 0 && xDiff < 295 && factor < 0.8) {
      event.preventDefault();
      this._container.style.transform = `translateX(calc(-100% + ${xDiff}px))`;
      this._lastTouchPosition.x = event.touches[0].pageX;
      this._lastTouchPosition.y = event.touches[0].pageY;
    }
  };

  _handleTouchEnd = (event) => {
    const { isOpen } = this.props;
    const threshold = 20;

    // Free up all the inline styling
    this._container.classList.remove("no-delay");
    this._container.style.transform = "";

    // are we open?
    if (
      isOpen &&
      this._initialTouchPosition.x - this._lastTouchPosition.x > threshold
    ) {
      // this is in top level nav callback
      this.props.toggle(false);
    } else if (
      !isOpen &&
      this._lastTouchPosition.x - this._initialTouchPosition.x > threshold
    ) {
      this.props.toggle(true);
      event.preventDefault();
      event.stopPropagation();
    }
  };
}
