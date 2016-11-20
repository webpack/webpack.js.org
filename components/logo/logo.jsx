import React from 'react';
import Logo from '../../assets/site-logo.svg';
// TODO: Without this useless import, the icon in the footer breaks. Very weird.
import '../../assets/icon-square-small.svg';
import './logo-style';

export default () => {
  return (
    <img className="logo" src={ Logo } />
  );
};
