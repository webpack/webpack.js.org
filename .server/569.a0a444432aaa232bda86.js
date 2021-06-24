exports.id = 569;
exports.ids = [569];
exports.modules = {

/***/ 1581:
/***/ (() => {



/***/ }),

/***/ 9603:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/***/ }),

/***/ 120:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ _objectWithoutPropertiesLoose)
/* harmony export */ });
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

/***/ }),

/***/ 3941:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "if": () => (/* binding */ AnimatedArray),
/* harmony export */   "rS": () => (/* binding */ AnimatedObject),
/* harmony export */   "eC": () => (/* binding */ AnimatedString),
/* harmony export */   "iG": () => (/* binding */ AnimatedValue),
/* harmony export */   "Ld": () => (/* binding */ createHost),
/* harmony export */   "ys": () => (/* binding */ getAnimated),
/* harmony export */   "He": () => (/* binding */ getPayload),
/* harmony export */   "f3": () => (/* binding */ setAnimated)
/* harmony export */ });
/* unused harmony exports Animated, AnimatedProps, isAnimated */
/* harmony import */ var _react_spring_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5254);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9603);
/* harmony import */ var _react_spring_shared_globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7011);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7378);
/* harmony import */ var react_layout_effect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3149);






const $node = Symbol.for('Animated:node');
const isAnimated = value => !!value && value[$node] === value;
/** Get the owner's `Animated` node. */

const getAnimated = owner => owner && owner[$node];
/** Set the owner's `Animated` node. */

const setAnimated = (owner, node) => (0,_react_spring_shared__WEBPACK_IMPORTED_MODULE_0__.defineHidden)(owner, $node, node);
/** Get every `AnimatedValue` in the owner's `Animated` node. */

const getPayload = owner => owner && owner[$node] && owner[$node].getPayload();
class Animated {
  /** The cache of animated values */
  constructor() {
    this.payload = void 0;
    // This makes "isAnimated" return true.
    setAnimated(this, this);
  }
  /** Get the current value. Pass `true` for only animated values. */


  /** Get every `AnimatedValue` used by this node. */
  getPayload() {
    return this.payload || [];
  }

}

/** An animated number or a native attribute value */

class AnimatedValue extends Animated {
  constructor(_value) {
    super();
    this._value = _value;
    this.done = true;
    this.elapsedTime = void 0;
    this.lastPosition = void 0;
    this.lastVelocity = void 0;
    this.v0 = void 0;

    if (_react_spring_shared__WEBPACK_IMPORTED_MODULE_0__.is.num(this._value)) {
      this.lastPosition = this._value;
    }
  }

  static create(from, _to) {
    return new AnimatedValue(from);
  }

  getPayload() {
    return [this];
  }

  getValue() {
    return this._value;
  }
  /**
   * Set the current value and optionally round it.
   *
   * The `step` argument does nothing whenever it equals `undefined` or `0`.
   * It works with fractions and whole numbers. The best use case is (probably)
   * rounding to the pixel grid with a step of:
   *
   *      1 / window.devicePixelRatio
   */


  setValue(value, step) {
    if (_react_spring_shared__WEBPACK_IMPORTED_MODULE_0__.is.num(value)) {
      this.lastPosition = value;

      if (step) {
        value = Math.round(value / step) * step;

        if (this.done) {
          this.lastPosition = value;
        }
      }
    }

    if (this._value === value) {
      return false;
    }

    this._value = value;
    return true;
  }

  reset() {
    const {
      done
    } = this;
    this.done = false;

    if (_react_spring_shared__WEBPACK_IMPORTED_MODULE_0__.is.num(this._value)) {
      this.elapsedTime = 0;
      this.lastPosition = this._value;
      if (done) this.lastVelocity = null;
      this.v0 = null;
    }
  }

}

class AnimatedString extends AnimatedValue {
  constructor(from, to) {
    super(0);
    this._value = void 0;
    this._string = null;
    this._toString = void 0;
    this._toString = (0,_react_spring_shared__WEBPACK_IMPORTED_MODULE_0__.createInterpolator)({
      output: [from, to]
    });
  }

  static create(from, to = from) {
    if (_react_spring_shared__WEBPACK_IMPORTED_MODULE_0__.is.str(from) && _react_spring_shared__WEBPACK_IMPORTED_MODULE_0__.is.str(to)) {
      return new AnimatedString(from, to);
    }

    throw TypeError('Expected "from" and "to" to be strings');
  }

  getValue() {
    let value = this._string;
    return value == null ? this._string = this._toString(this._value) : value;
  }

  setValue(value) {
    if (!_react_spring_shared__WEBPACK_IMPORTED_MODULE_0__.is.num(value)) {
      this._string = value;
      this._value = 1;
    } else if (super.setValue(value)) {
      this._string = null;
    } else {
      return false;
    }

    return true;
  }

  reset(goal) {
    if (goal) {
      this._toString = (0,_react_spring_shared__WEBPACK_IMPORTED_MODULE_0__.createInterpolator)({
        output: [this.getValue(), goal]
      });
    }

    this._value = 0;
    super.reset();
  }

}

const TreeContext = {
  current: null
};

/** An object containing `Animated` nodes */
class AnimatedObject extends Animated {
  constructor(source = null) {
    super();
    this.source = void 0;
    this.setValue(source);
  }

  getValue(animated) {
    if (!this.source) return null;
    const values = {};
    (0,_react_spring_shared__WEBPACK_IMPORTED_MODULE_0__.each)(this.source, (source, key) => {
      if (isAnimated(source)) {
        values[key] = source.getValue(animated);
      } else {
        const config = (0,_react_spring_shared__WEBPACK_IMPORTED_MODULE_0__.getFluidConfig)(source);

        if (config) {
          values[key] = config.get();
        } else if (!animated) {
          values[key] = source;
        }
      }
    });
    return values;
  }
  /** Replace the raw object data */


  setValue(source) {
    this.source = source;
    this.payload = this._makePayload(source);
  }

  reset() {
    if (this.payload) {
      (0,_react_spring_shared__WEBPACK_IMPORTED_MODULE_0__.each)(this.payload, node => node.reset());
    }
  }
  /** Create a payload set. */


  _makePayload(source) {
    if (source) {
      const payload = new Set();
      (0,_react_spring_shared__WEBPACK_IMPORTED_MODULE_0__.each)(source, this._addToPayload, payload);
      return Array.from(payload);
    }
  }
  /** Add to a payload set. */


  _addToPayload(source) {
    const config = (0,_react_spring_shared__WEBPACK_IMPORTED_MODULE_0__.getFluidConfig)(source);

    if (config && TreeContext.current) {
      TreeContext.current.dependencies.add(source);
    }

    const payload = getPayload(source);

    if (payload) {
      (0,_react_spring_shared__WEBPACK_IMPORTED_MODULE_0__.each)(payload, node => this.add(node));
    }
  }

}

/** An array of animated nodes */
class AnimatedArray extends AnimatedObject {
  constructor(from, to) {
    super(null);
    this.source = void 0;
    super.setValue(this._makeAnimated(from, to));
  }

  static create(from, to) {
    return new AnimatedArray(from, to);
  }

  getValue() {
    return this.source.map(node => node.getValue());
  }

  setValue(newValue) {
    const payload = this.getPayload(); // Reuse the payload when lengths are equal.

    if (newValue && newValue.length == payload.length) {
      (0,_react_spring_shared__WEBPACK_IMPORTED_MODULE_0__.each)(payload, (node, i) => node.setValue(newValue[i]));
    } else {
      // Remake the payload when length changes.
      this.source = this._makeAnimated(newValue);
      this.payload = this._makePayload(this.source);
    }
  }
  /** Convert the `from` and `to` values to an array of `Animated` nodes */


  _makeAnimated(from, to = from) {
    return from ? from.map((from, i) => ((0,_react_spring_shared__WEBPACK_IMPORTED_MODULE_0__.isAnimatedString)(from) ? AnimatedString : AnimatedValue).create(from, to[i])) : [];
  }

}

class AnimatedProps extends AnimatedObject {
  /** Equals true when an update is scheduled for "end of frame" */
  constructor(update) {
    super(null);
    this.update = update;
    this.dirty = false;
  }

  setValue(props, context) {
    if (!props) return; // The constructor passes null.

    if (context) {
      TreeContext.current = context;

      if (props.style) {
        const {
          createAnimatedStyle
        } = context.host;
        props = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_4__/* .default */ .Z)((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_4__/* .default */ .Z)({}, props), {}, {
          style: createAnimatedStyle(props.style)
        });
      }
    }

    super.setValue(props);
    TreeContext.current = null;
  }
  /** @internal */


  onParentChange({
    type
  }) {
    if (!this.dirty && type === 'change') {
      this.dirty = true;
      _react_spring_shared_globals__WEBPACK_IMPORTED_MODULE_1__.frameLoop.onFrame(() => {
        this.dirty = false;
        this.update();
      });
    }
  }

}

const withAnimated = (Component, host) => (0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)((rawProps, ref) => {
  const instanceRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  const hasInstance = // Function components must use "forwardRef" to avoid being
  // re-rendered on every animation frame.
  !_react_spring_shared__WEBPACK_IMPORTED_MODULE_0__.is.fun(Component) || Component.prototype && Component.prototype.isReactComponent;
  const forceUpdate = (0,_react_spring_shared__WEBPACK_IMPORTED_MODULE_0__.useForceUpdate)();
  const props = new AnimatedProps(() => {
    const instance = instanceRef.current;

    if (hasInstance && !instance) {
      return; // The wrapped component forgot to forward its ref.
    }

    const didUpdate = instance ? host.applyAnimatedValues(instance, props.getValue(true)) : false; // Re-render the component when native updates fail.

    if (didUpdate === false) {
      forceUpdate();
    }
  });
  const dependencies = new Set();
  props.setValue(rawProps, {
    dependencies,
    host
  });
  (0,react_layout_effect__WEBPACK_IMPORTED_MODULE_3__/* .useLayoutEffect */ .b)(() => {
    (0,_react_spring_shared__WEBPACK_IMPORTED_MODULE_0__.each)(dependencies, dep => dep.addChild(props));
    return () => (0,_react_spring_shared__WEBPACK_IMPORTED_MODULE_0__.each)(dependencies, dep => dep.removeChild(props));
  });
  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(Component, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_4__/* .default */ .Z)({}, host.getComponentProps(props.getValue()), {
    ref: hasInstance && (value => {
      instanceRef.current = updateRef(ref, value);
    })
  }));
});

function updateRef(ref, value) {
  if (ref) {
    if (_react_spring_shared__WEBPACK_IMPORTED_MODULE_0__.is.fun(ref)) ref(value);else ref.current = value;
  }

  return value;
}

// For storing the animated version on the original component
const cacheKey = Symbol.for('AnimatedComponent');
const createHost = (components, {
  applyAnimatedValues = () => false,
  createAnimatedStyle = style => new AnimatedObject(style),
  getComponentProps = props => props
} = {}) => {
  const hostConfig = {
    applyAnimatedValues,
    createAnimatedStyle,
    getComponentProps
  };

  const animated = Component => {
    const displayName = getDisplayName(Component) || 'Anonymous';

    if (_react_spring_shared__WEBPACK_IMPORTED_MODULE_0__.is.str(Component)) {
      Component = withAnimated(Component, hostConfig);
    } else {
      Component = Component[cacheKey] || (Component[cacheKey] = withAnimated(Component, hostConfig));
    }

    Component.displayName = "Animated(" + displayName + ")";
    return Component;
  };

  (0,_react_spring_shared__WEBPACK_IMPORTED_MODULE_0__.each)(components, (Component, key) => {
    if (!_react_spring_shared__WEBPACK_IMPORTED_MODULE_0__.is.str(key)) {
      key = getDisplayName(Component);
    }

    animated[key] = animated(Component);
  });
  return {
    animated
  };
};

const getDisplayName = arg => _react_spring_shared__WEBPACK_IMPORTED_MODULE_0__.is.str(arg) ? arg : arg && _react_spring_shared__WEBPACK_IMPORTED_MODULE_0__.is.str(arg.displayName) ? arg.displayName : _react_spring_shared__WEBPACK_IMPORTED_MODULE_0__.is.fun(arg) && arg.name || null;


//# sourceMappingURL=index.js.map


/***/ }),

/***/ 962:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "OH": () => (/* reexport */ esm/* Globals */.O),
  "vc": () => (/* binding */ config),
  "Yz": () => (/* binding */ useTransition)
});

// UNUSED EXPORTS: BailSignal, Controller, FrameLoop, FrameValue, Interpolation, Spring, SpringContext, SpringHandle, SpringValue, Trail, Transition, createInterpolator, inferTo, interpolate, to, update, useChain, useSpring, useSprings, useTrail

// EXTERNAL MODULE: ../node_modules/react-layout-effect/dist/esm/useLayoutEffect.js
var esm_useLayoutEffect = __webpack_require__(3149);
// EXTERNAL MODULE: ../node_modules/@react-spring/shared/esm/index.js + 2 modules
var esm = __webpack_require__(5254);
// EXTERNAL MODULE: ../node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(9603);
// EXTERNAL MODULE: ../node_modules/react/index.js
var react = __webpack_require__(7378);
// EXTERNAL MODULE: ../node_modules/@react-spring/animated/index.js
var animated = __webpack_require__(3941);
// EXTERNAL MODULE: ../node_modules/@react-spring/shared/esm/globals.js
var globals = __webpack_require__(7011);
;// CONCATENATED MODULE: ../node_modules/use-memo-one/dist/use-memo-one.esm.js


function areInputsEqual(newInputs, lastInputs) {
  if (newInputs.length !== lastInputs.length) {
    return false;
  }

  for (var i = 0; i < newInputs.length; i++) {
    if (newInputs[i] !== lastInputs[i]) {
      return false;
    }
  }

  return true;
}

function useMemoOne(getResult, inputs) {
  var initial = (0,react.useState)(function () {
    return {
      inputs: inputs,
      result: getResult()
    };
  })[0];
  var committed = (0,react.useRef)(initial);
  var isInputMatch = Boolean(inputs && committed.current.inputs && areInputsEqual(inputs, committed.current.inputs));
  var cache = isInputMatch ? committed.current : {
    inputs: inputs,
    result: getResult()
  };
  (0,react.useEffect)(function () {
    committed.current = cache;
  }, [cache]);
  return cache.result;
}
function use_memo_one_esm_useCallbackOne(callback, inputs) {
  return useMemoOne(function () {
    return callback;
  }, inputs);
}
var useMemo = (/* unused pure expression or super */ null && (useMemoOne));
var useCallback = (/* unused pure expression or super */ null && (use_memo_one_esm_useCallbackOne));



;// CONCATENATED MODULE: ../node_modules/@react-spring/shared/esm/deprecations.js
var prefix = 'react-spring: ';
var flagInterpolate = false;
function deprecations_deprecateInterpolate() {
    if (!flagInterpolate) {
        flagInterpolate = true;
        console.warn(prefix +
            'The "interpolate" function is deprecated in v10 (use "to" instead)');
    }
}
//# sourceMappingURL=deprecations.js.map
// EXTERNAL MODULE: ../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
var objectWithoutPropertiesLoose = __webpack_require__(120);
// EXTERNAL MODULE: ../node_modules/@react-spring/shared/esm/stringInterpolation.js + 4 modules
var stringInterpolation = __webpack_require__(2183);
// EXTERNAL MODULE: ../node_modules/@react-spring/shared/esm/types.js
var types = __webpack_require__(4681);
;// CONCATENATED MODULE: ../node_modules/@react-spring/core/index.js













/** API
 *  useChain(references, timeSteps, timeFrame)
 */

function useChain(refs, timeSteps, timeFrame = 1000) {
  useLayoutEffect(() => {
    if (timeSteps) {
      let prevDelay = 0;
      each(refs, (ref, i) => {
        if (!ref.current) return;
        const {
          controllers
        } = ref.current;

        if (controllers.length) {
          let delay = timeFrame * timeSteps[i]; // Use the previous delay if none exists.

          if (isNaN(delay)) delay = prevDelay;else prevDelay = delay;
          each(controllers, ctrl => {
            each(ctrl.queue, props => {
              props.delay = delay + (props.delay || 0);
            });
            ctrl.start();
          });
        }
      });
    } else {
      let p = Promise.resolve();
      each(refs, ref => {
        const {
          controllers,
          start
        } = ref.current || {};

        if (controllers && controllers.length) {
          // Take the queue of each controller
          const updates = controllers.map(ctrl => {
            const q = ctrl.queue;
            ctrl.queue = [];
            return q;
          }); // Apply the queue when the previous ref stops animating

          p = p.then(() => {
            each(controllers, (ctrl, i) => ctrl.queue.push(...updates[i]));
            return start();
          });
        }
      });
    }
  });
}

