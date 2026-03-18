import PropTypes from "prop-types";
import "./Badge.css";

export default function Badge(props) {
  return <span className="badge">{props.text}</span>;
}

Badge.propTypes = {
  text: PropTypes.string.isRequired,
};
