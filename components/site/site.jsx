import React from 'react';
import { GoogleAnalytics } from 'antwar-helpers';
import Navigation from '../navigation/navigation';
import Sidecar from '../sidecar/sidecar';
import Footer from '../footer/footer';
import './site-style';

const pages = [
  { title: 'Concepts', url: 'concepts' },
  { title: 'Configuration', url: 'configuration' },
  { title: 'How to', url: 'how-to' },
  { title: 'API', url: 'api' },
  { title: 'Github', url: '//github.com/webpack/webpack.js.org' }
];

export default class Site extends React.Component {
  constructor () {
    super();

    this.state = {
      navDisplayed: false
    };

    // this.onToggleNav = () => {
    //   this.setState({navDisplayed: !this.state.navDisplayed});
    // };
  }

  render () {
    let { children } = this.props;

    // TODO: restore
    // const cls = this.state.navDisplayed ? 'site nav-displayed' : 'site';

    return (
      <div id="site" className="site">
        <Navigation home="/" pages={ pages } onToggleNav={this.onToggleNav} />
        <Sidecar />
        { children }
        <Footer />

        <GoogleAnalytics analyticsId="UA-46921629-2" />
      </div>
    );
  }
}
