import PropTypes from 'prop-types';
import './Badge.scss';
Badge.propTypes = {
  text: PropTypes.string.isRequired,
};
export default function Badge(props) {
  return <span className="badge">{props.text}</span>;
}
