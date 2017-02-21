import React from 'react';
import Container from '../container/container';

export default class NotificationBar extends React.Component {
  render() {
    let dismissed = this._dismissed;
    let dismissedMod = dismissed ? 'notification-bar--dismissed' : '';

    return (
      <div className={ `notification-bar ${dismissedMod}` }>
        <Container className="notification-bar__inner">
          <p>
            Sponsor webpack and get apparel at the same time! Visit <a href="https://webpack.threadless.com">the official webpack shop!</a>&nbsp; All proceeds goto webpack's <a href="https://opencollective.com/webpack">Open Collective page!</a>
          </p>
          <p>
            Version 2 was just released! Read the <a href="https://medium.com/webpack/webpack-2-and-beyond-40520af9067f#.ojp0x5ls1">announcement</a>&nbsp;
            and <a href="/guides/installation">install it</a>&nbsp;
            today!

            <i 
              className="notification-bar__close icon-cross"
              onClick={ this._close.bind(this) } />
          </p>
        </Container>
      </div>
    );
  }

  _close(e) {
    localStorage.setItem('notification-dismissed', true);
    this.forceUpdate();
  }

  get _dismissed() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('notification-dismissed') === 'true';

    } else return false;
  }
}