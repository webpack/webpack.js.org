import React from 'react';
import Interactive from 'antwar-interactive';
import { GoogleAnalytics } from 'antwar-helpers';
import Navigation from '../navigation/navigation';
import SidebarMobile from '../sidebar-mobile/sidebar-mobile';
import Sidecar from '../sidecar/sidecar';
import Footer from '../footer/footer';
import './site-style';

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

  // Rename the root section ("Webpack" => "Other") and pop it to the end
  let rootIndex = sections.findIndex(section => section.title === 'Webpack');
  let rootSection = sections.splice(rootIndex, 1)[0];
  rootSection.title = '其他';
  sections.push(rootSection);

  return (
    <div id="site" className="site">
      <Interactive
        id="components/navigation/navigation.jsx"
        component={ Navigation }
        sections={ sections }
        pageUrl={ props.children.props.page.url } />

      <Interactive
        id="components/sidebar-mobile/sidebar-mobile.jsx"
        component={ SidebarMobile }
        sections={ sections } />

      <Sidecar />
      { props.children }
      <Footer />

      <GoogleAnalytics analyticsId="UA-46921629-2" />
    </div>
  );
};
