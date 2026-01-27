import { animated, config, useTransition } from "@react-spring/web";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import CloseIcon from "../../styles/icons/cross.svg";
import Content from "./Notification.mdx";
import { localStorageIsEnabled, version } from "./NotificationBar.jsx";

export default function MessageBar(props) {
  const [list, setList] = useState([]);
  const listTransitions = useTransition(list, {
    config: config.gentle,
    from: { opacity: 0, transform: "translate3d(-50%, 0px, 0px)" },
    enter: { opacity: 1, transform: "translate3d(0px, 0px, 0px)" },
    keys: list.map((item, index) => index),
  });
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setList([""]);
  }, []);
  const close = () => {
    localStorage.setItem("notification-dismissed", version);
    props.onClose();
  };
  return (
    <>
      {listTransitions((styles) => (
        <animated.div
          className="flex items-center rounded z-50 fixed left-[1px] right-[1px] bottom-[1px] bg-white border-2 border-solid border-gray-700 max-w-full pl-20 py-20 shadow-2xl md:left-20 md:right-auto md:bottom-20 md:max-w-[300px] dark:bg-gray-500 print:hidden"
          style={styles}
        >
          <Content />
          {localStorageIsEnabled ? (
            <button
              type="button"
              className="px-20 self-stretch inline-flex items-center cursor-pointer"
              style={{ background: 'none', border: 'none'}}
              onClick={close}
            >
              <CloseIcon
                aria-label="Dismiss"
                className="fill-current text-gray-300 dark:text-white transform duration-200 hover:text-gray-700"
                width={25}
              />
            </button>
          ) : null}
        </animated.div>
      ))}
    </>
  );
}

MessageBar.propTypes = {
  onClose: PropTypes.func,
};
