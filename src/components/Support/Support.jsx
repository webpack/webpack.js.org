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
// are square, so logos line up. `gridLayout` sizes the tiles from the width
// that is actually available: it picks the column count whose tiles come
// closest to the rank's `tile` size without going over `maxTile`, so rows
// always span the full width and no breakpoint or orientation ends up with
// oversized logos. Both sizes also shrink on short screens (a phone held
// sideways), and a rank with only a few logos shows them at `tile`, centered.
//
// Wide logos (like text logos) span two columns, and `packTiles` reorders the
// tiles so narrow logos back-fill the gaps, giving a masonry-like packing. The
// reordering happens in the DOM rather than with `grid-flow-dense`, so keyboard
// focus and screen readers follow the same order as the eye. Every rank keeps
// at least two columns, so a double-width tile never overflows.
// The maximum sizes follow the logo heights the site used before this grid
// (128px platinum, 96px gold, 64px silver/latest and 32px bronze, with more
// room for bronze so small logos stay legible).
const RANK_GRIDS = {
  latest: { tile: 60, maxTile: 72, gap: 12 },
  bronze: { tile: 52, maxTile: 58, gap: 6 },
  silver: { tile: 60, maxTile: 72, gap: 12 },
  gold: { tile: 84, maxTile: 96, gap: 12 },
  platinum: { tile: 112, maxTile: 128, gap: 16 },
};

const BACKER_GRID_CLASSES =
  "grid-cols-[repeat(auto-fit,36px)] gap-1.5 max-w-200 mx-auto";

// Tiles never take more than this share of the viewport height.
const MAX_TILE_VIEWPORT_HEIGHT = 0.35;
// Viewport height changes smaller than this (a mobile address bar showing or
// hiding) do not resize the tiles.
const MIN_VIEWPORT_HEIGHT_CHANGE = 100;

export function gridLayout(
  width,
  { tile, maxTile, gap },
  { viewportHeight, span },
) {
  const cap = viewportHeight
    ? viewportHeight * MAX_TILE_VIEWPORT_HEIGHT
    : Infinity;
  const target = Math.min(tile, cap);
  const max = Math.min(maxTile, cap);
  const size = (columns) => (width - (columns - 1) * gap) / columns;

  let columns = Math.max(2, Math.round((width + gap) / (target + gap)));
  while (size(columns) > max) columns++;
  // Do not open more columns than there are tiles to fill them; the few
  // tiles there are keep the target size instead of stretching.
  if (span > 0 && span < columns) {
    columns = Math.max(2, span);
    return { columns, tile: Math.floor(Math.min(target, size(columns))) };
  }

  return { columns, tile: Math.floor(size(columns)) };
}

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
// Wide logos (mostly text) would look much heavier than icons at full height,
// so their height is scaled down with their aspect ratio, but never below this
// share of the tile, so the text stays readable.
const MIN_WIDE_LOGO_HEIGHT = 0.55;
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
  const heightFill = Math.max(
    MIN_WIDE_LOGO_HEIGHT,
    Math.min(LOGO_FILL, LOGO_FILL / Math.sqrt(aspect)),
  );
  const width = Math.min(
    LOGO_FILL * tile.width,
    heightFill * tile.height * aspect,
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

function SupporterTile({ supporter, rank, inView, size, onWideChange }) {
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
      className="shrink-0"
      content={`$${formatMoney(supporter.totalDonations / 100)} by ${
        supporter.name || supporter.slug
      } ($${formatMoney(supporter.monthlyDonations / 100)} monthly)`}
    >
      <a
        ref={tileRef}
        className={TILE_CLASSES[kind]}
        style={size && { width: `${size.width}px`, height: `${size.height}px` }}
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
  size: PropTypes.shape({ width: PropTypes.number, height: PropTypes.number }),
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
  const [available, setAvailable] = useState(null);
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const grid = RANK_GRIDS[rank];

  // Track the width the grid can use (and the viewport height, for phones held
  // sideways) so `gridLayout` can size the tiles.
  useEffect(() => {
    const node = gridRef.current;
    if (!grid || !node || typeof ResizeObserver === "undefined") {
      return undefined;
    }

    const update = () => {
      const next = {
        width: node.clientWidth,
        viewportHeight: window.innerHeight,
      };
      // Mobile browsers resize the viewport as their address bar shows and
      // hides while scrolling; ignore that, or logos would jump in size.
      setAvailable((previous) =>
        previous &&
        previous.width === next.width &&
        Math.abs(previous.viewportHeight - next.viewportHeight) <
          MIN_VIEWPORT_HEIGHT_CHANGE
          ? previous
          : next,
      );
    };
    const observer = new ResizeObserver(update);
    observer.observe(node);
    // A viewport can get shorter without the grid getting narrower.
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [grid]);

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

  const tiles = supporters.map((supporter, index) => ({
    key: supporter.slug || String(index),
    supporter,
  }));
  const layout =
    grid && available
      ? gridLayout(available.width, grid, {
          viewportHeight: available.viewportHeight,
          span: tiles.reduce(
            (total, tile) => total + (isTileWide(tile) ? 2 : 1),
            0,
          ),
        })
      : null;
  // Until the grid has been measured, fall back to tiles at the rank's size.
  const tileSize = layout ? layout.tile : grid && grid.tile;
  const tileSizeFor = (wide) =>
    grid && {
      width: wide ? tileSize * 2 + grid.gap : tileSize,
      height: tileSize,
    };

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

        {/* The outer element measures the width available to the logos. The
            logos themselves wrap in a row exactly `columns` tiles wide, so
            every row lines up and a short row (the last one, or a rank with
            only a few sponsors) is centered. */}
        <div ref={gridRef} className="w-full">
          <div
            data-sponsor-grid={rank}
            className={
              grid
                ? "flex flex-wrap justify-center mx-auto max-w-full"
                : `grid justify-center w-full ${BACKER_GRID_CLASSES}`
            }
            style={
              grid && {
                gap: `${grid.gap}px`,
                width: layout
                  ? `${layout.columns * layout.tile + (layout.columns - 1) * grid.gap}px`
                  : undefined,
              }
            }
          >
            {packTiles(tiles, isTileWide, layout ? layout.columns : 0).map(
              ({ key, supporter }) => {
                const wide = isTileWide({ key, supporter });
                return (
                  <SupporterTile
                    key={key}
                    supporter={supporter}
                    rank={rank}
                    inView={inView}
                    size={tileSizeFor(wide)}
                    onWideChange={(isWide) => setWide(key, isWide)}
                  />
                );
              },
            )}
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
