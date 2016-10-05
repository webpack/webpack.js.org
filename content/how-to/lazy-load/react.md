---
title: How to lazy load React 
contributors:
  - iammerrick
---

By using the [bundle-loader](https://github.com/webpack/bundle-loader) we are able to create a React component that allows us to declaratively split & load code in semantic bundles. We can also provide a higher order component function that will allow a component to specify its own dependencies. This allows consumers and authors of components to decide what is lazily loaded. A component can lazily load dependencies without it's consumer knowing, and a consumer can lazily load it's children without its children knowing, or some combination of both. By using the bundle loader we can semantically name chunks to intelligently load groups of code.

## LazilyLoad Component

Lets have a look at a consumer choosing to lazily load some components. The `importLazy` is simply a function that returns the `default` property, this is for Babel/ES2015 interoperability. If you don't need that you can omit the `importLazy` helper.

```jsx
<LazilyLoad modules={{
  TodoHandler: importLazy(require('bundle?lazy&name=todo!./components/TodoHandler')),
  TodoMenuHandler: importLazy(require('bundle?lazy&name=todo!./components/TodoMenuHandler')),
  TodoMenu: importLazy(require('bundle?lazy&name=todo!./components/TodoMenu')),
}}>
{({TodoDetailsHandler, TodoMenuHandler}) => (
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
  highlight: require('bundle?lazy!highlight'),
});
```

Notice how the consumer of Highlight component had no idea it had a dependency that was lazily loaded? Or that if a user had todos with no code we would never need to load highlight.js? Also, we didn't need to specify a name for the highlight.js library because we don't care if webpack gives it a bundle.



## The Code

Source code of the LazilyLoad component module which exports both the Component interface and the higher order component interface, as well as the importLazy function to make ES2015 defaults feel a bit more natural.

```jsx
import React from 'react';

const toPromise = (load) => (new Promise((resolve) => (
  load(resolve)
)));

class LazilyLoad extends React.Component {

  constructor() {
    super(...arguments);
    this.state = {
      isLoaded: false,
    };
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillReceiveProps(next) {
    if (next.modules === this.props.modules) return null;
    this.load(next);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  load(props) {
    this.setState({
      isLoaded: false,
    });

    const { modules } = props;
    const keys = Object.keys(modules);

    Promise.all(keys.map((key) => toPromise(modules[key])))
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

export const importLazy = (fetch) => (cb) => (
   fetch((mod) => cb(mod.default))
);

export default LazilyLoad;
```

## Dependencies

- ES2015 + JSX
- [bundle-loader](https://github.com/webpack/bundle-loader)
