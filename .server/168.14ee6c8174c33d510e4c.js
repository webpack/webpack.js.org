exports.id = 168;
exports.ids = [168];
exports.modules = {

/***/ 4168:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ MessageBar)
});

// EXTERNAL MODULE: ./components/Container/Container.jsx
var Container = __webpack_require__(4097);
// EXTERNAL MODULE: ./styles/icons/cross.svg
var cross = __webpack_require__(9148);
// EXTERNAL MODULE: ../node_modules/prop-types/index.js
var prop_types = __webpack_require__(3615);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ../node_modules/react/index.js
var react = __webpack_require__(7378);
// EXTERNAL MODULE: ../node_modules/@mdx-js/react/dist/esm.js
var esm = __webpack_require__(5318);
;// CONCATENATED MODULE: ./components/NotificationBar/Notification.mdx
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



/* @jsxRuntime classic */

/* @jsx mdx */

const layoutProps = {};
const MDXLayout = "wrapper";
function MDXContent({
  components,
  ...props
}) {
  return (0,esm/* mdx */.kt)(MDXLayout, _extends({}, layoutProps, props, {
    components: components,
    mdxType: "MDXLayout"
  }), (0,esm/* mdx */.kt)("p", null, `Webpack 5 has been officially released. Read our `, (0,esm/* mdx */.kt)("a", {
    href: "/blog/2020-10-10-webpack-5-release/"
  }, `announcement`), `. Not ready yet? Read `, (0,esm/* mdx */.kt)("a", {
    href: "https://v4.webpack.js.org/"
  }, `webpack 4 documentation here`), `.`));
}
;
MDXContent.isMDXComponent = true;
// EXTERNAL MODULE: ./components/NotificationBar/NotificationBar.jsx
var NotificationBar = __webpack_require__(3629);
// EXTERNAL MODULE: ../node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(4246);
;// CONCATENATED MODULE: ./components/NotificationBar/MessageBar.jsx








MessageBar.propTypes = {
  onClose: (prop_types_default()).func
};
function MessageBar(props) {
  const close = () => {
    localStorage.setItem('notification-dismissed', NotificationBar/* version */.i8);
    props.onClose();
  };

  return /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
    className: "notification-bar",
    children: /*#__PURE__*/(0,jsx_runtime.jsxs)(Container/* default */.Z, {
      className: "notification-bar__inner",
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)(MDXContent, {}), NotificationBar/* localStorageIsEnabled */.Bn ? /*#__PURE__*/(0,jsx_runtime.jsx)(cross/* default */.Z, {
        "aria-label": "Dismiss",
        className: "notification-bar__close",
        fill: "#fff",
        width: 16,
        onClick: close,
        role: "button"
      }) : null]
    })
  });
}

/***/ })

};
;