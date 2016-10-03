import React from 'react';

export default ({contributors}) => {
  return (
    <div className="contributors">
      <h4>Contributors</h4>
      <div className="contributors__list">
        { 
          (contributors || []).map((contributor) => (
            <a key={ contributor } 
              className="contributor"
              href={ `https://github.com/${contributor}` }>
              <img src={ `https://github.com/${contributor}.png?size=80` } />
              <span>{ contributor }</span>
            </a>
          ))
        }
      </div>
    </div>
  );
};