// The `mass` prop defaults to 1
const config = {
  default: {
    tension: 170,
    friction: 26
  },
  gentle: {
    tension: 120,
    friction: 14
  },
  wobbly: {
    tension: 180,
    friction: 12
  },
  stiff: {
    tension: 210,
    friction: 20
  },
  slow: {
    tension: 280,
    friction: 60
  },
  molasses: {
    tension: 280,
    friction: 120
  }
};

const linear = t => t;

const defaults = (0,esm_extends/* default */.Z)((0,esm_extends/* default */.Z)({}, config.default), {}, {
  mass: 1,
  damping: 1,
  easing: linear,
  clamp: false
});

class AnimationConfig {
  /**
   * With higher tension, the spring will resist bouncing and try harder to stop at its end value.
   *
   * When tension is zero, no animation occurs.
   */

  /**
   * The damping ratio coefficient, or just the damping ratio when `speed` is defined.
   *
   * When `speed` is defined, this value should be between 0 and 1.
   *
   * Higher friction means the spring will slow down faster.
   */

  /**
   * The natural frequency (in seconds), which dictates the number of bounces
   * per second when no damping exists.
   *
   * When defined, `tension` is derived from this, and `friction` is derived
   * from `tension` and `damping`.
   */

  /**
   * The damping ratio, which dictates how the spring slows down.
   *
   * Set to `0` to never slow down. Set to `1` to slow down without bouncing.
   * Between `0` and `1` is for you to explore.
   *
   * Only works when `frequency` is defined.
   *
   * Defaults to 1
   */

  /**
   * Higher mass means more friction is required to slow down.
   *
   * Defaults to 1, which works fine most of the time.
   */

  /**
   * The initial velocity of one or more values.
   */

  /**
   * The smallest velocity before the animation is considered "not moving".
   *
   * When undefined, `precision` is used instead.
   */

  /**
   * The smallest distance from a value before that distance is essentially zero.
   *
   * This helps in deciding when a spring is "at rest". The spring must be within
   * this distance from its final value, and its velocity must be lower than this
   * value too (unless `restVelocity` is defined).
   */

  /**
   * For `duration` animations only. Note: The `duration` is not affected
   * by this property.
   *
   * Defaults to `0`, which means "start from the beginning".
   *
   * Setting to `1+` makes an immediate animation.
   *
   * Setting to `0.5` means "start from the middle of the easing function".
   *
   * Any number `>= 0` and `<= 1` makes sense here.
   */

  /**
   * Animation length in number of milliseconds.
   */

  /**
   * The animation curve. Only used when `duration` is defined.
   *
   * Defaults to quadratic ease-in-out.
   */

  /**
   * Avoid overshooting by ending abruptly at the goal value.
   */

  /**
   * When above zero, the spring will bounce instead of overshooting when
   * exceeding its goal value. Its velocity is multiplied by `-1 + bounce`
   * whenever its current value equals or exceeds its goal. For example,
   * setting `bounce` to `0.5` chops the velocity in half on each bounce,
   * in addition to any friction.
   */

  /**
   * "Decay animations" decelerate without an explicit goal value.
   * Useful for scrolling animations.
   *
   * Use `true` for the default exponential decay factor (`0.998`).
   *
   * When a `number` between `0` and `1` is given, a lower number makes the
   * animation slow down faster. And setting to `1` would make an unending
   * animation.
   */

  /**
   * While animating, round to the nearest multiple of this number.
   * The `from` and `to` values are never rounded, as well as any value
   * passed to the `set` method of an animated value.
   */
  constructor() {
    this.tension = void 0;
    this.friction = void 0;
    this.frequency = void 0;
    this.damping = void 0;
    this.mass = void 0;
    this.velocity = 0;
    this.restVelocity = void 0;
    this.precision = void 0;
    this.progress = void 0;
    this.duration = void 0;
    this.easing = void 0;
    this.clamp = void 0;
    this.bounce = void 0;
    this.decay = void 0;
    this.round = void 0;
    Object.assign(this, defaults);
  }

}
function mergeConfig(config, newConfig, defaultConfig) {
  if (defaultConfig) {
    defaultConfig = (0,esm_extends/* default */.Z)({}, defaultConfig);
    sanitizeConfig(defaultConfig, newConfig);
    newConfig = (0,esm_extends/* default */.Z)((0,esm_extends/* default */.Z)({}, defaultConfig), newConfig);
  }

  sanitizeConfig(config, newConfig);
  Object.assign(config, newConfig);

  for (const key in defaults) {
    if (config[key] == null) {
      config[key] = defaults[key];
    }
  }

  let {
    mass,
    frequency,
    damping
  } = config;

  if (!esm.is.und(frequency)) {
    if (frequency < 0.01) frequency = 0.01;
    if (damping < 0) damping = 0;
    config.tension = Math.pow(2 * Math.PI / frequency, 2) * mass;
    config.friction = 4 * Math.PI * damping * mass / frequency;
  }

  return config;
} // Prevent a config from accidentally overriding new props.
// This depends on which "config" props take precedence when defined.

function sanitizeConfig(config, props) {
  if (!esm.is.und(props.decay)) {
    config.duration = undefined;
  } else {
    const isTensionConfig = !esm.is.und(props.tension) || !esm.is.und(props.friction);

    if (isTensionConfig || !esm.is.und(props.frequency) || !esm.is.und(props.damping) || !esm.is.und(props.mass)) {
      config.duration = undefined;
      config.decay = undefined;
    }

    if (isTensionConfig) {
      config.frequency = undefined;
    }
  }
}

const emptyArray = [];
/** @internal */

/** An animation being executed by the frameloop */
class Animation {
  constructor() {
    this.changed = false;
    this.values = emptyArray;
    this.toValues = null;
    this.fromValues = emptyArray;
    this.to = void 0;
    this.from = void 0;
    this.config = new AnimationConfig();
    this.immediate = false;
    this.onStart = void 0;
    this.onChange = void 0;
    this.onRest = [];
  }

}

// @see https://github.com/alexreardon/use-memo-one/pull/10
const core_useMemo = (create, deps) => useMemoOne(create, deps || [{}]);
function callProp(value, ...args) {
  return esm.is.fun(value) ? value(...args) : value;
}
/** Try to coerce the given value into a boolean using the given key */

const matchProp = (value, key) => value === true || !!(key && value && (esm.is.fun(value) ? value(key) : (0,esm.toArray)(value).includes(key)));
const getProps = (props, i, arg) => props && (esm.is.fun(props) ? props(i, arg) : esm.is.arr(props) ? props[i] : (0,esm_extends/* default */.Z)({}, props));
/** Returns `true` if the given prop is having its default value set. */

const hasDefaultProp = (props, key) => !esm.is.und(getDefaultProp(props, key));
/** Get the default value being set for the given `key` */

const getDefaultProp = (props, key) => props.default === true ? props[key] : props.default ? props.default[key] : undefined;
/**
 * Extract the default props from an update.
 *
 * When the `default` prop is falsy, this function still behaves as if
 * `default: true` was used. The `default` prop is always respected when
 * truthy.
 */

const getDefaultProps = (props, omitKeys = [], defaults = {}) => {
  let keys = DEFAULT_PROPS;

  if (props.default && props.default !== true) {
    props = props.default;
    keys = Object.keys(props);
  }

  for (const key of keys) {
    const value = props[key];

    if (!esm.is.und(value) && !omitKeys.includes(key)) {
      defaults[key] = value;
    }
  }

  return defaults;
};
/** Merge the default props of an update into a props cache. */

const mergeDefaultProps = (defaults, props, omitKeys) => getDefaultProps(props, omitKeys, defaults);
/** These props can have default values */

const DEFAULT_PROPS = ['pause', 'cancel', 'config', 'immediate', 'onDelayEnd', 'onProps', 'onStart', 'onChange', 'onRest'];
const RESERVED_PROPS = {
  config: 1,
  from: 1,
  to: 1,
  ref: 1,
  loop: 1,
  reset: 1,
  pause: 1,
  cancel: 1,
  reverse: 1,
  immediate: 1,
  default: 1,
  delay: 1,
  onDelayEnd: 1,
  onProps: 1,
  onStart: 1,
  onChange: 1,
  onRest: 1,
  // Transition props
  items: 1,
  trail: 1,
  sort: 1,
  expires: 1,
  initial: 1,
  enter: 1,
  update: 1,
  leave: 1,
  children: 1,
  // Internal props
  keys: 1,
  callId: 1,
  parentId: 1
};
/**
 * Extract any properties whose keys are *not* reserved for customizing your
 * animations. All hooks use this function, which means `useTransition` props
 * are reserved for `useSpring` calls, etc.
 */

function getForwardProps(props) {
  const forward = {};
  let count = 0;
  (0,esm.each)(props, (value, prop) => {
    if (!RESERVED_PROPS[prop]) {
      forward[prop] = value;
      count++;
    }
  });

  if (count) {
    return forward;
  }
}
/**
 * Clone the given `props` and move all non-reserved props
 * into the `to` prop.
 */


function inferTo(props) {
  const to = getForwardProps(props);

  if (to) {
    const out = {
      to
    };
    (0,esm.each)(props, (val, key) => key in to || (out[key] = val));
    return out;
  }

  return (0,esm_extends/* default */.Z)({}, props);
} // Compute the goal value, converting "red" to "rgba(255, 0, 0, 1)" in the process

function computeGoal(value) {
  const config = (0,esm.getFluidConfig)(value);
  return config ? computeGoal(config.get()) : esm.is.arr(value) ? value.map(computeGoal) : (0,esm.isAnimatedString)(value) ? (0,globals.createStringInterpolator)({
    range: [0, 1],
    output: [value, value]
  })(1) : value;
}

/**
 * This function sets a timeout if both the `delay` prop exists and
 * the `cancel` prop is not `true`.
 *
 * The `actions.start` function must handle the `cancel` prop itself,
 * but the `pause` prop is taken care of.
 */
function scheduleProps(callId, {
  key,
  props,
  state,
  actions
}) {
  return new Promise((resolve, reject) => {
    let delay;
    let timeout;
    let pause = false;
    let cancel = matchProp(props.cancel, key);

    if (cancel) {
      onStart();
    } else {
      delay = callProp(props.delay || 0, key);
      pause = matchProp(props.pause, key);

      if (pause) {
        state.resumeQueue.add(onResume);
        actions.pause();
      } else {
        actions.resume();
        onResume();
      }
    }

    function onPause() {
      state.resumeQueue.add(onResume);
      timeout.cancel(); // Cache the remaining delay.

      delay = timeout.time - esm/* Globals.now */.O.now();
    }

    function onResume() {
      if (delay > 0) {
        state.pauseQueue.add(onPause);
        timeout = esm/* Globals.frameLoop.setTimeout */.O.frameLoop.setTimeout(onStart, delay);
      } else {
        onStart();
      }
    }

    function onStart() {
      state.pauseQueue.delete(onPause); // Maybe cancelled during its delay.

      if (callId <= (state.cancelId || 0)) {
        cancel = true;
      }

      try {
        actions.start((0,esm_extends/* default */.Z)((0,esm_extends/* default */.Z)({}, props), {}, {
          callId,
          delay,
          cancel,
          pause
        }), resolve);
      } catch (err) {
        reject(err);
      }
    }
  });
}

/** @internal */

/** The object given to the `onRest` prop and `start` promise. */

/** The promised result of an animation. */

/** @internal */
const getCombinedResult = (target, results) => results.length == 1 ? results[0] : results.some(result => result.cancelled) ? getCancelledResult(target) : results.every(result => result.noop) ? getNoopResult(target) : getFinishedResult(target, results.every(result => result.finished));
/** No-op results are for updates that never start an animation. */

const getNoopResult = (target, value = target.get()) => ({
  value,
  noop: true,
  finished: true,
  target
});
const getFinishedResult = (target, finished, value = target.get()) => ({
  value,
  finished,
  target
});
const getCancelledResult = (target, value = target.get()) => ({
  value,
  cancelled: true,
  target
});

/**
 * Start an async chain or an async script.
 *
 * Always call `runAsync` in the action callback of a `scheduleProps` call.
 *
 * The `T` parameter can be a set of animated values (as an object type)
 * or a primitive type for a single animated value.
 */
async function runAsync(to, props, state, target) {
  if (props.pause) {
    await new Promise(resume => {
      state.resumeQueue.add(resume);
    });
  }

  const {
    callId,
    parentId,
    onRest
  } = props;
  const {
    asyncTo: prevTo,
    promise: prevPromise
  } = state;

  if (!parentId && to === prevTo && !props.reset) {
    return prevPromise;
  }

  return state.promise = (async () => {
    state.asyncId = callId;
    state.asyncTo = to; // The default props of any `animate` calls.

    const defaultProps = getDefaultProps(props, [// The `onRest` prop is only called when the `runAsync` promise is resolved.
    'onRest']);
    let preventBail;
    let bail; // This promise is rejected when the animation is interrupted.

    const bailPromise = new Promise((resolve, reject) => (preventBail = resolve, bail = reject)); // Stop animating when an error is caught.

    const withBailHandler = fn => (...args) => {
      const onError = err => {
        if (err instanceof BailSignal) {
          bail(err); // Stop animating.
        }

        throw err;
      };

      try {
        return fn(...args).catch(onError);
      } catch (err) {
        onError(err);
      }
    };

    const bailIfEnded = bailSignal => {
      const bailResult = // The `cancel` prop or `stop` method was used.
      callId <= (state.cancelId || 0) && getCancelledResult(target) || // The async `to` prop was replaced.
      callId !== state.asyncId && getFinishedResult(target, false);

      if (bailResult) {
        bailSignal.result = bailResult;
        throw bailSignal;
      }
    }; // Note: This function cannot use the `async` keyword, because we want the
    // `throw` statements to interrupt the caller.


    const animate = withBailHandler((arg1, arg2) => {
      const bailSignal = new BailSignal();
      bailIfEnded(bailSignal);
      const props = esm.is.obj(arg1) ? (0,esm_extends/* default */.Z)({}, arg1) : (0,esm_extends/* default */.Z)((0,esm_extends/* default */.Z)({}, arg2), {}, {
        to: arg1
      });
      props.parentId = callId;
      (0,esm.each)(defaultProps, (value, key) => {
        if (esm.is.und(props[key])) {
          props[key] = value;
        }
      });
      return target.start(props).then(async result => {
        bailIfEnded(bailSignal);

        if (target.is('PAUSED')) {
          await new Promise(resume => {
            state.resumeQueue.add(resume);
          });
        }

        return result;
      });
    });
    let result;

    try {
      let animating; // Async sequence

      if (esm.is.arr(to)) {
        animating = (async queue => {
          for (const props of queue) {
            await animate(props);
          }
        })(to);
      } // Async script
      else if (esm.is.fun(to)) {
          animating = Promise.resolve(to(animate, target.stop.bind(target)));
        }

      await Promise.all([animating.then(preventBail), bailPromise]);
      result = getFinishedResult(target, true); // Bail handling
    } catch (err) {
      if (err instanceof BailSignal) {
        result = err.result;
      } else {
        throw err;
      } // Reset the async state.

    } finally {
      if (callId == state.asyncId) {
        state.asyncId = parentId;
        state.asyncTo = parentId ? prevTo : undefined;
        state.promise = parentId ? prevPromise : undefined;
      }
    }

    if (esm.is.fun(onRest)) {
      (0,globals.batchedUpdates)(() => {
        onRest(result);
      });
    }

    return result;
  })();
}
function cancelAsync(state, callId) {
  state.cancelId = callId;
  state.asyncId = state.asyncTo = state.promise = undefined;
}
/** This error is thrown to signal an interrupted async animation. */

class BailSignal extends Error {
  constructor() {
    super('An async animation has been interrupted. You see this error because you ' + 'forgot to use `await` or `.catch(...)` on its returned promise.');
    this.result = void 0;
  }

}

const isFrameValue = value => value instanceof FrameValue;
let nextId = 1;
/**
 * A kind of `FluidValue` that manages an `AnimatedValue` node.
 *
 * Its underlying value can be accessed and even observed.
 */

class FrameValue extends esm.FluidValue {
  constructor(...args) {
    super(...args);
    this.id = nextId++;
    this.key = void 0;
    this._priority = 0;
    this._children = new Set();
  }

  get priority() {
    return this._priority;
  }

  set priority(priority) {
    if (this._priority != priority) {
      this._priority = priority;

      this._onPriorityChange(priority);
    }
  }
  /** Get the current value */


  get() {
    const node = (0,animated/* getAnimated */.ys)(this);
    return node && node.getValue();
  }
  /** Create a spring that maps our value to another value */


  to(...args) {
    return (0,globals.to)(this, args);
  }
  /** @deprecated Use the `to` method instead. */


  interpolate(...args) {
    deprecations_deprecateInterpolate();
    return (0,globals.to)(this, args);
  }
  /** @internal */


