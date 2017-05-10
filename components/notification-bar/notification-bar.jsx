import React from 'react';
import Container from '../container/container';

const version = '1';

export default class NotificationBar extends React.Component {
  render() {
    let dismissedMod = this._dismissed ? 'notification-bar--dismissed' : '';

    return (
      <div className={ `notification-bar ${dismissedMod}` }>
        <Container className="notification-bar__inner">
          <p>
            Sponsor webpack and get apparel at the same time! Visit <a href="https://webpack.threadless.com">the official webpack shop!</a>&nbsp; All proceeds go to webpack's <a href="https://opencollective.com/webpack">Open Collective page!</a>
          </p>
          <p>
            Buy the brand-new webpack stickers at <a href="http://www.unixstickers.com/tag/webpack">Unixstickers!</a>

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
