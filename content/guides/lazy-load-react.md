---
title: 懒加载 - React
contributors:
  - iammerrick
  - chrisVillanueva
---

一个组件可以通过使用一些高阶函数来懒加载它的依赖，无需通过它的父元素，同时，一个父元素可以使用一个接受函数和一系列模块的组件来懒加载它的子元素，无需通过它的子元素，或者混合使用这两种方式。


## 懒加载的组件

我们来看一个父元素选择懒加载一些组件的例子。`importLazy` 只是一个简单的返回 `default` 属性的函数，这是为了兼容 Babel/ES2015。如果你不需要，你可以去掉 `importLazy` 方法。`importLazy` 只是返回了目标模块里面任何被导出为 `export default` 的部分。

```jsx
<LazilyLoad modules={{
  TodoHandler: () => importLazy(import('./components/TodoHandler')),
  TodoMenuHandler: () => importLazy(import('./components/TodoMenuHandler')),
  TodoMenu: () => importLazy(import('./components/TodoMenu')),
}}>
{({TodoHandler, TodoMenuHandler, TodoMenu}) => (
  <TodoHandler>
    <TodoMenuHandler>
      <TodoMenu />
    </TodoMenuHandler>
  </TodoHandler>
)}
</LazilyLoad>
```


## 高阶组件方式

一个组件也可以确保自己的依赖是被懒加载的。如果一个组件依赖了比较重的库时，会用到这一点。比如我们有一个让代码选择性的高亮显示的 Todo 组件......

```jsx
class Todo extends React.Component {
  render() {
    return (
      <div>
        {this.props.isCode ? <Highlight>{content}</Highlight> : content}
      </div>
    );
  }
}
```

然后我们就可以保证，那个支持 Highlight 组件的重的库仅仅在我们真正想要高亮一些代码的时候再加载：

```jsx
// Highlight.js
class Highlight extends React.Component {
  render() {
    const {Highlight} = this.props.highlight;
    // highlight js 现在在 props 里面以备使用
  }
}
export LazilyLoadFactory(Highlight, {
  highlight: () => import('highlight'),
});
```

请注意，Highlight 组件的父元素不知道它有一个依赖会被懒惰加，这是怎么实现的？ 或者如果所有 todo 里面都没有代码，我们就永远不需要加载 highlight.js 了吗？


## 代码

暴露出一个组件及其高阶组件接口的 LazilyLoad 组件模块的源代码（如下），（里面有一个）让 ES2015 的定义更自然的 importLazy 函数。

```jsx
import React from 'react';

class LazilyLoad extends React.Component {

  constructor() {
    super(...arguments);
    this.state = {
      isLoaded: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.load();
  }

  componentDidUpdate(previous) {
    const shouldLoad = !!Object.keys(this.props.modules).filter((key)=> {
        return this.props.modules[key] !== previous.modules[key];
    }).length;
    if (shouldLoad) {
        this.load();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  load() {
    this.setState({
      isLoaded: false,
    });

    const { modules } = this.props;
    const keys = Object.keys(modules);

    Promise.all(keys.map((key) => modules[key]()))
      .then((values) => (keys.reduce((agg, key, index) => {
        agg[key] = values[index];
        return agg;
      }, {})))
      .then((result) => {
        if (!this._isMounted) return null;
        this.setState({ modules: result, isLoaded: true });
      });
  }

  render() {
    if (!this.state.isLoaded) return null;
    return React.Children.only(this.props.children(this.state.modules));
  }
}

LazilyLoad.propTypes = {
  children: React.PropTypes.func.isRequired,
};

export const LazilyLoadFactory = (Component, modules) => {
  return (props) => (
    <LazilyLoad modules={modules}>
      {(mods) => <Component {...mods} {...props} />}
    </LazilyLoad>
  );
};

export const importLazy = (promise) => (
  promise.then((result) => result.default)
);

export default LazilyLoad;
```


## 贴士

-  通过利用 [bundle loader](https://github.com/webpack/bundle-loader)，我们可以语义化的命名 chunk 来智能的加载代码块。
- 如果你正在使用 babel-preset-es2015，请确保将参数 modules 设置为 false，以允许 webpack 处理相应的模块。


## 依赖

- ES2015 + JSX


## 参考

- [Higher Order Components](http://reactpatterns.com/#higher-order-component)
- [react-modules](https://github.com/threepointone/react-modules)
- [Function as Child Components](http://merrickchristensen.com/articles/function-as-child-components.html)
- [Example Repository](https://github.com/iammerrick/how-to-lazy-load-react-webpack)
- [Bundle Loader](https://github.com/webpack/bundle-loader)

***

> 原文：https://webpack.js.org/guides/lazy-load-react/
