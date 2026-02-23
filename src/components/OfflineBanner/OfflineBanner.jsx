import { useEffect, useState } from "react";
import isClient from "../../utilities/is-client.js";
import "./OfflineBanner.scss";

export default function OfflineBanner() {
  const [online, setOnline] = useState(() =>
    isClient ? navigator.onLine : true,
  );

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  if (online) {
    return null;
  }

  return (
    <div
      className="offline-banner"
      role="status"
      aria-live="polite"
      data-testid="offline-banner"
    >
      <div className="offline-banner__content">
        <span className="offline-banner__icon" aria-hidden="true">
          📡
        </span>
        <span className="offline-banner__text">
          You're currently offline. Some features may be unavailable.
        </span>
      </div>
    </div>
  );
}
