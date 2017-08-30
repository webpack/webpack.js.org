import React, { Component } from 'react';
import Interactive from 'antwar-interactive';
import { GoogleAnalytics } from 'antwar-helpers';
import FontFaceObserver from 'fontfaceobserver';
import NotificationBar from '../NotificationBar/NotificationBar';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import SidebarMobile from '../SidebarMobile/SidebarMobile';
import './Site.scss';

// Load base styling
import '../../styles';
import '../../styles/icon.font.js';
import '../Container/Container.scss';
import '../NotificationBar/NotificationBar.scss';
import '../Navigation/Navigation.scss';
import '../Navigation/Search.scss';
import '../SidebarMobile/SidebarMobile.scss';
import '../SidebarItem/SidebarItem.scss';
import '../Logo/Logo.scss';
import '../Dropdown/Dropdown.scss';

export default class Site extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // load Source Sans Pro: 200, 400, 400i, 500
    if (window.sessionStorage.getItem('ssp-loaded') === null) {
      const ssp200 = new FontFaceObserver('Source Sans Pro', {
        weight: 200
      });

      const ssp400 = new FontFaceObserver('Source Sans Pro', {
        weight: 400
      });

      const ssp400i = new FontFaceObserver('Source Sans Pro', {
      style: 'italic',
        weight: 400
      });

      const ssp500 = new FontFaceObserver('Source Sans Pro', {
        weight: 500
      });

      Promise.all([ ssp200.load(), ssp400.load(), ssp400i.load(), ssp500.load() ])
      .then(() => {
        document.documentElement.classList.add('ssp-loaded');
        window.sessionStorage.setItem('ssp-loaded', true);
      });
    }

    // load Source Code Pro: 400, 600
    if (window.sessionStorage.getItem('scp-loaded') === null) {
      const scp400 = new FontFaceObserver('Source Code Pro', {
        weight: 400
      });

      const scp600 = new FontFaceObserver('Source Code Pro', {
        weight: 600
      });

      Promise.all([ scp400.load(), scp600.load() ])
      .then(() => {
        document.documentElement.classList.add('scp-loaded');
        window.sessionStorage.setItem('scp-loaded', true);
      });
    }

    // load Geomanist: 600
    const geo600 = new FontFaceObserver('Geomanist', {
      weight: 600
    });

    geo600.load()
      .then(() => {
        document.documentElement.classList.add('geo-loaded');
      });
  }

  render() {
    // Retrieve section data
    let sections = this.props.children.props.section.all()
      .map(({ title, url, pages }) => ({
        title,
        url,
        pages: pages.map(({ title, url }) => ({
          title: title || url, // XXX: Title shouldn't be coming in as undefined
          url
        }))
      }));

    // Rename the root section ("webpack" => "Other") and push it to the end
    let rootIndex = sections.findIndex(section => section.title === 'webpack');
    let rootSection = sections.splice(rootIndex, 1)[0];
    rootSection.title = 'Other';
    sections.push(rootSection);

    return (
      <div id="site" className="site">
        <Interactive
          id="src/components/NotificationBar/NotificationBar.jsx"
          component={ NotificationBar } />

        <Interactive
          id="src/components/Navigation/Navigation.jsx"
          component={ Navigation }
          sections={ sections }
          pageUrl={ this.props.children.props.page.url } />

        <Interactive
          id="src/components/SidebarMobile/SidebarMobile.jsx"
          component={ SidebarMobile }
          sections={ sections } />

        { this.props.children }
        <Footer />

        <GoogleAnalytics analyticsId="UA-46921629-2" />
      </div>
    );
  }
}
