import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
LinkComponent.propTypes = {
  href: PropTypes.string.isRequired,
};
export default function LinkComponent(props) {
  // if it's internal link
  // use Link instead
  if (props.href.startsWith('/')) {
    return <Link {...props} to={props.href} />;
  }
  return <a {...props}></a>;
}
