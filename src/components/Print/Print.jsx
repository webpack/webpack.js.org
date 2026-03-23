import PropTypes from "prop-types";
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
    <div className="sidebar-item sidebar-item--disabled">
      <BarIcon
        className="sidebar-item__toggle"
        width={15}
        height={17}
        fill="#175d96"
      />
      <a
        className="sidebar-item__title flex items-center flex-nowrap"
        href={printUrl}
        rel="nofollow noopener noreferrer"
        title="Print"
        target="_blank"
      >
        Print Section
        <img src={icon} alt="Printer Icon" className="h-[20px] w-[27px]" />
      </a>
    </div>
  );
}

Print.propTypes = {
  url: PropTypes.string,
};
