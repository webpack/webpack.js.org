import { useState } from 'react';
import PropTypes from 'prop-types';

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const buttonStyle = {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    backgroundColor: '#e5e7eb',
    fontSize: '0.875rem',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const handleMouseOver = (e) => {
    e.target.style.backgroundColor = '#d1d5db';
  };

  const handleMouseOut = (e) => {
    e.target.style.backgroundColor = '#e5e7eb';
  };

  return (
    <button
      className="copy-button"
      style={buttonStyle}
      onClick={handleCopy}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}
CopyButton.propTypes = {
  text: PropTypes.string.isRequired,
};

//integrating the CopyButton component into the CodeBlock component

export default function CodeBlock({ children }) {
  const codeText = children?.props?.children?.toString() || '';

  return (
    <div style={{ position: 'relative' }}>
      <CopyButton text={codeText} />
      <pre>{children}</pre>
    </div>
  );
}

CodeBlock.propTypes = {
  children: PropTypes.node.isRequired,
};
