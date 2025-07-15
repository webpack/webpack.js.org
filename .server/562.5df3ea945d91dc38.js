"use strict";
exports.id = 562;
exports.ids = [562];
exports.modules = {

/***/ 2562:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ MessageBar)
});

// EXTERNAL MODULE: ./styles/icons/cross.svg
var cross = __webpack_require__(3600);
// EXTERNAL MODULE: ../node_modules/prop-types/index.js
var prop_types = __webpack_require__(2688);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ../node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(2540);
// EXTERNAL MODULE: ./mdx-components.js + 4 modules
var mdx_components = __webpack_require__(3317);
;// ./components/NotificationBar/Notification.mdx


function _createMdxContent(props) {
  const _components = {
    p: "p",
    ...(0,mdx_components/* useMDXComponents */.R)(),
    ...props.components
  };
  return (0,jsx_runtime.jsxs)(_components.p, {
    children: ["You are reading the documentation for webpack 5, the latest release. Read the ", (0,jsx_runtime.jsx)("a", {
      href: "https://v4.webpack.js.org/",
      children: "webpack 4 documentation here"
    }), ". See the ", (0,jsx_runtime.jsx)("a", {
      href: "/migrate/5",
      children: "migration guide"
    }), " for upgrading to webpack 5."]
  });
}
function MDXContent(props = {}) {
  const {
    wrapper: MDXLayout
  } = {
    ...(0,mdx_components/* useMDXComponents */.R)(),
    ...props.components
  };
  return MDXLayout ? (0,jsx_runtime.jsx)(MDXLayout, {
    ...props,
    children: (0,jsx_runtime.jsx)(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
// EXTERNAL MODULE: ./components/NotificationBar/NotificationBar.jsx
var NotificationBar = __webpack_require__(9178);
// EXTERNAL MODULE: ../node_modules/@react-spring/web/dist/react-spring_web.modern.mjs + 4 modules
var react_spring_web_modern = __webpack_require__(4321);
// EXTERNAL MODULE: ../node_modules/react/index.js
var react = __webpack_require__(3696);
;// ./components/NotificationBar/MessageBar.jsx







MessageBar.propTypes = {
  onClose: (prop_types_default()).func
};
function MessageBar(props) {
  const [list, setList] = (0,react.useState)([]);
  const listTransitions = (0,react_spring_web_modern/* useTransition */.pn)(list, {
    config: react_spring_web_modern/* config */.$W.gentle,
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
    localStorage.setItem('notification-dismissed', NotificationBar/* version */.rE);
    props.onClose();
  };
  return /*#__PURE__*/(0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
    children: listTransitions(styles => /*#__PURE__*/(0,jsx_runtime.jsxs)(react_spring_web_modern/* animated */.CS.div, {
      className: "flex items-center rounded z-50 fixed left-[1px] right-[1px] bottom-[1px] bg-white border-2 border-solid border-gray-700 max-w-full pl-20 py-20 shadow-2xl md:left-20 md:right-auto md:bottom-20 md:max-w-[300px] dark:bg-gray-500 print:hidden",
      style: styles,
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)(MDXContent, {}), NotificationBar/* localStorageIsEnabled */.y9 ? /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        role: "button",
        className: "px-20 self-stretch inline-flex items-center cursor-pointer",
        onClick: close,
        children: /*#__PURE__*/(0,jsx_runtime.jsx)(cross/* default */.A, {
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