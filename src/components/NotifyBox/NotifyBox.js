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
    display: collapse ? 'none' : 'inline-block',
    opacity: collapse ? 0 : 1,
  });
  return (
    <div className="notifyBox__container">
      <AnimatedChevron
        fill="#333"
        width={20}
        role="button"
        style={{
          ...rotateStyles,
          cursor: 'pointer',
        }}
        onClick={toggle}
      />
      <animated.div
        style={{
          ...fadeStyles,
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
            style={{
              width: 77,
              textAlign: 'center',
            }}
          >
            {props.loading ? 'UPDATING' : 'UPDATE'}
          </button>
        </div>
      </animated.div>
    </div>
  );
}
