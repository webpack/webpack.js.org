import React from 'react';

export default class VoteSlider extends React.Component {
  constructor(props) {
    super(props);

    // props
    this.color = this.checkProp(props.color, '#e78829');                  // color of the circle
    this.minValue = this.checkProp(props.minValue, -100);                 // minimal value for the number
    this.maxValue = this.checkProp(props.maxValue, 100);                  // maximal value for the number
    this.startValue = this.checkProp(props.startValue, this.minValue);    // maximal value for the number
    this.step = this.checkProp(props.step, 10);                           // amount for one step
    this.radius = this.checkProp(props.radius, 100);                       // radius of the circle
    this.sliderWidth = this.checkProp(props.sliderWidth, 10);             // width of the slider line
    this.buttonRadius = this.checkProp(props.buttonRadius, 10);           // radius of the button on the slider


    // calculations that are used all around the class
    this.canvasWidth = (this.radius * 2) + (this.buttonRadius * 2) + 2;
    this.canvasHeight = this.canvasWidth / 2 + this.buttonRadius;
    this.numSteps = ((Math.abs(this.minValue) + Math.abs(this.maxValue)) / this.step);
    this.isTouch = ("ontouchstart" in document.documentElement);
    this.halfRad = Math.PI * 0.5;
    this.stepRad = Math.PI / this.numSteps;

    // initial state
    this.state = {
      inAction: false,
      buttonTop: 0,
      buttonLeft: 0,
      value: this.startValue,
      rad: this.initValue()
    };
  }

  render() {
    if(this.isTouch) {
      return (
        <canvas width={this.canvasWidth}
                height={this.canvasHeight}
                ref={(ele) => this.element = ele}
                onTouchStart={() => {
                  this.moveStart();
                }}
                onTouchMove={(e) => {
                  this.move(e);
                }}
                onTouchEnd={() => {
                  this.moveEnd();
                }}
                onTouchCancel={() => {
                  this.moveEnd();
                }}
        />
      );
    } else {
      return (
        <canvas width={this.canvasWidth}
                height={this.canvasHeight}
                ref={(ele) => this.element = ele}
                onMouseDown={() => {
                  this.moveStart();
                }}
                onMouseMove={(e) => {
                  this.move(e);
                }}
                onMouseUp={() => {
                  this.moveEnd();
                }}
                onMouseOut={() => {
                  this.moveEnd();
                }}
        />
      );
    }

  }

  /**
   * Basic initialization when component mount
   */
  componentDidMount() {
    this.canvas={
      centerWidth: (this.canvasWidth/2),
      bottomHeight: this.canvasHeight - this.buttonRadius
    };

    var top = -Math.cos(this.state.rad) * this.radius + this.canvas.bottomHeight;
    var left = Math.sin(this.state.rad) * this.radius + this.canvas.centerWidth;

    // button position
    this.setState({
      buttonTop:(top - this.buttonRadius),
      buttonLeft:(left - this.buttonRadius)
    });
  }

  /**
   * Redraw the slider when we update the state
   */
  componentDidUpdate() {
    this.drawSlider();
  }

  /**
   * Get the position of the mouse / finger
   * @param event {Event} Will provide us with a position
   * @returns {{x: number, y: number}} X and Y of the mouse / finger
   */
  position(event) {
    return {
      x: this.isTouch ? event.targetTouches[0].pageX : (event.pageX || event.clientX),
      y: this.isTouch ? event.targetTouches[0].pageY : (event.pageY || event.clientY)
    };
  }

  /**
   * Initial settings when we start with a movement
   */
  moveStart() {
    if(this.state.inAction) {
      return;
    }

    this.setState({
      inAction: true
    });
  }

  /**
   * Moving the button with a mouse / finger
   * @param event {Event} Will provide us with a position
   */
  move(event) {
    if(!this.state.inAction) {
      return;
    }

    var position = this.position(event);
    var left = position.x - this.element.offsetLeft - (this.canvas.centerWidth);
    var top = position.y - this.element.offsetTop - (this.canvas.bottomHeight);
    var deg = this.toDegrees(Math.atan2(left, -top));
    var rad = this.toRadians(deg);

    //check if movement is in right restrictions
    if(this.checkLimit(rad) === false) {
      return;
    }

    left = Math.sin(rad) * this.radius + this.canvas.centerWidth;
    top = -Math.cos(rad) * this.radius + this.canvas.bottomHeight;

    this.setState({
      buttonLeft: (left - this.buttonRadius),
      buttonTop: (top - this.buttonRadius),
      rad: rad,
      value: this.getValue(rad)
    });
  }

