import React from 'react';
import Backers from './support-backers.json';
import Additional from './support-additional.js';
import './Support.scss';

const SUPPORTERS = [ ...Backers ];

// merge or add additional backers/sponsors
for(const additional of Additional) {
  const existing = SUPPORTERS.find(supporter => supporter.slug && supporter.slug === additional.slug);
  if (existing) {
    existing.totalDonations += additional.totalDonations;
  } else {
    SUPPORTERS.push(additional);
  }
}

// resort list
SUPPORTERS.sort((a, b) => b.totalDonations - a.totalDonations);

const ranks = {
  backer: {
    maximum: 200
  },
  latest: {
    maxAge: 14 * 24 * 60 * 60 * 1000
  },
  bronze: {
    minimum: 200,
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

function formatMoney(number) {
  let str = Math.round(number) + '';
  if (str.length > 3) {
    str = str.substr(0, str.length - 3) + ',' + str.substr(-3);
  }
  return str;
}

export default class Support extends React.Component {
  render() {
    let { rank } = this.props;

    let supporters = SUPPORTERS;
    let minimum, maximum, maxAge;

    if (rank && ranks[rank]) {
      minimum = ranks[rank].minimum;
      maximum = ranks[rank].maximum;
      maxAge = ranks[rank].maxAge;
    }

    if (typeof minimum === 'number') {
      supporters = supporters.filter(item => item.totalDonations >= minimum * 100);
    }

    if (typeof maximum === 'number') {
      supporters = supporters.filter(item => item.totalDonations < maximum * 100);
    }

    if (typeof maxAge === 'number') {
      const now = Date.now();
      supporters = supporters.filter(item => item.firstDonation && (now - new Date(item.firstDonation).getTime() < maxAge));
    }

    return (
      <div className="support">
        <div className="support__description">
          { rank === 'backer' ? (
            <p>
              The following <b>Backers</b> are individuals who have contributed various amounts of money in order to help support webpack. Every little bit helps, and we appreciate even the smallest contributions.
            </p>
          ) : rank === 'latest' ? (
            <p>The following persons/organizations made their first donation in the last {Math.round(maxAge / (1000 * 60 * 60 * 24))} days.</p>
          ) : (
            <p>
              <b className="support__rank">{ rank } sponsors</b>
              <span>are those who have pledged { minimum ? `$${formatMoney(minimum)}` : 'up' } { maximum ? `to $${formatMoney(maximum)}` : 'or more' } to webpack.</span>
            </p>
          )}
        </div>

        {
          supporters.map((supporter, index) => (
            <a key={ supporter.id || supporter.slug || index }
               className="support__item"
               title={ `$${formatMoney(supporter.totalDonations / 100)} by ${supporter.name || supporter.slug}` }
               target="_blank"
               href={ supporter.website || `https://opencollective.com/${supporter.slug}` }>
              { supporter.avatar ? <img
                className={ `support__${rank}-avatar` }
                src={ supporter.avatar }
                alt={ supporter.name || supporter.slug ? `${supporter.name || supporter.slug}'s avatar` : 'avatar' } /> :
                <span className={ `support__${rank}-avatar` }>{supporter.name || supporter.slug}</span> }
              { rank === 'backer' ? <figure className="support__outline" /> : null }
            </a>
          ))
        }

        <div className="support__bottom">
          <a className="support__button" href="https://opencollective.com/webpack#support">
            Become a { rank === 'backer' ? 'backer' : 'sponsor' }
          </a>
        </div>
      </div>
    );
  }
}
