import { useState, useEffect, lazy, Suspense } from 'react';
import testLocalStorage from '../../utilities/test-local-storage';

const MessageBar = lazy(() => import('./MessageBar'));

export const version = '3';
export const localStorageIsEnabled = testLocalStorage() !== false;

const barDismissed = () => {
  if (localStorageIsEnabled) {
    return localStorage.getItem('notification-dismissed') === version;
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
