// Import External Dependencies
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
  };

  render() {
    const { children, maxWidth } = this.props;
    const { currentIndex, contentHeight } = this.state;
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
          before:content-[''] before:absolute before:left-0 before:w-full before:h-[3px]
          before:bottom-0 before:z-10
          before:bg-linear-to-t before:from-[#2b3a42] before:to-transparent
          after:content-[''] after:absolute after:left-0 after:w-full after:h-[3px]
          after:top-0
          after:bg-linear-to-b after:from-[#2b3a42] after:to-transparent
        "
      >
        <div
          className="inline-flex flex-col text-left"
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
        this.textRotatorWrap.classList.add("text-rotater--slide-up");
      }
    }, delay);

    window.addEventListener("resize", this._calculateContentHeight);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._calculateContentHeight);
  }

  _calculateContentHeight = () => {
    this.setState({
      contentHeight: this.content.clientHeight,
    });
  };

  _handleTransitionEnd = () => {
    const { children, repeatDelay } = this.props;

    if (this.textRotatorWrap) {
      this.textRotatorWrap.classList.remove("text-rotater--slide-up");

      this.setState(
        {
          currentIndex:
            (this.state.currentIndex + 1) % Children.count(children),
        },
        () => {
          setTimeout(() => {
            if (this.textRotatorWrap) {
              this.textRotatorWrap.classList.add("text-rotater--slide-up");
            }
          }, repeatDelay);
        },
      );
    }
  };
}
