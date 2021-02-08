import Url from 'url';
import './PageLinks.scss';
import icon from '../../assets/icon-print.svg';
import EditIcon from '../../styles/icons/edit.svg';
import PropTypes from 'prop-types';

const baseURL = 'https://github.com/docschina/webpack.js.org/edit/cn/';

PageLinks.propTypes = {
  page: PropTypes.shape({
    repo: PropTypes.string,
  }),
};
export default function PageLinks({ page = {} }) {
  const editLink = page.edit || Url.resolve(baseURL, page.path);

  // TODO: Make sure we add `repo` / `edit` and address `type` (above)
  return (
    <div className="page-links">
      {page.repo ? (
        <span>
          <a className="page-links__link" href={page.repo}>
            Jump to Repository
          </a>

          <span className="page-links__gap">|</span>
        </span>
      ) : null}

<<<<<<< HEAD
      <a className="page-links__link" href={ editLink }>
        编辑此页
        <EditIcon className="page-links__icon" width={12} fill="#1a6bac" />
      </a>
      <span className="page-links__gap">|</span>
      <button className="page-links__link page-links__print as-link" onClick={_handlePrintClick} title="Print this page">
        打印文档
=======
      <a className="page-links__link" href={editLink}>
        Edit Document
        <EditIcon className="page-links__icon" width={12} fill="#1a6bac" />
      </a>
      <span className="page-links__gap">|</span>
      <button
        className="page-links__link page-links__print as-link"
        onClick={_handlePrintClick}
        title="Print this page"
      >
        Print Document
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5
        <img src={icon} alt="" />
      </button>
    </div>
  );
}

function _handlePrintClick(e) {
  e.preventDefault();
  window.print();
}
