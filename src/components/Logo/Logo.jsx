import React from 'react';
import Logo from '../../assets/site-logo.svg';
import './Logo.scss';

export default () => {
  return (
    <img className="logo" src={ Logo } alt="webpack logo" />
  );
};
