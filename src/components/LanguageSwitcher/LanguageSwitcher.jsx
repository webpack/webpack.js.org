import PropTypes from "prop-types";
import { SITE_LANGUAGE } from "../../config/site.js";
import Dropdown from "../Dropdown/Dropdown.jsx";

const languages = [
  {
    lang: "ar",
    title: "العربية",
  },
  {
    lang: "en",
    title: "English",
    origin: "https://webpack.js.org",
  },
  {
    lang: "zh",
    title: "中文",
    origin: "https://webpack.docschina.org",
  },
  {
    lang: "ko",
    title: "한국어",
    origin: "https://webpack.kr",
  },
];

function getLanguageUrl({ lang, origin }, pathname, hash) {
  const path = `${pathname}${hash}`;

  if (lang === SITE_LANGUAGE) {
    return path;
  }

  return `${origin}${path}`;
}

export default function LanguageSwitcher({
  className = "",
  pathname = "/",
  hash = "",
}) {
  const items = languages.map((language) => ({
    ...language,
    url: getLanguageUrl(language, pathname, hash),
  }));

  return <Dropdown className={className} items={items} />;
}

LanguageSwitcher.propTypes = {
  className: PropTypes.string,
  pathname: PropTypes.string,
  hash: PropTypes.string,
};
