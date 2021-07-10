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
  'text-gray-500 dark:text-gray-500 text-sm cursor-pointer font-sans hover:underline';

export default function PageLinks({ page = {} }) {
  const editLink = page.edit || Url.resolve(baseURL, page.path);

  return (
    <div className="print:hidden mt-20">
      <a className={classes} href={editLink}>
        编辑此页
      </a>
      <Separator />
      <a className={classes} onClick={_handlePrintClick}>
        打印文档
      </a>
      {page.repo ? (
        <>
          <Separator />
          <a className={classes} href={page.repo}>
            前往仓库
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