  /** @internal */
  addChild(child) {
    if (!this._children.size) this._attach();

    this._children.add(child);
  }
  /** @internal */


  removeChild(child) {
    this._children.delete(child);

    if (!this._children.size) this._detach();
  }
  /** @internal */


  onParentChange({
    type
  }) {
    if (this.idle) {
      // Start animating when a parent does.
      if (type == 'start') {
        this._reset();

        this._start();
      }
    } // Reset our animation state when a parent does, but only when
    // our animation is active.
    else if (type == 'reset') {
        this._reset();
      }
  }
  /** Called when the first child is added. */


  _attach() {}
  /** Called when the last child is removed. */


  _detach() {}
  /**
   * Reset our animation state (eg: start values, velocity, etc)
   * and tell our children to do the same.
   *
   * This is called when our goal value is changed during (or before)
   * an animation.
   */


  _reset() {
    this._emit({
      type: 'reset',
      parent: this
    });
  }
  /**
   * Start animating if possible.
   *
   * Note: Be sure to call `_reset` first, or the animation will break.
   * This method would like to call `_reset` for you, but that would
   * interfere with paused animations.
   */


  _start() {
    this._emit({
      type: 'start',
      parent: this
    });
  }
  /** Tell our children about our new value */


  _onChange(value, idle = false) {
    this._emit({
      type: 'change',
      parent: this,
      value,
      idle
    });
  }
  /** Tell our children about our new priority */


  _onPriorityChange(priority) {
    if (!this.idle) {
      // Make the frameloop aware of our new priority.
      globals.frameLoop.start(this);
    }

    this._emit({
      type: 'priority',
      parent: this,
      priority
    });
  }

  _emit(event) {
    // Clone "_children" so it can be safely mutated inside the loop.
    (0,esm.each)(Array.from(this._children), child => {
      child.onParentChange(event);
    });
  }

}

// TODO: use "const enum" when Babel supports it

/** The spring has not animated yet */
const CREATED = 'CREATED';
/** The spring has animated before */

const IDLE = 'IDLE';
/** The spring is animating */

const ACTIVE = 'ACTIVE';
/** The spring is frozen in time */

const PAUSED = 'PAUSED';
/** The spring cannot be animated */

const DISPOSED = 'DISPOSED';

/**
 * Only numbers, strings, and arrays of numbers/strings are supported.
 * Non-animatable strings are also supported.
 */
class SpringValue extends FrameValue {
  /** The property name used when `to` or `from` is an object. Useful when debugging too. */

  /** The animation state */

  /** The queue of pending props */

  /** The lifecycle phase of this spring */

  /** The state for `runAsync` calls */

  /** Some props have customizable default values */

  /** The counter for tracking `scheduleProps` calls */

  /** The last `scheduleProps` call that changed the `to` prop */
  constructor(arg1, arg2) {
    super();
    this.key = void 0;
    this.animation = new Animation();
    this.queue = void 0;
    this._phase = CREATED;
    this._state = {
      pauseQueue: new Set(),
      resumeQueue: new Set()
    };
    this._defaultProps = {};
    this._lastCallId = 0;
    this._lastToId = 0;

    if (!esm.is.und(arg1) || !esm.is.und(arg2)) {
      const props = esm.is.obj(arg1) ? (0,esm_extends/* default */.Z)({}, arg1) : (0,esm_extends/* default */.Z)((0,esm_extends/* default */.Z)({}, arg2), {}, {
        from: arg1
      });
      props.default = true;
      this.start(props);
    }
  }

  get idle() {
    return !this.is(ACTIVE) && !this._state.asyncTo;
  }

  get goal() {
    return (0,esm.getFluidValue)(this.animation.to);
  }

  get velocity() {
    const node = (0,animated/* getAnimated */.ys)(this);
    return node instanceof animated/* AnimatedValue */.iG ? node.lastVelocity || 0 : node.getPayload().map(node => node.lastVelocity || 0);
  }
  /** Advance the current animation by a number of milliseconds */


  advance(dt) {
    let idle = true;
    let changed = false;
    const anim = this.animation;
    let {
      config,
      toValues
    } = anim;
    const payload = (0,animated/* getPayload */.He)(anim.to);

    if (!payload) {
      const toConfig = (0,esm.getFluidConfig)(anim.to);

      if (toConfig) {
        toValues = (0,esm.toArray)(toConfig.get());
      }
    }

    anim.values.forEach((node, i) => {
      if (node.done) return; // The "anim.toValues" array must exist when no parent exists.

      let to = payload ? payload[i].lastPosition : toValues[i];
      let finished = anim.immediate;
      let position = to;

      if (!finished) {
        position = node.lastPosition; // Loose springs never move.

        if (config.tension <= 0) {
          node.done = true;
          return;
        }

        const elapsed = node.elapsedTime += dt;
        const from = anim.fromValues[i];
        const v0 = node.v0 != null ? node.v0 : node.v0 = esm.is.arr(config.velocity) ? config.velocity[i] : config.velocity;
        let velocity; // Duration easing

        if (!esm.is.und(config.duration)) {
          let p = config.progress || 0;
          if (config.duration <= 0) p = 1;else p += (1 - p) * Math.min(1, elapsed / config.duration);
          position = from + config.easing(p) * (to - from);
          velocity = (position - node.lastPosition) / dt;
          finished = p == 1;
        } // Decay easing
        else if (config.decay) {
            const decay = config.decay === true ? 0.998 : config.decay;
            const e = Math.exp(-(1 - decay) * elapsed);
            position = from + v0 / (1 - decay) * (1 - e);
            finished = Math.abs(node.lastPosition - position) < 0.1; // derivative of position

            velocity = v0 * e;
          } // Spring easing
          else {
              velocity = node.lastVelocity == null ? v0 : node.lastVelocity;
              /** The smallest distance from a value before being treated like said value. */

              const precision = config.precision || (from == to ? 0.005 : Math.min(1, Math.abs(to - from) * 0.001));
              /** The velocity at which movement is essentially none */

              const restVelocity = config.restVelocity || precision / 10; // Bouncing is opt-in (not to be confused with overshooting)

              const bounceFactor = config.clamp ? 0 : config.bounce;
              const canBounce = !esm.is.und(bounceFactor);
              /** When `true`, the value is increasing over time */

              const isGrowing = from == to ? node.v0 > 0 : from < to;
              /** When `true`, the velocity is considered moving */

              let isMoving;
              /** When `true`, the velocity is being deflected or clamped */

              let isBouncing = false;
              const step = 1; // 1ms

              const numSteps = Math.ceil(dt / step);

              for (let n = 0; n < numSteps; ++n) {
                isMoving = Math.abs(velocity) > restVelocity;

                if (!isMoving) {
                  finished = Math.abs(to - position) <= precision;

                  if (finished) {
                    break;
                  }
                }

                if (canBounce) {
                  isBouncing = position == to || position > to == isGrowing; // Invert the velocity with a magnitude, or clamp it.

                  if (isBouncing) {
                    velocity = -velocity * bounceFactor;
                    position = to;
                  }
                }

                const springForce = -config.tension * 0.000001 * (position - to);
                const dampingForce = -config.friction * 0.001 * velocity;
                const acceleration = (springForce + dampingForce) / config.mass; // pt/ms^2

                velocity = velocity + acceleration * step; // pt/ms

                position = position + velocity * step;
              }
            }

        node.lastVelocity = velocity;

        if (Number.isNaN(position)) {
          console.warn("Got NaN while animating:", this);
          finished = true;
        }
      } // Parent springs must finish before their children can.


      if (payload && !payload[i].done) {
        finished = false;
      }

      if (finished) {
        node.done = true;
      } else {
        idle = false;
      }

      if (node.setValue(position, config.round)) {
        changed = true;
      }
    });

    if (idle) {
      this.finish();
    } else if (changed) {
      this._onChange(this.get());
    }

    return idle;
  }
  /** Check the current phase */


  is(phase) {
    return this._phase == phase;
  }
  /** Set the current value, while stopping the current animation */


  set(value) {
    (0,globals.batchedUpdates)(() => {
      this._focus(value);

      if (this._set(value)) {
        // Ensure change observers are notified. When active,
        // the "_stop" method handles this.
        if (!this.is(ACTIVE)) {
          return this._onChange(this.get(), true);
        }
      }

      this._stop();
    });
    return this;
  }
  /**
   * Freeze the active animation in time.
   * This does nothing when not animating.
   */


  pause() {
    checkDisposed(this, 'pause');

    if (!this.is(PAUSED)) {
      this._phase = PAUSED;
      (0,esm.flush)(this._state.pauseQueue, onPause => onPause());
    }
  }
  /** Resume the animation if paused. */


  resume() {
    checkDisposed(this, 'resume');

    if (this.is(PAUSED)) {
      this._start();

      (0,esm.flush)(this._state.resumeQueue, onResume => onResume());
    }
  }
  /**
   * Skip to the end of the current animation.
   *
   * All `onRest` callbacks are passed `{finished: true}`
   */


  finish(to) {
    this.resume();

    if (this.is(ACTIVE)) {
      const anim = this.animation; // Decay animations have an implicit goal.

      if (!anim.config.decay && esm.is.und(to)) {
        to = anim.to;
      } // Set the value if we can.


      if (!esm.is.und(to)) {
        this._set(to);
      }

      (0,globals.batchedUpdates)(() => {
        // Ensure the "onStart" and "onRest" props are called.
        if (!anim.changed) {
          anim.changed = true;

          if (anim.onStart) {
            anim.onStart(this);
          }
        } // Exit the frameloop.


        this._stop();
      });
    }

    return this;
  }
  /** Push props into the pending queue. */


  update(props) {
    checkDisposed(this, 'update');
    const queue = this.queue || (this.queue = []);
    queue.push(props);
    return this;
  }
  /**
   * Update this value's animation using the queue of pending props,
   * and unpause the current animation (if one is frozen).
   *
   * When arguments are passed, a new animation is created, and the
   * queued animations are left alone.
   */


  async start(to, arg2) {
    checkDisposed(this, 'start');
    let queue;

    if (!esm.is.und(to)) {
      queue = [esm.is.obj(to) ? to : (0,esm_extends/* default */.Z)((0,esm_extends/* default */.Z)({}, arg2), {}, {
        to
      })];
    } else {
      queue = this.queue || [];
      this.queue = [];
    }

    const results = await Promise.all(queue.map(props => this._update(props)));
    return getCombinedResult(this, results);
  }
  /**
   * Stop the current animation, and cancel any delayed updates.
   *
   * Pass `true` to call `onRest` with `cancelled: true`.
   */


  stop(cancel) {
    if (!this.is(DISPOSED)) {
      cancelAsync(this._state, this._lastCallId); // Ensure the `to` value equals the current value.

      this._focus(this.get()); // Exit the frameloop and notify `onRest` listeners.


      (0,globals.batchedUpdates)(() => this._stop(cancel));
    }

    return this;
  }
  /** Restart the animation. */


  reset() {
    this._update({
      reset: true
    });
  }
  /** Prevent future animations, and stop the current animation */


  dispose() {
    if (!this.is(DISPOSED)) {
      if (this.animation) {
        // Prevent "onRest" calls when disposed.
        this.animation.onRest = [];
      }

      this.stop();
      this._phase = DISPOSED;
    }
  }
  /** @internal */


  onParentChange(event) {
    super.onParentChange(event);

    if (event.type == 'change') {
      if (!this.is(ACTIVE)) {
        this._reset();

        if (!this.is(PAUSED)) {
          this._start();
        }
      }
    } else if (event.type == 'priority') {
      this.priority = event.priority + 1;
    }
  }
  /**
   * Parse the `to` and `from` range from the given `props` object.
   *
   * This also ensures the initial value is available to animated components
   * during the render phase.
   */


  _prepareNode({
    to,
    from,
    reverse
  }) {
    const key = this.key || '';
    to = !esm.is.obj(to) || (0,esm.getFluidConfig)(to) ? to : to[key];
    from = !esm.is.obj(from) || (0,esm.getFluidConfig)(from) ? from : from[key]; // Create the range now to avoid "reverse" logic.

    const range = {
      to,
      from
    }; // Before ever animating, this method ensures an `Animated` node
    // exists and keeps its value in sync with the "from" prop.

    if (this.is(CREATED)) {
      if (reverse) [to, from] = [from, to];
      from = (0,esm.getFluidValue)(from);

      const node = this._updateNode(esm.is.und(from) ? (0,esm.getFluidValue)(to) : from);

      if (node && !esm.is.und(from)) {
        node.setValue(from);
      }
    }

    return range;
  }
  /**
   * Create an `Animated` node if none exists or the given value has an
   * incompatible type. Do nothing if `value` is undefined.
   *
   * The newest `Animated` node is returned.
   */


  _updateNode(value) {
    let node = (0,animated/* getAnimated */.ys)(this);

    if (!esm.is.und(value)) {
      const nodeType = this._getNodeType(value);

      if (!node || node.constructor !== nodeType) {
        (0,animated/* setAnimated */.f3)(this, node = nodeType.create(value));
      }
    }

    return node;
  }
  /** Return the `Animated` node constructor for a given value */


  _getNodeType(value) {
    const parentNode = (0,animated/* getAnimated */.ys)(value);
    return parentNode ? parentNode.constructor : esm.is.arr(value) ? animated/* AnimatedArray */.if : (0,esm.isAnimatedString)(value) ? animated/* AnimatedString */.eC : animated/* AnimatedValue */.iG;
  }
  /** Schedule an animation to run after an optional delay */


  _update(props, isLoop) {
    const defaultProps = this._defaultProps;

    const mergeDefaultProp = key => {
      const value = getDefaultProp(props, key);

      if (!esm.is.und(value)) {
        defaultProps[key] = value;
      } // For `cancel` and `pause`, a truthy default always wins.


      if (defaultProps[key]) {
        props[key] = defaultProps[key];
      }
    }; // These props are coerced into booleans by the `scheduleProps` function,
    // so they need their default values processed before then.


    mergeDefaultProp('cancel');
    mergeDefaultProp('pause'); // Ensure the initial value can be accessed by animated components.

    const range = this._prepareNode(props);

    return scheduleProps(++this._lastCallId, {
      key: this.key,
      props,
      state: this._state,
      actions: {
        pause: this.pause.bind(this),
        resume: this.resume.bind(this),
        start: this._merge.bind(this, range)
      }
    }).then(result => {
      if (props.loop && result.finished && !(isLoop && result.noop)) {
        const nextProps = createLoopUpdate(props);

        if (nextProps) {
          return this._update(nextProps, true);
        }
      }

      return result;
    });
  }
  /** Merge props into the current animation */


