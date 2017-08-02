import React from 'react';
import Additional from './support-additional.json';
import './support-style';

const ranks = {
  bronze: {
    maximum: 2000
  },
  silver: {
    minimum: 2000,
    maximum: 10000
  },
  gold: {
    minimum: 10000,
    maximum: 50000
  },
  platinum: {
    minimum: 50000
  }
};

export default class Support extends React.Component {
  render() {
    let { rank, type } = this.props;
    let supporters = require(`./support-${type}.json`);

    if (type === 'sponsors') {
      supporters = supporters.slice();
      supporters.push(...Additional);
      supporters.sort((a, b) => b.totalDonations - a.totalDonations);
    }

    let minimum, maximum;

    if (rank && ranks[rank]) {
      minimum = ranks[rank].minimum;
      maximum = ranks[rank].maximum;
    }

    if (typeof minimum === 'number') {
      supporters = supporters.filter(item => item.totalDonations >= minimum * 100);
    }

    if (typeof maximum === 'number') {
      supporters = supporters.filter(item => item.totalDonations < maximum * 100);
    }

    return (
      <div className="support">
        {
          supporters.map((supporter, index) => (
            <a key={ supporter.id || supporter.username || index }
               className="support__item"
               title={ `$${supporter.totalDonations / 100} by ${supporter.name || supporter.username}` }
               target="_blank"
               href={ supporter.website || `https://opencollective.com/${supporter.username}` }>
              { supporter.avatar ? <img
                className={ `support__${type}-avatar-${rank || 'normal'}` }
                src={ supporter.avatar }
                alt={ supporter.username ? `${supporter.username}'s avatar` : 'avatar' } /> :
                supporter.name }
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
