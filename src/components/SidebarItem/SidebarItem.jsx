import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
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
  return new RegExp(`${currentPage}/?$`).test(url);
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

function Anchors({ anchors, url, activeAnchorId }) {
  const activeAnchorRef = useRef(null);

  useEffect(() => {
    if (activeAnchorRef.current) {
      activeAnchorRef.current.scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behavior: "smooth",
      });
    }
  }, [activeAnchorId]);

  return (
    <ul className="relative hidden flex-[0_0_100%] flex-wrap my-[0.35em] pl-6 overflow-hidden list-none leading-[19px] before:content-[''] before:absolute before:h-[calc(100%-0.6em)] before:top-0 before:left-6 before:border-l before:border-dashed before:border-[#777676] group-data-[open]/item:flex">
      {anchors.map((anchor) => (
        <li
          key={generateAnchorURL(url, anchor)}
          ref={anchor.id === activeAnchorId ? activeAnchorRef : null}
          className={`relative flex-[0_0_100%] my-1 first:mt-0 last:mb-0 pl-4 overflow-hidden whitespace-nowrap text-ellipsis before:content-[''] before:absolute before:w-2 before:left-0 before:top-[10px] before:border-b before:border-dashed before:border-[#777676] ${anchor.id === activeAnchorId ? "border-l-2 border-[#175d96] pl-3 bg-[#eef6fc] dark:bg-[#122235]" : ""}`.trim()}
          title={anchor.title}
        >
          <Link
            to={generateAnchorURL(url, anchor)}
            className={`${anchor.id === activeAnchorId ? "font-semibold text-[#175d96] dark:text-[#82b7f6]" : "text-[#2b3a42] hover:text-[#175d96] dark:text-[#b8b8b8] dark:hover:text-[#82b7f6]"}`}
          >
            {anchor.title2}
          </Link>
          {anchor.children && (
            <Anchors
              anchors={anchor.children}
              url={url}
              activeAnchorId={activeAnchorId}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

Anchors.propTypes = {
  anchors: PropTypes.array.isRequired,
  url: PropTypes.string.isRequired,
  activeAnchorId: PropTypes.string,
};

export default function SidebarItem({ title, anchors = [], url, currentPage }) {
  const [open, setOpen] = useState(() => isOpen(currentPage, url));
  const [activeAnchorId, setActiveAnchorId] = useState(null);

  useEffect(() => {
    setOpen(isOpen(currentPage, url));
  }, [currentPage, url]);

  useEffect(() => {
    if (currentPage !== url || anchors.length === 0) {
      setActiveAnchorId(null);
      return undefined;
    }

    const content = document.getElementById("md-content");

    if (!content) {
      setActiveAnchorId(null);
      return undefined;
    }

    const activeAnchors = anchors.filter((anchor) => anchor.level > 1);

    const updateActiveAnchor = () => {
      const anchorElements = activeAnchors
        .map((anchor) => document.getElementById(anchor.id))
        .filter(Boolean);

      let nextActiveAnchorId = null;

      for (const anchorElement of anchorElements) {
        if (anchorElement.getBoundingClientRect().top <= 120) {
          nextActiveAnchorId = anchorElement.id;
        } else {
          break;
        }
      }

      if (!nextActiveAnchorId && anchorElements.length > 0) {
        nextActiveAnchorId = anchorElements[0].id;
      }

      setActiveAnchorId(nextActiveAnchorId);
    };

    updateActiveAnchor();

    let animationFrameId = window.requestAnimationFrame(updateActiveAnchor);

    const handleScroll = () => {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = window.requestAnimationFrame(updateActiveAnchor);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    const mutationObserver = new MutationObserver(handleScroll);
    mutationObserver.observe(content, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      mutationObserver.disconnect();
    };
  }, [anchors, currentPage, url]);

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const filteredAnchors = anchors.filter((anchor) => anchor.level > 1);
  const tree = list2Tree(title, filteredAnchors);

  return (
    <div
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
        onClick={scrollTop}
      >
        {title}
      </NavLink>

      {anchors.length > 0 ? (
        <Anchors anchors={tree} url={url} activeAnchorId={activeAnchorId} />
      ) : null}
    </div>
  );
}

SidebarItem.propTypes = {
  title: PropTypes.string,
  anchors: PropTypes.array,
  url: PropTypes.string,
  currentPage: PropTypes.string,
};
