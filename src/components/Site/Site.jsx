import React from 'react';
import Interactive from 'antwar-interactive';
import { GoogleAnalytics } from 'antwar-helpers';
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

export default props => {
  // Retrieve section data
  let sections = props.children.props.section.all()
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
        pageUrl={ props.children.props.page.url } />

      <Interactive
        id="src/components/SidebarMobile/SidebarMobile.jsx"
        component={ SidebarMobile }
        sections={ sections } />

      { props.children }
      <Footer />

      <GoogleAnalytics analyticsId="UA-46921629-2" />
    </div>
  );
};
