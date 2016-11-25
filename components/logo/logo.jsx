import React from 'react';
import Icon from '../../assets/icon-square-small.svg';
import './logo-style';

export default props => {
  let { light } = props;

  return (
    <span className={ `logo ${light ? 'logo--light' : ''}` }>
      <img className="logo__icon" src={ Icon } />
      <span className="logo__text">webpack 中文</span>
    </span>
  );    
};
