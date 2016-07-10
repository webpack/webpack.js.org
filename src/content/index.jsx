import React from 'react'

const Index = () => (
  <div>
    <div dangerouslySetInnerHTML={{__html: require('raw!markdown!./index.md')}} />
  </div>
)
Index.description = 'XXX: site description goes here';

module.exports = Index
