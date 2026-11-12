import PropTypes from "prop-types";
import { useState } from "react";
import CloseIcon from "../../styles/icons/cross.svg";
import useCarbonAd, { adColors } from "./useCarbonAd.mjs";
import "./carbon-ad.css";

// Carbon zone that serves the top bar creative.
const ZONE = "CWBI623E";
const DISMISSED_KEY = "top-bar-ad-dismissed";

/**
 * Carbon banner above the page content. Closing it hides the banner for the
 * rest of the visit and does not request another ad.
 */
function Ad({ onClose }) {
  const { ad, ref } = useCarbonAd(ZONE);

  if (!ad) {
    return null;
  }

  return (
    <aside
      ref={ref}
      className="carbon-top"
      style={adColors(ad)}
      aria-label="Advertisement"
    >
      <a
        href={ad.statlink}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="carbon-top-link"
      >
        <img src={ad.image} alt={ad.company} className="carbon-logo" />
        <span className="carbon-top-text">{ad.description}</span>
        <span className="carbon-cta">{ad.callToAction}</span>
      </a>
      <a href={ad.ad_via_link} className="carbon-badge">
        Ad
      </a>
      <button
        type="button"
        onClick={onClose}
        className="carbon-close"
        aria-label="Close advertisement"
      >
        <CloseIcon
          width={14}
          height={14}
          aria-hidden="true"
          className="fill-current"
        />
      </button>
    </aside>
  );
}

Ad.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default function TopBarAd() {
  // There is no storage while rendering on the server, and reading it throws
  // when the browser blocks storage.
  const [dismissed, setDismissed] = useState(() => {
    try {
      return globalThis.sessionStorage?.getItem(DISMISSED_KEY) === "true";
    } catch {
      return false;
    }
  });

  if (dismissed) {
    return null;
  }

  return (
    <Ad
      onClose={() => {
        try {
          sessionStorage.setItem(DISMISSED_KEY, "true");
        } catch {
          // Storage is blocked or full. Close the banner for this page only.
        }
        setDismissed(true);
      }}
    />
  );
}
