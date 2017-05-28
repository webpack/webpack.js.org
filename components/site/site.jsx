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

const Site = ({
  children,
  section,
  location: { pathname }
}) => {
  // Retrieve section data
  let sections = section.all()
    .map(({ title, url, pages }) => ({
      title,
      url,
      pages: pages.map(({ title, url }) => ({
        title: title || url, // XXX: Title shouldn't be coming in as undefined
        url
      }))
    }));

  // XXX: Is this needed anymore?
  // Rename the root section ("webpack" => "Other") and push it to the end
  let rootIndex = sections.findIndex(section => section.title === 'webpack');
  let rootSection = sections.splice(rootIndex, 1)[0];
  rootSection.title = 'Other';
  sections.push(rootSection);

  return (
    <div id="site" className="site">
      <Interactive
        id="components/notification-bar/notification-bar.jsx"
        component={ NotificationBar } />

      <Interactive
        id="components/navigation/navigation.jsx"
        component={ Navigation }
        sections={ sections }
        pageUrl={ pathname } />

      <Interactive
        id="components/sidebar-mobile/sidebar-mobile.jsx"
        component={ SidebarMobile }
        sections={ sections } />

      { children }

      <Footer />

      <GoogleAnalytics analyticsId="UA-46921629-2" />
    </div>
  );
};

export default Site;
