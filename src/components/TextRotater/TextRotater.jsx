import { clsx } from "clsx";
import PropTypes from "prop-types";
import {
  Children,
  cloneElement,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

function TextRotater({ children, delay = 0, repeatDelay = 3000, maxWidth }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const contentNodeRef = useRef(null);
  const heightTimeoutRef = useRef(null);
  const animationTimeoutRef = useRef(null);
  const repeatTimeoutRef = useRef(null);

  const contentCallbackRef = useCallback((node) => {
    contentNodeRef.current = node;
  }, []);

  useEffect(() => {
    const calculateHeight = () => {
      if (contentNodeRef.current) {
        setContentHeight(contentNodeRef.current.clientHeight);
      }
    };

    heightTimeoutRef.current = setTimeout(calculateHeight, 50);
    animationTimeoutRef.current = setTimeout(() => setIsAnimating(true), delay);

    window.addEventListener("resize", calculateHeight);

    return () => {
      clearTimeout(heightTimeoutRef.current);
      clearTimeout(animationTimeoutRef.current);
      clearTimeout(repeatTimeoutRef.current);
      window.removeEventListener("resize", calculateHeight);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTransitionEnd = useCallback(() => {
    const childrenCount = Children.count(children);
    setCurrentIndex((prev) => (prev + 1) % childrenCount);
    setIsAnimating(false);

    repeatTimeoutRef.current = setTimeout(() => {
      setIsAnimating(true);
    }, repeatDelay);
  }, [children, repeatDelay]);

  const childrenCount = Children.count(children);
  const nextChild = cloneElement(children[(currentIndex + 1) % childrenCount]);

  return (
    <div
      className="
        relative inline-block overflow-hidden align-bottom px-[0.3em]
      "
    >
      <div
        className={clsx(
          "inline-flex flex-col text-left",
          isAnimating && "text-rotater--slide-up",
        )}
        onTransitionEnd={handleTransitionEnd}
        style={{ height: contentHeight, width: maxWidth }}
      >
        <span ref={contentCallbackRef}>{children[currentIndex]}</span>
        {nextChild}
      </div>
    </div>
  );
}

TextRotater.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  delay: PropTypes.number,
  repeatDelay: PropTypes.number,
  // Needed to prevent jump when
  // rotating between texts of different widths
  maxWidth: PropTypes.number,
};

export default memo(TextRotater);
