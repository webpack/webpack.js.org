// Import External Dependencies
import PropTypes from "prop-types";
import { Component } from "react";

export default class Cube extends Component {
  static propTypes = {
    hover: PropTypes.bool,
    theme: PropTypes.string,
    depth: PropTypes.number,
    repeatDelay: PropTypes.number,
    className: PropTypes.string,
    continuous: PropTypes.bool,
  };

  static defaultProps = {
    hover: false,
    theme: "dark",
    depth: 30,
    repeatDelay: 1000,
  };

  state = {
    x: 0,
    y: 0,
    z: 0,
    iteration: 0,
  };

  render() {
    const { x, y, z } = this.state;
    const { theme, depth, className = "" } = this.props;

    return (
      <div
        className={`cube__container ${className}`}
        style={{
          width: `${depth * 1.5}px`,
          height: `${depth * 1.5}px`,
          paddingLeft: `${depth / 1.7}px`,
        }}
      >
        <span
          ref={(ref) => (this.container = ref)}
          className={`cube cube--${theme} relative block [transform-style:preserve-3d]`}
          style={{
            width: `${depth}px`,
            paddingBottom: `${depth * 0.5}px`,
            transform: "rotateX(-35.5deg) rotateY(45deg)",
          }}
        >
          <figure
            className="cube__outer inline-block [transform-style:preserve-3d] transition-transform duration-1000"
            style={{
              width: `${depth}px`,
              height: `${depth}px`,
              transform: `translateX(-50%)
            scale3d(1,1,1)
            rotateX(${x}deg)
            rotateY(${y}deg)
            rotateZ(${z}deg)`,
            }}
          >
            {this._getFaces("outer")}
          </figure>
          <figure
            className="cube__inner absolute -top-[2px] left-0 inline-block [transform-style:preserve-3d] transition-transform duration-1000"
            style={{
              width: `${depth}px`,
              height: `${depth}px`,
              transform: `translateX(-50%) translateY(2px)
            scale3d(0.5,0.5,0.5)
            rotateX(${-x}deg)
            rotateY(${-y}deg)
            rotateZ(${-z}deg)`,
            }}
          >
            {this._getFaces("inner")}
          </figure>
        </span>
      </div>
    );
  }

  componentDidMount() {
    const { hover, continuous, repeatDelay } = this.props;

    if (hover) {
      this.container.addEventListener("mouseenter", this._spin);
      this.container.addEventListener("mouseleave", this._reset);
    } else if (continuous) {
      let degrees = 0;
      const axis = "y";

      const animation = () => {
        const obj = {};
        obj[axis] = degrees += 90;
        this.setState({
          ...obj,
          iteration: (this.state.iteration + 1) % 4,
        });
        // eslint-disable-next-line no-use-before-define
        tick();
      };

      const tick = () =>
        setTimeout(() => requestAnimationFrame(animation), repeatDelay);

      this._timeout = tick();
    }
  }

  componentWillUnmount() {
    const { hover, continuous } = this.props;

    if (hover) {
      this.container.removeEventListener("mouseenter", this._spin);
      this.container.removeEventListener("mouseleave", this._reset);
    } else if (continuous) {
      clearTimeout(this._timeout);
    }
  }

  /**
   * Get all faces for a cube
   *
   * @param {'inner' | 'outer' } type
   * @return {array} - An array of nodes
   */
  _getFaces(type) {
    const { iteration } = this.state;

    // Keep the thicker border on
    // the outside on each iteration
    const borderWidthMap = {
      0: {
        left: [1, 1, 1, 6],
        right: [6, 1, 1, 1],
        top: [1, 1, 1, 1],
        bottom: [6, 1, 1, 6],
      },
      1: {
        left: [1, 1, 1, 1],
        right: [1, 1, 1, 1],
        top: [1, 1, 1, 1],
        bottom: [1, 1, 1, 1],
      },
      2: {
        left: [1, 1, 6, 6],
        right: [6, 6, 1, 1],
        top: [6, 1, 1, 6],
        bottom: [1, 6, 6, 1],
      },
      3: {
        left: [6, 1, 1, 1],
        right: [1, 6, 1, 1],
        top: [1, 1, 1, 1],
        bottom: [6, 6, 1, 1],
      },
      4: {
        left: [1, 1, 6, 1],
        right: [1, 1, 1, 6],
        top: [1, 1, 1, 1],
        bottom: [1, 1, 6, 6],
      },
      5: {
        left: [1, 6, 1, 1],
        right: [1, 1, 6, 1],
        top: [1, 1, 1, 1],
        bottom: [1, 6, 6, 1],
      },
    };

    // Base classes applied to all faces
    const baseFaceClasses = "absolute w-full h-full border-white";

    // Distinguish styles for inner vs outer faces natively via Tailwind
    const isOuter = type === "outer";
    const variantClasses = isOuter
      ? "border bg-blue-200/50 transition-[border-width] duration-200 delay-200"
      : "border-2 bg-blue-400";

    return [
      "rotateX(0deg)",
      "rotateX(-90deg)",
      "rotateX(90deg)",
      "rotateY(-90deg)",
      "rotateY(90deg)",
      "rotateY(180deg)",
    ].map((rotation, i) => {
      const borderStyles = isOuter
        ? {
            borderTopWidth: borderWidthMap[i].top[iteration],
            borderRightWidth: borderWidthMap[i].right[iteration],
            borderBottomWidth: borderWidthMap[i].bottom[iteration],
            borderLeftWidth: borderWidthMap[i].left[iteration],
          }
        : {};

      return (
        <section
          key={i}
          className={`cube__face ${baseFaceClasses} ${variantClasses}`}
          style={{
            transform: `${rotation} translateZ(${this.props.depth / 2}px)`,
            ...borderStyles,
          }}
        />
      );
    });
  }

  /**
   * Get a random axis
   *
   * @return {string} - A random axis (i.e. x, y, or z)
   */
  _getRandomAxis() {
    const axes = Object.keys(this.state);

    return axes[Math.floor(Math.random() * axes.length)];
  }

  /**
   * Spin the cubes in opposite directions semi-randomly
   *
   * @param {object} e - Native event
   */
  _spin = () => {
    const obj = {};
    const axis = this._getRandomAxis();
    const sign = Math.random() < 0.5 ? -1 : 1;

    obj[axis] = sign * 90;

    this.setState(obj);
  };

  /**
   * Rotate the cubes back to their original position
   *
   * @param {object} e - Native event
   */
  _reset = () => {
    this.setState({
      x: 0,
      y: 0,
      z: 0,
    });
  };
}
