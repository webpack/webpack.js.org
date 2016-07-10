import React from 'react'

const Concepts = () => (
  <div>
    <div dangerouslySetInnerHTML={{__html: require('raw!markdown!./concepts.md')}} />
  </div>
)
Concepts.description = 'XXX: concepts description goes here';

module.exports = Concepts
