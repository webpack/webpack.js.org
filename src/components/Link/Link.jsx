import PropTypes from "prop-types";
import { Link as ReactRouterLink } from "react-router-dom";

const Link = ({ to = "", url, ...props }) => {
  if (url) to = url;

  const { isActive, ...others } = props;

  if (to.startsWith("http") || to.startsWith("//")) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" {...others} />
    );
  }

  return <ReactRouterLink to={to} {...others} />;
};

Link.propTypes = {
  isActive: PropTypes.boolean,
  to: PropTypes.string,
  url: PropTypes.string,
};

export default Link;
