import React from 'react';
import FileSize from 'filesize';

export default props => {
  return (
    <div className="splash-file">
      <figure className={ `splash-file__img splash-file__img--${props.type}` } />
      <span className="splash-file__name">{ props.name }</span>
      <b className="splash-file__size">{ FileSize(props.size) }</b>
    </div>
  );
};
