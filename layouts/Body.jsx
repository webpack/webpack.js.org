import React from 'react'
import Fork from 'react-ghfork'
import Body from 'antwar-helpers/layouts/Body'
import Gitter from 'antwar-helpers/components/Gitter'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default React.createClass({
  displayName: 'Body',
  render() {
    const props = this.props
    const section = props.section
    const pathname = props.location.pathname

    return (
      <Body {...props}>
        <Nav />

        {props.children}

        <Footer />

        <Fork className="right ribbon"
          project="webpack/webpack"
          text="Fork me on GitHub"
          style={{backgroundColor: 'black'}}
          target="_blank" />

        <Gitter room={'webpack/webpack'} title="Need help?" />
      </Body>
    )
  }
})

const Nav = (props) => (
  <Navigation {...props} pages={[
    {
      title: 'Home',
      url: '/',
    },
    {
      title: 'Concepts',
      url: 'concepts'
    },
    {
      title: 'How to',
      url: 'how-to'
    },
    {
      title: 'API',
      url: 'api'
    }
  ]} />
)
