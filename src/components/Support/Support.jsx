// Import External Dependencies
import PropTypes from "prop-types";
import { useEffect, useMemo, useRef, useState } from "react";

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
    maxAge: 21 * 24 * 60 * 60 * 1000,
    limit: 30,
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
    maxAge: 21 * 24 * 60 * 60 * 1000,
    limit: 30,
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

function handleImgError(event) {
  const imgNode = event.target;
  if (imgNode.getAttribute("src") === SmallIcon) return;
  imgNode.setAttribute("src", SmallIcon);
}

function filterByAge(result, age) {
  const now = Date.now();
  return result.filter(
    (item) =>
      item.firstDonation && now - new Date(item.firstDonation).getTime() < age,
  );
}

function shuffleSlice(arr, n) {
  const result = [...arr];
  for (let i = 0; i < n; i++) {
    const other = Math.floor(Math.random() * (result.length - i));
    const temp = result[other];
    result[other] = result[i];
    result[i] = temp;
  }
  return result.slice(0, n);
}

export default function Support({ rank, type }) {
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const { supporters, minimum, maximum, maxAge, limit, random } =
    useMemo(() => {
      const ranks = type === "monthly" ? monthlyRanks : totalRanks;
      const getAmount =
        type === "monthly"
          ? (item) => item.monthlyDonations
          : (item) => item.totalDonations;

      let min;
      let max;
      let age;
      let lim;
      let rand;

      if (rank && ranks[rank]) {
        min = ranks[rank].minimum;
        max = ranks[rank].maximum;
        age = ranks[rank].maxAge;
        lim = ranks[rank].limit;
        rand = ranks[rank].random;
      }

      let result = SUPPORTERS;

      if (typeof min === "number") {
        result = result.filter((item) => getAmount(item) >= min * 100);
      }

      if (typeof max === "number") {
        result = result.filter((item) => getAmount(item) < max * 100);
      }

      if (typeof age === "number") {
        result = filterByAge(result, age);
      }

      if (typeof lim === "number") {
        result = result.slice(0, lim);
      }

      if (typeof rand === "number" && result.length >= rand) {
        result = shuffleSlice(result, rand);
      }

      // resort to keep order
      result.sort((a, b) => getAmount(b) - getAmount(a));

      return {
        supporters: result,
        minimum: min,
        maximum: max,
        maxAge: age,
        limit: lim,
        random: rand,
      };
    }, [rank, type]);

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
        ref={containerRef}
        className="flex flex-wrap justify-center px-2 pb-4"
      >
        <div className="w-full mb-4">
          {rank === "backer" ? (
            <p>
              The following <b>Backers</b> are individuals who have contributed
              various amounts of money in order to help support webpack. Every
              little bit helps, and we appreciate even the smallest
              contributions. This list shows {random} randomly chosen backers:
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
                  {maximum ? `to $${formatMoney(maximum)}` : "or more"} monthly
                  to webpack.
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
                  onError={handleImgError}
                />
              }
            </a>
          </Tooltip>
        ))}

        <div className="w-full mt-4">
          <a
            className="inline-block py-[0.4em] px-[1em] uppercase text-[#175d96] border border-[#175d96] rounded-4xl transition-all duration-[250ms] hover:border-[#2f78c4] hover:bg-[#2f78c4] hover:text-white hover:shadow-[0_8px_18px_rgba(47,120,196,0.28)] dark:text-[#4fa8ff] dark:border-[#4fa8ff] dark:hover:border-[#4fa8ff] dark:hover:bg-[#2f78c4] dark:hover:text-white"
            href="https://opencollective.com/webpack#support"
          >
            Become a {rank === "backer" ? "backer" : "sponsor"}
          </a>
        </div>
      </div>
    </>
  );
}

Support.propTypes = {
  rank: PropTypes.string,
  type: PropTypes.string,
};
