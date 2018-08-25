import React from 'react';
import { Modes, Entry } from './components';

const components = {
  link: (children, props) => {
    return <Modes children={children} {...props} />;
  },
  mode: (children, props) => {
    return <Modes children={children} {...props} />;
  },
  entry: (children, props) => {
    return <Modes children={children} {...props} />;
  },
  filename: (children, props) => {
    return <Modes children={children} {...props} />;
  },
  publicPath: (children, props) => {
    return <Modes children={children} {...props} />;
  },
  advancedOutput: (children, props) => {
    return <Modes children={children} {...props} />;
  },
  expert: (children, props) => {
    return <Modes children={children} {...props} />;
  },
  advancedModule: (children, props) => {
    return <Modes children={children} {...props} />;
  },
  alias: (children, props) => {
    return <Modes children={children} {...props} />;
  },
  advancedResolve: (children, props) => {
    return <Modes children={children} {...props} />;
  },
  hints: (children, props) => {
    return <Modes children={children} {...props} />;
  },
  devtool: (children, props) => {
    return <Modes children={children} {...props} />;
  },
  target: (children, props) => {
    return <Modes children={children} {...props} />;
  },
  externals: (children, props) => {
    return <Modes children={children} {...props} />;
  },
  stats: (children, props) => {
    return <Modes children={children} {...props} />;
  },
  advanced: (children, props) => {
    return <Modes children={children} {...props} />;
  },
  libraryTarget: (children, props) => {
    return <Modes children={children} {...props} />;
  }
};

const Pre = props => {
  const newChildren = React.Children.map(props.children.props.children, (child, i) => {
    if (React.isValidElement(child)) {
      if (child.props.props.className.includes('keyword')) {
        if (!components[child.props.props.componentname]) return child;

        return components[child.props.props.componentname](
          child.props.children.slice(4, React.Children.count(child.props.children) - 4),
          { url: child.props.props.url }
        );
      }
    }

    return child;
  });

  const newProps = {
    children: newChildren
  };

  return (
    <pre>
      <code {...newProps} />
    </pre>
  );
};

export default {
  components: {
    pre: Pre
  }
};
