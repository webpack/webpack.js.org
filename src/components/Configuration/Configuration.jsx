import React from "react";
import ReactMarkdown from "react-markdown";
import { Details } from "./components";

const detailComponentsList = ['link', 'mode', 'entry', 'filename', 'publicPath', 'advancedOutput', 'expert', 'advancedModule', 'alias', 'advancedResolve', 'hints', 'devtool', 'target', 'externals', 'stats', 'advanced', 'libraryTarget'];
const detailsComponent = (children, props) => {
  return <Details children={children} {...props} />;
}
  link: (children, props) => {
    return <Details children={children} {...props} />;
  },
  mode: (children, props) => {
    return <Details children={children} {...props} />;
  },
  entry: (children, props) => {
    return <Details children={children} {...props} />;
  },
  filename: (children, props) => {
    return <Details children={children} {...props} />;
  },
  publicPath: (children, props) => {
    return <Details children={children} {...props} />;
  },
  advancedOutput: (children, props) => {
    return <Details children={children} {...props} />;
  },
  expert: (children, props) => {
    return <Details children={children} {...props} />;
  },
  advancedModule: (children, props) => {
    return <Details children={children} {...props} />;
  },
  alias: (children, props) => {
    return <Details children={children} {...props} />;
  },
  advancedResolve: (children, props) => {
    return <Details children={children} {...props} />;
  },
  hints: (children, props) => {
    return <Details children={children} {...props} />;
  },
  devtool: (children, props) => {
    return <Details children={children} {...props} />;
  },
  target: (children, props) => {
    return <Details children={children} {...props} />;
  },
  externals: (children, props) => {
    return <Details children={children} {...props} />;
  },
  stats: (children, props) => {
    return <Details children={children} {...props} />;
  },
  advanced: (children, props) => {
    return <Details children={children} {...props} />;
  },
  libraryTarget: (children, props) => {
    return <Details children={children} {...props} />;
  }
};

const Pre = props => {
  const newChildren = React.Children.map(props.children.props.children, child => {
    if (React.isValidElement(child)) {
      if (child.props.props.className.includes("keyword")) {
        if (!detailComponentsList.includes[child.props.props.componentname]) return child;

        return components[child.props.props.componentname](
          child.props.children.slice(4, React.Children.count(child.props.children) - 4),
          { url: child.props.props.url }
        );
      }

      if (child.props.props.className.includes("comment")) {
        return <ReactMarkdown source={child.props.children} disallowedTypes={["paragraph"]} unwrapDisallowed />;
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
