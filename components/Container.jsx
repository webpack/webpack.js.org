import React from 'react';
import { rhythm } from 'utilities/typography'

export default ({ className, style, children, ...otherProps }) => {
  if (!className) {
    className = ''
  }
  return (
    <div
      className={ `container ${className}`}
      style={{
        padding: `${rhythm(1/2)} ${rhythm(1)}`,
        ...style,
      }}
      {...otherProps}
    >
      { children }
    </div>
  );
};
