import React from 'react'

const Analyze = () => (
  <div>
    <div dangerouslySetInnerHTML={{__html: require('raw!markdown!./analyze.md')}} />
  </div>
)
Analyze.description = 'XXX: analyze description goes here';

module.exports = Analyze
