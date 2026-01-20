import PropTypes from "prop-types";
import { forwardRef, useState } from "react";

const Tooltip = forwardRef(
  (
    {
      children,
      content,
      position = "bottom",
      delay = 300,
      className = "",
      onHide,
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isDelayed, setIsDelayed] = useState(false);
    const showTooltip = () => {
      const timer = setTimeout(() => {
        setIsDelayed(true);
      }, delay);
      setIsVisible(true);
      return () => clearTimeout(timer);
    };
    const hideTooltip = () => {
      setIsVisible(false);
      setIsDelayed(false);
      if (onHide) onHide();
    };
    // Position classes - increase the margins to create more space
    const positions = {
      top: "bottom-full left-1/2 -translate-x-1/2 mb-8",
      bottom: "top-full left-1/2 -translate-x-1/2 mt-10",
      left: "right-full top-1/2 -translate-y-1/2 mr-8",
      right: "left-full top-1/2 -translate-y-1/2 ml-8",
    };
    // Custom background color for both tooltip and triangle
    const bgColor = "#526B78";
    return (
      <div
        ref={ref}
        className={`relative flex items-center justify-center ${className}`}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onBlur={hideTooltip}
      >
        {children}
        {isVisible && (
          <div
            className={`
            absolute z-[9999]
            ${positions[position]}
            ${isDelayed ? "opacity-100" : "opacity-0"}
            transition-opacity duration-200
            pointer-events-none
          `}
          >
            <div
              className="text-white text-xs font-medium p-10 rounded-md whitespace-nowrap shadow-xl"
              style={{ backgroundColor: bgColor }}
            >
              {content}
              {/* Triangle/Arrow - Reduced size */}
              {position === "top" && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 border-solid border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent"
                  style={{ borderTopColor: bgColor }}
                ></div>
              )}
              {position === "bottom" && (
                <div
                  className="absolute -top-[6px] left-1/2 -translate-x-1/2 border-solid border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent"
                  style={{ borderBottomColor: bgColor }}
                ></div>
              )}
              {position === "left" && (
                <div
                  className="absolute top-1/2 -translate-y-1/2 right-[-6px] border-solid border-t-[6px] border-b-[6px] border-l-[6px] border-t-transparent border-b-transparent"
                  style={{ borderLeftColor: bgColor }}
                ></div>
              )}
              {position === "right" && (
                <div
                  className="absolute top-1/2 -translate-y-1/2 left-[-6px] border-solid border-t-[6px] border-b-[6px] border-r-[6px] border-t-transparent border-b-transparent"
                  style={{ borderRightColor: bgColor }}
                ></div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  },
);

Tooltip.displayName = "Tooltip";

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  position: PropTypes.oneOf(["top", "right", "bottom", "left"]),
  delay: PropTypes.number,
  className: PropTypes.string,
  onHide: PropTypes.func,
};

export default Tooltip;
