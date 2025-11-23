import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './CodeBlock.scss';

const CodeBlock = ({ children, ...props }) => {
  const [copied, setCopied] = useState(false);
  const preRef = useRef(null);
  const timeoutRef = useRef(null);

  // Extract the code content from the children
  const getCodeContent = () => {
    if (!preRef.current) return '';
    
    const codeElement = preRef.current.querySelector('code');
    if (codeElement) {
      return codeElement.textContent || codeElement.innerText || '';
    }
    
    // Fallback: get text from pre element
    return preRef.current.textContent || preRef.current.innerText || '';
  };

  const handleCopy = async () => {
    const codeContent = getCodeContent();
    
    if (!codeContent) return;

    try {
      await navigator.clipboard.writeText(codeContent);
      setCopied(true);
      
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Reset the copied state after 2 seconds
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      console.error('Failed to copy code:', err);
      
      // Try the fallback method
      const textArea = document.createElement('textarea');
      textArea.value = codeContent;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      
      try {
        document.execCommand('copy');
        setCopied(true);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          setCopied(false);
        }, 2000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
      }
      
      document.body.removeChild(textArea);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="code-block-wrapper">
      <pre ref={preRef} {...props}>
        {children}
      </pre>
      <button
        type="button"
        className="code-block-copy-button"
        onClick={handleCopy}
        aria-label={copied ? 'Copied!' : 'Copy code'}
        title={copied ? 'Copied!' : 'Copy code'}
      >
        <svg
          className="code-block-copy-icon"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {copied ? (
            // Checkmark icon
            <path
              d="M13.5 4.5L6 12L2.5 8.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          ) : (
            // Copy icon - two overlapping squares
            <>
              <rect
                x="4"
                y="4"
                width="8"
                height="8"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <rect
                x="6"
                y="6"
                width="8"
                height="8"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </>
          )}
        </svg>
        <span className="code-block-copy-text">
          {copied ? 'Copied!' : 'Copy'}
        </span>
      </button>
    </div>
  );
};

CodeBlock.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CodeBlock;

