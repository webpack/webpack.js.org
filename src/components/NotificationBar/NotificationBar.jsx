import React from 'react';
import Container from '../Container/Container';
import testLocalStorage from '../../utilities/test-local-storage';

const version = '2';
const localStorageIsEnabled = testLocalStorage() !== false;

export default class NotificationBar extends React.Component {
  render() {
    let dismissedMod = this._dismissed ? 'notification-bar--dismissed' : '';

    return (
      <div className={ `notification-bar ${dismissedMod}` }>
        <Container className="notification-bar__inner">
          <p>
            赞助 webpack，同时从<a href="https://webpack.threadless.com">官方商店</a>购买衣服{' '}
            或者在<a href="http://www.unixstickers.com/tag/webpack">这里</a>购买贴纸！所有收益将转到我们的{' '}
            <a href="https://opencollective.com/webpack">open collective</a>！
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
