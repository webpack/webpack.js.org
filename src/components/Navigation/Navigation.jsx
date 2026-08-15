// Import External Dependencies
import { DocSearch } from "@docsearch/react";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Link as ReactDOMLink, NavLink, useLocation } from "react-router-dom";

// Import Internal Config
import {
  DOCSEARCH_API_KEY,
  DOCSEARCH_APP_ID,
  DOCSEARCH_INDEX_NAME,
} from "../../config/docsearch.js";

// Import Components
import DiscordIcon from "../../styles/icons/discord.svg";
import GithubIcon from "../../styles/icons/github.svg";
import Hamburger from "../../styles/icons/hamburger.svg";
import StackOverflowIcon from "../../styles/icons/stack-overflow.svg";
import XIcon from "../../styles/icons/x.svg";
import HelloDarkness from "../HelloDarkness.jsx";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher.jsx";
import Link from "../Link/Link.jsx";
import Logo from "../Logo/Logo.jsx";
import Tooltip from "../Tooltip/Tooltip.jsx";

// Load Styling
// eslint-disable-next-line import/no-extraneous-dependencies
import "@docsearch/css";

function NavigationItem({
  children,
  url,
  isActive: isCustomActive,
  ariaLabel,
}) {
  const location = useLocation();
  const classes =
    "text-gray-100 dark:text-gray-100 text-sm font-light uppercase hover:text-blue-200";

  const getActiveState = (isNavLinkActive) => {
    if (isCustomActive) {
      return isCustomActive({}, location);
    }
    return isNavLinkActive;
  };

  if (url.startsWith("http") || url.startsWith("//")) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }
  return (
    <NavLink
      className={({ isActive: isNavLinkActive }) =>
        getActiveState(isNavLinkActive) ? `${classes} !text-blue-200` : classes
      }
      to={url}
      aria-label={ariaLabel}
    >
      {children}
    </NavLink>
  );
}

NavigationItem.propTypes = {
  children: PropTypes.node.isRequired,
  url: PropTypes.string.isRequired,
  isActive: PropTypes.func,
  ariaLabel: PropTypes.string,
};

function NavigationIcon({ children, to, title }) {
  const tooltipRef = useRef();

  const hideTooltip = () => {
    if (tooltipRef.current) {
      tooltipRef.current.blur();
    }
  };

  return (
    <Tooltip content={`webpack على ${title}`} ref={tooltipRef}>
      <Link
        to={to}
        className="inline-flex items-center text-gray-100 dark:text-gray-200 hover:text-blue-200"
        aria-label={`webpack على ${title}`}
        onClick={hideTooltip}
      >
        {children}
      </Link>
    </Tooltip>
  );
}

NavigationIcon.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const navigationIconProps = {
  "aria-hidden": true,
  fill: "currentColor",
  width: 16,
};

const docSearchTranslations = {
  button: {
    buttonText: "بحث",
    buttonAriaLabel: "البحث",
  },
  modal: {
    searchBox: {
      clearButtonTitle: "مسح البحث",
      clearButtonAriaLabel: "مسح البحث",
      closeButtonText: "إغلاق",
      closeButtonAriaLabel: "إغلاق",
      placeholderText: "ابحث في توثيق webpack",
      searchInputLabel: "البحث",
    },
    footer: {
      selectText: "للاختيار",
      selectKeyAriaLabel: "Enter",
      navigateText: "للتنقل",
      navigateUpKeyAriaLabel: "السهم للأعلى",
      navigateDownKeyAriaLabel: "السهم للأسفل",
      closeText: "للإغلاق",
      closeKeyAriaLabel: "Escape",
      poweredByText: "مدعوم من",
    },
    startScreen: {
      recentSearchesTitle: "عمليات البحث الأخيرة",
      noRecentSearchesText: "لا توجد عمليات بحث حديثة",
      saveRecentSearchButtonTitle: "حفظ هذا البحث",
      removeRecentSearchButtonTitle: "إزالة هذا البحث من السجل",
      favoriteSearchesTitle: "عمليات البحث المفضلة",
      removeFavoriteSearchButtonTitle: "إزالة هذا البحث من المفضلة",
    },
    noResultsScreen: {
      noResultsText: "لا توجد نتائج لـ",
      suggestedQueryText: "جرّب البحث عن",
      reportMissingResultsText: "هل تعتقد أن هذه الصفحة يجب أن تظهر هنا؟",
      reportMissingResultsLinkText: "أبلغ عن نتيجة مفقودة",
    },
    errorScreen: {
      titleText: "تعذر جلب النتائج",
      helpText: "تحقق من اتصالك ثم حاول مرة أخرى.",
    },
  },
};

