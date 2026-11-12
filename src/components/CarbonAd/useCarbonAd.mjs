import { useEffect, useRef, useState } from "react";

/**
 * Advertiser colors are part of the approved creative and are applied as
 * custom properties. Dark values fall back to the light ones.
 *
 * @param {Record<string, string>} ad
 * @returns {import("react").CSSProperties}
 */
export function adColors(ad) {
  return {
    "--ad-bg": ad.backgroundColor,
    "--ad-bg-dark": ad.backgroundColorDark ?? ad.backgroundColor,
    "--ad-text": ad.textColor,
    "--ad-text-dark": ad.textColorDark ?? ad.textColor,
    "--ad-cta-bg": ad.ctaBackgroundColor,
    "--ad-cta-bg-dark": ad.ctaBackgroundColorDark ?? ad.ctaBackgroundColor,
    "--ad-cta-text": ad.ctaTextColor,
    "--ad-cta-text-dark": ad.ctaTextColorDark ?? ad.ctaTextColor,
  };
}

/**
 * Request one Carbon ad and send its view beacon once at least half of the
 * ad has been visible for one continuous second.
 *
 * A `media` query that does not match skips the request entirely. The hook
 * fetches once per mount, so callers remount it when the page changes.
 *
 * @param {string} zone
 * @param {string} [media]
 */
export default function useCarbonAd(zone, media) {
  const [ad, setAd] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    if (media && globalThis.matchMedia?.(media).matches !== true) {
      return;
    }

    if (typeof globalThis.fetch !== "function") {
      return;
    }

    const controller = new AbortController();

    globalThis
      .fetch(`https://srv.carbonads.net/ads/${zone}.json`, {
        signal: controller.signal,
      })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (data?.ads?.[0]?.statlink) {
          setAd(data.ads[0]);
        }
      })
      .catch(() => {});

    return () => controller.abort();
  }, [zone, media]);

  useEffect(() => {
    if (!ad?.statview || !ref.current) {
      return;
    }

    let timer;
    const observer = new IntersectionObserver(
      (entries) => {
        clearTimeout(timer);

        if (entries.at(-1).intersectionRatio >= 0.5) {
          timer = setTimeout(() => {
            new Image().src = ad.statview;
            observer.disconnect();
          }, 1000);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(ref.current);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [ad]);

  return { ad, ref };
}