  _merge(range, props, resolve) {
    // The "cancel" prop cancels all pending delays and it forces the
    // active animation to stop where it is.
    if (props.cancel) {
      this.stop(true);
      return resolve(getCancelledResult(this));
    }

    const {
      key,
      animation: anim
    } = this;
    const defaultProps = this._defaultProps;
    /** The "to" prop is defined. */

    const hasToProp = !esm.is.und(range.to);
    /** The "from" prop is defined. */

    const hasFromProp = !esm.is.und(range.from); // Avoid merging other props if implicitly prevented, except
    // when both the "to" and "from" props are undefined.

    if (hasToProp || hasFromProp) {
      if (props.callId > this._lastToId) {
        this._lastToId = props.callId;
      } else {
        return resolve(getCancelledResult(this));
      }
    }
    /** Get the value of a prop, or its default value */


    const get = prop => !esm.is.und(props[prop]) ? props[prop] : defaultProps[prop]; // Call "onDelayEnd" before merging props, but after cancellation checks.


    const onDelayEnd = coerceEventProp(get('onDelayEnd'), key);

    if (onDelayEnd) {
      onDelayEnd(props, this);
    }

    if (props.default) {
      mergeDefaultProps(defaultProps, props, ['pause', 'cancel']);
    }

    const {
      to: prevTo,
      from: prevFrom
    } = anim;
    let {
      to = prevTo,
      from = prevFrom
    } = range; // Focus the "from" value if changing without a "to" value.

    if (hasFromProp && !hasToProp) {
      to = from;
    } // Flip the current range if "reverse" is true.


    if (props.reverse) [to, from] = [from, to];
    /** The "from" value is changing. */

    const hasFromChanged = !(0,esm.isEqual)(from, prevFrom);

    if (hasFromChanged) {
      anim.from = from;
    }
    /** The "to" value is changing. */


    const hasToChanged = !(0,esm.isEqual)(to, prevTo);

    if (hasToChanged) {
      this._focus(to);
    } // Both "from" and "to" can use a fluid config (thanks to http://npmjs.org/fluids).


    const toConfig = (0,esm.getFluidConfig)(to);
    const fromConfig = (0,esm.getFluidConfig)(from);

    if (fromConfig) {
      from = fromConfig.get();
    }
    /** The "to" prop is async. */


    const hasAsyncTo = esm.is.arr(props.to) || esm.is.fun(props.to);
    const {
      config
    } = anim;
    const {
      decay,
      velocity
    } = config; // The "runAsync" function treats the "config" prop as a default,
    // so we must avoid merging it when the "to" prop is async.

    if (props.config && !hasAsyncTo) {
      mergeConfig(config, callProp(props.config, key), // Avoid calling the same "config" prop twice.
      props.config !== defaultProps.config ? callProp(defaultProps.config, key) : void 0);
    } // This instance might not have its Animated node yet. For example,
    // the constructor can be given props without a "to" or "from" value.


    let node = (0,animated/* getAnimated */.ys)(this);

    if (!node || esm.is.und(to)) {
      return resolve(getFinishedResult(this, true));
    }
    /** When true, start at the "from" value. */


    const reset = // When `reset` is undefined, the `from` prop implies `reset: true`,
    // except for declarative updates. When `reset` is defined, there
    // must exist a value to animate from.
    esm.is.und(props.reset) ? hasFromProp && !props.default : !esm.is.und(from) && matchProp(props.reset, key); // The current value, where the animation starts from.

    const value = reset ? from : this.get(); // The animation ends at this value, unless "to" is fluid.

    const goal = computeGoal(to); // Only specific types can be animated to/from.

    const isAnimatable = esm.is.num(goal) || esm.is.arr(goal) || (0,esm.isAnimatedString)(goal); // When true, the value changes instantly on the next frame.

    const immediate = !hasAsyncTo && (!isAnimatable || matchProp(defaultProps.immediate || props.immediate, key));

    if (hasToChanged) {
      if (immediate) {
        node = this._updateNode(goal);
      } else {
        const nodeType = this._getNodeType(to);

        if (nodeType !== node.constructor) {
          throw Error("Cannot animate between " + node.constructor.name + " and " + nodeType.name + ", as the \"to\" prop suggests");
        }
      }
    } // The type of Animated node for the goal value.


    const goalType = node.constructor; // When the goal value is fluid, we don't know if its value
    // will change before the next animation frame, so it always
    // starts the animation to be safe.

    let started = !!toConfig;
    let finished = false;

    if (!started) {
      // When true, the current value has probably changed.
      const hasValueChanged = reset || this.is(CREATED) && hasFromChanged; // When the "to" value or current value are changed,
      // start animating if not already finished.

      if (hasToChanged || hasValueChanged) {
        finished = (0,esm.isEqual)(computeGoal(value), goal);
        started = !finished;
      } // Changing "decay" or "velocity" starts the animation.


      if (!(0,esm.isEqual)(config.decay, decay) || !(0,esm.isEqual)(config.velocity, velocity)) {
        started = true;
      }
    } // When an active animation changes its goal to its current value:


    if (finished && this.is(ACTIVE)) {
      // Avoid an abrupt stop unless the animation is being reset.
      if (anim.changed && !reset) {
        started = true;
      } // Stop the animation before its first frame.
      else if (!started) {
          this._stop();
        }
    }

    if (!hasAsyncTo) {
      // Make sure our "toValues" are updated even if our previous
      // "to" prop is a fluid value whose current value is also ours.
      if (started || (0,esm.getFluidConfig)(prevTo)) {
        anim.values = node.getPayload();
        anim.toValues = toConfig ? null : goalType == animated/* AnimatedString */.eC ? [1] : (0,esm.toArray)(goal);
      }

      anim.immediate = immediate;
      anim.onStart = coerceEventProp(get('onStart'), key);
      anim.onChange = coerceEventProp(get('onChange'), key); // The "reset" prop tries to reuse the old "onRest" prop,
      // unless you defined a new "onRest" prop.

      const onRestQueue = anim.onRest;
      const onRest = reset && !props.onRest ? onRestQueue[0] || esm.noop : checkFinishedOnRest(coerceEventProp(get('onRest'), key), this); // In most cases, the animation after this one won't reuse our
      // "onRest" prop. Instead, the _default_ "onRest" prop is used
      // when the next animation has an undefined "onRest" prop.

      if (started) {
        anim.onRest = [onRest, checkFinishedOnRest(resolve, this)]; // Flush the "onRest" queue for the previous animation.

        let onRestIndex = reset ? 0 : 1;

        if (onRestIndex < onRestQueue.length) {
          (0,globals.batchedUpdates)(() => {
            for (; onRestIndex < onRestQueue.length; onRestIndex++) {
              onRestQueue[onRestIndex]();
            }
          });
        }
      } // The "onRest" prop is always first, and it can be updated even
      // if a new animation is not started by this update.
      else if (reset || props.onRest) {
          anim.onRest[0] = onRest;
        }
    } // By this point, every prop has been merged.


    const onProps = coerceEventProp(get('onProps'), key);

    if (onProps) {
      onProps(props, this);
    } // Update our node even if the animation is idle.


    if (reset) {
      node.setValue(value);
    }

    if (hasAsyncTo) {
      resolve(runAsync(props.to, props, this._state, this));
    } // Start an animation
    else if (started) {
        // Must be idle for "onStart" to be called again.
        if (reset) this._phase = IDLE;

        this._reset();

        this._start();
      } // Postpone promise resolution until the animation is finished,
      // so that no-op updates still resolve at the expected time.
      else if (this.is(ACTIVE) && !hasToChanged) {
          anim.onRest.push(checkFinishedOnRest(resolve, this));
        } // Resolve our promise immediately.
        else {
            resolve(getNoopResult(this, value));
          }
  }
  /** Update the `animation.to` value, which might be a `FluidValue` */


  _focus(value) {
    const anim = this.animation;

    if (value !== anim.to) {
      let config = (0,esm.getFluidConfig)(anim.to);

      if (config) {
        config.removeChild(this);
      }

      anim.to = value;
      let priority = 0;

      if (config = (0,esm.getFluidConfig)(value)) {
        config.addChild(this);

        if (isFrameValue(value)) {
          priority = (value.priority || 0) + 1;
        }
      }

      this.priority = priority;
    }
  }
  /** Set the current value and our `node` if necessary. The `_onChange` method is *not* called. */


  _set(value) {
    const config = (0,esm.getFluidConfig)(value);

    if (config) {
      value = config.get();
    }

    const node = (0,animated/* getAnimated */.ys)(this);
    const oldValue = node && node.getValue();

    if (node) {
      node.setValue(value);
    } else {
      this._updateNode(value);
    }

    return !(0,esm.isEqual)(value, oldValue);
  }

  _onChange(value, idle = false) {
    const anim = this.animation; // The "onStart" prop is called on the first change after entering the
    // frameloop, but never for immediate animations.

    if (!anim.changed && !idle) {
      anim.changed = true;

      if (anim.onStart) {
        anim.onStart(this);
      }
    }

    if (anim.onChange) {
      anim.onChange(value, this);
    }

    super._onChange(value, idle);
  }

  _reset() {
    const anim = this.animation; // Reset the state of each Animated node.

    (0,animated/* getAnimated */.ys)(this).reset(anim.to); // Ensure the `onStart` prop will be called.

    if (!this.is(ACTIVE)) {
      anim.changed = false;
    } // Use the current values as the from values.


    if (!anim.immediate) {
      anim.fromValues = anim.values.map(node => node.lastPosition);
    }

    super._reset();
  }

  _start() {
    if (!this.is(ACTIVE)) {
      this._phase = ACTIVE;

      super._start(); // The "skipAnimation" global avoids the frameloop.


      if (globals.skipAnimation) {
        this.finish();
      } else {
        globals.frameLoop.start(this);
      }
    }
  }
  /**
   * Exit the frameloop and notify `onRest` listeners.
   *
   * Always wrap `_stop` calls with `batchedUpdates`.
   */


  _stop(cancel) {
    this.resume();

    if (this.is(ACTIVE)) {
      this._phase = IDLE; // Always let change observers know when a spring becomes idle.

      this._onChange(this.get(), true);

      const anim = this.animation;
      (0,esm.each)(anim.values, node => {
        node.done = true;
      });
      const onRestQueue = anim.onRest;

      if (onRestQueue.length) {
        // Preserve the "onRest" prop when the goal is dynamic.
        anim.onRest = [anim.toValues ? esm.noop : onRestQueue[0]]; // Never call the "onRest" prop for no-op animations.

        if (!anim.changed) {
          onRestQueue[0] = esm.noop;
        }

        (0,esm.each)(onRestQueue, onRest => onRest(cancel));
      }
    }
  }

}

function checkDisposed(spring, name) {
  if (spring.is(DISPOSED)) {
    throw Error("Cannot call \"" + name + "\" of disposed \"" + spring.constructor.name + "\" object");
  }
}
/** Coerce an event prop to an event handler */


function coerceEventProp(prop, key) {
  return esm.is.fun(prop) ? prop : key && prop ? prop[key] : undefined;
}
/**
 * The "finished" value is determined by each "onRest" handler,
 * based on whether the current value equals the goal value that
 * was calculated at the time the "onRest" handler was set.
 */


const checkFinishedOnRest = (onRest, spring) => {
  const {
    to
  } = spring.animation;
  return onRest ? cancel => {
    if (cancel) {
      onRest(getCancelledResult(spring));
    } else {
      const goal = computeGoal(to);
      const value = computeGoal(spring.get());
      const finished = (0,esm.isEqual)(value, goal);
      onRest(getFinishedResult(spring, finished));
    }
  } : esm.noop;
};

function createLoopUpdate(props, loop = props.loop, to = props.to) {
  let loopRet = callProp(loop);

  if (loopRet) {
    const overrides = loopRet !== true && inferTo(loopRet);
    const reverse = (overrides || props).reverse;
    const reset = !overrides || overrides.reset;
    return createUpdate((0,esm_extends/* default */.Z)((0,esm_extends/* default */.Z)({}, props), {}, {
      loop,
      // Avoid updating default props when looping.
      default: false,
      // For the "reverse" prop to loop as expected, the "to" prop
      // must be undefined. The "reverse" prop is ignored when the
      // "to" prop is an array or function.
      to: !reverse || esm.is.arr(to) || esm.is.fun(to) ? to : undefined,
      // Avoid defining the "from" prop if a reset is unwanted.
      from: reset ? props.from : undefined,
      reset
    }, overrides));
  }
}
/**
 * Return a new object based on the given `props`.
 *
 * - All unreserved props are moved into the `to` prop object.
 * - The `to` and `from` props are deleted when falsy.
 * - The `keys` prop is set to an array of affected keys,
 *   or `null` if all keys are affected.
 */

function createUpdate(props) {
  const {
    to,
    from
  } = props = inferTo(props); // Collect the keys affected by this update.

  const keys = new Set();

  if (from) {
    findDefined(from, keys);
  } else {
    // Falsy values are deleted to avoid merging issues.
    delete props.from;
  }

  if (esm.is.obj(to)) {
    findDefined(to, keys);
  } else if (!to) {
    // Falsy values are deleted to avoid merging issues.
    delete props.to;
  } // The "keys" prop helps in applying updates to affected keys only.


  props.keys = keys.size ? Array.from(keys) : null;
  return props;
}
/**
 * A modified version of `createUpdate` meant for declarative APIs.
 */

function declareUpdate(props) {
  const update = createUpdate(props);

  if (is.und(update.default)) {
    update.default = getDefaultProps(update, [// Avoid forcing `immediate: true` onto imperative updates.
    update.immediate === true && 'immediate']);
  }

  return update;
}
/** Find keys with defined values */

function findDefined(values, keys) {
  (0,esm.each)(values, (value, key) => value != null && keys.add(key));
}

/** Events batched by the `Controller` class */
const BATCHED_EVENTS = ['onStart', 'onChange', 'onRest'];
let nextId$1 = 1;
/** Queue of pending updates for a `Controller` instance. */

class Controller {
  /** The animated values */

  /** The queue of props passed to the `update` method. */

  /** Custom handler for flushing update queues */

  /** These props are used by all future spring values */

  /** The combined phase of our spring values */

  /** The counter for tracking `scheduleProps` calls */

  /** The values currently being animated */

  /** State used by the `runAsync` function */

  /** The event queues that are flushed once per frame maximum */
  constructor(props, flush) {
    this.id = nextId$1++;
    this.springs = {};
    this.queue = [];
    this._flush = void 0;
    this._initialProps = void 0;
    this._phase = CREATED;
    this._lastAsyncId = 0;
    this._active = new Set();
    this._state = {
      pauseQueue: new Set(),
      resumeQueue: new Set()
    };
    this._events = {
      onStart: new Set(),
      onChange: new Set(),
      onRest: new Map()
    };
    this._onFrame = this._onFrame.bind(this);

    if (flush) {
      this._flush = flush;
    }

    if (props) {
      this.start(props);
    }
  }
  /**
   * Equals `true` when no spring values are in the frameloop, and
   * no async animation is currently active.
   */


  get idle() {
    return !this._state.asyncTo && Object.values(this.springs).every(spring => spring.idle);
  }
  /** Check the current phase */


  is(phase) {
    return this._phase == phase;
  }
  /** Get the current values of our springs */


  get() {
    const values = {};
    this.each((spring, key) => values[key] = spring.get());
    return values;
  }
  /** Push an update onto the queue of each value. */


  update(props) {
    if (props) this.queue.push(createUpdate(props));
    return this;
  }
  /**
   * Start the queued animations for every spring, and resolve the returned
   * promise once all queued animations have finished or been cancelled.
   *
   * When you pass a queue (instead of nothing), that queue is used instead of
   * the queued animations added with the `update` method, which are left alone.
   */


  start(props) {
    const queue = props ? (0,esm.toArray)(props).map(createUpdate) : this.queue;

    if (!props) {
      this.queue = [];
    }

    if (this._flush) {
      return this._flush(this, queue);
    }

    prepareKeys(this, queue);
    return flushUpdateQueue(this, queue);
  }
  /** Stop one animation, some animations, or all animations */


  stop(keys) {
    if (esm.is.und(keys)) {
      this.each(spring => spring.stop());
      cancelAsync(this._state, this._lastAsyncId);
    } else {
      const springs = this.springs;
      (0,esm.each)((0,esm.toArray)(keys), key => springs[key].stop());
    }

    return this;
  }
  /** Freeze the active animation in time */


  pause(keys) {
    if (esm.is.und(keys)) {
      this.each(spring => spring.pause());
    } else {
      const springs = this.springs;
      (0,esm.each)((0,esm.toArray)(keys), key => springs[key].pause());
    }

    return this;
  }
  /** Resume the animation if paused. */


  resume(keys) {
    if (esm.is.und(keys)) {
      this.each(spring => spring.resume());
    } else {
      const springs = this.springs;
      (0,esm.each)((0,esm.toArray)(keys), key => springs[key].resume());
    }

    return this;
  }
  /** Restart every animation. */


  reset() {
    this.each(spring => spring.reset()); // TODO: restart async "to" prop

    return this;
  }
  /** Call a function once per spring value */


  each(iterator) {
    (0,esm.each)(this.springs, iterator);
  }
  /** Destroy every spring in this controller */


  dispose() {
    this._state.asyncTo = undefined;
    this.each(spring => spring.dispose());
    this.springs = {};
  }
  /** @internal Called at the end of every animation frame */


  _onFrame() {
    const {
      onStart,
      onChange,
      onRest
    } = this._events;
    const isActive = this._active.size > 0;

    if (isActive && this._phase != ACTIVE) {
      this._phase = ACTIVE;
      (0,esm.flush)(onStart, onStart => onStart(this));
    }

    const values = (onChange.size || !isActive && onRest.size) && this.get();
    (0,esm.flush)(onChange, onChange => onChange(values)); // The "onRest" queue is only flushed when all springs are idle.

    if (!isActive) {
      this._phase = IDLE;
      (0,esm.flush)(onRest, ([onRest, result]) => {
        result.value = values;
        onRest(result);
      });
    }
  }
  /** @internal */


  onParentChange(event) {
    if (event.type == 'change') {
      this._active[event.idle ? 'delete' : 'add'](event.parent);

      globals.frameLoop.onFrame(this._onFrame);
    }
  }

}
/**
 * Warning: Props might be mutated.
 */

function flushUpdateQueue(ctrl, queue) {
  return Promise.all(queue.map(props => flushUpdate(ctrl, props))).then(results => getCombinedResult(ctrl, results));
}
/**
 * Warning: Props might be mutated.
 *
 * Process a single set of props using the given controller.
 *
 * The returned promise resolves to `true` once the update is
 * applied and any animations it starts are finished without being
 * stopped or cancelled.
 */

