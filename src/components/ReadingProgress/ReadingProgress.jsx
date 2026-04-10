/**
 * A fixed reading-progress bar that uses pure CSS Scroll-Driven Animations.
 */
export default function ReadingProgress() {
  return (
    <div
      className="absolute bottom-0 left-0 w-full z-[101] h-[2px] bg-transparent pointer-events-none opacity-0 print:hidden [animation:fade-in-progress_0.1s_0.3s_forwards]"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div className="h-full w-full bg-[#36393c] dark:bg-[#9ab3c0] [transform-origin:left] will-change-transform [transform:scaleX(0)] [animation:grow-progress_auto_linear_forwards] animation-timeline-scroll" />
    </div>
  );
}
