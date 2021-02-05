import './Container.scss';
import PropTypes from 'prop-types';
Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
export default function Container(props = {}) {
  let { className = '' } = props;

  return <div className={`container ${className}`}>{props.children}</div>;
}
