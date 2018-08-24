import React from 'react';

export const Modes = ({ children, url }) => {
  const closeDefault = children.findIndex(child => {
    if (React.isValidElement(child)) {
      return child.props.props.className.includes('tag') && child.props.children.length === 4;
    }
  });

  const removeSpaces = child => (typeof child === 'string' && child !== ' ' ? child.trim() : child);

  const newChildren = children.splice(2, closeDefault - 3).map(removeSpaces);

  children.splice(0, 4); // Remove <default></default>

  return <a href={url}>{newChildren}</a>;
};

export const Entry = props => {
  return <a href="#">{props.children}</a>;
};
