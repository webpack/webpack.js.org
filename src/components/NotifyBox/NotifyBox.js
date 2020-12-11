import PropTypes from 'prop-types';
import { useState } from 'react';
import ChevronRightIcon from '../../styles/icons/chevron-right.svg';
import './NotifyBox.scss';
NotifyBox.propTypes = {
  skip: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
export default function NotifyBox(props = { loading: false }) {
  const [collapse, setCollapse] = useState(false);
  const toggle = () => setCollapse(!collapse);
  return (
    <div className="notifyBox">
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
        <div
          style={{
            marginLeft: 5,
            display: collapse === true ? 'none' : 'block',
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
      </div>
    </div>
  );
}
