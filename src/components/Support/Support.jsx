// Import External Dependencies
import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';

// Import Data
import Backers from './_supporters.json';
import Additional from './AdditionalSupporters';
import SmallIcon from '../../assets/icon-square-small-slack.png';

// Load Styling
import './Support.scss';

const SUPPORTERS = [ ...Backers ];

// Merge or add additional backers/sponsors
for(const additional of Additional) {
  const existing = SUPPORTERS.find(supporter => supporter.slug && supporter.slug === additional.slug);

  if (existing) {
    existing.totalDonations += additional.totalDonations;
  } else {
    SUPPORTERS.push(additional);
  }
}

// Resort the list
SUPPORTERS.sort((a, b) => b.totalDonations - a.totalDonations);

// Define ranks
const ranks = {
  backer: {
    maximum: 200,
    random: 100
  },
  latest: {
    maxAge: 14 * 24 * 60 * 60 * 1000,
    limit: 10
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
  state = {
    inView: false
  }

  handleInView = (inView) => {
    if (!inView) {
      return;
    }
    this.setState({ inView });
  };

  render() {
    let { rank } = this.props;

    const { inView } = this.state;

    let supporters = SUPPORTERS;
    let minimum, maximum, maxAge, limit, random;

    if (rank && ranks[rank]) {
      minimum = ranks[rank].minimum;
      maximum = ranks[rank].maximum;
      maxAge = ranks[rank].maxAge;
      limit = ranks[rank].limit;
      random = ranks[rank].random;
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

    if (typeof limit === 'number') {
      supporters = supporters.slice(0, limit);
    }

    if (typeof random === 'number') {
      // Pick n random items
      for (let i = 0; i < random; i++) {
        const other = Math.floor(Math.random() * (supporters.length - i));
        const temp = supporters[other];
        supporters[other] = supporters[i];
        supporters[i] = temp;
      }
      supporters = supporters.slice(0, random);

      // resort to keep order
      supporters.sort((a, b) => b.totalDonations - a.totalDonations);
    }

    return (
      <VisibilitySensor delayedCall
        partialVisibility
        intervalDelay={ 300 }
        onChange={ this.handleInView }>
        <div className="support">
          <div className="support__description">
            { rank === 'backer' ? (
              <p>
                The following <b>Backers</b> are individuals who have contributed various amounts of money in order to help support webpack. Every little bit helps, and we appreciate even the smallest contributions. This list shows {random} randomly chosen backers:
              </p>
            ) : rank === 'latest' ? (
              <p>The following persons/organizations made their first donation in the last {Math.round(maxAge / (1000 * 60 * 60 * 24))} days (limited to the top {limit}).</p>
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
                rel="noopener nofollow"
                href={ supporter.website || `https://opencollective.com/${supporter.slug}` }>
                {<img
                  className={ `support__${rank}-avatar` }
                  src={ (inView && supporter.avatar) ? supporter.avatar : SmallIcon }
                  alt={ supporter.name || supporter.slug ? `${supporter.name || supporter.slug}'s avatar` : 'avatar' }
                  onError={ this._handleImgError } />}
              </a>
            ))
          }

          <div className="support__bottom">
            <a className="support__button" href="https://opencollective.com/webpack#support">
              Become a { rank === 'backer' ? 'backer' : 'sponsor' }
            </a>
          </div>
        </div>
      </VisibilitySensor>
    );
  }

  /**
   * Handle images that aren't found
   *
   * @param {object} e - React synthetic event
   */
  _handleImgError(e) {
    const imgNode = e.target;
    imgNode.src = SmallIcon;
  }
}
