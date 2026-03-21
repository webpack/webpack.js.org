import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../utilities/cn.mjs";

export default function CodeBlockWithCopy({ children }) {
  const preRef = useRef(null);
  const resetStatusTimeoutRef = useRef(null);
  const [copyStatus, setCopyStatus] = useState("copy");

  const codeClassName =
    typeof children?.props?.className === "string"
      ? children.props.className
      : "";
  const isDiffLanguage = codeClassName.split(/\s+/).includes("language-diff");

  const getCodeText = (codeElement) => {
    if (!isDiffLanguage) {
      return codeElement.textContent || "";
    }

    const clonedCodeElement = codeElement.cloneNode(true);

    // Remove entire deleted lines
    for (const element of clonedCodeElement.querySelectorAll(
      ".token.deleted",
    )) {
      element.remove();
    }

    // Remove diff prefix tokens ('+', '-', ' ') — Prism renders these as separate spans
    for (const element of clonedCodeElement.querySelectorAll(".token.prefix")) {
      element.remove();
    }

    // Fallback: if no .token.prefix spans, strip leading '+' directly from inserted spans
    for (const element of clonedCodeElement.querySelectorAll(
      ".token.inserted",
    )) {
      if (element.textContent.startsWith("+")) {
        element.textContent = element.textContent.slice(1);
      }
    }

    return clonedCodeElement.textContent || "";
  };

  const scheduleResetStatus = () => {
    if (resetStatusTimeoutRef.current) {
      clearTimeout(resetStatusTimeoutRef.current);
    }

    resetStatusTimeoutRef.current = setTimeout(() => {
      setCopyStatus("copy");
    }, 2000);
  };

  const handleCopy = async () => {
    if (!preRef.current) return;

    const codeElement = preRef.current.querySelector("code");
    if (!codeElement) return;

    const codeText = getCodeText(codeElement);

    if (!codeText) {
      setCopyStatus("error");
      scheduleResetStatus();
      return;
    }

    let successfulCopy = false;

    // Try modern API (navigator.clipboard)
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(codeText);
        successfulCopy = true;
      }
    } catch (err) {
      console.log(err);
    }

    // If modern API failed, fall back to deprecated document.execCommand('copy')
    if (!successfulCopy) {
      const textarea = document.createElement("textarea");
      textarea.value = codeText;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);
      textarea.select();

      try {
        // This deprecated method is kept as a fallback for compatibility/iframe environments.
        successfulCopy = document.execCommand("copy");
      } catch (err) {
        successfulCopy = false;
        console.log(err);
      }

      document.body.removeChild(textarea);
    }

    setCopyStatus(successfulCopy ? "copied" : "error");
    scheduleResetStatus();
  };

  useEffect(
    () => () => {
      if (resetStatusTimeoutRef.current) {
        clearTimeout(resetStatusTimeoutRef.current);
      }
    },
    [],
  );

  return (
    <div className="code-block-wrapper relative mb-6 group">
      <button
        onClick={handleCopy}
        className={cn(
          "copy-button",
          "absolute top-2 right-2 z-10 px-[0.7rem] py-[0.4rem] rounded-[0.35rem] border-none cursor-pointer text-xs font-medium text-slate-200",
          "opacity-0 group-hover:opacity-100",
          "transition-[background-color,transform,opacity] duration-200",
          "active:scale-95",
          "focus-visible:outline-none focus-visible:opacity-100",
          copyStatus === "copied"
            ? "bg-green-600 hover:bg-green-700"
            : copyStatus === "error"
              ? "bg-red-500 hover:bg-red-700"
              : "bg-[#175d96] hover:bg-[#2f85d0]",
        )}
        aria-label="Copy code to clipboard"
      >
        {copyStatus === "copied"
          ? "Copied!"
          : copyStatus === "error"
            ? "Error"
            : "Copy"}
      </button>

      <pre ref={preRef}>{children}</pre>
    </div>
  );
}

CodeBlockWithCopy.propTypes = {
  children: PropTypes.node.isRequired,
};
