import React from 'react';
import Container from '../Container/Container';
import testLocalStorage from '../../utilities/test-local-storage';
import './NotificationBar.scss';

const version = '2';
const localStorageIsEnabled = testLocalStorage() !== false;

const barDismissed = () => {
  if (localStorageIsEnabled) {
    return localStorage.getItem('notification-dismissed') === version;
  }
  return false;
};

class MessageBar extends React.Component {
  render() {
    return (
      <div className="notification-bar">
        <Container className="notification-bar__inner">
          <p>
            Sponsor webpack and get apparel from the <a href="https://webpack.threadless.com">official shop</a>! All
            proceeds go to our <a href="https://opencollective.com/webpack">open collective</a>!
          </p>
          {localStorageIsEnabled ? (
            <button
              aria-label="Dismiss"
              className="notification-bar__close icon-cross"
              onClick={this.close.bind(this)}
            />
          ) : null}
        </Container>
      </div>
    );
  }

  /**
   * Update the notification-dismissed state
   *
   * @param {object} e - Click event
   */
  close(e) {
    localStorage.setItem('notification-dismissed', version);
    this.props.onClose();
  }
}

export default class NotificationBar extends React.Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
    this.state = {
      dismissed: barDismissed()
    };
    if (!this.state.dismissed && typeof document !== 'undefined') {
      document.body.classList.add('notification-bar-visible');
    }
  }

  onClose() {
    this.setState(state => {
      if (!state.dismissed && typeof document !== 'undefined') {
        document.body.classList.remove('notification-bar-visible');
      }
      return {
        dismissed: !state.dismissed
      };
    });
  }

  render() {
    const { dismissed } = this.state;

    return <React.Fragment>{!dismissed ? <MessageBar onClose={this.onClose} /> : null}</React.Fragment>;
  }
}
