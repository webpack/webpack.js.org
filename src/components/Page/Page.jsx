// Import External Dependencies
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';

// Import Components
import PageLinks from '../PageLinks/PageLinks';
import Markdown from '../Markdown/Markdown';
import Contributors from '../Contributors/Contributors';
import { PlaceholderString } from '../Placeholder/Placeholder';
import AdjacentPages from './AdjacentPages';
import CodeBlock from '../CodeBlock/CodeBlock';

// Load Styling
import './Page.scss';
import Link from '../Link/Link';

const components = { pre: CodeBlock };

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
    }
  }, [props.content]);

  const { hash, pathname } = useLocation();

  useEffect(() => {
    let observer;
    if (contentLoaded) {
      if (hash) {
        const target = document.querySelector('#md-content');
        // two cases here
        // 1. server side rendered page, so hash target is already there
        if (document.querySelector(hash)) {
          document.querySelector(hash).scrollIntoView();
        } else {
          // 2. dynamic loaded content
          // we need to observe the dom change to tell if hash exists
          observer = new MutationObserver(() => {
            const element = document.querySelector(hash);
            if (element) {
              element.scrollIntoView();
            }
          });
          observer.observe(target, {
            childList: true,
            attributes: false,
            subtree: false,
          });
        }
      } else {
        window.scrollTo(0, 0);
      }
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [contentLoaded, pathname, hash]);

  const numberOfContributors = contributors.length;
  const loadRelated = contentLoaded && related && related.length !== 0;
  const loadContributors =
    contentLoaded && contributors && numberOfContributors !== 0;

  let contentRender;

  if (typeof content === 'function') {
    contentRender = content({}).props.children;
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

        {rest.thirdParty ? (
          <div className="italic my-[20px]">
            <strong className="font-bold">Disclaimer:</strong> {title} is a
            third-party package maintained by community members, it potentially
            does not have the same support, security policy or license as
            webpack, and it is not maintained by webpack.
          </div>
        ) : null}

        <MDXProvider components={components}>
          <div id="md-content">{contentRender}</div>
        </MDXProvider>

        {loadRelated && (
          <div className="print:hidden">
            <h2>Further Reading</h2>
            <ul>
              {related.map((link, index) => (
                <li key={index}>
                  <Link to={link.url}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <PageLinks page={rest} />

        {(previous || next) && (
          <AdjacentPages previous={previous} next={next} />
        )}

        {loadContributors && (
          <div data-testid="contributors" className="print:hidden">
            <h2 className="!font-sans !font-normal">
              {numberOfContributors}{' '}
              {numberOfContributors === 1 ? 'Contributor' : 'Contributors'}
            </h2>
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
