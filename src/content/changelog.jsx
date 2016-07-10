import React from 'react'

const Changelog = () => (
  <div>
    <div dangerouslySetInnerHTML={{__html: require('raw!markdown!./changelog.md')}} />
  </div>
)
Changelog.description = 'XXX: changelog description goes here';

module.exports = Changelog
