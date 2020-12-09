import PropTypes from 'prop-types';
import './NotifyBox.scss';
NotifyBox.propTypes = {
  skip: PropTypes.func.isRequired,
};
export default function NotifyBox(props) {
  return (
    <div className="notifyBox">
      A new version is available{' '}
      <button title="click to update" onClick={props.skip}>
        UPDATE
      </button>
    </div>
  );
}
