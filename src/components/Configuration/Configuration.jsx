import { Children, isValidElement } from 'react';
import { Details } from './components';

const detailComponentsList = [
  'link',
  'mode',
  'entry',
  'path',
  'filename',
  'publicPath',
  'library',
  'libraryType',
  'libraryName',
  'advancedLibrary',
  'advancedOutput',
  'expertOutput',
  'expertOutputB',
  'expert',
  'advancedConditions',
  'moduleType',
  'advancedActions',
  'advancedModule',
  'modules',
  'alias',
  'advancedResolve',
  'expertResolve',
  'hints',
  'devtool',
  'target',
  'externals',
  'externalsType',
  'externalsPresets',
  'ignoreWarnings',
  'stats',
  'preset',
  'advancedGlobal',
  'advancedAssets',
  'advancedChunkGroups',
  'advancedChunks',
  'advancedModules',
  'expertModules',
  'advancedStatsOptimization',
  'advancedOptimization',
  'cacheGroupAdvancedSelectors',
  'cacheGroupAdvancedEffects',
  'advancedSelectors',
  'advancedEffects',
  'fallbackCacheGroup',
  'advanced',
  'advancedCaching',
  'advancedBuild',
];
export const Pre = (props) => {
  // eslint-disable-next-line
  const newChildren = Children.map(props.children.props.children, (child) => {
    if (isValidElement(child)) {
      if (child.props.className.includes('keyword')) {
        if (!detailComponentsList.includes(child.props.componentname))
          return child;
        return (
          <Details
            myChilds={child.props.children.slice(
              4,
              Children.count(child.props.children) - 4
            )}
            url={child.props.url}
          />
        );
      }
    }

    return child;
  });

  const newProps = {
    children: newChildren,
  };

  return (
    <pre>
      <code {...newProps} />
    </pre>
  );
};
Pre.propTypes = {};
