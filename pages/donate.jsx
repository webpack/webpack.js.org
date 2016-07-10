import React from 'react'

const Donate = () => (
  <div>
    <div dangerouslySetInnerHTML={{__html: require('raw!markdown!./donate.md')}} />
  </div>
)
Donate.description = 'XXX: donate description goes here';

module.exports = Donate
