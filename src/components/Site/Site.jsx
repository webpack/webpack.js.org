// Import External Dependencies
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot as Hot } from 'react-hot-loader';
import DocumentTitle from 'react-document-title';

// Import Utilities
import { ExtractPages, ExtractSections, GetPageTitle } from '../../utilities/content-utils';
import isClient from '../../utilities/is-client';

// Import Components
import NotificationBar from '../NotificationBar/NotificationBar';
import Navigation from '../Navigation/Navigation';
import SidebarMobile from '../SidebarMobile/SidebarMobile';
import Container from '../Container/Container';
import Splash from '../Splash/Splash';
import Sponsors from '../Sponsors/Sponsors';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import Page from '../Page/Page';
import Gitter from '../Gitter/Gitter';
import Vote from '../Vote/Vote';

// Load Styling
import '../../styles/index';
import '../../styles/icon.font.js';
import './Site.scss';

// Load Content Tree
import Content from '../../_content.json';

class Site extends React.Component {
  state = {
    mobileSidebarOpen: false
  }

  render() {
    let { location } = this.props;
    let { mobileSidebarOpen } = this.state;
    let sections = ExtractSections(Content);
    let section = sections.find(({ url }) => location.pathname.startsWith(url));
    let pages = ExtractPages(Content);

    return (
      <div className="site">
        <DocumentTitle title={ GetPageTitle(Content, location.pathname) } />

        <NotificationBar />

        <Navigation
          pathname={ location.pathname }
          toggleSidebar={ this._toggleSidebar }
          links={[
            {
              content: 'Documentation',
              url: '/concepts',
              isActive: url => /^\/(api|concepts|configuration|guides|loaders|plugins)/.test(url),
              children: this._strip(
                sections.filter(item => item.name !== 'contribute')
              )
            },
            { content: 'Contribute', url: '/contribute' },
            { content: 'Vote', url: '/vote' },
            { content: 'Blog', url: 'https://medium.com/webpack' }
          ]} />

        { isClient ? (
          <SidebarMobile
            open={ mobileSidebarOpen }
            sections={ this._strip(Content.children) } />
        ) : null }

          <Switch>
            <Route
              path="/"
              exact
              component={ Splash } />
            <Route
              render={ props => (
                <Container className="site__content">
                  <Switch>
                    { pages.map(page => (
                      <Route
                        key={ page.url }
                        exact={ true }
                        path={ page.url }
                        render={ props => {
                          let path = page.path.replace('src/content/', '');
                          let content = this.props.import(path);

                          return (
                            <React.Fragment>
                              <Sponsors />
                              <Sidebar
                                className="site__sidebar"
                                currentPage={ location.pathname }
                                pages={ this._strip(section ? section.children : Content.children.filter(item => (
                                  item.type !== 'directory' &&
                                  item.url !== '/'
                                ))) } />
                              <Page
                                { ...page }
                                content={ content } />
                              <Gitter />
                            </React.Fragment>
                          );
                        }} />
                    ))}
                    <Route
                      path="/vote"
                      component={ Vote } />
                    <Route render={ props => (
                      '404 Not Found'
                    )} />
                  </Switch>
                </Container>
              )} />
          </Switch>

        <Footer />
      </div>
    );
  }

  /**
   * Toggle the mobile sidebar
   *
   * @param {boolean} open - Indicates whether the menu should be open or closed
   */
  _toggleSidebar = (open = !this.state.mobileSidebarOpen) => {
    this.setState({
      mobileSidebarOpen: open
    });
  }

  /**
   * Strip any non-applicable properties
   *
   * @param  {array} array - ...
   * @return {array}       - ...
   */
  _strip = array => {
    return array.map(({ title, name, url, group, sort, anchors, children }) => ({
      title: title || name,
      content: title || name,
      url,
      group,
      sort,
      anchors,
      children: children ? this._strip(children) : []
    }));
  }
}

export default Hot(module)(Site);
