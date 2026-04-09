import { clsx } from "clsx";
import PropTypes from "prop-types";
import { useCallback, useEffect, useRef } from "react";
import CloseIcon from "../../styles/icons/cross.svg";
import Link from "../Link/Link.jsx";

// TODO: Check to make sure all pages are shown and properly sorted
export default function SidebarMobile({ isOpen, toggle, sections }) {
  const containerRef = useRef(null);
  const openerRef = useRef(null);
  const initialTouchPosition = useRef({});
  const lastTouchPosition = useRef({});
  const isOpenRef = useRef(isOpen);
  const toggleRef = useRef(toggle);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    toggleRef.current = toggle;
  }, [toggle]);

  useEffect(() => {
    if (!isOpen) return;

    const handleBodyClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        toggleRef.current(false);
      }
    };

    window.addEventListener("touchstart", handleBodyClick);
    window.addEventListener("mousedown", handleBodyClick);

    return () => {
      window.removeEventListener("touchstart", handleBodyClick);
      window.removeEventListener("mousedown", handleBodyClick);
    };
  }, [isOpen]);

  const handleTouchStart = useCallback((event) => {
    initialTouchPosition.current.x = event.touches[0].pageX;
    initialTouchPosition.current.y = event.touches[0].pageY;

    // For instant transform along with the touch
    containerRef.current.classList.add("!duration-0");
  }, []);

  const handleTouchEnd = useCallback((event) => {
    const threshold = 20;

    // Free up all the inline styling
    containerRef.current.classList.remove("!duration-0");
    containerRef.current.style.transform = "";

    // are we open?
    if (
      isOpenRef.current &&
      initialTouchPosition.current.x - lastTouchPosition.current.x > threshold
    ) {
      // this is in top level nav callback
      toggleRef.current(false);
    } else if (
      !isOpenRef.current &&
      lastTouchPosition.current.x - initialTouchPosition.current.x > threshold
    ) {
      toggleRef.current(true);
      event.preventDefault();
      event.stopPropagation();
    }
  }, []);

  // Attach touchmove with passive: false so preventDefault works
  useEffect(() => {
    const container = containerRef.current;
    const opener = openerRef.current;

    const handleTouchMove = (event) => {
      const xDiff = initialTouchPosition.current.x - event.touches[0].pageX;
      const yDiff = initialTouchPosition.current.y - event.touches[0].pageY;
      const factor = Math.abs(yDiff / xDiff);

      // Factor makes sure horizontal and vertical scroll dont take place together
      if (xDiff > 0 && factor < 0.8) {
        event.preventDefault();
        container.style.transform = `translateX(-${xDiff}px)`;
        lastTouchPosition.current.x = event.touches[0].pageX;
        lastTouchPosition.current.y = event.touches[0].pageY;
      }
    };

    const handleOpenerTouchMove = (event) => {
      const xDiff = event.touches[0].pageX - initialTouchPosition.current.x;
      const yDiff = initialTouchPosition.current.y - event.touches[0].pageY;
      const factor = Math.abs(yDiff / xDiff);

      // Factor makes sure horizontal and vertical scroll dont take place together
      if (xDiff > 0 && xDiff < 295 && factor < 0.8) {
        event.preventDefault();
        container.style.transform = `translateX(calc(-100% + ${xDiff}px))`;
        lastTouchPosition.current.x = event.touches[0].pageX;
        lastTouchPosition.current.y = event.touches[0].pageY;
      }
    };

    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    opener.addEventListener("touchmove", handleOpenerTouchMove, {
      passive: false,
    });

    return () => {
      container.removeEventListener("touchmove", handleTouchMove);
      opener.removeEventListener("touchmove", handleOpenerTouchMove);
    };
  }, []);

  const getPages = (pages) => {
    let pathname = "";

    if (window.location !== undefined) {
      pathname = window.location.pathname;
    }

    return pages.map((page) => {
      const url = `${page.url}`;
      const active = pathname === url;

      return (
        <Link
          key={url}
          className={clsx(
            "block py-[0.5em] px-[17px] capitalize [-webkit-tap-highlight-color:transparent] ml-[20px]",
            active
              ? "text-gray-900 font-semibold bg-[#f1f4f4] dark:text-white dark:bg-[#222424]"
              : "text-gray-600 dark:text-[#a3a3a3] hover:text-gray-600 active:text-gray-900 active:font-semibold active:bg-[#f1f4f4] dark:active:bg-[#222424] dark:active:text-white",
          )}
          to={url}
          onClick={() => toggle(false)}
        >
          {page.title}
        </Link>
      );
    });
  };

  const getSections = () => {
    let pathname = "";

    if (window && window.location !== undefined) {
      pathname = window.location.pathname;
    }

    return sections.map((section, index) => {
      const active = section.url !== "/" && pathname.startsWith(section.url);

      return (
        <div
          className={clsx(
            "border-l-2 pb-[0.5em]",
            active ? "border-blue-200" : "border-transparent",
          )}
          key={section.url}
        >
          <Link
            className={clsx(
              "uppercase pt-[0.75em] px-4 pb-[0.25em] font-semibold block text-[1.1rem]",
              active ? "text-[#465E69]" : "text-[#2B3A42]",
              index > 0 && "border-t border-gray-200 dark:border-[#343434]",
              "dark:text-[#cadbe6]",
            )}
            key={section.url}
            to={section.url}
            onClick={() => toggle(false)}
          >
            <h3>{section.title || section.url}</h3>
          </Link>

          {getPages(section.children)}
        </div>
      );
    });
  };

  return (
    <nav
      className={clsx(
        "sidebar-mobile fixed w-[300px] h-screen z-[100] top-0 overflow-y-auto overflow-x-hidden [-webkit-overflow-scrolling:touch] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] md:hidden",
        isOpen
          ? "sidebar-mobile--visible translate-x-0"
          : "[transform:translate3d(calc(-100%+5px),0,0)]",
      )}
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={openerRef}
        className={clsx(
          "absolute top-[45px] bottom-0 w-[32px] left-[285px]",
          isOpen && "hidden",
        )}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />

      <div className="relative w-[285px] h-screen overflow-x-hidden py-1 bg-white dark:bg-[#121212] shadow-[0_0_15px_rgba(0,0,0,0.2)]">
        <button
          className="sidebar-mobile__close absolute cursor-pointer border-none right-[22px] top-[10px] text-[1.3em] bg-[#175d96] text-white w-[30px] h-[30px] flex items-center justify-center rounded-full transition-colors duration-150 [-webkit-tap-highlight-color:transparent] hover:bg-[#135d96]"
          onClick={() => toggle(false)}
          aria-label="Close navigation menu"
        >
          <CloseIcon fill="#fff" width={20} />
        </button>

        {getSections()}
      </div>
    </nav>
  );
}

SidebarMobile.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  sections: PropTypes.array,
};
