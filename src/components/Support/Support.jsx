// Import External Dependencies
import { Component } from 'react';
import PropTypes from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';

// Import Local Assets
import SmallIcon from '../../assets/icon-square-small-slack.png';

// Import Styles
import './Support.scss';

// Define supporters data
const SUPPORTERS = [
  {
    slug: 'company-alpha',
    name: 'Company Alpha',
    totalDonations: 5500000,
    monthlyDonations: 300000,
    website: 'https://company-alpha.com',
    avatar: 'https://example.com/avatars/company-alpha.png',
    firstDonation: '2024-01-01T00:00:00.000Z',
  },
  {
    slug: 'tech-innovators',
    name: 'Tech Innovators LLC',
    totalDonations: 2500000,
    monthlyDonations: 150000,
    website: 'https://tech-innovators.com',
    avatar: 'https://example.com/avatars/tech-innovators.png',
    firstDonation: '2024-01-15T00:00:00.000Z',
  },
  // ... rest of the supporters data
];

// Define ranks configuration
const RANKS_CONFIG = {
  total: {
    backer: { maximum: 200, random: 100 },
    latest: { maxAge: 14 * 24 * 60 * 60 * 1000, limit: 10 },
    bronze: { minimum: 200, maximum: 2000 },
    silver: { minimum: 2000, maximum: 10000 },
    gold: { minimum: 10000, maximum: 50000 },
    platinum: { minimum: 50000 },
  },
  monthly: {
    backer: { maximum: 10, random: 100 },
    latest: { maxAge: 14 * 24 * 60 * 60 * 1000, limit: 10 },
    bronze: { minimum: 10, maximum: 100 },
    silver: { minimum: 100, maximum: 500 },
    gold: { minimum: 500, maximum: 2500 },
    platinum: { minimum: 2500 },
  },
};

// Helper function to format money values
const formatMoney = (number) => {
  const formatted = Math.round(number).toString();
  return formatted.length > 3
    ? `${formatted.slice(0, -3)},${formatted.slice(-3)}`
    : formatted;
};

export default class Support extends Component {
  static propTypes = {
    rank: PropTypes.string,
    type: PropTypes.string,
  };

  state = {
    inView: false,
  };

  handleInView = (inView) => {
    if (!inView || this.state.inView) return;
    this.setState({ inView });
  };

  handleImgError = (e) => {
    const imgNode = e.target;
    if (imgNode.getAttribute('src') === SmallIcon) return;
    imgNode.setAttribute('src', SmallIcon);
  };

  filterSupporters = () => {
    const { rank, type = 'total' } = this.props;
    let supporters = [...SUPPORTERS];

    if (!rank) return supporters;

    const rankConfig = RANKS_CONFIG[type][rank];
    if (!rankConfig) return supporters;

    const getAmount =
      type === 'monthly'
        ? (item) => item.monthlyDonations
        : (item) => item.totalDonations;

    // Apply filters based on rank configuration
    if (rankConfig.minimum) {
      supporters = supporters.filter(
        (item) => getAmount(item) >= rankConfig.minimum * 100
      );
    }

    if (rankConfig.maximum) {
      supporters = supporters.filter(
        (item) => getAmount(item) < rankConfig.maximum * 100
      );
    }

    if (rankConfig.maxAge) {
      const now = Date.now();
      supporters = supporters.filter(
        (item) =>
          item.firstDonation &&
          now - new Date(item.firstDonation).getTime() < rankConfig.maxAge
      );
    }

    if (rankConfig.limit) {
      supporters = supporters.slice(0, rankConfig.limit);
    }

    if (rankConfig.random && supporters.length >= rankConfig.random) {
      for (let i = 0; i < rankConfig.random; i++) {
        const other = Math.floor(Math.random() * (supporters.length - i));
        [supporters[i], supporters[other]] = [supporters[other], supporters[i]];
      }
      supporters = supporters.slice(0, rankConfig.random);
    }

    return supporters.sort((a, b) => getAmount(b) - getAmount(a));
  };

  renderDescription() {
    const { rank, type = 'total' } = this.props;
    const rankConfig = RANKS_CONFIG[type][rank];

    if (rank === 'backer') {
      return (
        <p>
          The following <b>Backers</b> are individuals who have contributed
          various amounts of money to help support webpack. Every little bit
          helps, and we appreciate even the smallest contributions. This list
          shows {rankConfig.random}
          randomly chosen backers:
        </p>
      );
    }

    if (rank === 'latest') {
      return (
        <p>
          The following persons/organizations made their first donation in the
          last
          {Math.round(rankConfig.maxAge / (1000 * 60 * 60 * 24))} days (limited
          to the top {rankConfig.limit}).
        </p>
      );
    }

    const amountText =
      type === 'monthly'
        ? `are currently pledging ${rankConfig.minimum ? `$${formatMoney(rankConfig.minimum)}` : 'up'} 
         ${rankConfig.maximum ? `to $${formatMoney(rankConfig.maximum)}` : 'or more'} monthly`
        : `have pledged ${rankConfig.minimum ? `$${formatMoney(rankConfig.minimum)}` : 'up'} 
         ${rankConfig.maximum ? `to $${formatMoney(rankConfig.maximum)}` : 'or more'}`;

    return (
      <p>
        <b className="support__rank">
          {type === 'monthly' ? `${rank} monthly` : rank} sponsors
        </b>
        <span> are those who {amountText} to webpack.</span>
      </p>
    );
  }

  render() {
    const { rank } = this.props;
    const { inView } = this.state;
    const supporters = this.filterSupporters();

    return (
      <>
        <h2>
          {rank === 'backer'
            ? 'Backers'
            : rank === 'latest'
              ? 'Latest Sponsors'
              : `${rank[0].toUpperCase()}${rank.slice(1)} ${
                  this.props.type === 'monthly' ? 'Monthly ' : ''
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
              {this.renderDescription()}
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
                <img
                  className={`support__${rank}-avatar`}
                  src={
                    inView && supporter.avatar ? supporter.avatar : SmallIcon
                  }
                  alt={`${supporter.name || supporter.slug}'s avatar`}
                  onError={this.handleImgError}
                />
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
}
