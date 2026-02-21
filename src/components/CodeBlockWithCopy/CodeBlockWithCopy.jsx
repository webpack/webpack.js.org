import PropTypes from "prop-types";
import { useRef, useState } from "react";
import "./CodeBlockWithCopy.scss";

export default function CodeBlockWithCopy({ children }) {
  const preRef = useRef(null);
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

    // Exclude +/-/unchanged tokens and removed lines
    for (const element of clonedCodeElement.querySelectorAll(
      ".token.prefix.inserted, .token.prefix.unchanged, .token.deleted-sign.deleted",
    )) {
      element.remove();
    }

    return clonedCodeElement.textContent || "";
  };

  const handleCopy = async () => {
    if (!preRef.current) return;

    const codeElement = preRef.current.querySelector("code");
    if (!codeElement) return;

    const codeText = getCodeText(codeElement);

    if (!codeText) {
      setCopyStatus("error");
      setTimeout(() => setCopyStatus("copy"), 2000);
      return;
    }

    let successfulCopy = false;

    // Try modern API (navigator.clipboard) -> as document.execCommand() deprecated
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
    setTimeout(() => setCopyStatus("copy"), 2000);
  };

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

      <pre ref={preRef} className="code-block">
        {children}
      </pre>
    </div>
  );
}

CodeBlockWithCopy.propTypes = {
  children: PropTypes.node.isRequired,
};
