import React from 'react';
import Interactive from 'antwar-interactive';
//import { GoogleAnalytics } from 'antwar-helpers';
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
import '../Dropdown/LinkDropdown.scss';

const Site = ({
  children,
  section,
  location: { pathname }
}) => (
  <div id="site" className="site">
    <Interactive
      id="src/components/NotificationBar/NotificationBar.jsx"
      component={ NotificationBar } />

    <Interactive
      id="src/components/Navigation/Navigation.jsx"
      component={ Navigation }
      pageUrl={ pathname } />

    <Interactive
      id="src/components/SidebarMobile/SidebarMobile.jsx"
      component={ SidebarMobile }
      sections={
        section.all()
          .filter(section => section.path.hidden !== true)
          .map((section) => ({
            title: section.path.title,
            url: section.url,
            pages: section.pages.map(page => ({
              title: page.file.title,
              url: page.url
            }))
          }))
      } />

    { children }

    <Footer />

      {/*<GoogleAnalytics analyticsId="UA-46921629-2" />*/}
    </div>
  );

export default Site;
