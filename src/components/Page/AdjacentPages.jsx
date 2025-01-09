import Link from '../Link/Link';
import './AdjacentPages.scss';
import PropTypes from 'prop-types';
AdjacentPages.propTypes = {
  previous: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
  }),
  next: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default function AdjacentPages({ previous, next }) {
  if (!previous && !next) return null;
  return (
    <div className="adjacent-links print:hidden">
      {previous && (
        <div className="adjacent-links__prev">
          <div>« Previous</div>
          <Link className="adjacent-links__link" to={previous.url}>
            {previous.title}
          </Link>
        </div>
      )}
      {next && (
        <div className="adjacent-links__next">
          <div className="adjacent-links__label--next">Next »</div>
          <Link className="adjacent-links__link" to={next.url}>
            {next.title}
          </Link>
        </div>
      )}
    </div>
  );
}
