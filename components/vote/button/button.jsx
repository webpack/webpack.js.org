import React from 'react';
require("./button-style.scss");

export default (props) => {
  let { value, myValue, maxDown, maxUp, color, onVote, className } = props;

  let click = (n) => {
    onVote(Math.min(maxUp, Math.max(n, -maxDown)));
    return false;
  };

  let titleText = (n) => {
    n = Math.min(maxUp, Math.max(n, -maxDown));
    if(n === 0)
      return "";
    return n > 0 ? "+" + n : "" + n;
  };

  let makeTriangle = (n, fn, size, minForEnabled) => {
    const enabled = n > 0 ? (maxUp >= minForEnabled) : (maxDown >= minForEnabled);
    return <a href="#" 
      title={titleText(n)} 
      onClick={() => click(n)} 
      className="vote-button__upMax">
        {fn({size: size, color: enabled ? color : "transparent"})}
    </a>;
  };

  return <div className="vote-button" style={{color: color}}>
    {makeTriangle(Infinity, triangleUp, 30, 11)}
    {makeTriangle(10, triangleUp, 20, 2)}
    {makeTriangle(1, triangleUp, 15, 1)}
    <div className="vote-button__value"><span className={className}>{value}</span></div>
    <div className="vote-button__my-value">(<span className={className}>{myValue}</span>)</div>
    {makeTriangle(-1, triangleDown, 15, 1)}
    {makeTriangle(-10, triangleDown, 20, 2)}
    {makeTriangle(-Infinity, triangleDown, 30, 11)}
  </div>;
};

function triangleUp({color, size}) {
  let path = `m ${size},0 -${size},${size / 3 * 2} ${size*2},0 z`;
  return <svg width={size*2} height={size/3*2}>
    <path d={path} style={{
      fill: color
    }}/>
  </svg>;
}

function triangleDown({color, size}) {
  let path = `m ${size},${size / 3 * 2} ${size},-${size / 3 * 2} -${size*2},0 z`;
  return <svg width={size*2} height={size/3*2}>
    <path d={path} style={{
      fill: color
    }}/>
  </svg>;
}