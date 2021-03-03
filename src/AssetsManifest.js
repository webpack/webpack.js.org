const { Compilation, sources } = require('webpack');

// collect assets data (vendor.[contenthash].js and index.[contenthash].js) for ssg
class AssetsManifest {
  apply(compiler) {
    let manifest = [];
    compiler.hooks.thisCompilation.tap('AssetsManifest', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'AssetsManifest',
          stage: Compilation.PROCESS_ASSETS_STAGE_ANALYSE,
        },
        () => {
          for (const [, entrypoint] of compilation.entrypoints) {
            manifest = manifest.concat(
              entrypoint
                .getFiles()
                .filter((file) => file.endsWith('.js')) // two js files
                .map((file) => {
                  return compilation.outputOptions.publicPath + file;
                })
                .sort((a) => {
                  // vendor first
                  if (a.startsWith('vendor')) return -1;
                  return 1;
                })
            );
          }
          compilation.emitAsset(
            'prod-manifest.json',
            new sources.RawSource(JSON.stringify(manifest))
          );
        }
      );
    });
  }
}
export default AssetsManifest;
