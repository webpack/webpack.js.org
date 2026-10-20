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

// Each rank is laid out as a centered grid of fixed-size tiles so logos with
// very different aspect ratios still line up, and a short last row (or a rank
// with only a few sponsors) stays centered. Tiles grow with the viewport:
// phones get one to four columns depending on the rank, tablets and laptops
// get more. Logos scale up to fill their tile, since most sponsor avatars are
// small squares.
//
// On the crowded ranks, wide logos (like text logos) span two columns and
// `grid-flow-dense` back-fills the gaps, giving a masonry-like packing. Those
// ranks cap the tile at a third (or a quarter) of the row on phones so there are
// always at least two columns and a double-width tile never overflows.
const GRID_CLASSES = {
  backer: "grid-cols-[repeat(auto-fit,36px)] gap-1.5 max-w-200 mx-auto",
  latest:
    "grid-cols-[repeat(auto-fit,min(110px,calc(33.333%-0.334rem)))] sm:grid-cols-[repeat(auto-fit,150px)] lg:grid-cols-[repeat(auto-fit,160px)] auto-rows-[76px] sm:auto-rows-[88px] gap-2 sm:gap-3",
  bronze:
    "grid-cols-[repeat(auto-fit,min(84px,calc(25%-0.375rem)))] sm:grid-cols-[repeat(auto-fit,112px)] lg:grid-cols-[repeat(auto-fit,120px)] auto-rows-[60px] sm:auto-rows-[64px] gap-2",
  silver:
    "grid-cols-[repeat(auto-fit,min(110px,calc(33.333%-0.334rem)))] sm:grid-cols-[repeat(auto-fit,150px)] lg:grid-cols-[repeat(auto-fit,160px)] auto-rows-[76px] sm:auto-rows-[88px] gap-2 sm:gap-3",
  gold: "grid-cols-[repeat(auto-fit,min(200px,calc(50%-0.25rem)))] lg:grid-cols-[repeat(auto-fit,224px)] auto-rows-[100px] sm:auto-rows-[112px] gap-2 sm:gap-4",
  platinum:
    "grid-cols-[repeat(auto-fit,min(300px,100%))] auto-rows-[128px] sm:auto-rows-[150px] gap-3 sm:gap-4",
};

// Ranks with enough sponsors for the dense packing to fill the gaps that
// double-width tiles leave behind.
const MASONRY_RANKS = new Set(["latest", "silver", "bronze"]);

const TILE_CLASSES = {
  backer:
    "block w-9 h-9 mx-auto rounded-full border border-white shadow-[0_0_0_1px_rgb(112,202,10)] overflow-hidden bg-white transition-transform duration-200 hover:scale-110",
  logo: "relative block w-full h-full overflow-hidden rounded-lg bg-white border border-[#dedede] dark:border-transparent transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(0,0,0,0.12)]",
};

// `support__logo` opts the images out of the Markdown `img { height: auto }`
// rule, which would otherwise override the height utilities below.
const IMG_CLASSES = {
  backer: "support__logo w-full h-full object-cover",
  // The logo fills its tile with `object-contain`; the padding sits on the image
  // itself so the logo box is always exactly the tile minus the padding.
  logo: "support__logo absolute inset-0 w-full h-full p-1.5 sm:p-2 object-contain",
};

// Logos at least this much wider than tall get a double-width tile.
const WIDE_LOGO_RATIO = 2.5;

function handleImgError(event) {
  const imgNode = event.target;
  if (imgNode.getAttribute("src") === SmallIcon) return;
  imgNode.setAttribute("src", SmallIcon);
}

function SupporterTile({ supporter, rank, inView }) {
  const [wide, setWide] = useState(false);
  const kind = rank === "backer" ? "backer" : "logo";

  const handleLoad = (event) => {
    const { naturalWidth, naturalHeight } = event.target;
    if (MASONRY_RANKS.has(rank) && naturalHeight > 0) {
      setWide(naturalWidth / naturalHeight >= WIDE_LOGO_RATIO);
    }
  };

  return (
    <Tooltip
      className={wide ? "col-span-2" : ""}
      content={`$${formatMoney(supporter.totalDonations / 100)} by ${
        supporter.name || supporter.slug
      } ($${formatMoney(supporter.monthlyDonations / 100)} monthly)`}
    >
      <a
        className={TILE_CLASSES[kind]}
        target="_blank"
        rel="noopener noreferrer nofollow"
        href={
          supporter.website || `https://opencollective.com/${supporter.slug}`
        }
      >
        <img
          className={IMG_CLASSES[kind]}
          src={inView && supporter.avatar ? supporter.avatar : SmallIcon}
          alt={
            supporter.alt ||
            (supporter.name || supporter.slug
              ? `${supporter.name || supporter.slug}'s avatar`
              : "avatar")
          }
          loading="lazy"
          onLoad={handleLoad}
          onError={handleImgError}
        />
      </a>
    </Tooltip>
  );
}

SupporterTile.propTypes = {
  supporter: PropTypes.object.isRequired,
  rank: PropTypes.string,
  inView: PropTypes.bool,
};

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
      <div ref={containerRef} className="px-2 pb-4">
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

        <div
          className={`grid grid-flow-dense justify-center w-full ${GRID_CLASSES[rank] || ""}`}
        >
          {supporters.map((supporter, index) => (
            <SupporterTile
              key={supporter.slug || index}
              supporter={supporter}
              rank={rank}
              inView={inView}
            />
          ))}
        </div>

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
