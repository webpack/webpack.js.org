import { Suspense, lazy, useEffect, useState } from "react";
import testLocalStorage from "../../utilities/test-local-storage.js";

const MessageBar = lazy(() => import("./MessageBar.jsx"));

export const version = "3";
export const localStorageIsEnabled = testLocalStorage() !== false;

const barDismissed = () => {
  if (localStorageIsEnabled) {
    return localStorage.getItem("notification-dismissed") === version;
  }
  return false;
};

export default function NotificationBar() {
  // hide the bar in the beginning
  const [dismissed, setDismissed] = useState(true);
  const onClose = () => {
    setDismissed(true);
  };
  useEffect(() => {
    // update dismissed value when component mounted
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDismissed(() => barDismissed());
  }, []);

  return (
    <>
      {dismissed === false ? (
        <Suspense fallback={<div />}>
          <MessageBar onClose={onClose} />
        </Suspense>
      ) : undefined}
    </>
  );
}
