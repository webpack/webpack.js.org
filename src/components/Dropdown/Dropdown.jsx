import { Component } from 'react';
import './Dropdown.scss';
import PropTypes from 'prop-types';

export default class Dropdown extends Component {
  static propTypes = {
    className: PropTypes.string,
    items: PropTypes.array,
  };
  state = {
    active: false,
  };

  componentDidMount() {
    document.addEventListener(
      'keyup',
      this._closeDropdownOnEsc.bind(this),
      true
    );
    document.addEventListener(
      'focus',
      this._closeDropdownIfFocusLost.bind(this),
      true
    );
    document.addEventListener(
      'click',
      this._closeDropdownIfFocusLost.bind(this),
      true
    );
  }

  _closeDropdownOnEsc(e) {
    if (e.key === 'Escape' && this.state.active) {
      this.setState({ active: false }, () => {
        this.dropdownButton.focus();
      });
    }
  }

  _closeDropdownIfFocusLost(e) {
    if (this.state.active && !this.dropdown.contains(e.target)) {
      this.setState({ active: false });
    }
  }

  render() {
    let { className = '', items = [] } = this.props;
    let activeMod = this.state.active ? 'dropdown__list--active' : '';

    return (
      <nav
        className={`dropdown ${className}`}
        ref={(el) => (this.dropdown = el)}
        onMouseOver={this._toggle.bind(this, true)}
        onMouseLeave={this._toggle.bind(this, false)}
      >
        <button
          ref={(el) => (this.dropdownButton = el)}
          aria-haspopup="true"
          aria-expanded={String(this.state.active)}
          aria-label="Select language"
          onClick={this._handleClick.bind(this)}
        >
          <svg
            viewBox="0 0 610 560"
            xmlns="http://www.w3.org/2000/svg"
            className="dropdown__language text-gray-100 hover:text-blue-200 transition-colors duration-200"
          >
            <path d="m304.8 99.2-162.5-57.3v353.6l162.5-52.6z" />
            <path
              d="m300.9 99 168.7-57.3v353.6l-168.7-52.5zm-200.7 358.4 200.7-66.9v-291.5l-200.7 66.9z"
              fill="currentColor"
            />
            <path d="m392.4 461.8 28.4 46.8 15-43.5zm-223.9-262.3c-1.1-1 1.4 8.6 4.8 12 6.1 6.1 10.8 6.9 13.3 7 5.6.2 12.5-1.4 16.5-3.1s10.9-5.2 13.5-10.4c.6-1.1 2.1-3 1.1-7.5-.7-3.5-3-4.8-5.7-4.6s-11 2.4-15 3.6-12.2 3.7-15.8 4.5-11.5-.3-12.7-1.5zm101.2 114.8c-1.6-.6-34.3-14.1-38.9-16.4a368 368 0 0 0 -17.5-7.5c12.3-19 20.1-33.4 21.2-35.6 1.9-4 15-29.5 15.3-31.1s.7-7.5.4-8.9-5.1 1.3-11.6 3.5-18.9 10.2-23.7 11.2-20.1 6.8-28 9.4c-7.8 2.6-22.7 7.1-28.8 8.8-6.1 1.6-11.4 1.8-14.9 2.8 0 0 .5 4.8 1.4 6.2s4.1 5 7.9 5.9c3.8 1 10 .6 12.8-.1s7.7-3.1 8.4-4.1c.7-1.1-.3-4.3.8-5.3s16.1-4.5 21.7-6.2 27.2-9.2 30.1-8.8a916 916 0 0 1 -23.9 47.7 821 821 0 0 1 -45 63.3c-5.3 6-18 21.5-22.4 25 1.1.3 9-.4 10.4-1.3 8.9-5.5 23.8-24.1 28.6-29.7a489.1 489.1 0 0 0 36.7-49.4c1.9.8 17.6 13.6 21.7 16.4a293 293 0 0 0 23.7 13.3c3.5 1.5 16.9 7.7 17.5 5.6.7-1.8-2.3-14.1-3.9-14.7z" />
            <path
              clipRule="evenodd"
              d="m194.1 484.7a204.9 204.9 0 0 0 30.7 14.5 233.6 233.6 0 0 0 46.4 12c.5 0 16 1.9 19.2 1.9h15.7c6.1-.5 11.8-.9 17.9-1.7 4.9-.7 10.3-1.6 15.5-2.8 3.8-.9 7.8-1.7 11.7-3 3.7-1 7.8-2.4 11.8-3.8l8.2-3.1c2.3-1 5.1-2.3 7.7-3.3a243 243 0 0 0 19.2-10c2.3-1.2 7.5-5.2 10.3-5.2 3.1 0 5.2 2.8 5.2 5.2 0 5.1-6.8 6.6-9.9 8.9-3.3 2.3-7.3 4-10.8 5.9-7 3.7-14.1 6.8-20.9 9.4a251 251 0 0 1 -27.3 8.5c-3.3.7-6.6 1.6-9.9 2.1-1.7.3-19.9 3.1-24.9 3.1h-23a293.9 293.9 0 0 1 -35.1-5.2 196 196 0 0 1 -33.1-10.3c-12-4.5-24.6-10.5-36.4-18.3-2.1-1.4-2.3-2.8-2.3-4.4a5 5 0 0 1 5.1-5.1c2.4.1 8 4.2 9 4.7zm101.4-98.1-189.9 63.2v-280.1l189.9-63.2zm10.6-288.3v292.7a6 6 0 0 1 -1.2 2.6c-.3.5-1 1.2-1.6 1.4a14621 14621 0 0 1 -203.1 67.6c-2.1 0-4-1.4-5.1-3.7 0-.2-.2-.3-.2-.7v-292.8c.3-.9.5-2.1 1.2-2.8 1.4-1.9 3.8-2.3 5.4-2.8 3-1 196.1-65.8 198.9-65.8 1.9 0 5.7 1.2 5.7 4.3z"
              fillRule="evenodd"
            />
            <path
              clipRule="evenodd"
              d="m464.3 388-158-49.1v-236l158-53.7zm10.6-345.8v352.4c-.2 4-3 5.7-5.6 5.7-2.3 0-18.6-5.6-21.4-6.4l-65.8-20.4-14.6-4.7-12.9-4c-18.6-5.7-37.6-11.5-56.3-17.8-.7-.2-2.4-2.6-2.4-3.1v-246.1c.3-.9.7-1.9 1.6-2.6 1.4-1.6 61.1-21.4 84.7-29.3 6.3-2.3 84.8-29.3 87.3-29.3 3 .1 5.4 2.3 5.4 5.6z"
              fillRule="evenodd"
            />
            <path d="m515 461.8-211.1-67.3.9-292.8 210.2 66.9z" />
            <path
              clipRule="evenodd"
              d="m408.6 232.5-20.7 50.1 38.1 11.5zm-12.4-47.2 27.2 8.2 49.5 178.6-27.9-8.5-10-36.7-57.7-17.5-12.4 29.9-27.9-8.5z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
          {/* Commented out until media breakpoints are in place
          <span>{ items[0].title }</span> */}
          <i aria-hidden="true" className="dropdown__arrow" />
        </button>
        <div className={`dropdown__list ${activeMod}`}>
          <ul>
            {items.map((item, i) => {
              return (
                <li key={item.title}>
                  <a
                    onKeyDown={this._handleArrowKeys.bind(
                      this,
                      i,
                      items.length - 1
                    )}
                    ref={(node) =>
                      this.links ? this.links.push(node) : (this.links = [node])
                    }
                    href={item.url}
                    className="px-5 block"
                  >
                    <span lang={item.lang}>{item.title}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    );
  }

  _handleArrowKeys(currentIndex, lastIndex, e) {
    if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
      e.preventDefault();
    }

    let newIndex = currentIndex;
    if (e.key === 'ArrowDown') {
      newIndex++;
      if (newIndex > lastIndex) {
        newIndex = 0;
      }
    }

    if (e.key === 'ArrowUp') {
      newIndex--;
      if (newIndex < 0) {
        newIndex = lastIndex;
      }
    }

    this.links[newIndex].focus();
  }

  _handleClick() {
    this.setState({ active: !this.state.active }, () => {
      if (this.state.active) {
        this.links[0].focus();
      }
    });
  }

  /**
   * Toggle visibility of dropdown items
   *
   * @param {bool} state - Whether to display or hide the items
   */
  _toggle(state = false) {
    this.setState({
      active: state,
    });
  }
}
