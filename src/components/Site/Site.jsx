// Import External Dependencies
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot as Hot } from 'react-hot-loader';

// Import Components
import NotificationBar from '../NotificationBar/NotificationBar';
import Navigation from '../Navigation/Navigation';
import SidebarMobile from '../SidebarMobile/SidebarMobile';
import Container from '../Container/Container';
import Sponsors from '../Sponsors/Sponsors';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import Page from '../Page/Page';

// Load Styling
import '../../styles/index';
import '../../styles/icon.font.js';
import './Site.scss';

// Load & Clean Up JSON Representation of `src/content`
// TODO: Consider moving all or parts of this cleaning to a `DirectoryTreePlugin` option(s)
import Content from '../../_content.json';
Content.children = Content.children
  .filter(item => item.name !== 'images')
  .map(item => {
    if ( item.type === 'directory' ) {
      return {
        ...item,
        children: item.children.sort((a, b) => {
          let group1 = (a.group || '').toLowerCase();
          let group2 = (b.group || '').toLowerCase();

          if (group1 < group2) return -1;
          if (group1 > group2) return 1;
          return a.sort - b.sort;
        })
      };

    } else return item;
  });

class Site extends React.Component {
  static defaultProps = {
    lazy: true
  }

  state = {
    mobileSidebarOpen: false
  }

  render() {
    let { location, lazy } = this.props;
    let { mobileSidebarOpen } = this.state;
    let sections = this._sections;
    let section = sections.find(({ url }) => location.pathname.startsWith(url));

    return (
      <div className="site">
        <NotificationBar />

        <Navigation
          pathname={ location.pathname }
          toggleSidebar={ this._toggleSidebar }
          links={[
            {
              title: 'Documentation',
              url: '/docs',
              // isActive: url => url.test(/^\/(api|concepts|configuration|guides|loaders|plugins)/),
              children: this._strip(
                sections.filter(item => item.name !== 'contribute')
              )
            },
            { title: 'Contribute', url: '/contribute' },
            { title: 'Vote', url: '/vote' },
            { title: 'Blog', url: '//medium.com/webpack' }
          ]} />

        {/*<SidebarMobile
          open={ mobileSidebarOpen }
          sections={ this._strip(Content.children) } />*/}

        <Container className="site__content">
          <Sponsors />
          <Sidebar
            currentPage={ location.pathname }
            pages={ this._strip(section ? section.children : Content.children) } />
          <Switch>
            { this._pages.map(page => (
              <Route
                key={ page.url }
                exact={ true }
                path={ page.url }
                render={ props => {
                  let path = page.path.replace('src/content/', '');

                  if ( lazy ) {
                    // import(`../../content/${path}`)
                    //   .then(module => {
                    //     console.log(module);
                    //   })
                    //   .catch(error => {
                    //     console.log(error);
                    //   });

                    // TODO: Add `LazyLoad` component with nprogress
                    return (
                      <Page
                        { ...page }
                        content={ require(`../../content/${path}`) } />
                    );

                  } else {
                    return (
                      <Page
                        { ...page }
                        content={ require(`../../content/${path}`) } />
                    );
                  }
                }} />
            ))}
          </Switch>
        </Container>

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
   * Flatten an array of `Content` items
   *
   * @param  {array} array - ...
   * @return {array}       - ...
   */
  _flatten = array => {
    return array.reduce((flat, item) => {
      return flat.concat(
        Array.isArray(item.children) ? this._flatten(item.children) : item
      );
    }, []);
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
      url,
      group,
      sort,
      anchors,
      children: children ? this._strip(children) : []
    }));
  }

  /**
   * Get top-level sections
   *
   * @return {array} - ...
   */
  get _sections() {
    return Content.children.filter(item => (
      item.type === 'directory'
    ));
  }

  /**
   * Get all markdown pages
   *
   * @return {array} - ...
   */
  get _pages() {
    return this._flatten(Content.children).filter(item => {
      return item.extension === '.md';
    });
  }
}

export default Hot(module)(Site);
