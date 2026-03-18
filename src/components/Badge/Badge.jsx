import PropTypes from "prop-types";

export default function Badge(props) {
  return (
    <span className="relative -top-1 bg-blue-400 px-1 text-14 text-white">
      {props.text}
    </span>
  );
}

Badge.propTypes = {
  text: PropTypes.string.isRequired,
};
