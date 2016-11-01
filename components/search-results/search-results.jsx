import React from 'react';
import Container from '../container/container';
import './search-results-style';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);

    this._handleSearch = this._handleSearch.bind(this);
    this._handleBodyClick = this._handleBodyClick.bind(this);
    this.state = {
      visible: false,
      results: []
    };
  }

  render() {
    let visibleClass = this.state.visible ? 'search-results--visible' : '';

    return (
      <Container className={ `search-results ${visibleClass}` }>
        <div className="search-results__inner" ref={ ref => this.container = ref }>

        </div>
      </Container>
    );
  }

  componentDidMount() {
    window.addEventListener('search', this._handleSearch);
    window.addEventListener('click', this._handleBodyClick);
  }

  componentWillUnmount() {
    window.removeEventListener('search', this._handleSearch);
    window.removeEventListener('click', this._handleBodyClick);
  }

  /**
   * Fetch and display search results
   * 
   * @param {object} e - Custom search event
   */
  _handleSearch(e) {
  }

  /**
   * Hide the results on outer clicks
   * 
   * @param {object} e - Native click event
   */
  _handleBodyClick(e) {
    if (this.state.visible) {
      if (
        !e.target.classList.contains('navigation__search-input') &&
        !this.container.contains(e.target)
      ) {
        this.setState({ visible: false });
      }
    }
  }
}
