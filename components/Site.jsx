import React from 'react';
import { GoogleAnalytics } from 'antwar-helpers';
import Navigation from './Navigation';
import Sidecar from './Sidecar';
import Footer from './Footer';

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

    this.onToggleNav = () => {
      this.setState({navDisplayed: !this.state.navDisplayed});
    };
  }

  componentWillUpdate (nextProps) {
    console.log(nextProps);
  }

  render () {
    let { children } = this.props;

    const cls = this.state.navDisplayed ? 'site nav-displayed' : 'site';

    return (
      <div className={cls}>
        <Navigation home="/" pages={ pages } onToggleNav={this.onToggleNav} />
        <Sidecar />
        { children }
        <Footer />

        <GoogleAnalytics analyticsId="UA-46921629-2" />
      </div>
    );
  }
}
