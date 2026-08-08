import PropTypes from "prop-types";
import { useEffect, useState, useSyncExternalStore } from "react";
import CloseIcon from "../../styles/icons/cross.svg";
import testLocalStorage from "../../utilities/test-local-storage.js";
import Container from "../Container/Container.jsx";
import Link from "../Link/Link.jsx";

// Compared against the day after the conference closes, US Eastern.
const isOver = () => new Date() >= new Date("2026-08-14T00:00:00-04:00");

const PRICING = [
  { from: null, price: 750 }, // "Late"
  { from: "2026-08-04T00:00:00-04:00", price: 1000 }, // "Final"
];

const started = ({ from }) => from === null || new Date(from) <= new Date();
const currentTier = () => PRICING.findLast(started);
const nextTier = () => PRICING.find((tier) => started(tier) === false);

const money = (amount) => `$${amount.toLocaleString("en-US")}`;

// "rises to $1,000 on August 4", or just the price once the final tier lands.
const priceSentence = () => {
  const next = nextTier();

  if (next === undefined) {
    return `General admission is ${money(currentTier().price)}.`;
  }

  const on = new Date(next.from).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    timeZone: "America/New_York",
  });

  return `General admission is ${money(currentTier().price)} and rises to ${money(next.price)} on ${on}.`;
};

const UTM = "utm_source=webpack&utm_medium=banner&utm_campaign=renderatl-2026";
const TICKETS_URL = `https://www.renderatl.com/tickets?${UTM}`;

const DATES = "Aug 12–13, 2026";
const CITY = "Atlanta, GA";

const DISMISS_KEY = "renderatl-2026-dismissed";
const localStorageIsEnabled = testLocalStorage() !== false;

const mono =
  "[font-family:'Source_Code_Pro',ui-monospace,monospace] font-semibold uppercase";

const subscribe = () => () => {};
const useMounted = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

// Shared brand mark. Webpack's light blue is the one loud accent on every
// surface (colors follow the site palette in tailwind.config.js).
const Wordmark = ({ className = "" }) => (
  <span className={`font-semibold ${className}`}>Render(ATL)</span>
);

Wordmark.propTypes = {
  className: PropTypes.string,
};

const shortDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "America/New_York",
  });

// Slim dismissible strip docked to the bottom of the viewport (the site
// header is fixed, so the top of the page is spoken for).
export function RenderATLBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOver()) return;
    if (localStorageIsEnabled && localStorage.getItem(DISMISS_KEY) === "1") {
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
  }, []);

  const dismiss = () => {
    if (localStorageIsEnabled) {
      localStorage.setItem(DISMISS_KEY, "1");
    }
    setVisible(false);
  };

  if (visible === false) return null;

  return (
    <div
      role="region"
      aria-label="RenderATL 2026 conference"
      className="fixed bottom-0 left-0 right-0 z-[80] print:hidden bg-blue-800 border-t-2 border-blue-200"
    >
      <div className="mx-auto max-w-[1200px] flex items-center gap-[14px] px-[16px] py-[9px]">
        <p
          className={`m-0 text-[13px] tracking-[0.06em] text-blue-200 ${mono}`}
        >
          <Wordmark /> 2026
          <span className="hidden md:inline"> · Atlanta</span> · Aug 12–13
        </p>

        <p className="m-0 hidden lg:block text-[13px] text-white/60">
          {priceSentence()}
        </p>

        <Link
          to={TICKETS_URL}
          className={`ml-auto shrink-0 rounded-[4px] bg-blue-200 px-[12px] py-[5px] text-[13px] tracking-[0.04em] text-blue-800 hover:bg-[#b4e4fb] hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-200 ${mono}`}
        >
          Get tickets
        </Link>

        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 cursor-pointer bg-transparent border-none p-[4px] focus-visible:outline-2 focus-visible:outline-blue-200"
        >
          <CloseIcon
            aria-label="Dismiss"
            width={18}
            className="fill-current text-white/70 duration-200 hover:text-white"
          />
        </button>
      </div>
    </div>
  );
}

