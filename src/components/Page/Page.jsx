// Import External Dependencies
import { Children, isValidElement, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

// Import Components
import PageLinks from '../PageLinks/PageLinks';
import Markdown from '../Markdown/Markdown';
import Contributors from '../Contributors/Contributors';
import { PlaceholderString } from '../Placeholder/Placeholder';
import { Pre } from '../Configuration/Configuration';
import AdjacentPages from './AdjacentPages';

// Load Styling
import './Page.scss';
<<<<<<< HEAD

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
        default: PropTypes.string,
      }),
    ]),
  };
  constructor(props) {
    super(props);

    const { content } = props;
    const isDynamicContent = content instanceof Promise;

    this.state = {
      content: isDynamicContent
        ? PlaceholderString()
        : content.default || content,
      contentLoaded: isDynamicContent ? false : true,
    };
  }

  componentDidMount() {
    const { content } = this.props;

    if (content instanceof Promise) {
      content
        .then((module) =>
          this.setState(
            {
              content: module.default || module,
              contentLoaded: true,
            },
            () => {
              const hash = window.location.hash;
              if (hash) {
                const newHash = decodeURIComponent(hash);
                const element = document.querySelector(newHash);
                if (element) {
                  element.scrollIntoView();
                }
              } else {
                window.scrollTo(0, 0);
              }
            }
          )
        )
        .catch(() =>
          this.setState({
            content: 'Error loading content.',
          })
        );
=======
export default function Page(props) {
  const {
    title,
    contributors = [],
    related = [],
    previous,
    next,
    ...rest
  } = props;

  const isDynamicContent = props.content instanceof Promise;
  const [content, setContent] = useState(
    isDynamicContent
      ? PlaceholderString()
      : () => props.content.default || props.content
  );
  const [contentLoaded, setContentLoaded] = useState(
    isDynamicContent ? false : true
  );

  useEffect(() => {
    if (props.content instanceof Promise) {
      props.content
        .then((mod) => {
          setContent(() => mod.default || mod);
          setContentLoaded(true);
        })
        .catch(() => setContent('Error loading content.'));
>>>>>>> 02213e4bfb40c7571a086a66ddd5c3f0dca1def8
    }
  }, [props.content]);

  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (contentLoaded) {
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView();
        }
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [contentLoaded, pathname, hash]);

  const loadRelated = contentLoaded && related && related.length !== 0;
  const loadContributors =
    contentLoaded && contributors && contributors.length !== 0;

  let contentRender;

  if (typeof content === 'function') {
    contentRender = content({}).props.children.slice(4); // Cut frontmatter information
    contentRender = Children.map(contentRender, (child) => {
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
          __html: content,
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

        {(previous || next) && (
          <AdjacentPages previous={previous} next={next} />
        )}

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
Page.propTypes = {
  title: PropTypes.string,
  contributors: PropTypes.array,
  related: PropTypes.array,
  previous: PropTypes.object,
  next: PropTypes.object,
  content: PropTypes.oneOfType([
    PropTypes.shape({
      then: PropTypes.func.isRequired,
      default: PropTypes.string,
    }),
  ]),
};
