// Import External Dependencies
import React from 'react';

// Import Components
import PageLinks from '../PageLinks/PageLinks';
import Markdown from '../Markdown/Markdown';
import Contributors from '../Contributors/Contributors';
import {PlaceholderString} from '../Placeholder/Placeholder';
import Configuration from '../Configuration/Configuration';

// Load Styling
import './Page.scss';

class Page extends React.Component {
  constructor(props) {
    super(props);

    const { content } = props;
    const isDynamicContent = content instanceof Promise;

    this.state = {
      content: isDynamicContent ? PlaceholderString() : content.default || content,
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
          }, () => {
            document.documentElement.scrollTop = 0;
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
    const loadContributors =
      contentLoaded && contributors && contributors.length !== 0;

    const { content } = this.state;

    let contentRender;

    if (typeof content === 'function') {
      contentRender = content(Configuration).props.children.slice(4); // Cut frontmatter information
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
            <div className="related__section">
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
            <div className="contributors__section">
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
