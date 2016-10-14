import React from 'react';
import CubeImg from '../../images/cube.png';
import './logo-style';

export default props => {
  let { light } = props;

  return (
    <span className={ `logo${light ? ' logo--light' : ''}` }>
      <img className="logo__icon" src={ CubeImg } />
      <span className="logo__text">webpack</span>
    </span>
  );    
};
