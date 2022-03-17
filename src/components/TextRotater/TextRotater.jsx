// Import External Dependencies
import { Children, cloneElement, PureComponent } from 'react';
import PropTypes from 'prop-types';

// Load Styling
import './TextRotater.scss';

export default class TextRotater extends PureComponent {
  static defaultProps = {
    delay: 0,
    repeatDelay: 3000,
  };

  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.node),
    delay: PropTypes.number,
    repeatDelay: PropTypes.number,
    // Needed to prevent jump when
    // rotating between texts of different widths
    maxWidth: PropTypes.number,
  };

  state = {
    currentIndex: 0,
    contentHeight: 0,
  };

  render() {
    const { children, maxWidth } = this.props;
    const { currentIndex, contentHeight } = this.state;
    const childrenCount = Children.count(children);

    const currentChild = cloneElement(children[currentIndex], {
      ref: (c) => (this.content = c),
    });

    const nextChild = cloneElement(
      children[(currentIndex + 1) % childrenCount]
    );

    return (
      <div className="text-rotater">
        <div
          className="text-rotater__wrap"
          ref={(trw) => (this.textRotatorWrap = trw)}
          onTransitionEnd={this._handleTransitionEnd}
          style={{ height: contentHeight, width: maxWidth }}
        >
          {currentChild}
          {nextChild}
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { delay } = this.props;

    setTimeout(() => {
      this._calculateContentHeight();
    }, 50);

    setTimeout(() => {
      if (this.textRotatorWrap) {
        this.textRotatorWrap.classList.add('text-rotater--slide-up');
      }
    }, delay);

    window.addEventListener('resize', this._calculateContentHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._calculateContentHeight);
  }

  _calculateContentHeight = () => {
    this.setState({
      contentHeight: this.content.clientHeight,
    });
  };

  _handleTransitionEnd = () => {
    const { children, repeatDelay } = this.props;

    if (this.textRotatorWrap) {
      this.textRotatorWrap.classList.remove('text-rotater--slide-up');

      this.setState(
        {
          currentIndex:
            (this.state.currentIndex + 1) % Children.count(children),
        },
        () => {
          setTimeout(() => {
            if (this.textRotatorWrap) {
              this.textRotatorWrap.classList.add('text-rotater--slide-up');
            }
          }, repeatDelay);
        }
      );
    }
  };
}
