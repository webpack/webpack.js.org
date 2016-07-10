import React from 'react'
import Fork from 'react-ghfork'
import Gitter from '../components/Gitter'
import Navigation from '../components/navigation/navigation'
import Body from 'antwar-helpers/layouts/Body'

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
      url: '/concepts'
    },
    {
      title: 'How to',
      url: '/how-to'
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
