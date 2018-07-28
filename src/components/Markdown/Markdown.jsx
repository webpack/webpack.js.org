import React from 'react';
import './Markdown.scss';

const Markdown = props => (
  <div className="markdown">
    { props.children }
  </div>
);

export default Markdown;
