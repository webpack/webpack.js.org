import React from 'react';

export default props => {
  if (props.contributors) {
    return (
      <div className="contributors">
        <hr />
        <h4>Contributors:</h4>
        <div className="contributors__list">
          { 
            (props.contributors || []).map(contributor => (
              <a key={ contributor } 
                className="contributors__person" 
                href={ `https://github.com/${contributor}` }>
                <img src={ `https://github.com/${contributor}.png?size=80` } />
                <span>{ contributor }</span>
              </a>
            ))
          }
        </div>
      </div>
    );
  } else {
    return null
  }
};
