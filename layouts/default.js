import React from 'react';
import Navigation from 'components/Navigation';
import Sidecar from 'components/Sidecar';
import Footer from 'components/Footer';
import { merge, media, presets, style } from 'glamor'
import MobileSidebar from 'components/MobileSidebar';
import Sidebar from 'components/Sidebar';
import { sections, basepath } from 'utilities/pages'
import { rhythm, scale } from 'utilities/typography'

// Import site CSS.
import 'styles/index.scss'
import 'styles/icons.css'
import 'styles/geomanist/stylesheet.css'
import 'prismjs/themes/prism-funky.css'

class DefaultLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileSidebarOpen: false
    }
  }

  componentDidMount() {
    // Create references to html/body elements
    this.htmlElement = document.querySelector('html');
    this.bodyElement = document.querySelector('body');
  }

  render() {
    // Freeze the background when the overlay is open.
    if (this.htmlElement && this.bodyElement) {
      if (this.state.mobileSidebarOpen) {
        this.htmlElement.style.overflow = 'hidden'
        this.bodyElement.style.overflow = 'hidden'
      } else {
        this.htmlElement.style.overflow = 'visible'
        this.bodyElement.style.overflow = 'visible'
      }
    }
    const activeSection = basepath(this.props.location.pathname)
    return (
      <div
        className="site"
      >
        <Navigation
          home="/"
          sections={ sections }
          location={ this.props.location }
          openSidebar={() => {
            this.setState({ mobileSidebarOpen: true })
          }}
        />
        <MobileSidebar
          isOpen={this.state.mobileSidebarOpen}
          activeSection={activeSection}
          close={() => this.setState({ mobileSidebarOpen: false })}
        />
        <Sidecar />
        <div
          className="page"
          {...merge({
            display: 'block',
            minHeight: 'calc(100vh - 94px)',
            position: 'relative',
            paddingTop: rhythm(1/2),
            paddingLeft: rhythm(3/4),
            paddingRight: rhythm(3/4),
          })}
        >
          { this.props.children }
        </div>
        <Footer />
      </div>
    );
  }
}

export default DefaultLayout
