// eslint-disable-next-line n/prefer-node-protocol
import Url from "url";
import PropTypes from "prop-types";

const baseURL = "https://github.com/webpack/webpack.js.org/edit/main/";

function Separator() {
  return (
    <span className="mx-5 text-gray-500 font-semibold dark:text-gray-300">
      ·
    </span>
  );
}

const classes =
  "text-gray-500 dark:text-gray-200 text-sm cursor-pointer font-sans hover:underline hover:text-gray-500 dark:hover:text-white transition-colors";

function _handlePrintClick(event) {
  event.preventDefault();
  window.print();
}

export default function PageLinks({ page = {} }) {
  // eslint-disable-next-line n/no-deprecated-api
  const editLink = page.edit || Url.resolve(baseURL, page.path);

  return (
    <div className="print:hidden mt-8">
      <a className={classes} href={editLink}>
        Edit this page
      </a>
      <Separator />
      <button type="button" className={classes} onClick={_handlePrintClick}>
        Print this page
      </button>
      {page.repo ? (
        <>
          <Separator />
          <a className={classes} href={page.repo}>
            Jump to repository
          </a>
        </>
      ) : null}
    </div>
  );
}

PageLinks.propTypes = {
  page: PropTypes.shape({
    repo: PropTypes.string,
  }),
};
