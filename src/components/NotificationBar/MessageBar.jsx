import Container from '../Container/Container';
import './NotificationBar.scss';
import CloseIcon from '../../styles/icons/cross.svg';
import PropTypes from 'prop-types';
import Content from './Notification.mdx';
import { version, localStorageIsEnabled } from './NotificationBar';

MessageBar.propTypes = {
  onClose: PropTypes.func,
};
export default function MessageBar(props) {
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
