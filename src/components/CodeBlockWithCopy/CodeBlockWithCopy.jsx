import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import "./CodeBlockWithCopy.scss";

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

    // Strip leading '+' from inserted lines
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
    <div className="code-block-wrapper">
      <button
        onClick={handleCopy}
        className={`copy-button ${copyStatus}`}
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
