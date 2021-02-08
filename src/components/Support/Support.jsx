// Import External Dependencies
import { Component } from 'react';
import PropTypes from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';

// Import Data
// import Backers from './_supporters.json';
import Additional from './AdditionalSupporters';
import SmallIcon from '../../assets/icon-square-small-slack.png';

// Load Styling
import './Support.scss';

const SUPPORTERS = [];

// Merge or add additional backers/sponsors
for (const additional of Additional) {
  const existing = SUPPORTERS.find(
    (supporter) => supporter.slug && supporter.slug === additional.slug
  );

  if (existing) {
    existing.totalDonations += additional.totalDonations;
  } else {
    SUPPORTERS.push(additional);
  }
}

// Resort the list
SUPPORTERS.sort((a, b) => b.totalDonations - a.totalDonations);

// Define ranks
const totalRanks = {
  backer: {
    maximum: 200,
    random: 100,
  },
  latest: {
    maxAge: 14 * 24 * 60 * 60 * 1000,
    limit: 10,
  },
  bronze: {
    minimum: 200,
    maximum: 2000,
  },
  silver: {
    minimum: 2000,
    maximum: 10000,
  },
  gold: {
    minimum: 10000,
    maximum: 50000,
  },
  platinum: {
    minimum: 50000,
  },
};
const monthlyRanks = {
  backer: {
    maximum: 10,
    random: 100,
  },
  latest: {
    maxAge: 14 * 24 * 60 * 60 * 1000,
    limit: 10,
  },
  bronze: {
    minimum: 10,
    maximum: 100,
  },
  silver: {
    minimum: 100,
    maximum: 500,
  },
  gold: {
    minimum: 500,
    maximum: 2500,
  },
  platinum: {
    minimum: 2500,
  },
};

function formatMoney(number) {
  let str = Math.round(number) + '';

  if (str.length > 3) {
    str = str.substr(0, str.length - 3) + ',' + str.substr(-3);
  }
  return str;
}

export default class Support extends Component {
  static propTypes = {
    rank: PropTypes.string,
    type: PropTypes.string,
  };
  state = {
    inView: false,
  };

  handleInView = (inView) => {
    if (!inView || this.state.inView) {
      return;
    }
    this.setState({ inView });
  };

  render() {
    let { rank, type } = this.props;

    const { inView } = this.state;

    let supporters = SUPPORTERS;
    let minimum, maximum, maxAge, limit, random;

    const ranks = type === 'monthly' ? monthlyRanks : totalRanks;
    const getAmount =
      type === 'monthly'
        ? (item) => item.monthlyDonations
        : (item) => item.totalDonations;

    if (rank && ranks[rank]) {
      minimum = ranks[rank].minimum;
      maximum = ranks[rank].maximum;
      maxAge = ranks[rank].maxAge;
      limit = ranks[rank].limit;
      random = ranks[rank].random;
    }

    if (typeof minimum === 'number') {
      supporters = supporters.filter(
        (item) => getAmount(item) >= minimum * 100
      );
    }

    if (typeof maximum === 'number') {
      supporters = supporters.filter((item) => getAmount(item) < maximum * 100);
    }

    if (typeof maxAge === 'number') {
      const now = Date.now();
      supporters = supporters.filter(
        (item) =>
          item.firstDonation &&
          now - new Date(item.firstDonation).getTime() < maxAge
      );
    }

    if (typeof limit === 'number') {
      supporters = supporters.slice(0, limit);
    }

    if (typeof random === 'number') {
      if (supporters.length >= random) {
        // Pick n random items
        for (let i = 0; i < random; i++) {
          const other = Math.floor(Math.random() * (supporters.length - i));
          const temp = supporters[other];
          supporters[other] = supporters[i];
          supporters[i] = temp;
        }
        supporters = supporters.slice(0, random);
      }
    }

    // resort to keep order
    supporters.sort((a, b) => getAmount(b) - getAmount(a));

    return (
      <>
        <h2>
          {rank === 'backer'
            ? 'Backers'
            : rank === 'latest'
            ? 'Latest Sponsors'
            : `${rank[0].toUpperCase()}${rank.slice(1)} ${
                type === 'monthly' ? 'Monthly ' : ''
              }Sponsors`}
        </h2>
        <VisibilitySensor
          delayedCall
          partialVisibility
          intervalDelay={300}
          onChange={this.handleInView}
        >
          <div className="support">
            <div className="support__description">
              {rank === 'backer' ? (
                <p>
                  The following <b>Backers</b> are individuals who have
                  contributed various amounts of money in order to help support
                  webpack. Every little bit helps, and we appreciate even the
                  smallest contributions. This list shows {random} randomly
                  chosen backers:
                </p>
              ) : rank === 'latest' ? (
                <p>
                  The following persons/organizations made their first donation
                  in the last {Math.round(maxAge / (1000 * 60 * 60 * 24))} days
                  (limited to the top {limit}).
                </p>
              ) : (
                <p>
                  <b className="support__rank">
                    {type === 'monthly' ? rank + ' monthly' : rank} sponsors
                  </b>
                  {type === 'monthly' ? (
                    <span>
                      are those who are currently pledging{' '}
                      {minimum ? `$${formatMoney(minimum)}` : 'up'}{' '}
                      {maximum ? `to $${formatMoney(maximum)}` : 'or more'}{' '}
                      monthly to webpack.
                    </span>
                  ) : (
                    <span>
                      are those who have pledged{' '}
                      {minimum ? `$${formatMoney(minimum)}` : 'up'}{' '}
                      {maximum ? `to $${formatMoney(maximum)}` : 'or more'} to
                      webpack.
                    </span>
                  )}
                </p>
              )}
            </div>

            {supporters.map((supporter, index) => (
              <a
                key={supporter.slug || index}
                className="support__item"
                title={`$${formatMoney(supporter.totalDonations / 100)} by ${
                  supporter.name || supporter.slug
                } ($${formatMoney(supporter.monthlyDonations / 100)} monthly)`}
                target="_blank"
                rel="noopener noreferrer nofollow"
                href={
                  supporter.website ||
                  `https://opencollective.com/${supporter.slug}`
                }
              >
                {
                  <img
                    className={`support__${rank}-avatar`}
                    src={
                      inView && supporter.avatar ? supporter.avatar : SmallIcon
                    }
                    alt={
                      supporter.name || supporter.slug
                        ? `${supporter.name || supporter.slug}'s avatar`
                        : 'avatar'
                    }
                    onError={this._handleImgError}
                  />
                }
              </a>
            ))}

            <div className="support__bottom">
              <a
                className="support__button"
                href="https://opencollective.com/webpack#support"
              >
                Become a {rank === 'backer' ? 'backer' : 'sponsor'}
              </a>
            </div>
          </div>
        </VisibilitySensor>
      </>
    );
  }

  /**
   * Handle images that aren't found
   *
   * @param {object} e - React synthetic event
   */
  _handleImgError(e) {
    const imgNode = e.target;
    if (imgNode.getAttribute('src') === SmallIcon) return;
    imgNode.setAttribute('src', SmallIcon);
  }
}
