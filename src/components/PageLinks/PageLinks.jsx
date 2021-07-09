import Url from 'url';
import PropTypes from 'prop-types';

const baseURL = 'https://github.com/docschina/webpack.js.org/edit/cn/';

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
<<<<<<< HEAD

      <a className="page-links__link" href={editLink}>
        编辑此页
        <EditIcon className="page-links__icon" width={12} fill="#1a6bac" />
      </a>
      <span className="page-links__gap">|</span>
      <button
        className="page-links__link page-links__print as-link"
        onClick={_handlePrintClick}
        title="Print this page"
      >
        打印文档
        <img src={icon} alt="" />
      </button>
=======
>>>>>>> 6d6d86fd8efe239203b3d41df0eaf0ccf382e1ac
    </div>
  );
}

function _handlePrintClick(e) {
  e.preventDefault();
  window.print();
}
