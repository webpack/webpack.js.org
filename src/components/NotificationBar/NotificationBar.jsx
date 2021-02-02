import { Component, Fragment } from 'react';
import Container from '../Container/Container';
import testLocalStorage from '../../utilities/test-local-storage';
import './NotificationBar.scss';
import CloseIcon from '../../styles/icons/cross.svg';
import PropTypes from 'prop-types';

const version = '3';
const localStorageIsEnabled = testLocalStorage() !== false;

const barDismissed = () => {
  if (localStorageIsEnabled) {
    return localStorage.getItem('notification-dismissed') === version;
  }
  return false;
};

class MessageBar extends Component {
  static propTypes = {
    onClose: PropTypes.func,
  };
  render() {
    return (
      <div className="notification-bar">
        <Container className="notification-bar__inner">
          <p>
            Webpack 5 has been officially released. Read our{' '}
            <a href="/blog/2020-10-10-webpack-5-release/">announcement</a>. Not
            ready yet? Read{' '}
            <a href="https://v4.webpack.js.org/">
              webpack 4 documentation here
            </a>
            .
          </p>
          {localStorageIsEnabled ? (
            <CloseIcon
              aria-label="Dismiss"
              className="notification-bar__close"
              fill="#fff"
              width={16}
              onClick={this.close.bind(this)}
              role="button"
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
  close() {
    localStorage.setItem('notification-dismissed', version);
    this.props.onClose();
  }
}

export default class NotificationBar extends Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
    this.state = {
      dismissed: barDismissed(),
    };
    if (!this.state.dismissed && typeof document !== 'undefined') {
      document.body.classList.add('notification-bar-visible');
    }
  }

  onClose() {
    this.setState((state) => {
      if (!state.dismissed && typeof document !== 'undefined') {
        document.body.classList.remove('notification-bar-visible');
      }
      return {
        dismissed: !state.dismissed,
      };
    });
  }

  render() {
    const { dismissed } = this.state;

    return (
      <Fragment>
        {!dismissed ? <MessageBar onClose={this.onClose} /> : null}
      </Fragment>
    );
  }
}
