import Url from 'url';
import PropTypes from 'prop-types';

const baseURL = 'https://github.com/webpack/webpack.js.org/edit/master/';

PageLinks.propTypes = {
  page: PropTypes.shape({
    repo: PropTypes.string,
  }),
};

function Separator() {
  return <span className="mx-5 text-black font-bold">·</span>;
}
export default function PageLinks({ page = {} }) {
  const editLink = page.edit || Url.resolve(baseURL, page.path);

  // TODO: Make sure we add `repo` / `edit` and address `type` (above)
  return (
    <div className="print:hidden mt-10">
      <a
        href={editLink}
        className="text-gray-500 dark:text-gray-500 text-sm font-sans hover:underline"
      >
        Edit this page
      </a>
      <Separator />
      <a
        className="text-gray-500 dark:text-gray-500 text-sm font-sans p-0 cursor-pointer hover:underline"
        onClick={_handlePrintClick}
        title="Print this page"
      >
        Print this page
      </a>
      {page.repo ? (
        <>
          <Separator />
          <a
            className="text-gray-500 dark:text-gray-500 text-sm font-sans hover:underline"
            href={page.repo}
          >
            Jump to repository
          </a>
        </>
      ) : null}
    </div>
  );
}

function _handlePrintClick(e) {
  e.preventDefault();
  window.print();
}
