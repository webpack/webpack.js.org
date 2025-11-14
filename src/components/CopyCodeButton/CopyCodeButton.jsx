import { useState } from 'react';
import PropTypes from 'prop-types';
import './CopyCodeButton.scss';

export default function CopyCodeButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <button
      className="copy-code-button"
      onClick={handleCopy}
      title="Copy code to clipboard"
      aria-label="Copy code to clipboard"
    >
      {copied ? '✓ Copied!' : 'Copy'}
    </button>
  );
}

CopyCodeButton.propTypes = {
  text: PropTypes.string.isRequired,
};
