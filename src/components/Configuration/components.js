import { isValidElement, Component } from 'react';
import Popover from 'react-tiny-popover';
import './Configuration.scss';
import PropTypes from 'prop-types';

const DEFAULT_CHILDREN_SIZE = 4;

const isFirstChild = (child) => typeof child === 'string' && child !== ' ';

const removeSpaces = (child) => (isFirstChild(child) ? child.trim() : child);

const addLink = (child, i, url) => {
  return isFirstChild(child) ? (
    <a href={url} key={i}>
      {child}
    </a>
  ) : (
    child
  );
};
const Card = ({ body }) => {
  return (
    <div className="markdown">
      <pre className="inline">
        <code>{body}</code>
      </pre>
    </div>
  );
};
Card.propTypes = {
  body: PropTypes.node,
};
export class Details extends Component {
  static propTypes = {
    url: PropTypes.string,
    myChilds: PropTypes.arrayOf(PropTypes.node),
  };
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  clickOutsideHandler = () => {
    this.setState({ open: false });
  };

  toggleVisibility = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { myChilds, url } = this.props;

    // Find the index of </default>
    const closeDefaultTagIndex = myChilds.findIndex((child) => {
      if (isValidElement(child)) {
        return (
          child.props.className.includes('tag') &&
          child.props.children.length === DEFAULT_CHILDREN_SIZE
        );
      }
    });

    const content = myChilds.slice();

    // Summary is the part of the snippet that would be shown in the code snippet,
    // to get it we need to cut the <default></default> enclosing tags
    const summary = content
      .splice(2, closeDefaultTagIndex - 3)
      .map(removeSpaces)
      .map((child, i) => addLink(child, i, url));

    content.splice(0, DEFAULT_CHILDREN_SIZE); // Remove <default></default> information

    const { open } = this.state;
    return (
      <Popover
        isOpen={open}
        position={['right', 'top']}
        padding={0}
        onClickOutside={this.clickOutsideHandler}
        containerClassName={'shadow'}
        content={<Card body={content} />}
      >
        <span
          className="code-details-summary-span"
          onClick={this.toggleVisibility}
        >
          {summary}
        </span>
      </Popover>
    );
  }
}
