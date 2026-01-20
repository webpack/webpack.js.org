import PropTypes from "prop-types";

import "./Container.scss";

export default function Container(props = {}) {
  const { className = "" } = props;

  return <div className={`container ${className}`}>{props.children}</div>;
}

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
