// Import External Dependencies
import React from 'react';

// Import Components
import PageLinks from '../PageLinks/PageLinks';
import Markdown from '../Markdown/Markdown';
import Contributors from '../Contributors/Contributors';
import Placeholder from '../Placeholder/Placeholder';
import { Modes, Entry } from '../../content/configuration/modes.js';

// Load Styling
import './Page.scss';

const components = {
  mode: props => <Modes children={props} />,
  entry: props => <Entry children={props} />,
  filename: props => <Modes children={props} />,
  publicPath: props => <Modes children={props} />,
  advancedOutput: props => <Modes children={props} />,
  expert: props => <Modes children={props} />,
  advancedModule: props => <Modes children={props} />,
  alias: props => <Modes children={props} />,
  advancedResolve: props => <Modes children={props} />,
  hints: props => <Modes children={props} />,
  devtool: props => <Modes children={props} />,
  target: props => <Modes children={props} />,
  externals: props => <Modes children={props} />,
  stats: props => <Modes children={props} />,
  advanced: props => <Modes children={props} />,
  libraryTarget: props => <Modes children={props} />
};

const Pre = props => {
  const newChildren = React.Children.map(props.children.props.children, (child, i) => {
    if (React.isValidElement(child)) {
      if (child.props.props.className.includes('keyword')) {
        return components[child.props.props.componentname](
          child.props.children.slice(3, React.Children.count(child.props.children) - 4)
        );
      }
    }

    return child;
  });

  const newProps = {
    children: newChildren
  };

  return (
    <pre>
      <code {...newProps} />
    </pre>
  );
};

class Page extends React.Component {
  constructor(props) {
    super(props);

    const { content } = props;
    const isDynamicContent = content instanceof Promise;

    this.state = {
      content: isDynamicContent ? Placeholder() : content.default || content,
      contentLoaded: isDynamicContent ? false : true
    };
  }

  componentDidMount() {
    const { content } = this.props;

    if (content instanceof Promise) {
      content
        .then(module =>
          this.setState({
            content: module.default || module,
            contentLoaded: true
          })
        )
        .catch(error =>
          this.setState({
            content: 'Error loading content.'
          })
        );
    }
  }

  render() {
    const { title, contributors = [], related = [], ...rest } = this.props;

    const { contentLoaded } = this.state;
    const loadRelated = contentLoaded && related && related.length !== 0;
    const loadContributors = contentLoaded && contributors && contributors.length !== 0;

    const { content } = this.state;

    let contentRender;

    if (typeof content === 'function') {
      contentRender = content({
        components: {
          pre: Pre,
          hr: (props) => null
        }
      });
    } else {
      contentRender = (
        <div
          dangerouslySetInnerHTML={{
            __html: this.state.content
          }}
        />
      );
    }

    return (
      <section className="page">
        <PageLinks page={rest} />

        <Markdown>
          <h1>{title}</h1>

          {contentRender}

          {loadRelated && (
            <div>
              <hr />
              <h3>Further Reading</h3>
              <ul>
                {related.map((link, index) => (
                  <li key={index}>
                    <a href={link.url}>{link.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {loadContributors && (
            <div>
              <hr />
              <h3>Contributors</h3>
              <Contributors contributors={contributors} />
            </div>
          )}
        </Markdown>
      </section>
    );
  }
}

export default Page;
