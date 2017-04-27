import React from 'react';
import PropTypes from 'prop-types';
import Additional from './support-additional.json';
import 'whatwg-fetch';
import './support-style';

export default class Support extends React.Component {
  static propTypes = {
    number: PropTypes.number.isRequired,
    type: PropTypes.oneOf([
      'sponsors',
      'backers'
    ]).isRequired
  };

  state = {
    supporters: [],
    error: false
  }

  render() {
    let { number, type } = this.props;
    let { supporters } = this.state;

    return (
      <div className="support">
        {
          supporters.slice(0, number).map((supporter, i) => (
            <a key={ supporter.id }
               className="support__item"
               target="_blank"
               href={ supporter.website }>
              <img
                className={ `support__${type}-avatar` }
                src={ supporter.avatar }
                alt={ `${supporter.username}'s avatar` } />
              { type === 'backers' ? <figure className="support__outline" /> : null }
            </a>
          ))
        }

        <div className="support__bottom">
          <a className="support__button" href="https://opencollective.com/webpack#support">
            Become a { type.replace(/s$/, '') }
          </a>
        </div>
      </div>
    );
  }

  componentDidMount() {
    let { type } = this.props;

    fetch(`https://opencollective.com/webpack/${type}.json`)
      .then(response => response.json())
      .then(json => this.setState({ supporters: json.concat(Additional) }))
      .catch(error => this.setState({ error: true }));
  }
}
