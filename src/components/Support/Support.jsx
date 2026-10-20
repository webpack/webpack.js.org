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

// Each rank is laid out as a grid of square tiles, since most sponsor avatars
// are square, so logos line up. On phones the columns are fractions of the
// row, so the grid always spans the full width; square rows are sized from the
// container width with `cqw` units (the wrapper is an `@container`). From `md`
// up, tiles have a fixed size per rank and the grid is centered. (`sm` is not
// used: the site redefines `md` and `lg` in pixels, and Tailwind then orders
// the rem-based `sm` after them, so `sm:` would override `lg:`.)
//
// Wide logos (like text logos) span two columns, and `packTiles` reorders the
// tiles so narrow logos back-fill the gaps, giving a masonry-like packing. The
// reordering happens in the DOM rather than with `grid-flow-dense`, so keyboard
// focus and screen readers follow the same order as the eye. Every rank keeps
// at least two columns, so a double-width tile never overflows.
const GRID_CLASSES = {
  backer: "grid-cols-[repeat(auto-fit,36px)] gap-1.5 max-w-200 mx-auto",
  latest:
    "grid-cols-[repeat(3,minmax(0,1fr))] auto-rows-[calc((100cqw-1.5rem)/3)] md:grid-cols-[repeat(auto-fit,96px)] md:auto-rows-[96px] lg:grid-cols-[repeat(auto-fit,104px)] lg:auto-rows-[104px] gap-3",
  bronze:
    "grid-cols-[repeat(4,minmax(0,1fr))] auto-rows-[calc((100cqw-1.5rem)/4)] md:grid-cols-[repeat(auto-fit,72px)] md:auto-rows-[72px] gap-2",
  silver:
    "grid-cols-[repeat(3,minmax(0,1fr))] auto-rows-[calc((100cqw-1.5rem)/3)] md:grid-cols-[repeat(auto-fit,96px)] md:auto-rows-[96px] lg:grid-cols-[repeat(auto-fit,104px)] lg:auto-rows-[104px] gap-3",
  gold: "grid-cols-[repeat(2,minmax(0,1fr))] auto-rows-[calc((100cqw-0.75rem)/2)] md:grid-cols-[repeat(auto-fit,144px)] md:auto-rows-[144px] gap-3",
  platinum:
    "grid-cols-[repeat(2,minmax(0,1fr))] auto-rows-[calc((100cqw-1rem)/2)] md:grid-cols-[repeat(auto-fit,192px)] md:auto-rows-[192px] gap-4",
};

const TILE_CLASSES = {
  backer:
    "block w-9 h-9 mx-auto rounded-full border border-white shadow-[0_0_0_1px_rgb(112,202,10)] overflow-hidden bg-white transition-transform duration-200 hover:scale-110",
  // No card around the logo; the white backing only shows in dark mode so
  // transparent logos with dark artwork stay visible.
  logo: "relative block w-full h-full overflow-hidden rounded-lg dark:bg-white transition-transform duration-200 hover:scale-105",
};

// `support__logo` opts the images out of the Markdown `img { height: auto }`
// rule, which would otherwise override the height utilities below.
const IMG_CLASSES = {
  backer: "support__logo w-full h-full object-cover",
  logo: "support__logo absolute inset-0 w-full h-full object-contain",
  // Positioned by `logoLayout` instead.
  framed: "support__logo absolute max-w-none",
};

// Logos at least this much wider than tall get a double-width tile.
const WIDE_LOGO_RATIO = 1.6;
// Share of the tile a logo may fill, leaving a little air around it.
const LOGO_FILL = 0.92;
// How far a logo may be enlarged beyond its own pixels before it gets blurry.
const LOGO_MAX_UPSCALE = 1.25;

const px = (value) => `${Math.round(value * 100) / 100}px`;

// Positions a logo image inside its tile, in pixels, so the artwork is as large
// as fits and centered. Many sponsor logos sit on a large white or transparent
// canvas, which makes them look tiny; `box` (measured by
// src/utilities/logo-box.mjs at build time) says where the artwork is, and the
// image is scaled and offset so that box is what gets framed. Small images are
// not blown up past `LOGO_MAX_UPSCALE`, where they would turn blurry.
export function logoLayout(box, natural, tile) {
  const artworkWidth = box.width * natural.width;
  const artworkHeight = box.height * natural.height;
  const aspect = artworkWidth / artworkHeight;
  const width = Math.min(
    LOGO_FILL * tile.width,
    LOGO_FILL * tile.height * aspect,
    LOGO_MAX_UPSCALE * artworkWidth,
  );
  const height = width / aspect;
  const imageWidth = width / box.width;
  const imageHeight = height / box.height;

  return {
    left: px((tile.width - width) / 2 - box.x * imageWidth),
    top: px((tile.height - height) / 2 - box.y * imageHeight),
    width: px(imageWidth),
    height: px(imageHeight),
  };
}

const WHOLE_IMAGE = { x: 0, y: 0, width: 1, height: 1 };

// Whether a logo gets a double-width tile, judged by its trimmed artwork when
// it was measured at build time and by the loaded image otherwise.
const isWideLogo = (supporter, loadedWide) =>
  supporter.logoBox ? supporter.logoBox.aspect >= WIDE_LOGO_RATIO : loadedWide;

