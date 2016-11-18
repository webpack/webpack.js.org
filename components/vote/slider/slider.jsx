import React from 'react';

export default class VoteSlider extends React.Component {
  constructor(props) {
    super(props);

    this.precalculate(props);

     // initial state
    this.state = {
      inAction: false,
      value: props.value
    };
  }

  precalculate(props) {
        // props
    this.color = this.checkProp(props.color, '#e78829');                  // color of the circle
    this.minValue = this.checkProp(props.minValue, -100);                 // minimal value for the number
    this.maxValue = this.checkProp(props.maxValue, 100);                  // maximal value for the number
    this.visibleMaxValue = this.checkProp(props.visibleMaxValue, this.maxValue);    // maximal value for the number
    this.step = this.checkProp(props.step, 10);                           // amount for one step
    this.radius = this.checkProp(props.radius, 100);                      // radius of the circle
    this.sliderWidth = this.checkProp(props.sliderWidth, 10);             // width of the slider line
    this.buttonRadius = this.checkProp(props.buttonRadius, 10);           // radius of the button on the slider

    // calculations that are used all around the class
    this.canvasWidth = (this.radius * 2) + (this.buttonRadius * 2) + 2;
    this.canvasHeight = this.canvasWidth / 2 + this.buttonRadius;
    this.numSteps = ((Math.abs(this.minValue) + Math.abs(this.maxValue)) / this.step);
    this.visibleNumSteps = ((Math.abs(this.minValue) + Math.abs(this.visibleMaxValue)) / this.step);
    this.isTouch = ("ontouchstart" in document.documentElement);
    this.halfRad = Math.PI * 0.5;
    this.stepRad = Math.PI / this.visibleNumSteps;
    this.zeroRad = this.getRad(Math.max(0, this.minValue));

    this.canvas = {
      centerWidth: (this.canvasWidth/2),
      bottomHeight: this.canvasHeight - this.buttonRadius
    };
  }

  componentWillReceiveProps(props) {
    this.precalculate(props);

    this.setState({
      value: props.value
    });
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
                onClick={(e) => {
                  this.click(e);
                }}
        />
      );
    }

  }

  /**
   * Basic initialization when component mount
   */
  componentDidMount() {
    if(this.isTouch) {
      document.body.addEventListener('touchend', () => {
        this.moveEnd();
      });
    } else {
      document.body.addEventListener('mouseup', () => {
        this.moveEnd();
      });
    }
    this.drawSlider();
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

    const position = this.position(event);
    let left = position.x - this.element.offsetLeft - (this.canvas.centerWidth);
    let top = position.y - this.element.offsetTop - (this.canvas.bottomHeight);
    const deg = this.toDegrees(Math.atan2(left, -top));
    const rad = this.toRadians(deg);

    this.setState({
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

    this.finishAction();
  }

  click(event) {
    const position = this.position(event);
    let left = position.x - this.element.offsetLeft - (this.canvas.centerWidth);
    let top = position.y - this.element.offsetTop - (this.canvas.bottomHeight);
    const deg = this.toDegrees(Math.atan2(left, -top));
    const rad = this.toRadians(deg);

    this.finishAction(this.getValue(rad));
  }

  /**
   * Move current radiant to the closest step
   */
  finishAction(value = this.state.value) {
    this.setState({
      inAction: false,
      value: value
    });

    this.props.valueChanged(value);
  }

  /**
   * Draw the slider
   */
  drawSlider() {
    const context = this.element.getContext('2d');

    context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // basic track
    context.beginPath();
    context.arc(this.canvas.centerWidth, this.canvas.bottomHeight, this.radius, 1.5 * Math.PI - this.halfRad, 1.5 * Math.PI + this.halfRad);
    context.strokeStyle='rgb(202,203,204)';
    context.lineWidth = this.sliderWidth;
    context.stroke();
    context.closePath();

    // steps
    for (var j = 0; j < this.numSteps + 1; j++) {
      context.beginPath();
      context.globalAlpha = 1;
      let tempRad = this.stepRad * Math.min(j, this.numSteps) - this.halfRad;
      let left = Math.sin(tempRad) * (this.radius + (this.sliderWidth / 2)) + this.canvas.centerWidth;
      let top = -Math.cos(tempRad) * (this.radius + (this.sliderWidth / 2)) + this.canvas.bottomHeight;
      context.moveTo(left, top);

      left = Math.sin(tempRad) * (this.radius - (this.sliderWidth / 2)) + this.canvas.centerWidth;
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
    let rad = this.getRad();
    if(rad > this.zeroRad)
      context.arc(this.canvas.centerWidth, this.canvas.bottomHeight, this.radius, 1.5 * Math.PI + this.zeroRad, 1.5 * Math.PI + rad);
    else
      context.arc(this.canvas.centerWidth, this.canvas.bottomHeight, this.radius, 1.5 * Math.PI + rad, 1.5 * Math.PI + this.zeroRad);
    context.strokeStyle = this.color;
    context.lineWidth = this.sliderWidth;
    context.stroke();
    context.closePath();

    // button on slider line
    let buttonPos = this.getButtonPos();
    context.beginPath();
    context.globalAlpha = 1;
    context.arc((buttonPos.left + this.buttonRadius), (buttonPos.top + this.buttonRadius), this.buttonRadius, 0, 2*Math.PI);
    context.fillStyle = '#eeefef';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#c3c3c3';
    context.stroke();
    context.closePath();
  }

  getButtonPos(rad = this.getRad()) {
    const top = -Math.cos(rad) * this.radius + this.canvas.bottomHeight;
    const left = Math.sin(rad) * this.radius + this.canvas.centerWidth;

    // button position
    return {
      top: top - this.buttonRadius,
      left: left - this.buttonRadius
    };
  }

  /**
   * Get the real value from the current radians on the slider
   * @param rad {number} Current radians on the slider
   * @returns {number} Current real value on the slider
   */
  getValue(rad) {
    const newRad = rad + this.halfRad;

    const newValue = Math.round(this.minValue + ((newRad / this.stepRad) * this.step));

    if(newValue >= this.maxValue) return this.maxValue;
    if(newValue <= this.minValue) return this.minValue;

    return Math.round(newValue / this.step) * this.step;
  }

  /**
   * Get the current radians on the slider from the real value
   * @param rad {number} Current real value on the slider
   * @returns {number} Current radians on the slider
   */
  getRad(value = this.state.value) {
    return (value - this.minValue) / this.step * this.stepRad - this.halfRad;
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
    const normalized = this.startValue + Math.abs(this.minValue);
    const rad = this.stepRad * (normalized / this.step);

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
    return (prop === undefined) ? value : prop;
  }
}