import React from 'react';
import Link from './Link';
import Container from './Container';
import Logo from './Logo';
import { rhythm, scale, options } from 'utilities/typography';
import { merge, media, presets } from 'glamor'
import { basepath } from 'utilities/pages'
import MenuIcon from 'react-icons/lib/md/menu'
import gray from 'gray-percentage'
import Headroom from 'react-headroom'

export default ({ home = '/', sections, location, openSidebar }) => {
  const activeSection = basepath(location.pathname)
  return (
    <Headroom
      style={{
        WebkitTransform: 'translate3d(0,0,0)',
        background: '#333333',
        transition: 'background 250ms',
      }}
    >
      <Container className="navigation__inner">
        <div
          onClick={openSidebar}
        >
          <MenuIcon
            fill={gray(85, 0, true)}
            {...merge({
              ...scale(3/5),
              cursor: 'pointer',
              lineHeight: '29px',
              marginLeft: rhythm(-1/2),
              paddingRight: rhythm(1/2),
              width: 40,
            },
            media(presets.tablet, {
              display: 'none',
            })
            )}
          />
        </div>
        <Link className="navigation__logo" to={{ pathname: home }}>
          <Logo theme="light" />
        </Link>

        <nav className="navigation__links">
          {
            sections.map((link, i) => {
              let activeStyles
              if (basepath(link.url) === activeSection) {
                activeStyles = {
                  background: 'rgba(255,255,255,0.15)',
                  color: 'white',
                }
              }
              return (
                <Link
                  key={ `navigation__link${i}` }
                  className="navigation__link"
                  activeClassName="navigation__link--active"
                  to={ `${link.url}` }
                  {...merge({
                    ...activeStyles,
                    ...scale(-1/5),
                    display: 'none',
                    fontFamily: options.headerFontFamily.join(','),
                    lineHeight: '29px',
                    marginLeft: rhythm(1/2),
                    paddingTop: rhythm(3/4),
                    paddingBottom: rhythm(3/4),
                    paddingLeft: rhythm(1/2),
                    paddingRight: rhythm(1/2),
                  },
                  media(presets.tablet, {
                    display: 'inline',
                  })
                  )}
                >
                  { link.title }
                </Link>
              )
            })
          }
          <a
            className="navigation__link"
            href="//github.com/webpack/webpack.js.org"
            style={{
              ...scale(-1/5),
              fontFamily: options.headerFontFamily.join(','),
              lineHeight: '29px',
              marginLeft: rhythm(1/2),
              paddingTop: rhythm(3/4),
              paddingBottom: rhythm(3/4),
              paddingLeft: rhythm(1/2),
              paddingRight: rhythm(1/2),
            }}
          >
            Github
          </a>
        </nav>
      </Container>
    </Headroom>
  )
};
