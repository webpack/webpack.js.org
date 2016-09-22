import React from 'react';

export default props => {
  return (
    <div className="contributors">
      <p>Contributors to this page: (in alphabetical order)</p>
      <div className="contributors__list">
        { 
          (props.contributors || []).map(contributor => (
            <a key={ contributor } 
              className="contributors__person" 
              href={ "https://github.com/" + contributor }>
              <img src={ "https://github.com/" + contributor + ".png?size=80" } />
              <span>{ contributor }</span>
            </a>
          ))
        }
      </div>
    </div>
  );
};