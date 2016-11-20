import React from 'react';
import Icon from '../../assets/site-logo.svg';
import './logo-style';

export default props => {
  let { light } = props;

  return (
    <img className="logo" src={ Icon } />
  );
};
