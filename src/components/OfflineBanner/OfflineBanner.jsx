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
        <svg
          className="offline-banner__icon"
          aria-hidden="true"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
        <span className="offline-banner__text">
          You are currently offline. Some features may be unavailable.
        </span>
      </div>
    </div>
  );
}
