import PropTypes from "prop-types";
import { useRef, useState } from "react";
import "./CodeBlockWithCopy.scss";

export default function CodeBlockWithCopy({ children }) {
  const preRef = useRef(null);
  const [copyStatus, setCopyStatus] = useState("copy");

  const handleCopy = async () => {
    if (!preRef.current) return;

    const codeElement = preRef.current.querySelector("code");
    if (!codeElement) return;

    const codeText = codeElement.textContent;
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
      <button onClick={handleCopy} className={`copy-button ${copyStatus}`}>
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
