import React from 'react';

export default props => (
  <img height="20" src={
    `https://img.shields.io/${props.content}.svg?label=${props.label}&style=flat-square&maxAge=3600`
  } />
);
