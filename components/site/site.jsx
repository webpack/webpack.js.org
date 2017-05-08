import React from 'react';
import Interactive from 'antwar-interactive';
import { GoogleAnalytics } from 'antwar-helpers';
import NotificationBar from '../notification-bar/notification-bar';
import Navigation from '../navigation/navigation';
import Footer from '../footer/footer';
import SidebarMobile from '../sidebar-mobile/sidebar-mobile';
import './site-style';

// Load base styling
import '../../styles';
import '../../styles/icon.font.js';
import '../container/container-style.scss';
import '../notification-bar/notification-bar-style';
import '../navigation/navigation-style';
import '../navigation/search-style';
import '../sidebar-mobile/sidebar-mobile-style';
import '../sidebar-item/sidebar-item-style';
import '../logo/logo-style';
import '../dropdown/dropdown-style.scss';

export default props => {
  // Retrieve and clean up section data
  let sections = (
    props.children.props.section.all()
      .filter(section => section.pages.length !== 0)
      .map(({ title, url, pages }) => ({
        title,
        url,
        pages: pages.map(({ title, url }) => ({
          title: title || url, // XXX: Title shouldn't be coming in as undefined
          url
        }))
      }))
  );

  return (
    <div id="site" className="site">
      <Interactive
        id="components/notification-bar/notification-bar.jsx"
        component={ NotificationBar } />

      <Interactive
        id="components/navigation/navigation.jsx"
        component={ Navigation }
        sections={ sections }
        pageUrl={ props.children.props.page.url } />

      <Interactive
        id="components/sidebar-mobile/sidebar-mobile.jsx"
        component={ SidebarMobile }
        sections={ sections } />

      { props.children }

      <Footer />

      <GoogleAnalytics analyticsId="UA-46921629-2" />
    </div>
  );
};
