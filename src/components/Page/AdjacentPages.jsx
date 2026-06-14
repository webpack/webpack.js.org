import PropTypes from "prop-types";
import Link from "../Link/Link.jsx";

export default function AdjacentPages({ previous, next }) {
  if (!previous && !next) return null;
  return (
    <div className="flex py-[30px] justify-between gap-x-8 print:hidden">
      {previous && (
        <div className="me-auto max-w-[48%]">
          <div>السابق ›</div>
          <Link className="block text-lg break-words" to={previous.url}>
            {previous.title}
          </Link>
        </div>
      )}
      {next && (
        <div className="ms-auto max-w-[48%] text-end">
          <div>‹ التالي</div>
          <Link className="block text-lg break-words" to={next.url}>
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
