import React, { PropTypes } from 'react';
import './cube-style';

export default class Cube extends React.Component {
  constructor(props) {
    super(props);

    this.listeners = {
      spin: this._spin.bind(this),
      reset: this._reset.bind(this)
    };

    this.state = {
      x: 0,
      y: 0,
      z: 0
    };
  }

  render() {
    let { x, y, z } = this.state;
    let { theme, depth, className = '' } = this.props;

    return (
      <span ref={ ref => this.container = ref }
          className={ `cube cube--${theme} ${className}` }
          style={{
            width: `${depth}px`,
            marginLeft: `${depth * 0.5}px`,
            paddingBottom: `${depth * 0.5}px`
          }}>
        <figure className="cube__outer"
            style={{
              width: `${depth}px`,
              height: `${depth}px`,
              transform: `translateX(-50%)
              scale3d(1,1,1)
              rotateX(${x}deg)
              rotateY(${y}deg)
              rotateZ(${z}deg)`
            }}>
            { this._getFaces() }
        </figure>
        <figure className="cube__inner"
            style={{
              width: `${depth}px`,
              height: `${depth}px`,
              transform: `translateX(-50%)
              scale3d(0.5,0.5,0.5)
              rotateX(${-x}deg)
              rotateY(${-y}deg)
              rotateZ(${-z}deg)`
            }}>
            { this._getFaces() }
        </figure>
      </span>
    );
  }

  componentDidMount() {
    let { hover, continuous } = this.props;

    if (hover) {
      this.container.addEventListener('mouseenter', this.listeners.spin);
      this.container.addEventListener('mouseleave', this.listeners.reset);

    } else if (continuous) {
      let degrees = 0;
      let axis = 'y';

      this._interval = setInterval(() => {
        let obj = {};
        let sign = Math.random() < 0.5 ? -1 : 1;

        obj[axis] = degrees += 90;

        //axis = axis === 'x' ? 'y' : axis === 'y' ? 'z' : 'x'; 

        this.setState(obj);
      }, 1000);
    }
  }

  componentWillUnmount() {
    let { hover, continuous } = this.props;

    if (hover) {
      this.container.removeEventListener('mouseenter', this.listeners.spin);
      this.container.removeEventListener('mouseleave', this.listeners.reset);

    } else if (continuous) {
      clearInterval(this._interval);
    }
  }

  /**
   * Get all faces for a cube
   *
   * @return {array} - An array of nodes
   */
  _getFaces() {
    return [
      'rotateX(0deg)',
      'rotateX(-90deg)',
      'rotateX(90deg)',
      'rotateY(-90deg)',
      'rotateY(90deg)',
      'rotateY(180deg)'
    ].map((rotation, i) => {
      return (
        <section 
          key={ i } 
          className="cube__face"
          style={{ 
            transform: `${rotation} translateZ(${ this.props.depth / 2 }px)` 
          }} />
      );
    });
  }

  /**
   * Get a random axis
   *
   * @return {string} - A random axis (i.e. x, y, or z)
   */
  _getRandomAxis() {
    let axes = Object.keys(this.state);

    return axes[ Math.floor(Math.random() * axes.length) ];
  }

  /**
   * Spin the cubes in opposite directions semi-randomly
   *
   * @param {object} e - Native event
   */
  _spin(e) {
    let obj = {};
    let axis = this._getRandomAxis();
    let sign = Math.random() < 0.5 ? -1 : 1;

    obj[axis] = sign * 90;

    this.setState(obj);
  }

  /**
   * Rotate the cubes back to their original position
   *
   * @param {object} e - Native event
   */
  _reset(e) {
    this.setState({
      x: 0,
      y: 0,
      z: 0
    });
  }
}

Cube.propTypes = {
  hover: PropTypes.bool,
  theme: PropTypes.string,
  depth: PropTypes.number
};

Cube.defaultProps = {
  hover: false,
  theme: 'dark',
  depth: 30
};
