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
  state = {
    content: this.props.content instanceof Promise ? 'Loading...' : this.props.content
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

  componentDidMount() {
    if ( this.props.content instanceof Promise ) {
      this.props.content
        .then(content => this.setState({
          content
        }))
        .catch(error => this.setState({
          content: 'Error loading content.'
        }));
    }
  }
}

export default Page;
