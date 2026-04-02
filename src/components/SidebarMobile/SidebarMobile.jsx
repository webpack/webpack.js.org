import { clsx } from "clsx";
import PropTypes from "prop-types";
import { Component } from "react";
import CloseIcon from "../../styles/icons/cross.svg";
import Link from "../Link/Link.jsx";

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

  componentDidMount() {
    if (this.props.isOpen) {
      this._toggleBodyListener(true);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this._toggleBodyListener(this.props.isOpen);
    }
  }

  componentWillUnmount() {
    this._toggleBodyListener(false);
  }

  render() {
    const { isOpen, toggle } = this.props;

    return (
      <nav
        className={clsx(
          "sidebar-mobile fixed w-[300px] h-screen z-[100] top-0 overflow-y-auto overflow-x-hidden [-webkit-overflow-scrolling:touch] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] md:hidden",
          isOpen
            ? "sidebar-mobile--visible translate-x-0"
            : "[transform:translate3d(calc(-100%+5px),0,0)]",
        )}
        ref={(ref) => (this._container = ref)}
        onTouchStart={this._handleTouchStart}
        onTouchMove={this._handleTouchMove}
        onTouchEnd={this._handleTouchEnd}
      >
        <div
          className={clsx(
            "absolute top-[45px] bottom-0 w-[32px] left-[285px]",
            isOpen && "hidden",
          )}
          onTouchStart={this._handleTouchStart}
          onTouchMove={this._handleOpenerTouchMove}
          onTouchEnd={this._handleTouchEnd}
        />

        <div className="relative w-[285px] h-screen overflow-x-hidden py-1 bg-white dark:bg-[#121212] shadow-[0_0_15px_rgba(0,0,0,0.2)]">
          <button
            className="sidebar-mobile__close absolute cursor-pointer border-none right-[22px] top-[10px] text-[1.3em] bg-[#175d96] text-white w-[30px] h-[30px] flex items-center justify-center rounded-full transition-colors duration-150 [-webkit-tap-highlight-color:transparent] hover:bg-[#135d96]"
            onClick={toggle.bind(null, false)}
            aria-label="Close navigation menu"
          >
            <CloseIcon fill="#fff" width={20} />
          </button>

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

    return this.props.sections.map((section, index) => {
      const active = section.url !== "/" && pathname.startsWith(section.url);

      return (
        <div
          className={clsx(
            "border-l-2 pb-[0.5em]",
            active ? "border-blue-200" : "border-transparent",
          )}
          key={section.url}
        >
          <Link
            className={clsx(
              "uppercase pt-[0.75em] px-4 pb-[0.25em] font-semibold block text-[1.1rem]",
              active ? "text-[#465E69]" : "text-[#2B3A42]",
              index > 0 && "border-t border-gray-200 dark:border-[#343434]",
              "dark:text-[#cadbe6]",
            )}
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
          className={clsx(
            "block py-[0.5em] px-[17px] capitalize [-webkit-tap-highlight-color:transparent] ml-[20px]",
            active
              ? "text-gray-900 font-semibold bg-[#f1f4f4] dark:text-white dark:bg-[#222424]"
              : "text-gray-600 dark:text-[#a3a3a3] hover:text-gray-600 active:text-gray-900 active:font-semibold active:bg-[#f1f4f4] dark:active:bg-[#222424] dark:active:text-white",
          )}
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
    if (isOpen && this._container && !this._container.contains(event.target)) {
      toggle(false);
    }
  };

  _handleTouchStart = (event) => {
    this._initialTouchPosition.x = event.touches[0].pageX;
    this._initialTouchPosition.y = event.touches[0].pageY;

    // For instant transform along with the touch
    this._container.classList.add("!duration-0");
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
    this._container.classList.remove("!duration-0");
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
