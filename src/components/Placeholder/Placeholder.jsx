// Placeholder string
const placeholderString = () => `
  <div class="placeholder">
    <p class="bg-gray-100 dark:bg-gray-800 font-sans overflow-hidden relative animate-pulse w-3/4">&nbsp;</p>
    <p class="bg-gray-100 dark:bg-gray-800 font-sans overflow-hidden relative animate-pulse w-[85%]">&nbsp;</p>
    <p class="bg-gray-100 dark:bg-gray-800 font-sans overflow-hidden relative animate-pulse w-1/2">&nbsp;</p>
    <h2 class="bg-gray-100 dark:bg-gray-800 font-sans overflow-hidden relative animate-pulse w-[35%]">&nbsp;</h2>
    <p class="bg-gray-100 dark:bg-gray-800 font-sans overflow-hidden relative animate-pulse w-[85%]">&nbsp;</p>
    <p class="bg-gray-100 dark:bg-gray-800 font-sans overflow-hidden relative animate-pulse w-1/2">&nbsp;</p>
    <p class="bg-gray-100 dark:bg-gray-800 font-sans overflow-hidden relative animate-pulse w-3/4">&nbsp;</p>
    <h2 class="bg-gray-100 dark:bg-gray-800 font-sans overflow-hidden relative animate-pulse w-1/2">&nbsp;</h2>
    <p class="bg-gray-100 dark:bg-gray-800 font-sans overflow-hidden relative animate-pulse w-[85%]">&nbsp;</p>
    <p class="bg-gray-100 dark:bg-gray-800 font-sans overflow-hidden relative animate-pulse w-3/4">&nbsp;</p>
    <p class="bg-gray-100 dark:bg-gray-800 font-sans overflow-hidden relative animate-pulse w-[35%]">&nbsp;</p>
    <h2 class="bg-gray-100 dark:bg-gray-800 font-sans overflow-hidden relative animate-pulse w-[35%]">&nbsp;</h2>
    <p class="bg-gray-100 dark:bg-gray-800 font-sans overflow-hidden relative animate-pulse w-[85%]">&nbsp;</p>
    <p class="bg-gray-100 dark:bg-gray-800 font-sans overflow-hidden relative animate-pulse w-1/2">&nbsp;</p>
    <p class="bg-gray-100 dark:bg-gray-800 font-sans overflow-hidden relative animate-pulse w-3/4">&nbsp;</p>
  </div>
`;

function PlaceholderComponent() {
  return (
    <div className="placeholder">
      <p className="bg-gray-100 dark:bg-gray-800 font-sans overflow-hidden relative animate-pulse w-3/4">
        &nbsp;
      </p>
      <p className="bg-gray-100 dark:bg-gray-800 font-sans overflow-hidden relative animate-pulse w-[85%]">
        &nbsp;
      </p>
      <p className="bg-gray-100 dark:bg-gray-800 font-sans overflow-hidden relative animate-pulse w-1/2">
        &nbsp;
      </p>
    </div>
  );
}

export { PlaceholderComponent, placeholderString };
