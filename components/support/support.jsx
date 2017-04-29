import React from 'react';
// import PropTypes from 'prop-types';
import Additional from './support-additional.json';
import 'isomorphic-fetch';
import './support-style';

export default class Support extends React.Component {
  // static propTypes = {
  //   number: PropTypes.number.isRequired,
  //   type: PropTypes.oneOf([
  //     'sponsors',
  //     'backers'
  //   ]).isRequired
  // };

  render() {
    let { number, type } = this.props;
    let supporters = require(`./support-${type}.json`);

    if (type === 'sponsors') {
      supporters.push(...Additional);
    }

    return (
      <div className="support">
        {
          supporters.slice(0, number).map((supporter, index) => (
            <a key={ supporter.id }
               className="support__item"
               title={ supporter.username }
               target="_blank"
               href={ supporter.website || `https://opencollective.com/${supporter.username}` }>
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
}
