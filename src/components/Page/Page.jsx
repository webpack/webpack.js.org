// Import External Dependencies
import { Children, isValidElement, Component } from 'react';
import PropTypes from 'prop-types';

// Import Components
import PageLinks from '../PageLinks/PageLinks';
import Markdown from '../Markdown/Markdown';
import {PlaceholderString} from '../Placeholder/Placeholder';
import { Pre } from '../Configuration/Configuration';
import AdjacentPages from './AdjacentPages';

// Load Styling
import './Page.scss';

class Page extends Component {
  static propTypes = {
    title: PropTypes.string,
    contributors: PropTypes.array,
    related: PropTypes.array,
    previous: PropTypes.object,
    next: PropTypes.object,
    content: PropTypes.oneOfType([
      PropTypes.shape({
        then: PropTypes.func.isRequired,
        default: PropTypes.string
      })
    ])
  }
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
            const hash = window.location.hash;
            if (hash) {
              const element = document.querySelector(hash);
              if (element) {
                element.scrollIntoView();
              }
            } else {
              window.scrollTo(0, 0);
            }

          })
        )
        .catch(() =>
          this.setState({
            content: 'Error loading content.'
          })
        );
    }
  }

  render() {
    const { title, related = [], previous, next, ...rest } = this.props;

    const { contentLoaded } = this.state;
    const loadRelated = contentLoaded && related && related.length !== 0;

    const { content } = this.state;

    let contentRender;

    if (typeof content === 'function') {
      contentRender = content({}).props.children.slice(4); // Cut frontmatter information
      contentRender = Children.map(contentRender, child => {
        if (isValidElement(child)) {
          if (child.props.mdxType === 'pre') {
            // eslint-disable-next-line
            return <Pre children={child.props.children} />;
          }
        }

        return child;
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

          {
            (previous || next) && <AdjacentPages previous={previous} next={next} />
          }

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
        </Markdown>
      </section>
    );
  }
}

export default Page;
