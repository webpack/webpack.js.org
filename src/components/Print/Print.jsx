import PropTypes from "prop-types";
import "./Print.scss";
import icon from "../../assets/icon-print.svg";
import BarIcon from "../../styles/icons/vertical-bar.svg";

const PRINTABLE_SECTIONS = [
  "api",
  "concepts",
  "configuration",
  "contribute",
  "guides",
  "loaders",
  "migrate",
  "plugins",
];

function _printPageUrlFromUrl(urlRaw) {
  const urlSplit = urlRaw.split("/");

  return PRINTABLE_SECTIONS.includes(urlSplit[1])
    ? `/${urlSplit[1]}/printable/`
    : false;
}

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

Print.propTypes = {
  url: PropTypes.string,
};
