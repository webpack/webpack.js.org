import { Link as ReactRouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Link = ({ to = '', url, ...props }) => {
  // XXX: Please `react-banner` for now, but we can update that package to
  // mimick the `NavLink` API
  if (url) to = url;

  // eslint-disable-next-line
  const { isActive, ...others } = props;
  if (to.startsWith('http') || to.startsWith('//')) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" {...others} />
    );
  } else {
    return <ReactRouterLink to={to} {...others} />;
  }
};

Link.propTypes = {
  to: PropTypes.string,
  url: PropTypes.string,
};

export default Link;
