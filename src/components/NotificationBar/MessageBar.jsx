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
    <div className="z-50 fixed left-1/2 transform -translate-x-1/2 bottom-[60px] border-2 border-solid border-blue-400 bg-gray-100 w-[300px] max-w-full p-20 shadow md:left-auto md:translate-x-0 md:right-20 md:bottom-20 dark:bg-gray-500">
      <Content />
      {localStorageIsEnabled ? (
        <div
          role="button"
          className="absolute bg-gray-100 rounded-full p-10 border-2 border-solid border-blue-400 flex items-center justify-center cursor-pointer left-1/2 transform -translate-x-1/2 bottom-[-45px] h-[40px] w-[40px] md:right-[5px] md:top-[5px] md:translate-x-0 md:left-auto md:w-20 md:h-20 md:p-0 md:border-none dark:bg-gray-500"
          onClick={close}
        >
          <CloseIcon
            aria-label="Dismiss"
            className="fill-current text-blue-600 dark:text-white"
            width={20}
          />
        </div>
      ) : null}
    </div>
  );
}
