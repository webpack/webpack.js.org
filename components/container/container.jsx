import React from 'react';
import './container-style';

export default props => {
  let { className = '' } = props;

  return (
    <div className={ `container ${className}`}>
      { props.children }
    </div>
  );
};