function flushUpdate(ctrl, props, isLoop) {
  const {
    to,
    loop,
    onRest
  } = props; // Looping must be handled in this function, or else the values
  // would end up looping out-of-sync in many common cases.

  if (loop) {
    props.loop = false;
  }

  const asyncTo = esm.is.arr(to) || esm.is.fun(to) ? to : undefined;

  if (asyncTo) {
    props.to = undefined;
    props.onRest = undefined;
  } else {
    // For certain events, use batching to prevent multiple calls per frame.
    // However, batching is avoided when the `to` prop is async, because any
    // event props are used as default props instead.
    (0,esm.each)(BATCHED_EVENTS, key => {
      const handler = props[key];

      if (esm.is.fun(handler)) {
        const queue = ctrl['_events'][key];

        if (queue instanceof Set) {
          props[key] = () => queue.add(handler);
        } else {
          props[key] = ({
            finished,
            cancelled
          }) => {
            const result = queue.get(handler);

            if (result) {
              if (!finished) result.finished = false;
              if (cancelled) result.cancelled = true;
            } else {
              // The "value" is set before the "handler" is called.
              queue.set(handler, {
                value: null,
                finished,
                cancelled
              });
            }
          };
        }
      }
    });
  }

  const keys = props.keys || Object.keys(ctrl.springs);
  const promises = keys.map(key => ctrl.springs[key].start(props)); // Schedule the "asyncTo" if defined.

  const state = ctrl['_state'];

  if (asyncTo) {
    promises.push(scheduleProps(++ctrl['_lastAsyncId'], {
      props,
      state,
      actions: {
        pause: esm.noop,
        resume: esm.noop,

        start(props, resolve) {
          props.onRest = onRest;

          if (!props.cancel) {
            resolve(runAsync(asyncTo, props, state, ctrl));
          } // Prevent `cancel: true` from ending the current `runAsync` call,
          // except when the default `cancel` prop is being set.
          else if (hasDefaultProp(props, 'cancel')) {
              cancelAsync(state, props.callId);
            }
        }

      }
    }));
  } // Respect the `cancel` prop when no keys are affected.
  else if (!props.keys && props.cancel === true) {
      cancelAsync(state, ctrl['_lastAsyncId']);
    }

  return Promise.all(promises).then(results => {
    const result = getCombinedResult(ctrl, results);

    if (loop && result.finished && !(isLoop && result.noop)) {
      const nextProps = createLoopUpdate(props, loop, to);

      if (nextProps) {
        prepareKeys(ctrl, [nextProps]);
        return flushUpdate(ctrl, nextProps, true);
      }
    }

    return result;
  });
}
/**
 * From an array of updates, get the map of `SpringValue` objects
 * by their keys. Springs are created when any update wants to
 * animate a new key.
 *
 * Springs created by `getSprings` are neither cached nor observed
 * until they're given to `setSprings`.
 */

function getSprings(ctrl, props) {
  const springs = (0,esm_extends/* default */.Z)({}, ctrl.springs);

  if (props) {
    (0,esm.each)((0,esm.toArray)(props), props => {
      if (esm.is.und(props.keys)) {
        props = createUpdate(props);
      }

      if (!esm.is.obj(props.to)) {
        // Avoid passing array/function to each spring.
        props = (0,esm_extends/* default */.Z)((0,esm_extends/* default */.Z)({}, props), {}, {
          to: undefined
        });
      }

      prepareSprings(springs, props, key => {
        return createSpring(key);
      });
    });
  }

  return springs;
}
/**
 * Tell a controller to manage the given `SpringValue` objects
 * whose key is not already in use.
 */

function setSprings(ctrl, springs) {
  (0,esm.each)(springs, (spring, key) => {
    if (!ctrl.springs[key]) {
      ctrl.springs[key] = spring;
      spring.addChild(ctrl);
    }
  });
}

function createSpring(key, observer) {
  const spring = new SpringValue();
  spring.key = key;

  if (observer) {
    spring.addChild(observer);
  }

  return spring;
}
/**
 * Ensure spring objects exist for each defined key.
 *
 * Using the `props`, the `Animated` node of each `SpringValue` may
 * be created or updated.
 */


function prepareSprings(springs, props, create) {
  if (props.keys) {
    (0,esm.each)(props.keys, key => {
      const spring = springs[key] || (springs[key] = create(key));
      spring['_prepareNode'](props);
    });
  }
}
/**
 * Ensure spring objects exist for each defined key, and attach the
 * `ctrl` to them for observation.
 *
 * The queue is expected to contain `createUpdate` results.
 */


function prepareKeys(ctrl, queue) {
  (0,esm.each)(queue, props => {
    prepareSprings(ctrl.springs, props, key => {
      return createSpring(key, ctrl);
    });
  });
}

/**
 * This context affects all new and existing `SpringValue` objects
 * created with the hook API or the renderprops API.
 */

const ctx = (0,react.createContext)({});
const SpringContext = (_ref) => {
  let {
    children
  } = _ref,
      props = (0,objectWithoutPropertiesLoose/* default */.Z)(_ref, ["children"]);

  const inherited = (0,react.useContext)(ctx); // Memoize the context to avoid unwanted renders.

  props = core_useMemo(() => (0,esm_extends/* default */.Z)((0,esm_extends/* default */.Z)({}, inherited), props), [inherited, props.pause, props.cancel, props.immediate, props.config]);
  const {
    Provider
  } = ctx;
  return /*#__PURE__*/(0,react.createElement)(Provider, {
    value: props
  }, children);
};
SpringContext.Provider = ctx.Provider;
SpringContext.Consumer = ctx.Consumer;
/** Get the current values of nearest `SpringContext` component. */

const useSpringContext = () => (0,react.useContext)(ctx);

/** Create an imperative API for manipulating an array of `Controller` objects. */
const SpringHandle = {
  create: getControllers => ({
    get controllers() {
      return getControllers();
    },

    update(props) {
      (0,esm.each)(getControllers(), (ctrl, i) => {
        ctrl.update(getProps(props, i, ctrl));
      });
      return this;
    },

    async start(props) {
      const results = await Promise.all(getControllers().map((ctrl, i) => {
        const update = getProps(props, i, ctrl);
        return ctrl.start(update);
      }));
      return {
        value: results.map(result => result.value),
        finished: results.every(result => result.finished)
      };
    },

    stop: keys => (0,esm.each)(getControllers(), ctrl => ctrl.stop(keys)),
    pause: keys => (0,esm.each)(getControllers(), ctrl => ctrl.pause(keys)),
    resume: keys => (0,esm.each)(getControllers(), ctrl => ctrl.resume(keys))
  })
};

/** @internal */
function useSprings(length, props, deps) {
  const propsFn = is.fun(props) && props;
  if (propsFn && !deps) deps = [];
  // Set to 0 to prevent sync flush.
  const layoutId = useRef(0);
  const forceUpdate = useForceUpdate(); // State is updated on commit.

  const [state] = useState(() => ({
    ctrls: [],
    queue: [],

    flush(ctrl, updates) {
      const springs = getSprings(ctrl, updates); // Flushing is postponed until the component's commit phase
      // if a spring was created since the last commit.

      const canFlushSync = layoutId.current > 0 && !state.queue.length && !Object.keys(springs).some(key => !ctrl.springs[key]);
      return canFlushSync ? flushUpdateQueue(ctrl, updates) : new Promise(resolve => {
        setSprings(ctrl, springs);
        state.queue.push(() => {
          resolve(flushUpdateQueue(ctrl, updates));
        });
        forceUpdate();
      });
    }

  })); // The imperative API ref from the props of the first controller.

  const refProp = useRef();
  const ctrls = [...state.ctrls];
  const updates = []; // Cache old controllers to dispose in the commit phase.

  const prevLength = usePrev(length) || 0;
  const disposed = ctrls.slice(length, prevLength); // Create new controllers when "length" increases, and destroy
  // the affected controllers when "length" decreases.

  core_useMemo(() => {
    ctrls.length = length;
    declareUpdates(prevLength, length);
  }, [length]); // Update existing controllers when "deps" are changed.

  core_useMemo(() => {
    declareUpdates(0, Math.min(prevLength, length));
  }, deps);
  /** Fill the `updates` array with declarative updates for the given index range. */

  function declareUpdates(startIndex, endIndex) {
    for (let i = startIndex; i < endIndex; i++) {
      const ctrl = ctrls[i] || (ctrls[i] = new Controller(null, state.flush));
      let update = propsFn ? propsFn(i, ctrl) : props[i];

      if (update) {
        update = updates[i] = declareUpdate(update);

        if (i == 0) {
          refProp.current = update.ref;
          update.ref = undefined;
        }
      }
    }
  }

  const api = useMemo$1(() => {
    return SpringHandle.create(() => state.ctrls);
  }, []); // New springs are created during render so users can pass them to
  // their animated components, but new springs aren't cached until the
  // commit phase (see the `useLayoutEffect` callback below).

  const springs = ctrls.map((ctrl, i) => getSprings(ctrl, updates[i]));
  const context = useSpringContext();
  useLayoutEffect(() => {
    layoutId.current++; // Replace the cached controllers.

    state.ctrls = ctrls; // Update the ref prop.

    if (refProp.current) {
      refProp.current.current = api;
    } // Flush the commit queue.


    const {
      queue
    } = state;

    if (queue.length) {
      state.queue = [];
      each(queue, cb => cb());
    } // Dispose unused controllers.


    each(disposed, ctrl => ctrl.dispose()); // Update existing controllers.

    each(ctrls, (ctrl, i) => {
      const values = springs[i];
      setSprings(ctrl, values); // Update the default props.

      ctrl.start({
        default: context
      }); // Apply updates created during render.

      const update = updates[i];

      if (update) {
        // Start animating unless a ref exists.
        if (refProp.current) {
          ctrl.queue.push(update);
        } else {
          ctrl.start(update);
        }
      }
    });
  }); // Dispose all controllers on unmount.

  useOnce(() => () => {
    each(state.ctrls, ctrl => ctrl.dispose());
  }); // Return a deep copy of the `springs` array so the caller can
  // safely mutate it during render.

  const values = springs.map(x => _extends({}, x));
  return propsFn || arguments.length == 3 ? [values, api.start, api.stop] : values;
}

/**
 * The props that `useSpring` recognizes.
 */

/** @internal */
function useSpring(props, deps) {
  const isFn = is.fun(props);
  const [[values], update, stop] = useSprings(1, isFn ? props : [props], isFn ? deps || [] : deps);
  return isFn || arguments.length == 2 ? [values, update, stop] : values;
}

function useTrail(length, propsArg, deps) {
  const propsFn = is.fun(propsArg) && propsArg;
  if (propsFn && !deps) deps = [];
  const ctrls = [];
  const result = useSprings(length, (i, ctrl) => {
    ctrls[i] = ctrl;
    return getProps(propsArg, i, ctrl);
  }, // Ensure the props function is called when no deps exist.
  // This works around the 3 argument rule.
  deps || [{}]);
  useLayoutEffect(() => {
    const reverse = is.obj(propsArg) && propsArg.reverse;

    for (let i = 0; i < ctrls.length; i++) {
      const parent = ctrls[i + (reverse ? 1 : -1)];
      if (parent) ctrls[i].update({
        to: parent.springs
      }).start();
    }
  }, deps);

  if (propsFn || arguments.length == 3) {
    const update = result[1];
    result[1] = useCallbackOne(propsArg => {
      const reverse = is.obj(propsArg) && propsArg.reverse;
      return update((i, ctrl) => {
        const props = getProps(propsArg, i, ctrl);
        const parent = ctrls[i + (reverse ? 1 : -1)];
        if (parent) props.to = parent.springs;
        return props;
      });
    }, deps);
    return result;
  }

  return result[0];
}

// TODO: convert to "const enum" once Babel supports it

/** This transition is being mounted */
const MOUNT = 'mount';
/** This transition is entering or has entered */

const ENTER = 'enter';
/** This transition had its animations updated */

const UPDATE = 'update';
/** This transition will expire after animating */

const LEAVE = 'leave';

function useTransition(data, props, deps) {
  const {
    ref,
    reset,
    sort,
    trail = 0,
    expires = true
  } = props; // Every item has its own transition.

  const items = (0,esm.toArray)(data);
  const transitions = []; // Keys help with reusing transitions between renders.
  // The `key` prop can be undefined (which means the items themselves are used
  // as keys), or a function (which maps each item to its key), or an array of
  // keys (which are assigned to each item by index).

  const keys = getKeys(items, props); // The "onRest" callbacks need a ref to the latest transitions.

  const usedTransitions = (0,react.useRef)(null);
  const prevTransitions = reset ? null : usedTransitions.current;
  (0,esm_useLayoutEffect/* useLayoutEffect */.b)(() => {
    usedTransitions.current = transitions;
  }); // Destroy all transitions on dismount.

  (0,esm.useOnce)(() => () => (0,esm.each)(usedTransitions.current, t => {
    if (t.expired) {
      clearTimeout(t.expirationId);
    }

    t.ctrl.dispose();
  })); // Map old indices to new indices.

  const reused = [];
  if (prevTransitions) (0,esm.each)(prevTransitions, (t, i) => {
    // Expired transitions are not rendered.
    if (t.expired) {
      clearTimeout(t.expirationId);
    } else {
      i = reused[i] = keys.indexOf(t.key);
      if (~i) transitions[i] = t;
    }
  }); // Mount new items with fresh transitions.

  (0,esm.each)(items, (item, i) => {
    transitions[i] || (transitions[i] = {
      key: keys[i],
      item,
      phase: MOUNT,
      ctrl: new Controller()
    });
  }); // Update the item of any transition whose key still exists,
  // and ensure leaving transitions are rendered until they finish.

  if (reused.length) {
    let i = -1;
    (0,esm.each)(reused, (keyIndex, prevIndex) => {
      const t = prevTransitions[prevIndex];

      if (~keyIndex) {
        i = transitions.indexOf(t);
        transitions[i] = (0,esm_extends/* default */.Z)((0,esm_extends/* default */.Z)({}, t), {}, {
          item: items[keyIndex]
        });
      } else if (props.leave) {
        transitions.splice(++i, 0, t);
      }
    });
  }

  if (esm.is.fun(sort)) {
    transitions.sort((a, b) => sort(a.item, b.item));
  } // Track cumulative delay for the "trail" prop.


  let delay = -trail; // Expired transitions use this to dismount.

  const forceUpdate = (0,esm.useForceUpdate)(); // These props are inherited by every phase change.

  const defaultProps = getDefaultProps(props); // Generate changes to apply in useEffect.

  const changes = new Map();
  (0,esm.each)(transitions, (t, i) => {
    const key = t.key;
    const prevPhase = t.phase;
    let to;
    let phase;

    if (prevPhase == MOUNT) {
      to = props.enter;
      phase = ENTER;
    } else {
      const isLeave = keys.indexOf(key) < 0;

      if (prevPhase != LEAVE) {
        if (isLeave) {
          to = props.leave;
          phase = LEAVE;
        } else if (to = props.update) {
          phase = UPDATE;
        } else return;
      } else if (!isLeave) {
        to = props.enter;
        phase = ENTER;
      } else return;
    } // When "to" is a function, it can return (1) an array of "useSpring" props,
    // (2) an async function, or (3) an object with any "useSpring" props.


    to = callProp(to, t.item, i);
    to = esm.is.obj(to) ? inferTo(to) : {
      to
    };

    if (!to.config) {
      const config = props.config || defaultProps.config;
      to.config = callProp(config, t.item, i);
    } // The payload is used to update the spring props once the current render is committed.


    const payload = (0,esm_extends/* default */.Z)((0,esm_extends/* default */.Z)({}, defaultProps), {}, {
      delay: delay += trail,
      // This prevents implied resets.
      reset: false
    }, to);

    if (phase == ENTER && esm.is.und(payload.from)) {
      // The `initial` prop is used on the first render of our parent component,
      // as well as when `reset: true` is passed. It overrides the `from` prop
      // when defined, and it makes `enter` instant when null.
      const from = esm.is.und(props.initial) || prevTransitions ? props.from : props.initial;
      payload.from = callProp(from, t.item, i);
    }

    const {
      onRest
    } = payload;

    payload.onRest = result => {
      const transitions = usedTransitions.current;
      const t = transitions.find(t => t.key === key);
      if (!t) return;

      if (esm.is.fun(onRest)) {
        onRest(result, t);
      } // Reset the phase of a cancelled enter/leave transition, so it can
      // retry the animation on the next render.


      if (result.cancelled && t.phase != UPDATE) {
        t.phase = prevPhase;
        return;
      }

      if (t.ctrl.idle) {
        const idle = transitions.every(t => t.ctrl.idle);

        if (t.phase == LEAVE) {
          const expiry = callProp(expires, t.item);

          if (expiry !== false) {
            const expiryMs = expiry === true ? 0 : expiry;
            t.expired = true; // Force update once the expiration delay ends.

            if (!idle && expiryMs > 0) {
              // The maximum timeout is 2^31-1
              if (expiryMs <= 0x7fffffff) t.expirationId = setTimeout(forceUpdate, expiryMs);
              return;
            }
          }
        } // Force update once idle and expired items exist.


        if (idle && transitions.some(t => t.expired)) {
          forceUpdate();
        }
      }
    };

    const springs = getSprings(t.ctrl, payload);
    changes.set(t, {
      phase,
      springs,
      payload
    });
  }); // The prop overrides from an ancestor.

  const context = useSpringContext(); // Merge the context into each transition.

  (0,esm_useLayoutEffect/* useLayoutEffect */.b)(() => {
    (0,esm.each)(transitions, t => {
      t.ctrl.start({
        default: context
      });
    });
  }, [context]);
  const api = (0,react.useMemo)(() => {
    return SpringHandle.create(() => {
      return usedTransitions.current.map(t => t.ctrl);
    });
  }, []);
  (0,react.useImperativeHandle)(ref, () => api);
  (0,esm_useLayoutEffect/* useLayoutEffect */.b)(() => {
    (0,esm.each)(changes, ({
      phase,
      springs,
      payload
    }, t) => {
      setSprings(t.ctrl, springs);

      if (!context.cancel) {
        t.phase = phase;

        if (phase == ENTER) {
          t.ctrl.start({
            default: context
          });
        }

        t.ctrl[ref ? 'update' : 'start'](payload);
      }
    });
  }, reset ? void 0 : deps);

  const renderTransitions = render => /*#__PURE__*/(0,react.createElement)(react.Fragment, null, transitions.map((t, i) => {
    const {
      springs
    } = changes.get(t) || t.ctrl;
    const elem = render((0,esm_extends/* default */.Z)({}, springs), t.item, t, i);
    return elem && elem.type ? /*#__PURE__*/(0,react.createElement)(elem.type, (0,esm_extends/* default */.Z)({}, elem.props, {
      key: esm.is.str(t.key) || esm.is.num(t.key) ? t.key : t.ctrl.id,
      ref: elem.ref
    })) : elem;
  }));

  return arguments.length == 3 ? [renderTransitions, api.start, api.stop] : renderTransitions;
}

