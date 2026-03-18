// Import External Dependencies
import PropTypes from "prop-types";
import { Children, PureComponent, cloneElement } from "react";

const containerClass =
  "relative inline-block overflow-hidden px-[0.3em] align-bottom after:absolute after:left-0 after:top-0 after:h-[3px] after:w-full after:bg-gradient-to-b after:from-[#2b3a42] after:to-transparent before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-[3px] before:w-full before:bg-gradient-to-t before:from-[#2b3a42] before:to-transparent";
const wrapClass =
  "inline-flex flex-col text-left transition-transform duration-1000 [transition-timing-function:cubic-bezier(0.7,0,0.3,1)]";

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
    isSliding: false,
  };

  render() {
    const { children, maxWidth } = this.props;
    const { currentIndex, contentHeight, isSliding } = this.state;
    const childrenCount = Children.count(children);

    const currentChild = cloneElement(children[currentIndex], {
      ref: (child) => (this.content = child),
    });

    const nextChild = cloneElement(
      children[(currentIndex + 1) % childrenCount],
    );

    return (
      <div className={containerClass}>
        <div
          className={`${wrapClass} ${isSliding ? "-translate-y-full" : "translate-y-0"}`}
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
      this.setState({ isSliding: true });
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

    this.setState(
      {
        currentIndex: (this.state.currentIndex + 1) % Children.count(children),
        isSliding: false,
      },
      () => {
        setTimeout(() => {
          this.setState({ isSliding: true });
        }, repeatDelay);
      },
    );
  };
}
