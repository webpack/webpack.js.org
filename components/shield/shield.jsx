import React from 'react';

export default props => (
  <img src={
    `https://img.shields.io/${props.content}.svg?label=${props.label}&style=flat-square&maxAge=3600`
  } />
);
