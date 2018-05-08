// Import External Dependencies
import React from 'react';

// Import Components
import PageLinks from '../PageLinks/PageLinks';
import Markdown from '../Markdown/Markdown';
import Contributors from '../Contributors/Contributors';
import Gitter from '../Gitter/Gitter';

// Load Styling
import './Page.scss';

class Page extends React.Component {
  constructor(props) {
    super(props);

    const { content } = props;

    this.state = {
      content: content instanceof Promise ? 'Loading...' : content.default || content
    };
  }

  componentDidMount() {
    const { content } = this.props;

    if (content instanceof Promise) {
      content
        .then(module => this.setState({
          content: module.default || module
        }))
        .catch(error => this.setState({
          content: 'Error loading content.'
        }));
    }
  }

  render() {
    let {
      title,
      content,
      contributors = [],
      related = [],
      ...rest
    } = this.props;

    return (
      <section className="page">
        <PageLinks page={ rest } />

        <Markdown>
          <h1>{ title }</h1>

          <div dangerouslySetInnerHTML={{
            __html: this.state.content
          }} />

          { related && related.length > 0 && (
            <div>
              <hr />
              <h3>Further Reading</h3>
              <ul>
                {
                  related.map((link, index) => (
                    <li key={ index }>
                      <a href={ link.url }>
                        { link.title }
                      </a>
                    </li>
                  ))
                }
              </ul>
            </div>
          )}

          { contributors && contributors.length > 0 && (
            <div>
              <hr />
              <h3>Contributors</h3>
              <Contributors contributors={ contributors } />
            </div>
          )}
        </Markdown>

        <Gitter />
      </section>
    );
  }
}

export default Page;
