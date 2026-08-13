import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ChevronRightIcon from "../../styles/icons/chevron-right.svg";
import BarIcon from "../../styles/icons/vertical-bar.svg";
import list2Tree from "../../utilities/list2Tree/index.js";

/**
 * Checks whether the sidebar item should be expanded
 * based on whether the current page URL matches this item's URL.
 *
 * @param {string} currentPage - The current page pathname
 * @param {string} url - The sidebar item URL
 * @returns {boolean}
 */
function isOpen(currentPage, url) {
  const normalizePath = (path) => path.replace(/\/+$/, "");

  return normalizePath(currentPage) === normalizePath(url);
}

/**
 * Generate the url for the given anchor depending on the current page
 *
 * @param {string} url - The base URL
 * @param {object} anchor - The anchor object containing its id
 * @returns {string}
 */
function generateAnchorURL(url, anchor) {
  return anchor.id ? `${url}#${anchor.id}` : url;
}

function hasAnchorId(anchors, id) {
  return anchors.some(
    (anchor) =>
      anchor.id === id || (anchor.children && hasAnchorId(anchor.children, id)),
  );
}

function scrollTop(event) {
  // there're two cases
  // 1. location.pathname or location.hash changes which will be handled by useEffect in Page.jsx
  // 2. location.pathname and location.hash doesn't change at all
  if (window.location.hash !== "") {
    // case 1
    return;
  }
  if (!event.metaKey && !event.ctrlKey) {
    // case 2
    window.scrollTo(0, 0);
  }
}
function Anchors({
  anchors,
  url,
  activeSection,
  setActiveSection,
  isCurrentPage,
}) {
  return (
    <ul className="relative hidden flex-[0_0_100%] flex-wrap my-[0.35em] pl-6 overflow-hidden list-none leading-[19px] before:content-[''] before:absolute before:h-[calc(100%-0.6em)] before:top-0 before:left-6 before:border-l before:border-dashed before:border-[#777676] group-data-[open]/item:flex">
      {anchors.map((anchor) => {
        const active = isCurrentPage && activeSection === anchor.id;

        return (
          <li
            key={generateAnchorURL(url, anchor)}
            className="relative flex-[0_0_100%] my-1 first:mt-0 last:mb-0 pl-4 overflow-hidden whitespace-nowrap text-ellipsis before:content-[''] before:absolute before:w-2 before:left-0 before:top-[10px] before:border-b before:border-dashed before:border-[#777676]"
            title={anchor.title}
          >
            <Link
              to={generateAnchorURL(url, anchor)}
              onClick={() => setActiveSection?.(anchor.id)}
              aria-current={active ? "location" : undefined}
              className={
                active
                  ? "sidebar-anchor sidebar-anchor--active"
                  : "sidebar-anchor"
              }
            >
              {anchor.title2}
            </Link>
            {anchor.children && (
              <Anchors
                anchors={anchor.children}
                url={url}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                isCurrentPage={isCurrentPage}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

Anchors.propTypes = {
  anchors: PropTypes.array.isRequired,
  url: PropTypes.string.isRequired,
  activeSection: PropTypes.string,
  setActiveSection: PropTypes.func,
  isCurrentPage: PropTypes.bool,
};

export default function SidebarItem({
  title,
  anchors = [],
  url,
  currentPage,
  activeSection,
  setActiveSection,
}) {
  const [open, setOpen] = useState(() => isOpen(currentPage, url));
  const itemRef = useRef(null);
  const current = isOpen(currentPage, url);
  const tree = useMemo(
    () =>
      list2Tree(
        title,
        anchors.filter((anchor) => anchor.level > 1),
      ),
    [anchors, title],
  );

  useEffect(() => {
    setOpen(isOpen(currentPage, url));
  }, [currentPage, url]);
  useEffect(() => {
    if (current && activeSection && hasAnchorId(tree, activeSection)) {
      setOpen(true);
    }
  }, [activeSection, current, tree]);
  useEffect(() => {
    if (current && open && activeSection && itemRef.current) {
      const activeAnchor = itemRef.current.querySelector(
        `a[href$="#${activeSection}"]`,
      );

      if (activeAnchor) {
        const scrollContainer = itemRef.current
          .closest("nav")
          ?.querySelector(".overflow-y-auto");
        const activeRect = activeAnchor.getBoundingClientRect();
        const containerRect = scrollContainer?.getBoundingClientRect();
        const shouldScroll =
          !containerRect ||
          containerRect.height === 0 ||
          activeRect.top < containerRect.top ||
          activeRect.bottom > containerRect.bottom;

        if (shouldScroll) {
          activeAnchor.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
      }
    }
  }, [activeSection, current, open]);
  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);
  const handlePageLinkClick = useCallback(
    (event) => {
      setActiveSection?.("");
      scrollTop(event);
    },
    [setActiveSection],
  );

  return (
    <div
      ref={itemRef}
      className="group/item relative flex flex-wrap text-[15px] my-[0.6em]"
      data-open={open || undefined}
    >
      {anchors.length > 0 ? (
        <button
          className="bg-transparent border-none p-0 flex items-center"
          onClick={toggle}
          aria-label={`Toggle ${title} section`}
          aria-expanded={open}
        >
          <ChevronRightIcon
            width={15}
            height={17}
            fill="#175d96"
            className={`flex-none mt-[0.125em] mr-2 cursor-pointer text-[#175d96] dark:text-[#69a8ee] transition-all duration-250 hover:text-[#333] ${open ? "origin-center rotate-90" : ""}`}
          />
        </button>
      ) : (
        <BarIcon
          className="flex-none mt-[0.125em] mr-2 text-[#aaa] dark:text-[#69a8ee]"
          width={15}
          height={17}
          fill="#175d96"
        />
      )}

      <NavLink
        end
        key={url}
        data-testid="sidebar-item-title"
        className={({ isActive }) =>
          `flex-1 max-w-[85%] overflow-hidden whitespace-nowrap text-ellipsis ${isActive ? "font-semibold text-[#333] dark:text-white" : "text-[#2b3a42] dark:text-[#b8b8b8]"}`
        }
        to={url}
        onClick={handlePageLinkClick}
      >
        {title}
      </NavLink>
      {anchors.length > 0 ? (
        <Anchors
          anchors={tree}
          url={url}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isCurrentPage={current}
        />
      ) : null}
    </div>
  );
}

SidebarItem.propTypes = {
  title: PropTypes.string,
  anchors: PropTypes.array,
  url: PropTypes.string,
  currentPage: PropTypes.string,
  activeSection: PropTypes.string,
  setActiveSection: PropTypes.func,
};