function Navigation({ links, pathname, hash = "", toggleSidebar }) {
  const [locationHash, setLocationHash] = useState(hash);
  const [mounted, setMounted] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setLocationHash(hash);
  }, [hash]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <header className="bg-blue-800 dark:bg-gray-900 print:hidden">
        <div className="flex items-center py-10 px-[16px] justify-between md:px-[24px] md:max-w-[1024px] md:mx-auto md:justify-start">
          <button
            aria-label="فتح قائمة التنقل"
            className="bg-transparent border-none md:hidden"
            onClick={toggleSidebar}
          >
            <Hamburger
              width={20}
              height={20}
              className="fill-current text-white"
            />
          </button>
          <Link to="/" className="navigation__brand md:me-auto">
            <Logo />
          </Link>
          <nav
            className="hidden md:inline-grid md:grid-flow-col md:gap-x-[18px] md:items-center"
            aria-label="التنقل الرئيسي"
          >
            {links.map(({ content, url, isActive, ariaLabel }) => (
              <NavigationItem
                key={url}
                url={url}
                isActive={isActive}
                ariaLabel={ariaLabel}
              >
                {content}
              </NavigationItem>
            ))}
            {[
              {
                to: "https://github.com/webpack/webpack",
                title: "GitHub",
                children: <GithubIcon {...navigationIconProps} />,
              },
              {
                to: "https://x.com/webpack",
                title: "X",
                children: <XIcon {...navigationIconProps} />,
              },
              {
                to: "https://stackoverflow.com/questions/tagged/webpack",
                title: "StackOverflow",
                children: <StackOverflowIcon {...navigationIconProps} />,
              },
              {
                to: "https://discord.com/invite/webpack",
                title: "Discord",
                children: <DiscordIcon {...navigationIconProps} />,
              },
            ].map(({ to, title, children }) => (
              <NavigationIcon key={to} to={to} title={title}>
                {children}
              </NavigationIcon>
            ))}
            <LanguageSwitcher pathname={pathname} hash={locationHash} />
          </nav>
          <div className="navigation__controls inline-flex items-center gap-x-[18px] ms-[18px]">
            <HelloDarkness />
            {mounted && (
              <DocSearch
                appId={DOCSEARCH_APP_ID}
                apiKey={DOCSEARCH_API_KEY}
                indexName={DOCSEARCH_INDEX_NAME}
                disableUserPersonalization={true}
                placeholder="ابحث في توثيق webpack"
                translations={docSearchTranslations}
                transformItems={(items) =>
                  items.map(({ url, ...others }) => {
                    const { origin } = new URL(url);
                    return {
                      ...others,
                      url: url.replace(new RegExp(`^${origin}`), ""),
                    };
                  })
                }
                hitComponent={({ hit, children }) => (
                  <ReactDOMLink to={hit.url}>{children}</ReactDOMLink>
                )}
              />
            )}
          </div>
        </div>
        {/* sub navigation */}
        {links
          .filter((link) => link.children)
          .map((link) => {
            if (link.isActive && !link.isActive({}, location)) {
              return null;
            }
            return (
              <div
                key={link.url}
                className="bg-gray-100 dark:bg-gray-800 hidden md:block"
              >
                <div
                  className="md:max-w-[1024px] md:mx-auto md:grid md:grid-flow-col md:justify-end md:gap-x-[20px] md:px-[24px]"
                  data-testid="sub-navigation"
                >
                  {link.children.map((child) => {
                    const classNames =
                      "text-[var(--color-link-accessible)] dark:text-[var(--color-link-accessible-dark)] py-5 text-sm capitalize hover:text-[var(--color-link-accessible-hover)] dark:hover:text-white";
                    const isActive = location.pathname.startsWith(child.url);
                    return (
                      <NavLink
                        key={child.url}
                        to={child.url}
                        title={child.title}
                        className={() =>
                          isActive
                            ? `!text-black dark:!text-white ${classNames}`
                            : classNames
                        }
                      >
                        {child.content === "api"
                          ? child.content.toUpperCase()
                          : child.content}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </header>
    </>
  );
}

Navigation.propTypes = {
  pathname: PropTypes.string,
  hash: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.node.isRequired,
      url: PropTypes.string.isRequired,
      isActive: PropTypes.func,
      ariaLabel: PropTypes.string,
      children: PropTypes.arrayOf(PropTypes.object),
    }),
  ).isRequired,
  toggleSidebar: PropTypes.func,
};

export default Navigation;
