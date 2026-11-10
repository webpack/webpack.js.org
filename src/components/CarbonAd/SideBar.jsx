import useCarbonAd, { adColors } from "./useCarbonAd.mjs";
import "./carbon-ad.css";

/**
 * Carbon ad card at the bottom of the docs sidebar. The sidebar is hidden
 * below the `md` breakpoint, and the ad is neither shown nor requested there.
 */
export default function SideBarAd() {
  const { ad, ref } = useCarbonAd("CWBI6K77", "(min-width: 768px)");

  if (!ad) {
    return null;
  }

  return (
    <aside
      ref={ref}
      className="carbon-side"
      style={adColors(ad)}
      aria-label="Advertisement"
    >
      <a
        href={ad.statlink}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="carbon-side-link"
      >
        <img src={ad.largeImage} alt={ad.company} className="carbon-image" />
        <span className="carbon-side-body">
          <strong className="carbon-title">{ad.title}</strong>
          <span>{ad.description}</span>
          <span className="carbon-side-cta">{ad.callToAction}</span>
        </span>
      </a>
      <a href={ad.ad_via_link} className="carbon-badge carbon-overlay">
        Ad
      </a>
    </aside>
  );
}
