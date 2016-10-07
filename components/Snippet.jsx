import React from 'react';
import Highlight from 'react-highlight';
require('style!css!highlight.js/styles/github-gist.css');

export default (props) => {
    const classname = props.mode + 'code-box';
    const namestyle = {
        padding:'5px 0 5px 5px'
    };
    const snippetstyle = {
        border: '1px solid lightgray',
        margin: '10px',
        fontSize:'14px'
    };
    return  <div style={snippetstyle}>
                    <div style={namestyle}><pre>{props.name}</pre></div>
                    <Highlight className={classname} style={{fontSize:'12px'}}>
                        {props.code}
                    </Highlight>
                </div>;
};