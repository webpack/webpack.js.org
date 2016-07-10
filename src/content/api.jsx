import React from 'react'

const API = () => (
  <div>
    <div dangerouslySetInnerHTML={{__html: require('raw!markdown!./api.md')}} />
  </div>
)
API.description = 'XXX: api description goes here';

module.exports = API
