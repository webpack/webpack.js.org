import React from 'react'
import DocumentTitle from 'react-document-title'
import { Link, browserHistory } from 'react-router'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import { merge, media, presets, style } from 'glamor'
import { rhythm, scale } from 'utilities/typography'
import Container from 'components/Container';
import Contributors from 'components/Contributors';
import sections, { basepath } from 'utilities/pages'
import Sidebar from 'components/Sidebar';
/*
            <select
              value={this.props.location.pathname}
              onChange={(e) => browserHistory.push(e.target.value)}
              {...merge({
                marginBottom: rhythm(1)
              },
              media(presets.tablet, {
                display: 'none',
              }))}
            >
              <option
                value={`/${activeSection}/`}
                key={`/${activeSection}/`}
              >
                Introduction
              </option>
              {sectionPages.map((page) => (
                <option
                  value={page.node.path}
                  key={page.node.path}
                >
                  {page.node.frontmatter.title}
                </option>
              ))}
            </select>
            */
class MarkdownTemplate extends React.Component {
  render () {
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const title = get(this.props, 'data.markdown.frontmatter.title')
    const body = get(this.props, 'data.markdown.bodyHTMLWebpack')
    const contributors = get(this.props, 'data.markdown.frontmatter.contributors')
    const path = get(this.props, 'data.markdown.path')

    const activeSection = basepath(this.props.location.pathname)
    // Create <select> for navigating to subpages.
    const pages = get(this.props, 'data.allMarkdown.edges')
    let sectionPages = pages.filter((page) => {
      return activeSection === basepath(page.node.path) &&
        // This is the index page, since we always add it as "introduction"
        // filter it out here.
        page.node.path !== `/${activeSection}/`
    })
    sectionPages = sortBy(sectionPages, (page) => page.node.frontmatter.sort)
    console.log(sectionPages)

    // TODO add file path to Markdown schema.
    const edit = `https://github.com/webpack/webpack.js.org/edit/master/content/${path}.md`;
    console.log(this.props.location)

    return (
      <DocumentTitle title={`${title} | ${siteTitle}`}>
        <div
          {...merge({
            display: 'flex',
            flex: '0 1 auto',
            flexWrap: 'wrap',
            flexDirection: 'row',
            maxWidth: 1024,
            margin: '0 auto',
            padding: `${rhythm(1/2)} ${rhythm(3/4)}`,
          },
          media(presets.tablet, {
            //minWidth: 1024,
            padding: 0,
            paddingTop: rhythm(1/2),
          }))}
        >
          <Sidebar
            pages={sectionPages}
            location={this.props.location}
            activeSection={activeSection}
          />
          <section
            className="page__content"
            {...merge({
              maxWidth: '100%',
            },
            media(presets.tablet, {
              flexBasis: '75%',
              maxWidth: '75%',
              flex: '3',
            }))}
          >
            <h1>{ title }</h1>
            <a
              className="page__edit"
              href={ edit }
              {...merge({
                ...scale(-2/5),
                //display: 'none',
                //position: 'absolute',
                //right: rhythm(2.5),
                //top: rhythm(1.5),
                marginBottom: rhythm(1/2),
              },
              media(presets.tablet, {
                //display: 'inline',
              }))}
            >
              Edit this Page&nbsp;&nbsp;
              <i className="icon-edit" />
            </a>

            <div
              dangerouslySetInnerHTML={{ __html: body }}
            />

            <Contributors contributors={ contributors } />
          </section>
        </div>
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
