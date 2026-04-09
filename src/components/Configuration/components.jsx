import PropTypes from "prop-types";
import { isValidElement, useState } from "react";
import Popover from "react-tiny-popover";

const DEFAULT_CHILDREN_SIZE = 4;

const isFirstChild = (child) => typeof child === "string" && child !== " ";

const removeSpaces = (child) => (isFirstChild(child) ? child.trim() : child);

const addLink = (child, i, url) =>
  isFirstChild(child) ? (
    <a href={url} key={i}>
      {child}
    </a>
  ) : (
    child
  );

const Card = ({ body }) => (
  // Applied .shadow > .markdown styles: max-height and overflow
  <div className="markdown max-h-[48vh] overflow-auto">
    {/* Combined .inline and .shadow pre.inline styles:
      display: block, margin: 0, padding: 0 with right-padding override
    */}
    <pre className="block m-0 p-0 pr-[15px]">
      <code>{body}</code>
    </pre>
  </div>
);

Card.propTypes = {
  body: PropTypes.node,
};

export function Details({ url, myChilds }) {
  const [open, setOpen] = useState(false);

  // Find the index of </default>
  const closeDefaultTagIndex = myChilds.findIndex((child) => {
    if (isValidElement(child)) {
      return (
        child.props.className.includes("tag") &&
        child.props.children.length === DEFAULT_CHILDREN_SIZE
      );
    }

    return false;
  });

  const content = [...myChilds];

  // Summary is the part of the snippet that would be shown in the code snippet,
  // to get it we need to cut the <default></default> enclosing tags
  const summary = content
    .splice(2, closeDefaultTagIndex - 3)
    .map(removeSpaces)
    .map((child, i) => addLink(child, i, url));

  content.splice(0, DEFAULT_CHILDREN_SIZE); // Remove <default></default> information

  return (
    <Popover
      isOpen={open}
      position={["right", "top"]}
      padding={0}
      onClickOutside={() => setOpen(false)}
      // Replaced .shadow with Tailwind equivalents, including the custom rgba box-shadow
      containerClassName="overflow-visible rounded shadow-[-1px_1px_10px_0_rgba(255,255,255,0.44)]"
      content={<Card body={content} />}
    >
      <span
        className="code-details-summary-span"
        onClick={() => setOpen((prev) => !prev)}
      >
        {summary}
      </span>
    </Popover>
  );
}

Details.propTypes = {
  url: PropTypes.string,
  myChilds: PropTypes.arrayOf(PropTypes.node),
};
