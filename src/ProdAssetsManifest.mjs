import webpack from 'webpack';
const { Compilation, sources } = webpack;

// collect assets data (vendor.[contenthash].js and index.[contenthash].js) for ssg
class ProdAssetsManifest {
  apply(compiler) {
    let js = [];
    let css = [];
    compiler.hooks.thisCompilation.tap('ProdAssetsManifest', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'ProdAssetsManifest',
          stage: Compilation.PROCESS_ASSETS_STAGE_ANALYSE,
        },
        () => {
          for (const [, entrypoint] of compilation.entrypoints) {
            const files = entrypoint.getFiles();
            js = js.concat(
              files
                .filter((file) => file.endsWith('.js')) // two js files
                .sort((a) => {
                  // vendor first
                  if (a.startsWith('vendor')) return -1;
                  return 1;
                })
                .map((file) => {
                  return compilation.outputOptions.publicPath + file;
                })
            );
            css = css.concat(
              files
                .filter((file) => file.endsWith('.css'))
                .sort((a) => {
                  // index first
                  if (a.startsWith('index')) return -1;
                  return 1;
                })
                .map((file) => compilation.outputOptions.publicPath + file)
            );
          }
          compilation.emitAsset(
            'prod-assets-manifest.json',
            new sources.RawSource(JSON.stringify({ js, css }))
          );
        }
      );
    });
  }
}
export default ProdAssetsManifest;
