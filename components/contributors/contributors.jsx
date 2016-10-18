import React from 'react';
import './contributors-style';

export default ({contributors}) => {
  return (
    <div className="contributors">
      <h3>贡献者：</h3>
      <div className="contributors__list">
        { 
          (contributors || []).map((contributor) => (
            <a key={ contributor } 
              className="contributor"
              href={ `https://github.com/${contributor}` }>
              <img src={ `https://github.com/${contributor}.png?size=50` } />
            </a>
          ))
        }
      </div>
    </div>
  );
};