  /**
   * Finished with a movement and saving a state
   */
  moveEnd() {
    if(!this.state.inAction) {
      return;
    }

    this.moveToStep();
  }

  /**
   * Move current radiant to the closest step
   */
  moveToStep() {
    var rad = (Math.round((this.state.rad + (this.halfRad)) / this.stepRad) * this.stepRad) - (this.halfRad);
    var left = Math.sin(rad) * this.radius + this.canvas.centerWidth;
    var top = -Math.cos(rad) * this.radius + this.canvas.bottomHeight;
    var value = this.getValue(rad);

    this.setState({
      buttonLeft: (left - this.buttonRadius),
      buttonTop: (top - this.buttonRadius),
      inAction: false,
      rad: rad,
      value: value
    });

    this.props.valueChanged(parseInt(value));
  }

  /**
   * Draw the slider
   */
  drawSlider() {
    var context = this.element.getContext('2d');
    var top = null;
    var left = null;
    var tempRad = null;
    var stepsNum = this.numSteps + 1;

    context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // basic track
    context.beginPath();
    context.arc(this.canvas.centerWidth, this.canvas.bottomHeight, this.radius, Math.PI, 2*Math.PI);
    context.strokeStyle='rgb(202,203,204)';
    context.lineWidth = this.sliderWidth;
    context.stroke();
    context.closePath();

    // steps
    for (var j = 0; j < stepsNum; j++) {
      context.beginPath();
      context.globalAlpha = 1;
      tempRad = this.stepRad * j - this.halfRad;

      left =Math.sin(tempRad) * (this.radius + (this.sliderWidth / 2)) + this.canvas.centerWidth;
      top = -Math.cos(tempRad) * (this.radius + (this.sliderWidth / 2)) + this.canvas.bottomHeight;
      context.moveTo(left, top);

      left =Math.sin(tempRad) * (this.radius - (this.sliderWidth / 2)) + this.canvas.centerWidth;
      top = -Math.cos(tempRad) * (this.radius - (this.sliderWidth / 2)) + this.canvas.bottomHeight;
      context.lineTo(left, top);

      context.lineWidth = 2;
      context.strokeStyle = '#FFF';
      context.stroke();
      context.closePath();
    }

    // slider line
    context.beginPath();
    context.globalAlpha = 0.6;
    context.arc(this.canvas.centerWidth, this.canvas.bottomHeight, this.radius, Math.PI, (this.state.rad + Math.PI*1.5));
    context.strokeStyle = this.color;
    context.lineWidth = this.sliderWidth;
    context.stroke();
    context.closePath();

    // button on slider line
    context.beginPath();
    context.globalAlpha = 1;
    context.arc((this.state.buttonLeft + this.buttonRadius), (this.state.buttonTop + this.buttonRadius), this.buttonRadius, 0, 2*Math.PI);
    context.fillStyle = '#eeefef';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#c3c3c3';
    context.stroke();
    context.closePath();

    // current value
    context.beginPath();
    context.font = "20px Cabin";
    context.fillStyle = "#535353";
    context.textAlign = "center";
    context.fillText(this.state.value, this.canvas.centerWidth, this.canvas.bottomHeight);
    context.closePath();
  }

  /**
   * Get the real value from the current radians on the slider
   * @param rad {number} Current radians on the slider
   * @returns {number} Current real value on the slider
   */
  getValue(rad) {
    var newRad = rad + this.halfRad;

    return (this.minValue + ((newRad / this.stepRad) * this.step)).toFixed(0);
  }

  /**
   * Check if the given radiant is between the min and max limit
   * @param rad {number} Radiant
   * @returns {boolean} If inside the limit or not
   */
  checkLimit(rad) {
    return !(rad < -this.halfRad || rad > this.halfRad);
  }

  /**
   * Convert start value to radians on the slider
   * @returns {number} Initial value in radians
   */
  initValue() {
    var normalized = this.startValue + Math.abs(this.minValue);
    var rad = this.stepRad * (normalized / this.step);

    return rad - this.halfRad;
  }

  /**
   * Convert degrees to radians
   * @param degrees {number} Degree amount that we want to convert
   * @returns {number} Converted radians
   */
  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  /**
   * Convert radians to degrees
   * @param radians {number} Radian amount that we want to convert
   * @returns {number} Converted degrees
   */
  toDegrees(radians) {
    return radians * 180 / Math.PI;
  }

  /**
   * Check if property exist
   * @param prop {*} Given property
   * @param value {*} Default value
   * @returns {*} If property exists we return given property, otherwise we return default value
   */
  checkProp(prop, value) {
    if(prop === undefined) {
      return value;
    }

    return prop;
  }
}