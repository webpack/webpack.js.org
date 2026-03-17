import "./ReadingProgress.scss";

/**
 * A fixed reading-progress bar that uses pure CSS Scroll-Driven Animations.
 */
export default function ReadingProgress() {
  return (
    <div
      className="reading-progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div className="reading-progress__bar" />
    </div>
  );
}
