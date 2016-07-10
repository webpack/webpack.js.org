import React from 'react'
import Fork from 'react-ghfork'
import Gitter from '../components/Gitter'
import Navigation from '../components/Navigation'
import Body from 'antwar-helpers/layouts/Body'

export default React.createClass({
  displayName: 'Body',
  render() {
    const props = this.props
    const section = props.section
    const pathname = props.location.pathname

    return (
      <Body {...props}>
        {props.children}

        <Nav />

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
      title: 'How to',
      url: '/how-to'
    },
    {
      title: 'Using',
      url: '/using'
    },
    {
      title: 'Support',
      url: '/support'
    },
    {
      title: 'Contribute',
      url: '/contribute'
    },
    {
      title: 'Analyze',
      url: '/analyze'
    },
    {
      title: 'Donate',
      url: '/donate'
    }
  ]} />
)
