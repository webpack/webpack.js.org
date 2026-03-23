import PropTypes from "prop-types";

export default function Container(props = {}) {
  const { className = "" } = props;

  return (
    <div className={`w-full max-w-5xl mx-auto ${className}`}>
      {props.children}
    </div>
  );
}

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
