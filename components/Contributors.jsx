import React from 'react';

export default props => {
  if (props.contributors) {
    return (
      <div>
        <hr />
        <h3>Contributors:</h3>
        <div className="contributors__list">
          {
            (props.contributors || []).map(contributor => (
              <a key={ contributor }
                href={ `https://github.com/${contributor}` }>
                <img
                  alt="Contributor to this page"
                  style={{
                    width: 48,
                  }}
                  src={ `https://github.com/${contributor}.png?size=96` }
                />
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
