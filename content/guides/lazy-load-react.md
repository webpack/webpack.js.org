---
title: Lazy Loading - React
contributors:
  - iammerrick
  - chrisVillanueva
---

A component can lazily load dependencies without its consumer knowing using higher order functions, or a consumer can lazily load its children without its children knowing using a component that takes a function and collection of modules, or some combination of both.

## LazilyLoad Component

Let's have a look at a consumer choosing to lazily load some components. The `importLazy` is simply a function that returns the `default` property, this is for Babel/ES2015 interoperability. If you don't need that you can omit the `importLazy` helper. The `importLazy` function simply returns whatever was exported as `export default` in the target module.

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

## Higher Order Component

As a component, you can also make sure your own dependencies are lazily loaded. This is useful if a component relies on a really heavy library. Let's say we have a Todo component that optionally supports code highlighting...

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

We could then make sure the expensive library powering the Highlight component is only loaded when we actually want to highlight some code:

```jsx
// Highlight.js
class Highlight extends React.Component {
  render() {
    const {Highlight} = this.props.highlight;
    // highlight js is now on our props for use
  }
}
export LazilyLoadFactory(Highlight, {
  highlight: () => import('highlight'),
});
```

Notice how the consumer of Highlight component had no idea it had a dependency that was lazily loaded? Or that if a user had todos with no code we would never need to load highlight.js?


## The Code

Source code of the LazilyLoad component module which exports both the Component interface and the higher order component interface, as well as the importLazy function to make ES2015 defaults feel a bit more natural.

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
## Tips

- By using the [bundle loader](https://github.com/webpack/bundle-loader) we can semantically name chunks to intelligently load groups of code.
- Make sure if you are using the babel-preset-es2015, to turn modules to false, this will allow webpack to handle modules.

## Dependencies

- ES2015 + JSX

## References

- [Higher Order Components](http://reactpatterns.com/#higher-order-component)
- [react-modules](https://github.com/threepointone/react-modules)
- [Function as Child Components](http://merrickchristensen.com/articles/function-as-child-components.html)
- [Example Repository](https://github.com/iammerrick/how-to-lazy-load-react-webpack)
- [Bundle Loader](https://github.com/webpack/bundle-loader)
