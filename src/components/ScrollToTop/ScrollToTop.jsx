import { useEffect, useState } from "react";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Show button when page is scrolled down
   */
  const toggleVisibility = () => {
    // Cleaned up if/else redundancy
    setIsVisible(window.scrollY > 300);
  };

  /**
   * Scroll to top smoothly
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[999] pointer-events-none">
      <button
        className={`
          group flex items-center justify-center 
          w-12 h-12 rounded-full cursor-pointer 
          bg-white border-[5px] border-[#1c78c0] 
          shadow-[0_4px_12px_rgba(0,0,0,0.15)] 
          transition-all duration-300 ease-in-out
          hover:bg-[#1c78c0] hover:border-[#f5f5f5] hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 
          active:translate-y-0 
          dark:bg-[#f5f5f5]
          motion-reduce:transition-none motion-reduce:hover:transform-none
          ${
            isVisible
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-2.5 pointer-events-none"
          }
        `}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Scroll to top"
        disabled={!isVisible}
      >
        <svg
          className="w-8 h-8 text-slate-800 transition-colors duration-300 ease-in-out group-hover:text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    </div>
  );
}

export default ScrollToTop;