// Splash-page section: the promo composed as an admission ticket — webpack-blue
// face, perforation, and an unthemed paper stub carrying the actual pricing
// data.
export function RenderATLPromo() {
  const mounted = useMounted();

  if (mounted === false || isOver()) return null;

  const next = nextTier();

  return (
    <aside
      aria-label="RenderATL 2026 conference"
      className="relative bg-white dark:bg-[#121212] print:hidden"
    >
      <Container className="flex justify-center py-[3.5em] px-[1em] md:px-[1.5em]">
        <div className="relative flex w-full max-w-[720px] flex-col md:flex-row overflow-hidden rounded-xl bg-blue-200 text-blue-800 text-left shadow-lg">
          {/* Ticket face */}
          <div className="flex-1 p-[28px] md:p-[36px]">
            <p
              className={`m-0 text-[12px] tracking-[0.18em] text-blue-800/70 ${mono}`}
            >
              The South&apos;s tech conference
            </p>

            <h2 className="mt-[10px] mb-0 text-[34px] md:text-[42px] leading-[1.05] font-semibold text-blue-800">
              <Wordmark /> 2026
            </h2>

            <p className="mt-[14px] mb-0 max-w-[40ch] text-[16px] leading-[1.5]">
              Two days of code-level sessions, workshops, and community in
              downtown Atlanta. {priceSentence()}
            </p>

            <Link
              to={TICKETS_URL}
              className={`mt-[22px] inline-block rounded-[5px] bg-blue-800 px-[20px] py-[10px] text-[14px] tracking-[0.06em] text-blue-200 hover:bg-blue-600 hover:text-blue-200 motion-safe:transition-transform motion-safe:hover:-translate-y-[2px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 ${mono}`}
            >
              Get tickets
            </Link>
          </div>

          {/* Perforation + stub. The stub stays paper-colored in dark mode —
              a printed ticket doesn't theme; only the page around it does. */}
          <div className="relative shrink-0 md:w-[210px] border-t-2 md:border-t-0 md:border-l-2 border-dashed border-blue-800/30 bg-gray-100 p-[20px] md:p-[24px]">
            {/* Punched notches at the ends of the perforation */}
            <div
              aria-hidden="true"
              className="absolute -top-[11px] -left-[11px] w-[22px] h-[22px] rounded-full bg-white dark:bg-[#121212]"
            />
            <div
              aria-hidden="true"
              className="absolute -top-[11px] -right-[11px] md:top-auto md:right-auto md:-bottom-[11px] md:-left-[11px] w-[22px] h-[22px] rounded-full bg-white dark:bg-[#121212]"
            />

            <div className="flex h-full flex-row md:flex-col items-center md:items-start justify-between gap-[16px]">
              <div>
                <p
                  className={`m-0 text-[11px] tracking-[0.24em] text-blue-800/60 ${mono}`}
                >
                  Admit one
                </p>
                <p
                  className={`mt-[6px] mb-0 text-[13px] leading-[1.6] tracking-[0.04em] ${mono}`}
                >
                  {DATES}
                  <br />
                  {CITY}
                </p>
              </div>

              <div className="text-right md:text-left">
                <p className="m-0 text-[30px] leading-none font-semibold">
                  {money(currentTier().price)}
                </p>
                {next !== undefined && (
                  <p
                    className={`mt-[4px] mb-0 text-[11px] tracking-[0.04em] text-blue-800/60 ${mono}`}
                  >
                    {money(next.price)} after {shortDate(next.from)}
                  </p>
                )}
                <div
                  aria-hidden="true"
                  className="mt-[12px] h-[26px] w-[110px] md:w-full opacity-70 [background:repeating-linear-gradient(90deg,#2B3A42_0_2px,transparent_2px_6px),repeating-linear-gradient(90deg,#2B3A42_0_1px,transparent_1px_4px)]"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </aside>
  );
}

// Sidebar card: a miniature of the same ticket, sized to the sponsor column.
export function RenderATLCard() {
  const mounted = useMounted();

  if (mounted === false || isOver()) return null;

  return (
    <div className="m-2 rounded-lg shadow-lg transition-transform duration-200 motion-safe:hover:scale-105 dark:shadow-[0_0_40px_rgba(255,255,255,0.18)]">
      <Link
        to={TICKETS_URL}
        aria-label="RenderATL 2026, August 12 to 13 in Atlanta — get tickets"
        className="block w-full max-w-[220px] overflow-hidden rounded-lg text-blue-800 hover:text-blue-800"
      >
        <div className="bg-blue-200 p-[18px]">
          <p
            className={`m-0 text-[10px] tracking-[0.16em] text-blue-800/70 ${mono}`}
          >
            {CITY} · {DATES}
          </p>
          <p className="mt-[6px] mb-0 text-[26px] leading-[1.1] font-semibold">
            <Wordmark />
            <br />
            2026
          </p>
        </div>

        <div className="relative border-t-2 border-dashed border-blue-800/30 bg-gray-100 px-[18px] py-[12px]">
          <div
            aria-hidden="true"
            className="absolute -top-[9px] -left-[9px] w-[18px] h-[18px] rounded-full bg-white dark:bg-[#121212]"
          />
          <div
            aria-hidden="true"
            className="absolute -top-[9px] -right-[9px] w-[18px] h-[18px] rounded-full bg-white dark:bg-[#121212]"
          />

          <p
            className={`m-0 flex items-baseline justify-between text-[11px] tracking-[0.12em] text-blue-800/60 ${mono}`}
          >
            <span>Admit one</span>
            <span className="text-[15px] text-blue-800">
              {money(currentTier().price)}
            </span>
          </p>
        </div>
      </Link>
    </div>
  );
}
