import React from 'react'
import DocumentTitle from 'react-document-title'
import { Link } from 'react-router'
import get from 'lodash/get'
import { rhythm, scale } from 'utilities/typography'
import Container from 'components/Container';
import Sidebar from 'components/Sidebar';
import Contributors from 'components/Contributors';

class MarkdownTemplate extends React.Component {
  render () {
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const title = get(this.props, 'data.markdown.frontmatter.title')
    const body = get(this.props, 'data.markdown.bodyHTMLWebpack')
    const contributors = get(this.props, 'data.markdown.frontmatter.contributors')
    const path = get(this.props, 'data.markdown.path')
    // TODO add file path to Markdown schema.
    const edit = `https://github.com/webpack/webpack.js.org/edit/master/content/${path}.md`;

    return (
      <DocumentTitle title={`${title} | ${siteTitle}`}>
        <Container
          className="page"
          style={{
            padding: 0,
          }}
        >
          <Sidebar
            pages={this.props.data.allMarkdown.edges}
            pathname={this.props.location.pathname}
          />
          <section
            className="page__content"
            style={{
              padding: rhythm(1),
            }}
          >
            <h1>{ title }</h1>

            <a
              className="page__edit"
              href={ edit }
              style={{
                ...scale(-2/5),
                position: 'absolute',
                right: rhythm(2.5),
                top: rhythm(1.5),
              }}
            >
              Edit this Page&nbsp;&nbsp;
              <i className="icon-edit" />
            </a>

            <div dangerouslySetInnerHTML={{ __html: body }} />

            <Contributors contributors={ contributors } />
          </section>
        </Container>
      </DocumentTitle>
    )
  }
}

export default MarkdownTemplate

export const pageQuery = `
query MarkdownTemplate($path: String!) {
  site {
    siteMetadata {
      title
    }
  }
  markdown(path: $path) {
    path
    bodyHTMLWebpack
    frontmatter {
      title
      contributors
    }
  }
  allMarkdown {
    edges {
      node {
        path
        frontmatter {
          title
          sort
        }
      }
    }
  }
}
`
