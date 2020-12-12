import PropTypes from 'prop-types';
import { useState } from 'react';
import ChevronRightIcon from '../../styles/icons/chevron-right.svg';
import './NotifyBox.scss';
import { animated, config, useSpring } from 'react-spring';
NotifyBox.propTypes = {
  skip: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
export default function NotifyBox(props = { loading: false }) {
  const [collapse, setCollapse] = useState(false);
  const toggle = () => setCollapse(!collapse);
  const slideStyles = useSpring({
    config: {
      clamp: true,
      tension: 200
    },
    width: collapse ? 0 : 250,
    opacity: collapse ? 0 : 1,
  });
  return (
    <div className="notifyBox__container">
      <ChevronRightIcon
        fill="#333"
        width={20}
        role="button"
        style={{
          cursor: 'pointer',
          transform: collapse ? 'rotate(180deg)' : '',
        }}
        onClick={toggle}
      />
      <animated.div
        style={{
          ...slideStyles,
          overflow: 'hidden',
          height: 21,
        }}
      >
        <div
          style={{
            marginLeft: 5,
          }}
        >
          A new version is available
          <button
            title="click to update"
            onClick={props.skip}
            disabled={props.loading}
          >
            {props.loading ? 'UPDATING' : 'UPDATE'}
          </button>
        </div>
      </animated.div>
    </div>
  );
}