function getKeys(items, {
  key,
  keys = key
}) {
  return esm.is.und(keys) ? items : esm.is.fun(keys) ? items.map(keys) : (0,esm.toArray)(keys);
}

/**
 * The `Spring` component passes `SpringValue` objects to your render prop.
 */
function Spring(_ref) {
  let {
    children
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, ["children"]);

  return children(useSpring(props));
}

function Trail(_ref) {
  let {
    items,
    children
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, ["items", "children"]);

  const trails = useTrail(items.length, props);
  return items.map((item, index) => {
    const result = children(item, index);
    return is.fun(result) ? result(trails[index]) : result;
  });
}

function Transition(_ref) {
  let {
    items,
    children
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, ["items", "children"]);

  return /*#__PURE__*/createElement(Fragment, null, useTransition(items, props)(children));
}

/**
 * An `Interpolation` is a memoized value that's computed whenever one of its
 * `FluidValue` dependencies has its value changed.
 *
 * Other `FrameValue` objects can depend on this. For example, passing an
 * `Interpolation` as the `to` prop of a `useSpring` call will trigger an
 * animation toward the memoized value.
 */

class Interpolation extends FrameValue {
  /** Useful for debugging. */

  /** Equals false when in the frameloop */

  /** The function that maps inputs values to output */
  constructor(source, args) {
    super();
    this.source = source;
    this.key = void 0;
    this.idle = true;
    this.calc = void 0;
    this.calc = (0,esm.createInterpolator)(...args);

    const value = this._get();

    const nodeType = esm.is.arr(value) ? animated/* AnimatedArray */.if : animated/* AnimatedValue */.iG; // Assume the computed value never changes type.

    (0,animated/* setAnimated */.f3)(this, nodeType.create(value));
  }

  advance(_dt) {
    const value = this._get();

    const oldValue = this.get();

    if (!(0,esm.isEqual)(value, oldValue)) {
      (0,animated/* getAnimated */.ys)(this).setValue(value);

      this._onChange(value, this.idle);
    }
  }

  _get() {
    const inputs = esm.is.arr(this.source) ? this.source.map(node => node.get()) : (0,esm.toArray)(this.source.get());
    return this.calc(...inputs);
  }

  _reset() {
    (0,esm.each)((0,animated/* getPayload */.He)(this), node => node.reset());

    super._reset();
  }

  _start() {
    this.idle = false;

    super._start();

    if (globals.skipAnimation) {
      this.idle = true;
      this.advance();
    } else {
      globals.frameLoop.start(this);
    }
  }

  _attach() {
    // Start observing our "source" once we have an observer.
    let idle = true;
    let priority = 1;
    (0,esm.each)((0,esm.toArray)(this.source), source => {
      if (isFrameValue(source)) {
        if (!source.idle) idle = false;
        priority = Math.max(priority, source.priority + 1);
      }

      source.addChild(this);
    });
    this.priority = priority;

    if (!idle) {
      this._reset();

      this._start();
    }
  }

  _detach() {
    // Stop observing our "source" once we have no observers.
    (0,esm.each)((0,esm.toArray)(this.source), source => {
      source.removeChild(this);
    }); // This removes us from the frameloop.

    this.idle = true;
  }
  /** @internal */


  onParentChange(event) {
    // Ensure our start value respects our parent values, in case
    // any of their animations were restarted with the "reset" prop.
    if (event.type == 'start') {
      this.advance();
    } // Change events are useful for (1) reacting to non-animated parents
    // and (2) reacting to the last change in a parent animation.
    else if (event.type == 'change') {
        // If we're idle, we know for sure that this change is *not*
        // caused by an animation.
        if (this.idle) {
          this.advance();
        } // Leave the frameloop when all parents are done animating.
        else if (event.idle) {
            this.idle = (0,esm.toArray)(this.source).every(source => source.idle !== false);

            if (this.idle) {
              this.advance();
              (0,esm.each)((0,animated/* getPayload */.He)(this), node => {
                node.done = true;
              });
            }
          }
      } // Ensure our priority is greater than all parents, which means
      // our value won't be updated until our parents have updated.
      else if (event.type == 'priority') {
          this.priority = (0,esm.toArray)(this.source).reduce((max, source) => Math.max(max, (source.priority || 0) + 1), 0);
        }

    super.onParentChange(event);
  }

}

/** Map the value of one or more dependencies */

const to = (source, ...args) => new Interpolation(source, args);
/** @deprecated Use the `to` export instead */

const interpolate = (source, ...args) => (deprecateInterpolate(), new Interpolation(source, args));
/** Extract the raw value types that are being interpolated */

esm/* Globals.assign */.O.assign({
  createStringInterpolator: stringInterpolation/* createStringInterpolator */.q,
  to: (source, args) => new Interpolation(source, args)
});
/** Advance all animations forward one frame */

const update = () => Globals.frameLoop.advance();


//# sourceMappingURL=index.js.map


/***/ }),

/***/ 5594:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "V": () => (/* binding */ FrameLoop)
/* harmony export */ });
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7011);

// The global `requestAnimationFrame` must be dereferenced to avoid "Illegal invocation" errors
var requestAnimationFrame = function (fn) {
    return (void 0, _globals__WEBPACK_IMPORTED_MODULE_0__.requestAnimationFrame)(fn);
};
/**
 * FrameLoop executes its animations in order of lowest priority first.
 * Animations are retained until idle.
 */
var FrameLoop = /** @class */ (function () {
    function FrameLoop(raf) {
        if (raf === void 0) { raf = requestAnimationFrame; }
        var idle = true;
        var writing = false;
        // The most recent framestamp
        var lastTime = 0;
        // The active animations for the current frame, sorted by lowest priority first
        var animations = [];
        // The priority of the currently advancing animation.
        // To protect against a race condition whenever a frame is being processed,
        // where the filtering of `animations` is corrupted with a shifting index,
        // causing animations to potentially advance 2x faster than intended.
        var priority = 0;
        // Animations starting on the next frame
        var startQueue = new Set();
        // Flushed after all animations are updated.
        // Used to dispatch events to an "onFrame" prop, for example.
        var frameQueue = new Set();
        // Flushed at the very end of each frame.
        // Used to avoid layout thrashing in @react-spring/web, for example.
        var writeQueue = new Set();
        // Add an animation to the frameloop
        var start = function (animation) {
            var index = animations.indexOf(animation);
            if (index < 0) {
                index = animations.findIndex(function (other) { return other.priority > animation.priority; });
                animations.splice(~index ? index : animations.length, 0, animation);
            }
        };
        var loop = function () {
            if (idle)
                return;
            try {
                advance();
                raf(loop);
            }
            catch (e) {
                console.error(e);
            }
        };
        // Start the frameloop
        var kickoff = function () {
            if (idle) {
                idle = false;
                // To minimize frame skips, the frameloop never stops.
                if (lastTime == 0) {
                    lastTime = _globals__WEBPACK_IMPORTED_MODULE_0__.now();
                    raf(loop);
                }
            }
        };
        var timeoutQueue = [];
        this.setTimeout = function (handler, ms) {
            var time = _globals__WEBPACK_IMPORTED_MODULE_0__.now() + ms;
            var cancel = function () {
                var index = timeoutQueue.findIndex(function (t) { return t.cancel == cancel; });
                if (index >= 0) {
                    timeoutQueue.splice(index, 1);
                }
            };
            var index = findIndex(timeoutQueue, function (t) { return t.time > time; });
            var timeout = { time: time, handler: handler, cancel: cancel };
            timeoutQueue.splice(index, 0, timeout);
            kickoff();
            return timeout;
        };
        // Process the current frame.
        var advance = (this.advance = function () {
            var time = _globals__WEBPACK_IMPORTED_MODULE_0__.now();
            // Start animations that were added during last frame.
            if (startQueue.size) {
                startQueue.forEach(start);
                startQueue.clear();
            }
            // Flush the timeout queue.
            if (timeoutQueue.length) {
                _globals__WEBPACK_IMPORTED_MODULE_0__.batchedUpdates(function () {
                    var count = findIndex(timeoutQueue, function (t) { return t.time > time; });
                    timeoutQueue.splice(0, count).forEach(function (t) { return t.handler(); });
                });
            }
            if (time > lastTime) {
                // http://gafferongames.com/game-physics/fix-your-timestep/
                var dt_1 = Math.min(64, time - lastTime);
                lastTime = time;
                _globals__WEBPACK_IMPORTED_MODULE_0__.batchedUpdates(function () {
                    // Animations can be added while the frameloop is updating,
                    // but they need a higher priority to be started on this frame.
                    if (animations.length) {
                        _globals__WEBPACK_IMPORTED_MODULE_0__.willAdvance(animations);
                        animations = animations.filter(function (animation) {
                            priority = animation.priority;
                            // Animations may go idle before the next frame.
                            if (!animation.idle) {
                                animation.advance(dt_1);
                            }
                            // Remove idle animations.
                            return !animation.idle;
                        });
                        priority = 0;
                    }
                    if (frameQueue.size) {
                        frameQueue.forEach(function (onFrame) { return onFrame(time); });
                        frameQueue.clear();
                    }
                    if (writeQueue.size) {
                        writing = true;
                        writeQueue.forEach(function (write) { return write(time); });
                        writeQueue.clear();
                        writing = false;
                    }
                });
            }
        });
        this.start = function (animation) {
            if (priority > animation.priority) {
                startQueue.add(animation);
            }
            else {
                start(animation);
                kickoff();
            }
        };
        this.onFrame = function (cb) {
            frameQueue.add(cb);
            kickoff();
        };
        this.onWrite = function (cb) {
            if (writing)
                cb(lastTime);
            else
                writeQueue.add(cb);
        };
        // Expose internals for testing.
        if (typeof process !== 'undefined' &&
            "production" !== 'production') {
            var dispose_1 = function () {
                idle = true;
                startQueue.clear();
                timeoutQueue.length = 0;
            };
            Object.defineProperties(this, {
                _animations: { get: function () { return animations; } },
                _dispose: { get: function () { return dispose_1; } },
            });
        }
    }
    return FrameLoop;
}());

/** Like `Array.prototype.findIndex` but returns `arr.length` instead of `-1` */
function findIndex(arr, test) {
    var index = arr.findIndex(test);
    return index < 0 ? arr.length : index;
}
//# sourceMappingURL=FrameLoop.js.map

/***/ }),

/***/ 9210:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// http://www.w3.org/TR/css3-color/#svg-color
var colors = {
    transparent: 0x00000000,
    aliceblue: 0xf0f8ffff,
    antiquewhite: 0xfaebd7ff,
    aqua: 0x00ffffff,
    aquamarine: 0x7fffd4ff,
    azure: 0xf0ffffff,
    beige: 0xf5f5dcff,
    bisque: 0xffe4c4ff,
    black: 0x000000ff,
    blanchedalmond: 0xffebcdff,
    blue: 0x0000ffff,
    blueviolet: 0x8a2be2ff,
    brown: 0xa52a2aff,
    burlywood: 0xdeb887ff,
    burntsienna: 0xea7e5dff,
    cadetblue: 0x5f9ea0ff,
    chartreuse: 0x7fff00ff,
    chocolate: 0xd2691eff,
    coral: 0xff7f50ff,
    cornflowerblue: 0x6495edff,
    cornsilk: 0xfff8dcff,
    crimson: 0xdc143cff,
    cyan: 0x00ffffff,
    darkblue: 0x00008bff,
    darkcyan: 0x008b8bff,
    darkgoldenrod: 0xb8860bff,
    darkgray: 0xa9a9a9ff,
    darkgreen: 0x006400ff,
    darkgrey: 0xa9a9a9ff,
    darkkhaki: 0xbdb76bff,
    darkmagenta: 0x8b008bff,
    darkolivegreen: 0x556b2fff,
    darkorange: 0xff8c00ff,
    darkorchid: 0x9932ccff,
    darkred: 0x8b0000ff,
    darksalmon: 0xe9967aff,
    darkseagreen: 0x8fbc8fff,
    darkslateblue: 0x483d8bff,
    darkslategray: 0x2f4f4fff,
    darkslategrey: 0x2f4f4fff,
    darkturquoise: 0x00ced1ff,
    darkviolet: 0x9400d3ff,
    deeppink: 0xff1493ff,
    deepskyblue: 0x00bfffff,
    dimgray: 0x696969ff,
    dimgrey: 0x696969ff,
    dodgerblue: 0x1e90ffff,
    firebrick: 0xb22222ff,
    floralwhite: 0xfffaf0ff,
    forestgreen: 0x228b22ff,
    fuchsia: 0xff00ffff,
    gainsboro: 0xdcdcdcff,
    ghostwhite: 0xf8f8ffff,
    gold: 0xffd700ff,
    goldenrod: 0xdaa520ff,
    gray: 0x808080ff,
    green: 0x008000ff,
    greenyellow: 0xadff2fff,
    grey: 0x808080ff,
    honeydew: 0xf0fff0ff,
    hotpink: 0xff69b4ff,
    indianred: 0xcd5c5cff,
    indigo: 0x4b0082ff,
    ivory: 0xfffff0ff,
    khaki: 0xf0e68cff,
    lavender: 0xe6e6faff,
    lavenderblush: 0xfff0f5ff,
    lawngreen: 0x7cfc00ff,
    lemonchiffon: 0xfffacdff,
    lightblue: 0xadd8e6ff,
    lightcoral: 0xf08080ff,
    lightcyan: 0xe0ffffff,
    lightgoldenrodyellow: 0xfafad2ff,
    lightgray: 0xd3d3d3ff,
    lightgreen: 0x90ee90ff,
    lightgrey: 0xd3d3d3ff,
    lightpink: 0xffb6c1ff,
    lightsalmon: 0xffa07aff,
    lightseagreen: 0x20b2aaff,
    lightskyblue: 0x87cefaff,
    lightslategray: 0x778899ff,
    lightslategrey: 0x778899ff,
    lightsteelblue: 0xb0c4deff,
    lightyellow: 0xffffe0ff,
    lime: 0x00ff00ff,
    limegreen: 0x32cd32ff,
    linen: 0xfaf0e6ff,
    magenta: 0xff00ffff,
    maroon: 0x800000ff,
    mediumaquamarine: 0x66cdaaff,
    mediumblue: 0x0000cdff,
    mediumorchid: 0xba55d3ff,
    mediumpurple: 0x9370dbff,
    mediumseagreen: 0x3cb371ff,
    mediumslateblue: 0x7b68eeff,
    mediumspringgreen: 0x00fa9aff,
    mediumturquoise: 0x48d1ccff,
    mediumvioletred: 0xc71585ff,
    midnightblue: 0x191970ff,
    mintcream: 0xf5fffaff,
    mistyrose: 0xffe4e1ff,
    moccasin: 0xffe4b5ff,
    navajowhite: 0xffdeadff,
    navy: 0x000080ff,
    oldlace: 0xfdf5e6ff,
    olive: 0x808000ff,
    olivedrab: 0x6b8e23ff,
    orange: 0xffa500ff,
    orangered: 0xff4500ff,
    orchid: 0xda70d6ff,
    palegoldenrod: 0xeee8aaff,
    palegreen: 0x98fb98ff,
    paleturquoise: 0xafeeeeff,
    palevioletred: 0xdb7093ff,
    papayawhip: 0xffefd5ff,
    peachpuff: 0xffdab9ff,
    peru: 0xcd853fff,
    pink: 0xffc0cbff,
    plum: 0xdda0ddff,
    powderblue: 0xb0e0e6ff,
    purple: 0x800080ff,
    rebeccapurple: 0x663399ff,
    red: 0xff0000ff,
    rosybrown: 0xbc8f8fff,
    royalblue: 0x4169e1ff,
    saddlebrown: 0x8b4513ff,
    salmon: 0xfa8072ff,
    sandybrown: 0xf4a460ff,
    seagreen: 0x2e8b57ff,
    seashell: 0xfff5eeff,
    sienna: 0xa0522dff,
    silver: 0xc0c0c0ff,
    skyblue: 0x87ceebff,
    slateblue: 0x6a5acdff,
    slategray: 0x708090ff,
    slategrey: 0x708090ff,
    snow: 0xfffafaff,
    springgreen: 0x00ff7fff,
    steelblue: 0x4682b4ff,
    tan: 0xd2b48cff,
    teal: 0x008080ff,
    thistle: 0xd8bfd8ff,
    tomato: 0xff6347ff,
    turquoise: 0x40e0d0ff,
    violet: 0xee82eeff,
    wheat: 0xf5deb3ff,
    white: 0xffffffff,
    whitesmoke: 0xf5f5f5ff,
    yellow: 0xffff00ff,
    yellowgreen: 0x9acd32ff,
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (colors);
//# sourceMappingURL=colors.js.map

/***/ }),

