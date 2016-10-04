import React from 'react';
import Navigation from 'components/Navigation';
import Sidecar from 'components/Sidecar';
import Footer from 'components/Footer';
import { merge, media, presets, style } from 'glamor'
import MobileSidebar from 'components/MobileSidebar';
import Sidebar from 'components/Sidebar';
import sections, { basepath } from 'utilities/pages'
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
  render() {
    const activeSection = basepath(this.props.location.pathname)
    return (
      <div className="site">
        <Navigation
          home="/"
          pages={ sections }
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
          },
          media(presets.tablet, {
            display: 'flex',
          }))}
        >
          { this.props.children }
        </div>
        <Footer />
      </div>
    );
  }
}

export default DefaultLayout
