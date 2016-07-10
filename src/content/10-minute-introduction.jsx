import React from 'react'

const TenMinuteIntroduction = () => (
  <div>
    <div dangerouslySetInnerHTML={{__html: require('raw!markdown!./10-minute-introduction.md')}} />
  </div>
)
TenMinuteIntroduction.description = 'XXX: ten minute introduction description goes here';

module.exports = TenMinuteIntroduction
