import React from 'react';
import Link from 'react-router/lib/Link';
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'
import { merge, before, media, presets, style } from 'glamor'
import { rhythm, scale } from 'utilities/typography'
import { sections, pages, basepath } from 'utilities/pages'

// TODO this should just be a GraphQL query.
// Group pages by section.
const groupedPages = groupBy(pages, (page) => basepath(page.node.path))

// Sort pages
Object.keys(groupedPages).forEach((k) => groupedPages[k] = sortBy(groupedPages[k], (page) => {
  if (page.node.path === `/${k}/`) {
    return -100
  } else {
    return page.node.frontmatter.sort
  }
}))

// Replace the index page with one titled "introduction".

export default ({ children, isOpen, close, activeSection }) => {
  let opacity
  let transform
  if (isOpen) {
    opacity = 1
    transform = 'translateX(0)'
  } else {
    opacity = 0
    transform = 'translateX(-105%)'
  }
  return (
    <div
      {...merge({
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        visibility: isOpen ? 'visible' : 'hidden',
        zIndex: 1,
      },
      before({
        content: '""',
        display: 'block',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.4)',
        opacity: opacity,
        willChange: 'opacity',
        transition: 'opacity 0.3s cubic-bezier(0,0,0.3,1)',
      }),
      media(presets.tablet, {
        display: 'none',
      }))}
      onClick={close}
    >
      <div
        {...merge({
          //display: isOpen ? 'fixed' : 'none',
          boxShadow: '2px 0 12px rgba(0,0,0,0.4)',
          background: 'white',
          maxWidth: rhythm(12),
          height: '100%',
          transform: transform,
          willChange: 'transform',
          transitionDuration: '130ms',
          transitionDelay: '0ms',
          padding: `${rhythm(1/2)} ${rhythm(3/4)}`,
          overflowY: 'scroll',
        },
        media(presets.tablet, {
          display: 'none',
        }))}
      >
        <h1
          style={{ cursor: 'pointer' }}
          onClick={close}
        >
          X
        </h1>
        <h2>Sections</h2>
        <div
          {...merge({
            display: 'block',
          },
          media(presets.tablet, {
            display: 'none',
          }))}
        >
          {sections.map((section) => {
            let activeStyles
            if (basepath(section.url) === activeSection) {
              activeStyles = {
                background: 'rgba(0,0,0,0.15)',
                color: 'black',
              }
            }
            return (
              <div
                {...style({
                  marginBottom: rhythm(2),
                })}
              >
                <h3>{section.title}</h3>
                {groupedPages[basepath(section.url)].map((page) => (
                  <Link
                    to={page.node.path}
                    key={page.node.path}
                    activeStyle={{
                      ...activeStyles,
                    }}
                    {...style({
                      color: '#535353',
                      display: 'block',
                      padding: rhythm(1/4),
                      paddingLeft: rhythm(3/4),
                      paddingRight: rhythm(3/4),
                      marginLeft: rhythm(-3/4),
                      marginRight: rhythm(-3/4),
                      width: '100%',
                      textDecoration: 'none',
                    })}
                  >
                    {page.node.frontmatter.title}
                  </Link>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
