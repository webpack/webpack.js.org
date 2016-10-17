import React from 'react';

export default (props) => {
    const namestyle = {
        padding:'5px 0 5px 5px'
    };
    const snippetstyle = {
        border: '1px solid lightgray',
        margin: '10px',
        fontSize:'14px'
    };
    const element = {
        textContent: props.code,
        className: 'language-' + props.mode
    };
    return  <div style={snippetstyle}>
                    <div style={namestyle}><pre>{props.name}</pre></div>
                    <div dangerouslySetInnerHTML={{ __html: props.code }}>
                    </div>
                </div>;
};