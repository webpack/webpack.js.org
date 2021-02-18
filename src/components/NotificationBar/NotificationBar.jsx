import { useState, useEffect } from 'react';
import Container from '../Container/Container';
import testLocalStorage from '../../utilities/test-local-storage';
import './NotificationBar.scss';
import CloseIcon from '../../styles/icons/cross.svg';
import PropTypes from 'prop-types';
import Content from './Notification.mdx';

const version = '3';
const localStorageIsEnabled = testLocalStorage() !== false;

const barDismissed = () => {
  if (localStorageIsEnabled) {
    return localStorage.getItem('notification-dismissed') === version;
  }
  return false;
};

MessageBar.propTypes = {
  onClose: PropTypes.func,
};

function MessageBar(props) {
  const close = () => {
    localStorage.setItem('notification-dismissed', version);
    props.onClose();
  };
  return (
    <div className="notification-bar">
      <Container className="notification-bar__inner">
        <Content />
        {localStorageIsEnabled ? (
          <CloseIcon
            aria-label="Dismiss"
            className="notification-bar__close"
            fill="#fff"
            width={16}
            onClick={close}
            role="button"
          />
        ) : null}
      </Container>
    </div>
  );
}

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

  useEffect(() => {
    if (typeof document !== 'undefined') {
      // client side
      if (dismissed === false) {
        document.body.classList.add('notification-bar-visible');
      } else {
        document.body.classList.remove('notification-bar-visible');
      }
    }
  }, [dismissed]);
  return (
    <>{dismissed === false ? <MessageBar onClose={onClose} /> : undefined}</>
  );
}
