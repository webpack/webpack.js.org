import React from 'react'

const CLI = () => (
  <div>
    <div dangerouslySetInnerHTML={{__html: require('raw!markdown!./cli.md')}} />
  </div>
)
CLI.description = 'XXX: cli description goes here';

module.exports = CLI