/***/ 2549:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "m": () => (/* binding */ createInterpolator)
/* harmony export */ });
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7011);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5700);


var createInterpolator = function (range, output, extrapolate) {
    if (_helpers__WEBPACK_IMPORTED_MODULE_1__.is.fun(range)) {
        return range;
    }
    if (_helpers__WEBPACK_IMPORTED_MODULE_1__.is.arr(range)) {
        return createInterpolator({
            range: range,
            output: output,
            extrapolate: extrapolate,
        });
    }
    if (_helpers__WEBPACK_IMPORTED_MODULE_1__.is.str(range.output[0])) {
        return _globals__WEBPACK_IMPORTED_MODULE_0__.createStringInterpolator(range);
    }
    var config = range;
    var outputRange = config.output;
    var inputRange = config.range || [0, 1];
    var extrapolateLeft = config.extrapolateLeft || config.extrapolate || 'extend';
    var extrapolateRight = config.extrapolateRight || config.extrapolate || 'extend';
    var easing = config.easing || (function (t) { return t; });
    return function (input) {
        var range = findRange(input, inputRange);
        return interpolate(input, inputRange[range], inputRange[range + 1], outputRange[range], outputRange[range + 1], easing, extrapolateLeft, extrapolateRight, config.map);
    };
};
function interpolate(input, inputMin, inputMax, outputMin, outputMax, easing, extrapolateLeft, extrapolateRight, map) {
    var result = map ? map(input) : input;
    // Extrapolate
    if (result < inputMin) {
        if (extrapolateLeft === 'identity')
            return result;
        else if (extrapolateLeft === 'clamp')
            result = inputMin;
    }
    if (result > inputMax) {
        if (extrapolateRight === 'identity')
            return result;
        else if (extrapolateRight === 'clamp')
            result = inputMax;
    }
    if (outputMin === outputMax)
        return outputMin;
    if (inputMin === inputMax)
        return input <= inputMin ? outputMin : outputMax;
    // Input Range
    if (inputMin === -Infinity)
        result = -result;
    else if (inputMax === Infinity)
        result = result - inputMin;
    else
        result = (result - inputMin) / (inputMax - inputMin);
    // Easing
    result = easing(result);
    // Output Range
    if (outputMin === -Infinity)
        result = -result;
    else if (outputMax === Infinity)
        result = result + outputMin;
    else
        result = result * (outputMax - outputMin) + outputMin;
    return result;
}
function findRange(input, inputRange) {
    for (var i = 1; i < inputRange.length - 1; ++i)
        if (inputRange[i] >= input)
            break;
    return i - 1;
}
//# sourceMappingURL=createInterpolator.js.map

/***/ }),

/***/ 7011:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createStringInterpolator": () => (/* binding */ createStringInterpolator),
/* harmony export */   "frameLoop": () => (/* binding */ frameLoop),
/* harmony export */   "to": () => (/* binding */ to),
/* harmony export */   "now": () => (/* binding */ now),
/* harmony export */   "colorNames": () => (/* binding */ colorNames),
/* harmony export */   "skipAnimation": () => (/* binding */ skipAnimation),
/* harmony export */   "requestAnimationFrame": () => (/* binding */ requestAnimationFrame),
/* harmony export */   "batchedUpdates": () => (/* binding */ batchedUpdates),
/* harmony export */   "willAdvance": () => (/* binding */ willAdvance),
/* harmony export */   "assign": () => (/* binding */ assign)
/* harmony export */ });
/* harmony import */ var _FrameLoop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5594);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5700);


//
// Required
//
var createStringInterpolator;
var frameLoop = new _FrameLoop__WEBPACK_IMPORTED_MODULE_0__/* .FrameLoop */ .V();
//
// Optional
//
var to;
var now = function () { return performance.now(); };
var colorNames = null;
var skipAnimation = false;
var requestAnimationFrame = typeof window !== 'undefined' ? window.requestAnimationFrame : function () { return -1; };
var batchedUpdates = function (callback) { return callback(); };
var willAdvance = _helpers__WEBPACK_IMPORTED_MODULE_1__/* .noop */ .ZT;
var assign = function (globals) {
    var _a;
    return (_a = Object.assign({
        to: to,
        now: now,
        frameLoop: frameLoop,
        colorNames: colorNames,
        skipAnimation: skipAnimation,
        createStringInterpolator: createStringInterpolator,
        requestAnimationFrame: requestAnimationFrame,
        batchedUpdates: batchedUpdates,
        willAdvance: willAdvance,
    }, pluckDefined(globals)), to = _a.to, now = _a.now, frameLoop = _a.frameLoop, colorNames = _a.colorNames, skipAnimation = _a.skipAnimation, createStringInterpolator = _a.createStringInterpolator, requestAnimationFrame = _a.requestAnimationFrame, batchedUpdates = _a.batchedUpdates, willAdvance = _a.willAdvance, _a);
};
// Ignore undefined values
function pluckDefined(globals) {
    var defined = {};
    for (var key in globals) {
        if (globals[key] !== undefined)
            defined[key] = globals[key];
    }
    return defined;
}
//# sourceMappingURL=globals.js.map

/***/ }),

/***/ 5700:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZT": () => (/* binding */ noop),
/* harmony export */   "dE": () => (/* binding */ defineHidden),
/* harmony export */   "is": () => (/* binding */ is),
/* harmony export */   "Xy": () => (/* binding */ isEqual),
/* harmony export */   "Df": () => (/* binding */ isAnimatedString),
/* harmony export */   "S6": () => (/* binding */ each),
/* harmony export */   "qo": () => (/* binding */ toArray),
/* harmony export */   "yl": () => (/* binding */ flush)
/* harmony export */ });
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7011);

var noop = function () { };
var defineHidden = function (obj, key, value) {
    return Object.defineProperty(obj, key, { value: value, writable: true, configurable: true });
};
var is = {
    arr: Array.isArray,
    obj: function (a) {
        return !!a && a.constructor.name === 'Object';
    },
    fun: function (a) { return typeof a === 'function'; },
    str: function (a) { return typeof a === 'string'; },
    num: function (a) { return typeof a === 'number'; },
    und: function (a) { return a === undefined; },
};
/** Compare animatable values */
function isEqual(a, b) {
    if (is.arr(a)) {
        if (!is.arr(b) || a.length !== b.length)
            return false;
        for (var i = 0; i < a.length; i++) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    }
    return a === b;
}
// Not all strings can be animated (eg: {display: "none"})
var isAnimatedString = function (value) {
    return is.str(value) &&
        (value[0] == '#' ||
            /\d/.test(value) ||
            !!(_globals__WEBPACK_IMPORTED_MODULE_0__.colorNames && _globals__WEBPACK_IMPORTED_MODULE_0__.colorNames[value]));
};
/** An unsafe object/array/set iterator that allows for better minification */
var each = function (obj, cb, ctx) {
    if (is.fun(obj.forEach)) {
        obj.forEach(cb, ctx);
    }
    else {
        Object.keys(obj).forEach(function (key) {
            return cb.call(ctx, obj[key], key);
        });
    }
};
var toArray = function (a) {
    return is.und(a) ? [] : is.arr(a) ? a : [a];
};
function flush(queue, iterator) {
    if (queue.size) {
        var items = Array.from(queue);
        queue.clear();
        each(items, iterator);
    }
}
//# sourceMappingURL=helpers.js.map

/***/ }),

/***/ 5254:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "FluidValue": () => (/* reexport */ esm/* FluidValue */.B0),
  "O": () => (/* reexport */ globals),
  "createInterpolator": () => (/* reexport */ createInterpolator/* createInterpolator */.m),
  "defineHidden": () => (/* reexport */ helpers/* defineHidden */.dE),
  "each": () => (/* reexport */ helpers/* each */.S6),
  "flush": () => (/* reexport */ helpers/* flush */.yl),
  "getFluidConfig": () => (/* reexport */ esm/* getFluidConfig */.Qb),
  "getFluidValue": () => (/* reexport */ esm/* getFluidValue */.je),
  "is": () => (/* reexport */ helpers.is),
  "isAnimatedString": () => (/* reexport */ helpers/* isAnimatedString */.Df),
  "isEqual": () => (/* reexport */ helpers/* isEqual */.Xy),
  "noop": () => (/* reexport */ helpers/* noop */.ZT),
  "toArray": () => (/* reexport */ helpers/* toArray */.qo),
  "useForceUpdate": () => (/* reexport */ useForceUpdate),
  "useOnce": () => (/* reexport */ useOnce)
});

// UNUSED EXPORTS: FrameLoop, addFluidObserver, hasFluidValue, setFluidConfig, usePrev

// EXTERNAL MODULE: ../node_modules/@react-spring/shared/esm/globals.js
var globals = __webpack_require__(7011);
// EXTERNAL MODULE: ../node_modules/@alloc/types/index.js
var types = __webpack_require__(1581);
;// CONCATENATED MODULE: ../node_modules/@react-spring/shared/esm/types.util.js

//# sourceMappingURL=types.util.js.map
// EXTERNAL MODULE: ../node_modules/react/index.js
var react = __webpack_require__(7378);
;// CONCATENATED MODULE: ../node_modules/@react-spring/shared/esm/hooks.js

var useOnce = function (effect) { return (0,react.useEffect)(effect, []); };
/** Return a function that re-renders this component, if still mounted */
var useForceUpdate = function () {
    var update = (0,react.useState)(0)[1];
    var unmounted = (0,react.useRef)(false);
    useOnce(function () { return function () {
        unmounted.current = true;
    }; });
    return function () {
        if (!unmounted.current) {
            update({});
        }
    };
};
/** Use a value from the previous render */
function usePrev(value) {
    var prevRef = useRef(undefined);
    useEffect(function () {
        prevRef.current = value;
    });
    return prevRef.current;
}
//# sourceMappingURL=hooks.js.map
// EXTERNAL MODULE: ../node_modules/@react-spring/shared/esm/helpers.js
var helpers = __webpack_require__(5700);
// EXTERNAL MODULE: ../node_modules/@react-spring/shared/esm/FrameLoop.js
var FrameLoop = __webpack_require__(5594);
// EXTERNAL MODULE: ../node_modules/@react-spring/shared/esm/createInterpolator.js
var createInterpolator = __webpack_require__(2549);
// EXTERNAL MODULE: ../node_modules/fluids/dist/esm/index.js
var esm = __webpack_require__(6399);
;// CONCATENATED MODULE: ../node_modules/@react-spring/shared/esm/index.js








//# sourceMappingURL=index.js.map

/***/ }),

/***/ 2183:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "q": () => (/* binding */ createStringInterpolator)
});

;// CONCATENATED MODULE: ../node_modules/@react-spring/shared/node_modules/tslib/tslib.es6.js
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}

// EXTERNAL MODULE: ../node_modules/fluids/dist/esm/index.js
var esm = __webpack_require__(6399);
// EXTERNAL MODULE: ../node_modules/@react-spring/shared/esm/createInterpolator.js
var createInterpolator = __webpack_require__(2549);
;// CONCATENATED MODULE: ../node_modules/@react-spring/shared/esm/colorMatchers.js
// const INTEGER = '[-+]?\\d+';
var NUMBER = '[-+]?\\d*\\.?\\d+';
var PERCENTAGE = NUMBER + '%';
function call() {
    var parts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        parts[_i] = arguments[_i];
    }
    return '\\(\\s*(' + parts.join(')\\s*,\\s*(') + ')\\s*\\)';
}
var rgb = new RegExp('rgb' + call(NUMBER, NUMBER, NUMBER));
var rgba = new RegExp('rgba' + call(NUMBER, NUMBER, NUMBER, NUMBER));
var hsl = new RegExp('hsl' + call(NUMBER, PERCENTAGE, PERCENTAGE));
var hsla = new RegExp('hsla' + call(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER));
var hex3 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
var hex4 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
var hex6 = /^#([0-9a-fA-F]{6})$/;
var hex8 = /^#([0-9a-fA-F]{8})$/;
//# sourceMappingURL=colorMatchers.js.map
// EXTERNAL MODULE: ../node_modules/@react-spring/shared/esm/globals.js
var globals = __webpack_require__(7011);
;// CONCATENATED MODULE: ../node_modules/@react-spring/shared/esm/normalizeColor.js
/*
https://github.com/react-community/normalize-css-color

BSD 3-Clause License

Copyright (c) 2016, React Community
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of the copyright holder nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


function normalizeColor(color) {
    var match;
    if (typeof color === 'number') {
        return color >>> 0 === color && color >= 0 && color <= 0xffffffff
            ? color
            : null;
    }
    // Ordered based on occurrences on Facebook codebase
    if ((match = hex6.exec(color)))
        return parseInt(match[1] + 'ff', 16) >>> 0;
    if (globals.colorNames && globals.colorNames[color] !== undefined) {
        return globals.colorNames[color];
    }
    if ((match = rgb.exec(color))) {
        return (((parse255(match[1]) << 24) | // r
            (parse255(match[2]) << 16) | // g
            (parse255(match[3]) << 8) | // b
            0x000000ff) >>> // a
            0);
    }
    if ((match = rgba.exec(color))) {
        return (((parse255(match[1]) << 24) | // r
            (parse255(match[2]) << 16) | // g
            (parse255(match[3]) << 8) | // b
            parse1(match[4])) >>> // a
            0);
    }
    if ((match = hex3.exec(color))) {
        return (parseInt(match[1] +
            match[1] + // r
            match[2] +
            match[2] + // g
            match[3] +
            match[3] + // b
            'ff', // a
        16) >>> 0);
    }
    // https://drafts.csswg.org/css-color-4/#hex-notation
    if ((match = hex8.exec(color)))
        return parseInt(match[1], 16) >>> 0;
    if ((match = hex4.exec(color))) {
        return (parseInt(match[1] +
            match[1] + // r
            match[2] +
            match[2] + // g
            match[3] +
            match[3] + // b
            match[4] +
            match[4], // a
        16) >>> 0);
    }
    if ((match = hsl.exec(color))) {
        return ((hslToRgb(parse360(match[1]), // h
        parsePercentage(match[2]), // s
        parsePercentage(match[3]) // l
        ) |
            0x000000ff) >>> // a
            0);
    }
    if ((match = hsla.exec(color))) {
        return ((hslToRgb(parse360(match[1]), // h
        parsePercentage(match[2]), // s
        parsePercentage(match[3]) // l
        ) |
            parse1(match[4])) >>> // a
            0);
    }
    return null;
}
function hue2rgb(h, c, x) {
    if (h < 60)
        return [c, x, 0];
    if (h < 120)
        return [x, c, 0];
    if (h < 180)
        return [0, c, x];
    if (h < 240)
        return [0, x, c];
    if (h < 300)
        return [x, 0, c];
    return [c, 0, x];
}
function hslToRgb(h, s, l) {
    var C = (1 - Math.abs(2 * l - 1)) * s;
    var X = C * (1 - Math.abs(((h / 60) % 2) - 1));
    var M = l - C / 2;
    var _a = hue2rgb(h, C, X), R1 = _a[0], G1 = _a[1], B1 = _a[2];
    return ((Math.round((R1 + M) * 255) << 24) |
        (Math.round((G1 + M) * 255) << 16) |
        (Math.round((B1 + M) * 255) << 8));
}
function parse255(str) {
    var int = parseInt(str, 10);
    if (int < 0)
        return 0;
    if (int > 255)
        return 255;
    return int;
}
function parse360(str) {
    var int = parseFloat(str);
    return (((int % 360) + 360) % 360) / 360;
}
function parse1(str) {
    var num = parseFloat(str);
    if (num < 0)
        return 0;
    if (num > 1)
        return 255;
    return Math.round(num * 255);
}
function parsePercentage(str) {
    // parseFloat conveniently ignores the final %
    var int = parseFloat(str);
    if (int < 0)
        return 0;
    if (int > 100)
        return 1;
    return int / 100;
}
//# sourceMappingURL=normalizeColor.js.map
;// CONCATENATED MODULE: ../node_modules/@react-spring/shared/esm/colorToRgba.js

function colorToRgba(input) {
    var int32Color = normalizeColor(input);
    if (int32Color === null)
        return input;
    int32Color = int32Color || 0;
    var r = (int32Color & 0xff000000) >>> 24;
    var g = (int32Color & 0x00ff0000) >>> 16;
    var b = (int32Color & 0x0000ff00) >>> 8;
    var a = (int32Color & 0x000000ff) / 255;
    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}
//# sourceMappingURL=colorToRgba.js.map
;// CONCATENATED MODULE: ../node_modules/@react-spring/shared/esm/stringInterpolation.js





// Problem: https://github.com/animatedjs/animated/pull/102
// Solution: https://stackoverflow.com/questions/638565/parsing-scientific-notation-sensibly/658662
var numberRegex = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
// Covers rgb, rgba, hsl, hsla
// Taken from https://gist.github.com/olmokramer/82ccce673f86db7cda5e
var colorRegex = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi;
// Covers color names (transparent, blue, etc.)
var colorNamesRegex;
// rgba requires that the r,g,b are integers.... so we want to round them,
// but we *dont* want to round the opacity (4th column).
var rgbaRegex = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi;
var rgbaRound = function (_, p1, p2, p3, p4) {
    return "rgba(" + Math.round(p1) + ", " + Math.round(p2) + ", " + Math.round(p3) + ", " + p4 + ")";
};
/**
 * Supports string shapes by extracting numbers so new values can be computed,
 * and recombines those values into new strings of the same shape.  Supports
 * things like:
 *
 *     "rgba(123, 42, 99, 0.36)"           // colors
 *     "-45deg"                            // values with units
 *     "0 2px 2px 0px rgba(0, 0, 0, 0.12)" // CSS box-shadows
 *     "rotate(0deg) translate(2px, 3px)"  // CSS transforms
 */
