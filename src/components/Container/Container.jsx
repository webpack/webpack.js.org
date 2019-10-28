import React from 'react';
import './Container.scss';

export default (props = {}) => {
  let { className = '' } = props;

  return (
    <div className={ `container ${className}` }>
      { props.children }
    </div>
  );
};
