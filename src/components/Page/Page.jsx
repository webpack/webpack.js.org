// Import External Dependencies
import { Children, isValidElement, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

// Import Components
import PageLinks from '../PageLinks/PageLinks';
import Markdown from '../Markdown/Markdown';
import Contributors from '../Contributors/Contributors';
import Translators from '../Translators/Translators';
import { PlaceholderString } from '../Placeholder/Placeholder';
import { Pre } from '../Configuration/Configuration';
import AdjacentPages from './AdjacentPages';

// Load Styling
import './Page.scss';
export default function Page(props) {
  const {
    title,
    contributors = [],
    translators = [],
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
  const loadTranslators =
    contentLoaded && translators && translators.length !== 0;

  let contentRender;

  if (typeof content === 'function') {
    contentRender = content({}).props.children;
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
      <Markdown>
        <h1>{title}</h1>

        {contentRender}

        {loadRelated && (
          <div className="print:hidden">
            <h2>Further Reading</h2>
            <ul>
              {related.map((link, index) => (
                <li key={index}>
                  <a href={link.url}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <PageLinks page={rest} />

        {(previous || next) && (
          <AdjacentPages previous={previous} next={next} />
        )}

        {loadTranslators && (
          <div className="contributors__section">
            <h3>译者</h3>
            <Translators translators={translators} />
          </div>
        )}

        {loadContributors && (
          <div className="contributors__section">
            <h3>贡献者</h3>
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
  translators: PropTypes.array,
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
