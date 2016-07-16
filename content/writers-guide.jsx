import React from 'react'

const WritersGuide = () => (
  <div>
    <div dangerouslySetInnerHTML={{__html: require('raw!markdown!./writers-guide.md')}} />
  </div>
)
WritersGuide.description = 'XXX: writers guide description goes here';

module.exports = WritersGuide
