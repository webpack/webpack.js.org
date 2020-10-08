import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Details } from './components';

const detailComponentsList = ['link', 'mode', 'entry', 'path', 'filename', 'publicPath', 'library', 'libraryType', 'libraryName', 'advancedLibrary', 'advancedOutput', 'expertOutput', 'expertOutputB', 'expert', 'advancedConditions', 'moduleType', 'advancedActions', 'advancedModule', 'modules', 'alias', 'advancedResolve', 'expertResolve', 'hints', 'devtool', 'target', 'externals', 'externalsType', 'externalsPresets', 'ignoreWarnings', 'stats', 'preset', 'advancedGlobal', 'advancedAssets', 'advancedChunkGroups', 'advancedChunks', 'advancedModules', 'expertModules', 'advancedStatsOptimization', 'advancedOptimization', 'cacheGroupAdvancedSelectors', 'cacheGroupAdvancedEffects', 'advancedSelectors', 'advancedEffects', 'fallbackCacheGroup', 'advanced', 'advancedCaching', 'advancedBuild'];

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
