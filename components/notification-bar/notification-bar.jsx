import React from 'react';
import Container from '../container/container';

const version = '0';

export default class NotificationBar extends React.Component {
  render() {
    let dismissedMod = this._dismissed ? 'notification-bar--dismissed' : '';

    return (
      <div className={ `notification-bar ${dismissedMod}` }>
        <Container className="notification-bar__inner">
          <p>
            赞助 webpack，同时获取官方衣服！访问 <a href="https://webpack.threadless.com">webpack 官方商店！</a>&nbsp; 所有收益都转到 webpack 的 <a href="https://opencollective.com/webpack">Open Collective 页面！</a>
          </p>
          <p>
            webpack 2 已经发布！阅读<a href="https://medium.com/webpack/webpack-2-and-beyond-40520af9067f#.ojp0x5ls1">公告</a>&nbsp;并且现在就<a href="/guides/installation">安装它</a>&nbsp;！

            <i
              className="notification-bar__close icon-cross"
              onClick={ this._close.bind(this) } />
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
    localStorage.setItem('notification-dismissed', version);
    this.forceUpdate();
  }

  /**
   * Determine whether or not the current message was dismissed
   *
   * @return {boolean} - Whether or not the current message was dismissed
   */
  get _dismissed() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('notification-dismissed') === version;

    } else return false;
  }
}