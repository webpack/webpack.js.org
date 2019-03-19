import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Details } from './components';

const detailComponentsList = ['link', 'mode', 'entry', 'filename', 'publicPath', 'advancedOutput', 'expert', 'advancedModule', 'alias', 'advancedResolve', 'hints', 'devtool', 'target', 'externals', 'stats', 'advanced', 'libraryTarget'];

const Pre = props => {
  const newChildren = React.Children.map(props.children.props.children, child => {
    if (React.isValidElement(child)) {
      if (child.props.props.className.includes('keyword')) {
        if (!detailComponentsList.includes(child.props.props.componentname)) return child;

        return <Details children={child.props.children.slice(4, React.Children.count(child.props.children) - 4)} url={child.props.props.url} />;
      }

      if (child.props.props.className.includes('comment')) {
        return <ReactMarkdown source={child.props.children} disallowedTypes={['paragraph']} unwrapDisallowed />;
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
