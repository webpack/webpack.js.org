// Import External Dependencies
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot as Hot } from 'react-hot-loader';

// Import Components
import NotificationBar from '../NotificationBar/NotificationBar';
import Navigation from '../Navigation/Navigation';
import SidebarMobile from '../SidebarMobile/SidebarMobile';
import Footer from '../Footer/Footer';

// ...
import Content from '../../_content.json';

// Load Styling
import '../../styles/index';
import '../../styles/icon.font.js';
import './Site.scss';

class Site extends React.Component {
  state = {
    mobileSidebarOpen: false
  }

  render() {
    let { location } = this.props;
    let { mobileSidebarOpen } = this.state;

    return (
      <div className="site">
        <NotificationBar />
        <Navigation
          pathname={ location.pathname }
          toggleSidebar={ this._toggleSidebar }
          links={[
            { title: 'Documentation', 'url': '/docs', children: this._sections.map(item => {
              // XXX: Remove or simplify once `url` and `title` are added to the objects
              return { title: item.name, url: item.url };
            }) },
            { title: 'Contribute', url: '/contribute' },
            { title: 'Vote', url: '/vote' },
            { title: 'Blog', url: '//medium.com/webpack' }
          ]} />
        <SidebarMobile
          open={ mobileSidebarOpen }
          sections={[]
            //   .map((section) => ({
            //     title: section.path.title,
            //     url: section.url,
            //     pages: section.pages.map(page => ({
            //       file: page.file,
            //       title: page.file.title,
            //       url: page.url
            //     })).sort(({ file: { attributes: a }}, { file: { attributes: b }}) => {
            //       let group1 = a.group.toLowerCase();
            //       let group2 = b.group.toLowerCase();

            //       if (group1 < group2) return -1;
            //       if (group1 > group2) return 1;
            //       return a.sort - b.sort;
            //     })
            //   }))
          } />

        <main className="site__content">
          <Switch>
            { this._pages.map(page => (
              <Route
                key={ page.url }
                path={ page.url }
                render={ props => {
                  let path = page.path.replace('src/content/', '');

                  import(`../../content/${path}`).then(module => {
                    console.log(module);
                  });

                  return null;
                }} />
            ))}
          </Switch>
        </main>

        <Footer />
      </div>
    );
  }

  /**
   * Toggle the mobile sidebar
   *
   * @param {object} e - React synthetic click event
   */
  _toggleSidebar = e => {
    this.setState({
      mobileSidebarOpen: !this.state.mobileSidebarOpen
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
   * Get top-level sections
   *
   * @return {array} - ...
   */
  get _sections() {
    return Content.children.filter(item => {
      return item.type === 'directory' && item.name !== 'contribute';
    });
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
