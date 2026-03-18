const baseLineClass =
  "my-3 animate-pulse overflow-hidden bg-gray-100 font-sans text-transparent";

// Placeholder string
const placeholderString = () => `
  <div>
    <p class="${baseLineClass} w-[75%]">&nbsp;</p>
    <p class="${baseLineClass} w-[85%]">&nbsp;</p>
    <p class="${baseLineClass} w-[50%]">&nbsp;</p>
    <h2 class="${baseLineClass} w-[35%]">&nbsp;</h2>
    <p class="${baseLineClass} w-[85%]">&nbsp;</p>
    <p class="${baseLineClass} w-[50%]">&nbsp;</p>
    <p class="${baseLineClass} w-[75%]">&nbsp;</p>
    <h2 class="${baseLineClass} w-[50%]">&nbsp;</h2>
    <p class="${baseLineClass} w-[85%]">&nbsp;</p>
    <p class="${baseLineClass} w-[75%]">&nbsp;</p>
    <p class="${baseLineClass} w-[35%]">&nbsp;</p>
    <h2 class="${baseLineClass} w-[35%]">&nbsp;</h2>
    <p class="${baseLineClass} w-[85%]">&nbsp;</p>
    <p class="${baseLineClass} w-[50%]">&nbsp;</p>
    <p class="${baseLineClass} w-[75%]">&nbsp;</p>
  </div>
`;

function PlaceholderComponent() {
  return (
    <div>
      <p className={`${baseLineClass} w-[75%]`}>&nbsp;</p>
      <p className={`${baseLineClass} w-[85%]`}>&nbsp;</p>
      <p className={`${baseLineClass} w-[50%]`}>&nbsp;</p>
    </div>
  );
}

export { PlaceholderComponent, placeholderString };
