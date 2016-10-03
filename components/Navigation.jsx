import React from 'react';
import Link from './Link';
import Container from './Container';
import Logo from './Logo';
import { rhythm, scale, options } from 'utilities/typography';

const basepath = (path) => path.split('/').filter((split) => split !== '').slice(0, 1)[0]

export default ({ home = '/', pages, location }) => {
  // Determine which section is active.
  console.log(location)
  const activeSection = basepath(location.pathname)
  return (
    <div className="navigation">
      <Container className="navigation__inner">
        <Link className="navigation__logo" to={{ pathname: home }}>
          <Logo theme="light" />
        </Link>

        <nav className="navigation__links">
          {
            pages.map((link, i) => {
              let activeStyles
              console.log(activeSection)
              console.log(link.url)
              console.log(basepath(link.url))
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
                  style={{
                    ...activeStyles,
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
                  { link.title }
                </Link>
                )
            })
          }
        </nav>
      </Container>
    </div>
  )
};
