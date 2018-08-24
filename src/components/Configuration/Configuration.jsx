import React from 'react';
import { Modes, Entry } from './components';

const components = {
  mode: props => <Modes children={props} />,
  entry: props => <Entry children={props} />,
  filename: props => <Modes children={props} />,
  publicPath: props => <Modes children={props} />,
  advancedOutput: props => <Modes children={props} />,
  expert: props => <Modes children={props} />,
  advancedModule: props => <Modes children={props} />,
  alias: props => <Modes children={props} />,
  advancedResolve: props => <Modes children={props} />,
  hints: props => <Modes children={props} />,
  devtool: props => <Modes children={props} />,
  target: props => <Modes children={props} />,
  externals: props => <Modes children={props} />,
  stats: props => <Modes children={props} />,
  advanced: props => <Modes children={props} />,
  libraryTarget: props => <Modes children={props} />
};

const Pre = props => {
  const newChildren = React.Children.map(props.children.props.children, (child, i) => {
    if (React.isValidElement(child)) {
      if (child.props.props.className.includes('keyword')) {
        return components[child.props.props.componentname](
          child.props.children.slice(3, React.Children.count(child.props.children) - 4)
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
