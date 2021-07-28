"use strict";
exports.id = 835;
exports.ids = [835];
exports.modules = {

/***/ 3835:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ MessageBar)
});

// EXTERNAL MODULE: ./styles/icons/cross.svg
var cross = __webpack_require__(9148);
// EXTERNAL MODULE: ../node_modules/prop-types/index.js
var prop_types = __webpack_require__(3615);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ../node_modules/react/index.js
var react = __webpack_require__(7378);
// EXTERNAL MODULE: ../node_modules/@mdx-js/react/dist/mdx-react.modern.js
var mdx_react_modern = __webpack_require__(2682);
;// CONCATENATED MODULE: ./components/NotificationBar/Notification.mdx
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



/* @jsxRuntime classic */

/* @jsx mdx */

/* @jsxFrag mdx.Fragment */

const MDXLayout = "wrapper";

function MDXContent({
  components,
  ...props
}) {
  return (0,mdx_react_modern/* mdx */.kt)(MDXLayout, _extends({
    components: components
  }, props), (0,mdx_react_modern/* mdx */.kt)("p", null, "Webpack 5 has been officially released. Read our ", (0,mdx_react_modern/* mdx */.kt)("a", {
    href: "/blog/2020-10-10-webpack-5-release/",
    parentName: "p"
  }, "announcement"), ". Not ready yet? Read ", (0,mdx_react_modern/* mdx */.kt)("a", {
    href: "https://v4.webpack.js.org/",
    parentName: "p"
  }, "webpack 4 documentation here"), "."));
}

MDXContent.isMDXComponent = true;
/* harmony default export */ const Notification = (MDXContent);
// EXTERNAL MODULE: ./components/NotificationBar/NotificationBar.jsx
var NotificationBar = __webpack_require__(3629);
// EXTERNAL MODULE: ../node_modules/react-spring/dist/react-spring.esm.js
var react_spring_esm = __webpack_require__(4338);
// EXTERNAL MODULE: ../node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(4246);
;// CONCATENATED MODULE: ./components/NotificationBar/MessageBar.jsx









MessageBar.propTypes = {
  onClose: (prop_types_default()).func
};
function MessageBar(props) {
  const [list, setList] = (0,react.useState)([]);
  const listTransitions = (0,react_spring_esm.useTransition)(list, {
    config: react_spring_esm.config.gentle,
    from: {
      opacity: 0,
      transform: 'translate3d(-50%, 0px, 0px)'
    },
    enter: {
      opacity: 1,
      transform: 'translate3d(0px, 0px, 0px)'
    },
    keys: list.map((item, index) => index)
  });
  (0,react.useEffect)(() => {
    setList(['']);
  }, []);

  const close = () => {
    localStorage.setItem('notification-dismissed', NotificationBar/* version */.i8);
    props.onClose();
  };

  return /*#__PURE__*/(0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
    children: listTransitions(styles => /*#__PURE__*/(0,jsx_runtime.jsxs)(react_spring_esm.animated.div, {
      className: "flex items-center rounded z-50 fixed left-[1px] right-[1px] bottom-[1px] bg-white border-2 border-solid border-gray-700 max-w-full pl-20 py-20 shadow-2xl md:left-20 md:right-auto md:bottom-20 md:max-w-[300px] dark:bg-gray-500 print:hidden",
      style: styles,
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)(Notification, {}), NotificationBar/* localStorageIsEnabled */.Bn ? /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        role: "button",
        className: "px-20 self-stretch inline-flex items-center cursor-pointer",
        onClick: close,
        children: /*#__PURE__*/(0,jsx_runtime.jsx)(cross/* default */.Z, {
          "aria-label": "Dismiss",
          className: "fill-current text-gray-300 dark:text-white transform duration-200 hover:text-gray-700",
          width: 25
        })
      }) : null]
    }))
  });
}

/***/ })

};
;