var createStringInterpolator = function (config) {
    if (!colorNamesRegex)
        colorNamesRegex = globals.colorNames
            ? new RegExp("(" + Object.keys(globals.colorNames).join('|') + ")", 'g')
            : /^\b$/; // never match
    // Convert colors to rgba(...)
    var output = config.output.map(function (value) {
        return (0,esm/* getFluidValue */.je)(value)
            .replace(colorRegex, colorToRgba)
            .replace(colorNamesRegex, colorToRgba);
    });
    // Convert ["1px 2px", "0px 0px"] into [[1, 2], [0, 0]]
    var keyframes = output.map(function (value) { return value.match(numberRegex).map(Number); });
    // Convert ["1px 2px", "0px 0px"] into [[1, 0], [2, 0]]
    var outputRanges = keyframes[0].map(function (_, i) {
        return keyframes.map(function (values) {
            if (!(i in values)) {
                throw Error('The arity of each "output" value must be equal');
            }
            return values[i];
        });
    });
    // Create an interpolator for each animated number
    var interpolators = outputRanges.map(function (output) {
        return (0,createInterpolator/* createInterpolator */.m)(__assign(__assign({}, config), { output: output }));
    });
    // Use the first `output` as a template for each call
    return function (input) {
        var i = 0;
        return output[0]
            .replace(numberRegex, function () { return String(interpolators[i++](input)); })
            .replace(rgbaRegex, rgbaRound);
    };
};
//# sourceMappingURL=stringInterpolation.js.map

/***/ }),

/***/ 4681:
/***/ (() => {

//# sourceMappingURL=types.js.map

/***/ }),

/***/ 8453:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* reexport safe */ _react_spring_core__WEBPACK_IMPORTED_MODULE_0__.vc),
/* harmony export */   "useTransition": () => (/* reexport safe */ _react_spring_core__WEBPACK_IMPORTED_MODULE_0__.Yz),
/* harmony export */   "q": () => (/* binding */ animated)
/* harmony export */ });
/* unused harmony export a */
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(120);
/* harmony import */ var _react_spring_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(962);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1542);
/* harmony import */ var _react_spring_shared_stringInterpolation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2183);
/* harmony import */ var _react_spring_shared_colors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9210);
/* harmony import */ var _react_spring_animated__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3941);
/* harmony import */ var _react_spring_shared__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5254);









const isCustomPropRE = /^--/;

function dangerousStyleValue(name, value) {
  if (value == null || typeof value === 'boolean' || value === '') return '';
  if (typeof value === 'number' && value !== 0 && !isCustomPropRE.test(name) && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])) return value + 'px'; // Presumes implicit 'px' suffix for unitless numbers

  return ('' + value).trim();
}

const attributeCache = {};
function applyAnimatedValues(instance, props) {
  if (!instance.nodeType || !instance.setAttribute) {
    return false;
  }

  const isFilterElement = instance.nodeName === 'filter' || instance.parentNode && instance.parentNode.nodeName === 'filter';

  const _ref = props,
        {
    style,
    children,
    scrollTop,
    scrollLeft
  } = _ref,
        attributes = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_6__/* .default */ .Z)(_ref, ["style", "children", "scrollTop", "scrollLeft"]);

  const values = Object.values(attributes);
  const names = Object.keys(attributes).map(name => isFilterElement || instance.hasAttribute(name) ? name : attributeCache[name] || (attributeCache[name] = name.replace(/([A-Z])/g, // Attributes are written in dash case
  n => '-' + n.toLowerCase())));
  _react_spring_shared__WEBPACK_IMPORTED_MODULE_5__/* .Globals.frameLoop.onWrite */ .O.frameLoop.onWrite(() => {
    if (children !== void 0) {
      instance.textContent = children;
    } // Apply CSS styles


    for (let name in style) {
      if (style.hasOwnProperty(name)) {
        const value = dangerousStyleValue(name, style[name]);
        if (name === 'float') name = 'cssFloat';else if (isCustomPropRE.test(name)) {
          instance.style.setProperty(name, value);
        } else {
          instance.style[name] = value;
        }
      }
    } // Apply DOM attributes


    names.forEach((name, i) => {
      instance.setAttribute(name, values[i]);
    });

    if (scrollTop !== void 0) {
      instance.scrollTop = scrollTop;
    }

    if (scrollLeft !== void 0) {
      instance.scrollLeft = scrollLeft;
    }
  });
}
let isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};

const prefixKey = (prefix, key) => prefix + key.charAt(0).toUpperCase() + key.substring(1);

const prefixes = ['Webkit', 'Ms', 'Moz', 'O'];
isUnitlessNumber = Object.keys(isUnitlessNumber).reduce((acc, prop) => {
  prefixes.forEach(prefix => acc[prefixKey(prefix, prop)] = acc[prop]);
  return acc;
}, isUnitlessNumber);

/** The transform-functions
 * (https://developer.mozilla.org/fr/docs/Web/CSS/transform-function)
 * that you can pass as keys to your animated component style and that will be
 * animated. Perspective has been left out as it would conflict with the
 * non-transform perspective style.
 */

const domTransforms = /^(matrix|translate|scale|rotate|skew)/; // These keys have "px" units by default

const pxTransforms = /^(translate)/; // These keys have "deg" units by default

const degTransforms = /^(rotate|skew)/;

/** Add a unit to the value when the value is unit-less (eg: a number) */
const addUnit = (value, unit) => _react_spring_shared__WEBPACK_IMPORTED_MODULE_5__.is.num(value) && value !== 0 ? value + unit : value;
/**
 * Checks if the input value matches the identity value.
 *
 *     isValueIdentity(0, 0)              // => true
 *     isValueIdentity('0px', 0)          // => true
 *     isValueIdentity([0, '0px', 0], 0)  // => true
 */


const isValueIdentity = (value, id) => _react_spring_shared__WEBPACK_IMPORTED_MODULE_5__.is.arr(value) ? value.every(v => isValueIdentity(v, id)) : _react_spring_shared__WEBPACK_IMPORTED_MODULE_5__.is.num(value) ? value === id : parseFloat(value) === id;

/**
 * This AnimatedStyle will simplify animated components transforms by
 * interpolating all transform function passed as keys in the style object
 * including shortcuts such as x, y and z for translateX/Y/Z
 */
class AnimatedStyle extends _react_spring_animated__WEBPACK_IMPORTED_MODULE_4__/* .AnimatedObject */ .rS {
  constructor(_ref) {
    let {
      x,
      y,
      z
    } = _ref,
        style = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_6__/* .default */ .Z)(_ref, ["x", "y", "z"]);

    /**
     * An array of arrays that contains the values (static or fluid)
     * used by each transform function.
     */
    const inputs = [];
    /**
     * An array of functions that take a list of values (static or fluid)
     * and returns (1) a CSS transform string and (2) a boolean that's true
     * when the transform has no effect (eg: an identity transform).
     */

    const transforms = []; // Combine x/y/z into translate3d

    if (x || y || z) {
      inputs.push([x || 0, y || 0, z || 0]);
      transforms.push(xyz => ["translate3d(" + xyz.map(v => addUnit(v, 'px')).join(',') + ")", // prettier-ignore
      isValueIdentity(xyz, 0)]);
    } // Pluck any other transform-related props


    (0,_react_spring_shared__WEBPACK_IMPORTED_MODULE_5__.each)(style, (value, key) => {
      if (key === 'transform') {
        inputs.push([value || '']);
        transforms.push(transform => [transform, transform === '']);
      } else if (domTransforms.test(key)) {
        delete style[key];
        if (_react_spring_shared__WEBPACK_IMPORTED_MODULE_5__.is.und(value)) return;
        const unit = pxTransforms.test(key) ? 'px' : degTransforms.test(key) ? 'deg' : '';
        inputs.push((0,_react_spring_shared__WEBPACK_IMPORTED_MODULE_5__.toArray)(value));
        transforms.push(key === 'rotate3d' ? ([x, y, z, deg]) => ["rotate3d(" + x + "," + y + "," + z + "," + addUnit(deg, unit) + ")", isValueIdentity(deg, 0)] : input => [key + "(" + input.map(v => addUnit(v, unit)).join(',') + ")", isValueIdentity(input, key.startsWith('scale') ? 1 : 0)]);
      }
    });

    if (inputs.length) {
      style.transform = new FluidTransform(inputs, transforms);
    }

    super(style);
  }

}
/** @internal */

class FluidTransform extends _react_spring_shared__WEBPACK_IMPORTED_MODULE_5__.FluidValue {
  constructor(inputs, transforms) {
    super();
    this.inputs = inputs;
    this.transforms = transforms;
    this._value = null;
    this._children = new Set();
  }

  get() {
    return this._value || (this._value = this._get());
  }

  _get() {
    let transform = '';
    let identity = true;
    (0,_react_spring_shared__WEBPACK_IMPORTED_MODULE_5__.each)(this.inputs, (input, i) => {
      const arg1 = (0,_react_spring_shared__WEBPACK_IMPORTED_MODULE_5__.getFluidValue)(input[0]);
      const [t, id] = this.transforms[i](_react_spring_shared__WEBPACK_IMPORTED_MODULE_5__.is.arr(arg1) ? arg1 : input.map(_react_spring_shared__WEBPACK_IMPORTED_MODULE_5__.getFluidValue));
      transform += ' ' + t;
      identity = identity && id;
    });
    return identity ? 'none' : transform;
  }

  addChild(child) {
    if (!this._children.size) {
      // Start observing our inputs once we have an observer.
      (0,_react_spring_shared__WEBPACK_IMPORTED_MODULE_5__.each)(this.inputs, input => (0,_react_spring_shared__WEBPACK_IMPORTED_MODULE_5__.each)(input, value => {
        const config = (0,_react_spring_shared__WEBPACK_IMPORTED_MODULE_5__.getFluidConfig)(value);
        if (config) config.addChild(this);
      }));
    }

    this._children.add(child);
  }

  removeChild(child) {
    this._children.delete(child);

    if (!this._children.size) {
      // Stop observing our inputs once we have no observers.
      (0,_react_spring_shared__WEBPACK_IMPORTED_MODULE_5__.each)(this.inputs, input => (0,_react_spring_shared__WEBPACK_IMPORTED_MODULE_5__.each)(input, value => {
        const config = (0,_react_spring_shared__WEBPACK_IMPORTED_MODULE_5__.getFluidConfig)(value);
        if (config) config.removeChild(this);
      }));
    }
  }

  onParentChange(event) {
    if (event.type == 'change') {
      this._value = null;
    }

    (0,_react_spring_shared__WEBPACK_IMPORTED_MODULE_5__.each)(this._children, child => {
      child.onParentChange(event);
    });
  }

}

const primitives = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr', // SVG
'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

_react_spring_core__WEBPACK_IMPORTED_MODULE_0__/* .Globals.assign */ .OH.assign({
  colorNames: _react_spring_shared_colors__WEBPACK_IMPORTED_MODULE_3__/* .default */ .Z,
  createStringInterpolator: _react_spring_shared_stringInterpolation__WEBPACK_IMPORTED_MODULE_2__/* .createStringInterpolator */ .q,
  batchedUpdates: react_dom__WEBPACK_IMPORTED_MODULE_1__.unstable_batchedUpdates
});
const host = (0,_react_spring_animated__WEBPACK_IMPORTED_MODULE_4__/* .createHost */ .Ld)(primitives, {
  applyAnimatedValues,
  createAnimatedStyle: style => new AnimatedStyle(style),
  getComponentProps: (_ref) => {
    let props = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_6__/* .default */ .Z)(_ref, ["scrollTop", "scrollLeft"]);

    return props;
  }
});
const animated = host.animated;


//# sourceMappingURL=index.js.map


/***/ }),

/***/ 6399:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "je": () => (/* binding */ getFluidValue),
/* harmony export */   "Qb": () => (/* binding */ getFluidConfig),
/* harmony export */   "B0": () => (/* binding */ FluidValue)
/* harmony export */ });
/* unused harmony exports hasFluidValue, setFluidConfig, addFluidObserver */
var $config = Symbol.for('FluidValue:config');

/** Does the given value have a `FluidConfig` object? */
var hasFluidValue = function (arg) { return !!getFluidConfig(arg); };
function getFluidValue(arg) {
    var config = getFluidConfig(arg);
    return config ? config.get() : arg;
}
function getFluidConfig(arg) {
    if (arg)
        return arg[$config];
}
/** Set the methods for observing the given object. */
function setFluidConfig(target, config) {
    Object.defineProperty(target, $config, {
        value: config,
        configurable: true,
    });
}
function addFluidObserver(target, observer) {
    var config = getFluidConfig(target);
    if (config) {
        config.addChild(observer);
        return function () { return config.removeChild(observer); };
    }
}
/**
 * This class stores a single dynamic value, which can be observed by multiple `FluidObserver` objects.
 *
 * In order to support non-writable streams, this class doesn't expect a `set` method to exist.
 *
 * It can send *any* event to observers, not only change events.
 */
var FluidValue = /** @class */ (function () {
    function FluidValue() {
        setFluidConfig(this, this);
    }
    return FluidValue;
}());

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 3149:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "b": () => (/* binding */ useLayoutEffect)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7378);

var useLayoutEffect = typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
    ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect
    : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;


/***/ }),

/***/ 2569:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "animated": () => (/* reexport safe */ _react_spring_web__WEBPACK_IMPORTED_MODULE_0__.q)
/* harmony export */ });
/* harmony import */ var _react_spring_web__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8453);
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_spring_web__WEBPACK_IMPORTED_MODULE_0__, "config")) __webpack_require__.d(__webpack_exports__, { "config": function() { return _react_spring_web__WEBPACK_IMPORTED_MODULE_0__.config; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_spring_web__WEBPACK_IMPORTED_MODULE_0__, "useTransition")) __webpack_require__.d(__webpack_exports__, { "useTransition": function() { return _react_spring_web__WEBPACK_IMPORTED_MODULE_0__.useTransition; } });



/***/ })

};
;