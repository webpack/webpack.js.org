import PropTypes from "prop-types";
import Link from "../Link/Link.jsx";

export default function AdjacentPages({ previous, next }) {
  if (!previous && !next) return null;
  return (
    <div className="flex py-[30px] justify-between print:hidden">
      {previous && (
        <div className="mr-auto">
          <div>« Previous</div>
          <Link className="text-lg" to={previous.url}>
            {previous.title}
          </Link>
        </div>
      )}
      {next && (
        <div className="ml-auto">
          <div className="text-right">Next »</div>
          <Link className="text-lg" to={next.url}>
            {next.title}
          </Link>
        </div>
      )}
    </div>
  );
}

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
