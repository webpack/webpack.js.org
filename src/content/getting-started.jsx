import React from 'react'

const GettingStarted = () => (
  <div>
    <div dangerouslySetInnerHTML={{__html: require('raw!markdown!./getting-started.md')}} />
  </div>
)
GettingStarted.description = 'XXX: getting started description goes here';

module.exports = GettingStarted
