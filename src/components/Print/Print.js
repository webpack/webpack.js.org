import './Print.scss';
import icon from '../../assets/icon-print.svg';
import BarIcon from '../../styles/icons/vertical-bar.svg';
import PropTypes from 'prop-types';

const PRINTABLE_SECTIONS = [
  'api',
  'concepts',
  'configuration',
  'contribute',
  'guides',
  'loaders',
  'migrate',
  'plugins',
];
Print.propTypes = {
  url: PropTypes.string,
};
export default function Print(props) {
  const { url } = props;
  const printUrl = _printPageUrlFromUrl(url);

  // not in a printable section
  if (!printUrl) {
    return null;
  }

  return (
    <div className="sidebar-item sidebar-item--disabled`">
      <BarIcon
        className="sidebar-item__toggle"
        width={15}
        height={17}
        fill="#175d96"
      />
      <a
        className="sidebar-item__title sidebar-link__print"
        href={printUrl}
        rel="nofollow noopener noreferrer"
        alt="Print"
        title="Print"
        target="_blank"
      >
        Print Section
        <img src={icon} width={27} height={20} alt="Printer Icon" />
      </a>
    </div>
  );
}

function _printPageUrlFromUrl(urlRaw) {
  let urlSplit = urlRaw.split('/');
  return PRINTABLE_SECTIONS.includes(urlSplit[1])
    ? `/${urlSplit[1]}/printable/`
    : false;
}
