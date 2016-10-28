import React from 'react';
import Container from '../container/container';
import './search-results-style';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);

    this._handleSearch = this._handleSearch.bind(this);
    this.state = {
      visible: false,
      results: []
    };
  }

  render() {
    let visibleClass = this.state.visible ? 'search-results--visible' : '';

    return (
      <Container className={ `search-results ${visibleClass}` }>
        <div className="search-results__inner">

        </div>
      </Container>
    );
  }

  componentDidMount() {
    window.addEventListener('search', this._handleSearch);
  }

  componentWillUnmount() {
    window.removeEventListener('search', this._handleSearch);
  }

  _handleSearch(e) {
    let { text = '' } = e.detail;

    if (text.length) {
      if (!this.state.visible) this.setState({ visible: true });
      // TODO: Get search results

    } else {
      this.setState({ visible: false });
    }
  }
}