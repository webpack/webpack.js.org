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
  const editLink = page.edit || new URL(page.path, baseURL).href;

  return (
    <div className="print:hidden mt-8">
      <button type="button" className={classes} onClick={_handlePrintClick}>
        طباعة هذه الصفحة
      </button>
      <Separator />
      <a className={classes} href={editLink}>
        تعديل هذه الصفحة
      </a>
      {page.repo ? (
        <>
          <Separator />
          <a className={classes} href={page.repo}>
            افتح المستودع
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
