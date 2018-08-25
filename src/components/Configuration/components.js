import React from 'react';
import Popover from 'react-tiny-popover';
import './Configuration.scss';

const isFirstChild = child => typeof child === 'string' && child !== ' ';

const removeSpaces = child => (isFirstChild(child) ? child.trim() : child);

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

export class Modes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      summary: null,
      content: null
    };
  }

  componentDidMount() {
    const { children, url } = this.props;

    const closeDefault = children.findIndex(child => {
      if (React.isValidElement(child)) {
        return child.props.props.className.includes('tag') && child.props.children.length === 4;
      }
    });

    const newChildren = children
      .splice(2, closeDefault - 3)
      .map(removeSpaces)
      .map((child, i) => addLink(child, i, url));

    children.splice(0, 4); // Remove <default></default>

    this.setState({
      summary: newChildren,
      content: children
    });
  }

  render() {
    const { open, summary, content } = this.state;
    return (
      <Popover
        isOpen={open}
        position={['right', 'top']}
        disableReposition
        padding={0}
        onClickOutside={() => this.setState({ open: false })}
        containerClassName={'shadow'}
        content={<Card body={content} />}
      >
        <span onClick={() => this.setState({ open: !this.state.open })}>{summary}</span>
      </Popover>
    );
  }
}

export const Entry = props => {
  return <a href="#">{props.children}</a>;
};
