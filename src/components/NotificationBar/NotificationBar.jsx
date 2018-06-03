import React from 'react';
import Container from '../Container/Container';
import testLocalStorage from '../../utilities/test-local-storage';

const version = '3';
const localStorageIsEnabled = testLocalStorage() !== false;

export default class NotificationBar extends React.Component {
  render() {
    let dismissedMod = this._dismissed ? 'notification-bar--dismissed' : '';

    return (
      <div className={ `notification-bar ${dismissedMod}` }>
        <Container className="notification-bar__inner">
          <p>
            WEBPACK 4 IS RELEASED, TRY IT TODAY, SEE THE CHANGELOG AND THESE ARTICLES: <br />
            <a target="_blank" href="https://github.com/webpack/webpack/releases/tag/v4.0.0">* Change Log</a><br />
            <a target="_blank" href="https://medium.com/webpack/webpack-4-released-today-6cdb994702d4">* Install and setup Webpack 4</a><br />
            <a target="_blank" href="https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a">* New configuration options in Webpack 4</a><br />
          </p>
          <br />
          <p>
            Sponsor webpack and get apparel from the <a href="https://webpack.threadless.com">official shop</a>{' '}
            or get stickers <a href="http://www.unixstickers.com/tag/webpack">here</a>! All proceeds go to our{' '}
            <a href="https://opencollective.com/webpack">open collective</a>!
          </p>
          { localStorageIsEnabled ?
            <button
              className="notification-bar__close icon-cross"
              onClick={ this._close.bind(this) } /> :
            null
          }
        </Container>
      </div>
    );
  }

  /**
   * Update the notification-dismissed state
   *
   * @param {object} e - Click event
   */
  _close(e) {
    if (localStorageIsEnabled) {
      localStorage.setItem('notification-dismissed', version);
    }
    this.forceUpdate();
  }

  /**
   * Determine whether or not the current message was dismissed
   *
   * @return {boolean} - Whether or not the current message was dismissed
   */
  get _dismissed() {
    if (localStorageIsEnabled) {
      return localStorage.getItem('notification-dismissed') === version;

    } else return false;
  }
}
