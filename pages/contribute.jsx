import React from 'react'

const Contribute = () => (
  <div>
    <div dangerouslySetInnerHTML={{__html: require('raw!markdown!./contribute.md')}} />
  </div>
)
Contribute.description = 'XXX: contribute description goes here';

module.exports = Contribute
