import React from 'react'

const FAQ = () => (
  <div>
    <div dangerouslySetInnerHTML={{__html: require('raw!markdown!./faq.md')}} />
  </div>
)
FAQ.description = 'XXX: faq description goes here';

module.exports = FAQ
