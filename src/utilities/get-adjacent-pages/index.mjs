export default function getAdjacentPages(haystack, needle, by = 'url') {
  let previous, next;
  const findMe = haystack.findIndex((page) => page[by] === needle[by]);
  if (findMe !== -1) {
    previous = haystack[findMe - 1];
    next = haystack[findMe + 1];
  }
  return {
    previous,
    next,
  };
}
