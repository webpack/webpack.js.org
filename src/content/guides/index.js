var markdown = require('../../utils/markdown')
var highlight = require('../../utils/highlight')

module.exports = {
  title: 'Guides',
  path: function() {
    return require.context('json!yaml-frontmatter!./', false, /^\.\/.*\.md$/)
  },
  processPage: {
    url: function(o) {
      return o.sectionName + '/' + o.fileName.split('.')[0]
    },
    content: function(o) {
      var content = o.file.__content.split('\n').slice(1).join('\n')

      return markdown().process(content, highlight)
    }
  },
  layouts: {
    index: function() {
      return require('../../layouts/GuideIndex.jsx').default
    },
    page: function() {
      return require('../../layouts/GuidePage.jsx').default
    }
  },
  redirects: {} // <from>: <to>
}
