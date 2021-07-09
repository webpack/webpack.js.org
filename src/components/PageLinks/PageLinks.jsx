import Url from 'url';
import PropTypes from 'prop-types';

const baseURL = 'https://github.com/webpack/webpack.js.org/edit/master/';

PageLinks.propTypes = {
  page: PropTypes.shape({
    repo: PropTypes.string,
  }),
};

function Separator() {
  return <span className="mx-5 text-black font-bold dark:text-white">·</span>;
}

const classes =
  'text-gray-500 italic dark:text-gray-500 text-sm cursor-pointer font-sans hover:underline';

export default function PageLinks({ page = {} }) {
  const editLink = page.edit || Url.resolve(baseURL, page.path);

  return (
    <div className="print:hidden mt-10">
      <a className={classes} href={editLink}>
        Edit this page
      </a>
      <Separator />
      <a className={classes} onClick={_handlePrintClick}>
        Print this page
      </a>
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

function _handlePrintClick(e) {
  e.preventDefault();
  window.print();
}
