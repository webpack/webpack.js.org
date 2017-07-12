import React from 'react';
import Container from '../container/container';
import testLocalStorage from '../../utilities/test-local-storage';

const version = '1';
const localStorageIsEnabled = testLocalStorage() !== false;

export default class NotificationBar extends React.Component {
  render() {
    let dismissedMod = this._dismissed ? 'notification-bar--dismissed' : '';

    return (
      <div className={ `notification-bar ${dismissedMod}` }>
        <Container className="notification-bar__inner">
          <p>
            赞助 webpack，同时获取官方衣服！访问 <a href="https://webpack.threadless.com">webpack 官方商店！</a>&nbsp; 查看所有收益请转到 webpack 的 <a href="https://opencollective.com/webpack">Open Collective 页面！</a>
          </p>
          <p>
            在 <a href="http://www.unixstickers.com/tag/webpack">Unixstickers!</a> 上购买全新的 webpack 贴纸
            {localStorageIsEnabled ?
              <button
                className="notification-bar__close icon-cross"
                onClick={ this._close.bind(this) } /> :
              null
            }
          </p>
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
