import PropTypes from 'prop-types';
import { useState } from 'react';
import ChevronRightIcon from '../../styles/icons/chevron-right.svg';
import './NotifyBox.scss';
import { animated, useSpring } from 'react-spring';
NotifyBox.propTypes = {
  skip: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
const AnimatedChevron = animated(ChevronRightIcon);
export default function NotifyBox(props = { loading: false }) {
  const [collapse, setCollapse] = useState(false);
  const toggle = () => setCollapse(!collapse);
  const rotateStyles = useSpring({
    transform: collapse ? 'rotate(180deg)' : 'rotate(0deg)',
  });
  const fadeStyles = useSpring({
    display: collapse ? 'none' : 'inline-flex',
    opacity: collapse ? 0 : 1,
  });
  return (
    <div className="notifyBox__container">
      <span
        role="button"
        style={{
          display: 'inline-flex',
          height: 44,
          width: 44,
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={toggle}
      >
        <AnimatedChevron fill="#333" width={20} style={rotateStyles} />
      </span>
      <animated.div
        style={{
          ...fadeStyles,
          alignItems: 'center',
          paddingRight: 20,
        }}
      >
        <span>A new version is available</span>
        <button
          title="click to update"
          onClick={props.skip}
          disabled={props.loading}
          style={{
            width: 90,
            textAlign: 'center',
            paddingTop: 8,
            paddingBottom: 8
          }}
        >
          {props.loading ? 'UPDATING' : 'UPDATE'}
        </button>
      </animated.div>
    </div>
  );
}
