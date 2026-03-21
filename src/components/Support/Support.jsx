// Import External Dependencies
import PropTypes from "prop-types";
import { Component } from "react";

// Import Data
import SmallIcon from "../../assets/icon-square-small-slack.png";
import Tooltip from "../Tooltip/Tooltip.jsx";
import Additional from "./AdditionalSupporters.mjs";
/* eslint import/no-unresolved: ["error", { ignore: ["_supporters\.json$"] }] */
import Backers from "./_supporters.json";

const SUPPORTERS = [...Backers];

// Merge or add additional backers/sponsors
for (const additional of Additional) {
  const existing = SUPPORTERS.find(
    (supporter) => supporter.slug && supporter.slug === additional.slug,
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
    minimum: 1,
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
    minimum: 1,
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
  return Math.round(number).toLocaleString("en-US");
}

const AVATAR_CLASSES = {
  backer:
    "inline-block w-[31px] h-[31px] rounded-full border border-white shadow-[0_0_0_1px_rgb(112,202,10)] overflow-hidden align-middle",
  latest: "max-h-16 max-w-48 align-middle",
  bronze: "max-h-8 max-w-24 align-middle",
  silver: "max-h-16 max-w-48 align-middle",
  gold: "max-h-24 max-w-72 align-middle",
  platinum: "max-h-32 max-w-full min-[400px]:max-w-96 align-middle",
};

export default class Support extends Component {
  static propTypes = {
    rank: PropTypes.string,
    type: PropTypes.string,
  };

  state = {
    inView: false,
  };

  containerRef = null;

  observer = null;

  componentDidMount() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this.state.inView) {
          this.setState({ inView: true });
          this.observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (this.containerRef) {
      this.observer.observe(this.containerRef);
    }
  }

  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  render() {
    const { rank, type } = this.props;

    const { inView } = this.state;

    let supporters = SUPPORTERS;
    let minimum;
    let maximum;
    let maxAge;
    let limit;
    let random;

    const ranks = type === "monthly" ? monthlyRanks : totalRanks;
    const getAmount =
      type === "monthly"
        ? (item) => item.monthlyDonations
        : (item) => item.totalDonations;

    if (rank && ranks[rank]) {
      minimum = ranks[rank].minimum;
      maximum = ranks[rank].maximum;
      maxAge = ranks[rank].maxAge;
      limit = ranks[rank].limit;
      random = ranks[rank].random;
    }

    if (typeof minimum === "number") {
      supporters = supporters.filter(
        (item) => getAmount(item) >= minimum * 100,
      );
    }

    if (typeof maximum === "number") {
      supporters = supporters.filter((item) => getAmount(item) < maximum * 100);
    }

    if (typeof maxAge === "number") {
      const now = Date.now();
      supporters = supporters.filter(
        (item) =>
          item.firstDonation &&
          now - new Date(item.firstDonation).getTime() < maxAge,
      );
    }

    if (typeof limit === "number") {
      supporters = supporters.slice(0, limit);
    }

    if (typeof random === "number" && supporters.length >= random) {
      // Pick n random items
      for (let i = 0; i < random; i++) {
        const other = Math.floor(Math.random() * (supporters.length - i));
        const temp = supporters[other];
        supporters[other] = supporters[i];
        supporters[i] = temp;
      }
      supporters = supporters.slice(0, random);
    }

    // resort to keep order
    supporters.sort((a, b) => getAmount(b) - getAmount(a));

    return (
      <>
        <h2>
          {rank === "backer"
            ? "Backers"
            : rank === "latest"
              ? "Latest Sponsors"
              : `${rank[0].toUpperCase()}${rank.slice(1)} ${
                  type === "monthly" ? "Monthly " : ""
                }Sponsors`}
        </h2>
        <div
          ref={(el) => (this.containerRef = el)}
          className="flex flex-wrap justify-center px-2 pb-4"
        >
          <div className="w-full mb-4">
            {rank === "backer" ? (
              <p>
                The following <b>Backers</b> are individuals who have
                contributed various amounts of money in order to help support
                webpack. Every little bit helps, and we appreciate even the
                smallest contributions. This list shows {random} randomly chosen
                backers:
              </p>
            ) : rank === "latest" ? (
              <p>
                The following persons/organizations made their first donation in
                the last {Math.round(maxAge / (1000 * 60 * 60 * 24))} days
                (limited to the top {limit}).
              </p>
            ) : (
              <p>
                <b className="capitalize mr-1">
                  {type === "monthly" ? `${rank} monthly` : rank} sponsors
                </b>
                {type === "monthly" ? (
                  <span>
                    are those who are currently pledging{" "}
                    {minimum ? `$${formatMoney(minimum)}` : "up"}{" "}
                    {maximum ? `to $${formatMoney(maximum)}` : "or more"}{" "}
                    monthly to webpack.
                  </span>
                ) : (
                  <span>
                    are those who have contributed{" "}
                    {minimum ? `$${formatMoney(minimum)}` : "up"}{" "}
                    {maximum ? `to $${formatMoney(maximum)}` : "or more"} to
                    webpack.
                  </span>
                )}
              </p>
            )}
          </div>

          {supporters.map((supporter, index) => (
            <Tooltip
              key={supporter.slug || index}
              content={`$${formatMoney(supporter.totalDonations / 100)} by ${
                supporter.name || supporter.slug
              } ($${formatMoney(supporter.monthlyDonations / 100)} monthly)`}
            >
              <a
                className="relative mx-0.5 mb-0.5 dark:bg-white"
                target="_blank"
                rel="noopener noreferrer nofollow"
                href={
                  supporter.website ||
                  `https://opencollective.com/${supporter.slug}`
                }
              >
                {
                  <img
                    className={AVATAR_CLASSES[rank]}
                    src={
                      inView && supporter.avatar ? supporter.avatar : SmallIcon
                    }
                    alt={
                      supporter.alt ||
                      (supporter.name || supporter.slug
                        ? `${supporter.name || supporter.slug}'s avatar`
                        : "avatar")
                    }
                    onError={this._handleImgError}
                  />
                }
              </a>
            </Tooltip>
          ))}

          <div className="w-full mt-4">
            <a
              className="inline-block py-[0.4em] px-[1em] uppercase text-[#175d96] border border-[#175d96] rounded-4xl transition-all duration-[250ms] hover:bg-[#175d96] hover:text-white"
              href="https://opencollective.com/webpack#support"
            >
              Become a {rank === "backer" ? "backer" : "sponsor"}
            </a>
          </div>
        </div>
      </>
    );
  }

  /**
   * Handle images that aren't found
   *
   * @param {object} event - React synthetic event
   */
  _handleImgError(event) {
    const imgNode = event.target;
    if (imgNode.getAttribute("src") === SmallIcon) return;
    imgNode.setAttribute("src", SmallIcon);
  }
}
