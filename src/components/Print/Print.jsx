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
    <div className="relative flex flex-wrap text-[15px] my-[0.6em]">
      <BarIcon
        className="flex-none mt-[0.125em] mr-2 text-[#aaa] dark:text-[#69a8ee]"
        width={15}
        height={17}
        fill="#175d96"
      />
      <a
        className="flex-1 max-w-[85%] overflow-hidden whitespace-nowrap text-ellipsis flex items-center flex-nowrap text-[#2b3a42] dark:text-[#b8b8b8]"
        href={printUrl}
        rel="nofollow noopener noreferrer"
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