function handleImgError(event) {
  const imgNode = event.target;
  if (imgNode.getAttribute("src") === SmallIcon) return;
  imgNode.setAttribute("src", SmallIcon);
}

// Orders tiles row by row the way `grid-auto-flow: dense` would place them:
// each tile goes into the first row that still has room for it.
export function packTiles(items, isWide, columns) {
  if (columns < 2) return items;

  const rows = [];
  for (const item of items) {
    const span = isWide(item) ? 2 : 1;
    let row = rows.find((candidate) => candidate.free >= span);
    if (!row) {
      row = { free: columns, items: [] };
      rows.push(row);
    }
    row.free -= span;
    row.items.push(item);
  }
  return rows.flatMap((row) => row.items);
}

function SupporterTile({ supporter, rank, inView, wide, onWideChange }) {
  const [failed, setFailed] = useState(false);
  const [natural, setNatural] = useState(null);
  const [tile, setTile] = useState(null);
  const tileRef = useRef(null);
  const kind = rank === "backer" ? "backer" : "logo";
  const showsAvatar = inView && Boolean(supporter.avatar) && !failed;
  const framed = kind === "logo" && showsAvatar && natural && tile;
  // Without ResizeObserver the logo is shown as a plain contained image.
  const canFrame = typeof ResizeObserver !== "undefined";

  useEffect(() => {
    const node = tileRef.current;
    if (kind !== "logo" || !node || !canFrame) return undefined;

    const observer = new ResizeObserver(() => {
      setTile({ width: node.clientWidth, height: node.clientHeight });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [kind, canFrame]);

  const measure = (image) => {
    const { naturalWidth, naturalHeight } = image;
    if (kind !== "logo" || !showsAvatar || !naturalWidth || !naturalHeight) {
      return;
    }
    setNatural({ width: naturalWidth, height: naturalHeight });
    if (!supporter.logoBox) {
      onWideChange(naturalWidth / naturalHeight >= WIDE_LOGO_RATIO);
    }
  };

  const handleError = (event) => {
    setFailed(true);
    setNatural(null);
    handleImgError(event);
  };

  return (
    <Tooltip
      className={wide ? "col-span-2" : ""}
      content={`$${formatMoney(supporter.totalDonations / 100)} by ${
        supporter.name || supporter.slug
      } ($${formatMoney(supporter.monthlyDonations / 100)} monthly)`}
    >
      <a
        ref={tileRef}
        className={TILE_CLASSES[kind]}
        target="_blank"
        rel="noopener noreferrer nofollow"
        href={
          supporter.website || `https://opencollective.com/${supporter.slug}`
        }
      >
        <img
          className={`${framed ? IMG_CLASSES.framed : IMG_CLASSES[kind]} ${
            kind === "logo" && showsAvatar && canFrame && !framed
              ? "opacity-0"
              : ""
          }`}
          style={
            framed
              ? logoLayout(supporter.logoBox || WHOLE_IMAGE, natural, tile)
              : undefined
          }
          src={showsAvatar ? supporter.avatar : SmallIcon}
          alt={
            supporter.alt ||
            (supporter.name || supporter.slug
              ? `${supporter.name || supporter.slug}'s avatar`
              : "avatar")
          }
          loading="lazy"
          onLoad={(event) => measure(event.target)}
          onError={handleError}
        />
      </a>
    </Tooltip>
  );
}

SupporterTile.propTypes = {
  supporter: PropTypes.object.isRequired,
  rank: PropTypes.string,
  inView: PropTypes.bool,
  wide: PropTypes.bool,
  onWideChange: PropTypes.func,
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
  const [wideKeys, setWideKeys] = useState(() => new Set());
  const [columns, setColumns] = useState(0);
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  // Track how many columns the grid currently has so `packTiles` can mirror
  // the layout.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || typeof ResizeObserver === "undefined") return undefined;

    const observer = new ResizeObserver(() => {
      setColumns(
        getComputedStyle(grid).gridTemplateColumns.split(" ").filter(Boolean)
          .length,
      );
    });
    observer.observe(grid);

    return () => observer.disconnect();
  }, []);

  const isTileWide = ({ key, supporter }) =>
    rank !== "backer" && isWideLogo(supporter, wideKeys.has(key));

  const setWide = (key, wide) => {
    setWideKeys((previous) => {
      if (previous.has(key) === wide) return previous;
      const next = new Set(previous);
      if (wide) {
        next.add(key);
      } else {
        next.delete(key);
      }
      return next;
    });
  };

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

        <div className="@container mx-auto w-full max-w-[26rem] md:max-w-none">
          <div
            ref={gridRef}
            className={`grid justify-center w-full ${GRID_CLASSES[rank] || ""}`}
          >
            {packTiles(
              supporters.map((supporter, index) => ({
                key: supporter.slug || String(index),
                supporter,
              })),
              isTileWide,
              columns,
            ).map(({ key, supporter }) => (
              <SupporterTile
                key={key}
                supporter={supporter}
                rank={rank}
                inView={inView}
                wide={isTileWide({ key, supporter })}
                onWideChange={(wide) => setWide(key, wide)}
              />
            ))}
          </div>
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
