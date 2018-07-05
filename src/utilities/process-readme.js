module.exports = function processREADME(body) {
  return body
    .replace(/[^]*?<div align="center">([^]*?)<\/div>/, (match, content) => {
      let parsed = content.match(/<p>([^]*?)<\/?p>/);
      return parsed ? parsed[1] : '';
    })
    // Replace lone h1 formats
    .replace(/<h1.*?>.+?<\/h1>/, '')
    .replace(/# .+/, '')
    .replace(/.*\n=+/, '')
    // Modify links to keep them within the site
    .replace(/https?:\/\/github.com\/(webpack|webpack-contrib)\/([-A-za-z0-9]+-loader\/?)([)"])/g, '/loaders/$2/$3')
    .replace(/https?:\/\/github.com\/(webpack|webpack-contrib)\/([-A-za-z0-9]+-plugin\/?)([)"])/g, '/plugins/$2/$3')
    // Replace any <h2> with `##`
    .replace(/<h2[^>]*>/g, '## ')
    .replace(/<\/h2>/g, '')
    // Drop any comments
    .replace(/<!--[\s\S]*?-->/g, '')
    // Replace code
    .replace(/```console/g, '```bash')
    .replace(/```sh/, '```bash')
};
