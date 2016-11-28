import React, {Component} from 'react';
import "./button-style.scss";

export default class NewButton extends Component {
  handleClick (e, n) {
    const {maxUp, maxDown, onVote} = this.props;
    onVote(Math.min(maxUp, Math.max(n, -maxDown)));
    e.preventDefault();
    return false;
  }

  titleText (n, maxUp, maxDown) {
    n = Math.min(maxUp, Math.max(n, -maxDown));
    if(n === 0)
      return "";
    return n > 0 ? "+" + n : "" + n;
  }

  makeTriangle (n, fn, size, minForEnabled) {
    const {maxUp, maxDown, color} = this.props;
    const enabled = n !== 0 && (n > 0 ? (maxUp >= minForEnabled) : (maxDown >= minForEnabled));
    const className = "vote-new-button__upDown";
    if(enabled) {
      return <a href="#"
        title={this.titleText(n, maxUp, maxDown)}
        onClick={e => this.handleClick(e, n)}
        className={className}>
          {fn({size: size, color: color})}
      </a>;
    } else {
      return <a
        className={className}>
          {fn({size: size, color: "#eee"})}
      </a>;
    }
  }
  render() {
    const {voteAppToken} = localStorage;
    const {color, className, value, myValue} = this.props;
    return voteAppToken ? (<div className="vote-new-button" style={{color: color}}>
    <div className="vote-new-button__arrows">
      {this.makeTriangle(1, triangleUp, 10, 1)}
      {this.makeTriangle(-1, triangleDown, 10, 1)}
    </div>
    <div className="vote-new-button__value" title={value + " was voted in total by all users."}>
      <span className={className}>{value}</span>
    </div>
    <div className="vote-new-button__my-value" title={myValue + " was voted by you."}>
      (<span className={className}>{myValue}</span>)
    </div>
  </div>): (<div className="vote-new-button" style={{color: color}}>
    <div className="vote-new-button__logout-value" title={value + " was voted in total by all users."}>
      <span className={className}>{value}</span>
    </div>
  </div>);
  }
}

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