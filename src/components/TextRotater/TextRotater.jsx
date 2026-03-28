import { clsx } from "clsx";
import PropTypes from "prop-types";
import { Children, PureComponent, cloneElement } from "react";

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
    isAnimating: false,
  };

  render() {
    const { children, maxWidth } = this.props;
    const { currentIndex, contentHeight, isAnimating } = this.state;
    const childrenCount = Children.count(children);

    const currentChild = cloneElement(children[currentIndex], {
      ref: (child) => (this.content = child),
    });

    const nextChild = cloneElement(
      children[(currentIndex + 1) % childrenCount],
    );

    return (
      <div
        className="
          relative inline-block overflow-hidden align-bottom px-[0.3em]
        "
      >
        <div
          className={clsx(
            "inline-flex flex-col text-left",
            isAnimating && "text-rotater--slide-up",
          )}
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

    this.heightTimeout = setTimeout(() => {
      this._calculateContentHeight();
    }, 50);

    this.animationTimeout = setTimeout(() => {
      this.setState({ isAnimating: true });
    }, delay);

    window.addEventListener("resize", this._calculateContentHeight);
  }

  componentWillUnmount() {
    clearTimeout(this.heightTimeout);
    clearTimeout(this.animationTimeout);
    clearTimeout(this.repeatTimeout);
    window.removeEventListener("resize", this._calculateContentHeight);
  }

  _calculateContentHeight = () => {
    if (this.content) {
      this.setState({
        contentHeight: this.content.clientHeight,
      });
    }
  };

  _handleTransitionEnd = () => {
    const { children, repeatDelay } = this.props;

    this.setState(
      {
        currentIndex: (this.state.currentIndex + 1) % Children.count(children),
        isAnimating: false,
      },
      () => {
        this.repeatTimeout = setTimeout(() => {
          this.setState({ isAnimating: true });
        }, repeatDelay);
      },
    );
  };
}
