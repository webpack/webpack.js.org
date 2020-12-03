import { Component } from 'react';
import './Dropdown.scss';
import PropTypes from 'prop-types';

export default class Dropdown extends Component {
  static propTypes = {
    className: PropTypes.string,
    items: PropTypes.array,
    icon: PropTypes.string,
    alt: PropTypes.string
  }
  state = {
    active: false
  };

  componentDidMount() {
    document.addEventListener('keyup', this._closeDropdownOnEsc, true);
    document.addEventListener('focus', this._closeDropdownIfFocusLost, true);
    document.addEventListener('click', this._closeDropdownIfFocusLost, true);
  }

  render() {
    const { className = '', icon, alt, items = [] } = this.props;
    const activeModeClass = this.state.active ? 'dropdown__list--active' : '';

    return (
      <nav
        className={ `dropdown ${className}` }
        ref={ el => this.dropdown = el }
        onMouseOver={ () => this._setActive(true) }
        onMouseLeave={ () => this._setActive(false) }
      >
        <button
          ref={ el => this.dropdownButton = el }
          aria-haspopup='true'
          aria-expanded={ String(this.state.active) }
          aria-label='Select language'
          onClick={ this._handleClick }
        >
          <img
            className='dropdown__icon'
            alt={ alt }
            src={ icon } />
          {/* Commented out until media breakpoints are in place
          <span>{ items[0].title }</span> */}
          <i aria-hidden='true' className='dropdown__arrow' />
        </button>
        <div className={ `dropdown__list ${activeModeClass}` }>
          <ul onClick={ () => this._setActive(false) }>
            {
              items.map((item, i) => (
                <li
                  key={ item.title }
                  className={ item.active ? 'dropdown__item--active' : '' }
                >
                  <a
                    onKeyDown={ () => this._handleArrowKeys(i, items.length - 1) }
                    ref={ node => this.links ? this.links.push(node) : this.links = [node] }
                    href={ item.url }
                    onClick={ item.onClick }
                  >
                    <span lang={ item.lang }>{ item.title }</span>
                  </a>
                </li>
              ))
            }
          </ul>
        </div>
      </nav>
    );
  }

  _closeDropdownOnEsc = e => {
    if (e.key === 'Escape' && this.state.active) {
      this.setState({ active: false }, () => {
        this.dropdownButton.focus();
      });
    }
  }

  _closeDropdownIfFocusLost = e => {
    if (this.state.active && !this.dropdown.contains(e.target)) {
      this.setState({ active: false });
    }
  }

  _handleArrowKeys = (currentIndex, lastIndex, e) => {
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

  _handleClick = () => {
    this.setState({active: !this.state.active}, () => {
      if (this.state.active) {
        this.links[0].focus();
      }
    });
  }

  /**
   * Change visibility of dropdown items
   *
   * @param {boolean} active - Whether to display or hide the items
   */
  _setActive = (active) => {
    this.setState({ active });
  }
}
