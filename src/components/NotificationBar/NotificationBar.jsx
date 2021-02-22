import { useState, useEffect, lazy, Suspense } from 'react';
import testLocalStorage from '../../utilities/test-local-storage';
import './NotificationBar.scss';

const MessageBar = lazy(() => import('./MessageBar'));

export const version = '3';
export const localStorageIsEnabled = testLocalStorage() !== false;

const barDismissed = () => {
  if (localStorageIsEnabled) {
    return localStorage.getItem('notification-dismissed') === version;
  }
  return false;
};

export default function NotificationBar() {
  // hide the bar in the beginning
  const [dismissed, setDismissed] = useState(true);
  const onClose = () => {
    setDismissed(true);
  };
<<<<<<< HEAD
  render() {
    return (
      <div className="notification-bar">
        <Container className="notification-bar__inner">
          <p>
            Webpack 5 现已正式发布。请阅读我们的 <a href="/blog/2020-10-10-webpack-5-release/">发布公告</a>。如还未准备升级，请阅读 <a href="https://v4.webpack.docschina.org/">webpack 4 文档</a>。
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
=======
  useEffect(() => {
    // update dismissed value when component mounted
    setDismissed(() => barDismissed());
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      // client side
      if (dismissed === false) {
        document.body.classList.add('notification-bar-visible');
      } else {
>>>>>>> 02213e4bfb40c7571a086a66ddd5c3f0dca1def8
        document.body.classList.remove('notification-bar-visible');
      }
    }
  }, [dismissed]);
  return (
    <>
      {dismissed === false ? (
        <Suspense fallback={<div />}>
          <MessageBar onClose={onClose} />
        </Suspense>
      ) : undefined}
    </>
  );
}
