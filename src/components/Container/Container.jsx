import PropTypes from "prop-types";

// Tailwind CSS is now used for styling. Custom SCSS removed.

export default function Container(props = {}) {
  const { className = "" } = props;

  return (
    <div className={`w-full max-w-screen-lg mx-auto ${className}`}>
      {props.children}
    </div>
  );
}

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
