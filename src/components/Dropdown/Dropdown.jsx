import { Component } from 'react';
import LanguageIcon from '../../assets/language-icon.svg';
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
          <img
            className="dropdown__language"
            alt="select language"
            src={LanguageIcon}
          />
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
