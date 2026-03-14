// Import External Dependencies
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Import Components
import Contributors from "../Contributors/Contributors.jsx";
import Link from "../Link/Link.jsx";
import Markdown from "../Markdown/Markdown.jsx";
import PageLinks from "../PageLinks/PageLinks.jsx";
import { placeholderString } from "../Placeholder/Placeholder.jsx";
import AdjacentPages from "./AdjacentPages.jsx";

// Load Styling
import "./Page.scss";

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
  const [dynamicContent, setContent] = useState(
    isDynamicContent ? placeholderString() : null,
  );
  const content = isDynamicContent
    ? dynamicContent
    : props.content.default || props.content;

  const [contentLoaded, setContentLoaded] = useState(!isDynamicContent);

  useEffect(() => {
    if (props.content instanceof Promise) {
      props.content
        .then((mod) => {
          setContent(() => mod.default || mod);
          setContentLoaded(true);
        })
        .catch(() => setContent("Error loading content."));
    }
  }, [props.content]);

  const { hash, pathname } = useLocation();
  const isBlogIndex = pathname === "/blog/";

  useEffect(() => {
    let observer;
    if (contentLoaded) {
      if (hash) {
        const target = document.querySelector("#md-content");
        // two cases here
        // 1. server side rendered page, so hash target is already there
        // Note: Why this change because we use getElementById instead of querySelector(hash) here because
        // CSS selectors cannot start with a digit (e.g. #11-in-scope is invalid)
        if (document.getElementById(hash.slice(1))) {
          document.getElementById(hash.slice(1)).scrollIntoView();
        } else {
          // 2. dynamic loaded content
          // we need to observe the dom change to tell if hash exists
          observer = new MutationObserver(() => {
            const element = document.getElementById(hash.slice(1));
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

  if (typeof content === "function") {
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
    <main id="main-content" className="page">
      <Markdown>
        <h1>{title}</h1>
        {rest.date && pathname.startsWith("/blog/") && !isBlogIndex && (
          <div className="blog-post-date">{rest.date}</div>
        )}

        {rest.thirdParty ? (
          <div className="italic my-[20px]">
            <strong className="font-bold">Disclaimer:</strong> {title} is a
            third-party package maintained by community members, it potentially
            does not have the same support, security policy or license as
            webpack, and it is not maintained by webpack.
          </div>
        ) : null}

        <div id="md-content">{contentRender}</div>

        {rest.url === "/blog/" && (
          <div className="blog-list">
            {(props.pages || [])
              .filter((post) => post.url !== "/blog/")
              .map((post) => (
                <div key={post.url} className="blog-post-item">
                  <h2>
                    <Link to={post.url}>{post.title}</Link>
                  </h2>
                  {post.date && (
                    <div className="blog-post-date">{post.date}</div>
                  )}
                  <p>{post.teaser}</p>
                  <Link to={post.url} className="read-more">
                    Read More &rarr;
                  </Link>
                </div>
              ))}
          </div>
        )}

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

        {!isBlogIndex && (previous || next) && (
          <AdjacentPages previous={previous} next={next} />
        )}

        {loadContributors && (
          <div data-testid="contributors" className="print:hidden">
            <h2 className="!font-sans !font-normal">
              {numberOfContributors}{" "}
              {numberOfContributors === 1 ? "Contributor" : "Contributors"}
            </h2>
            <Contributors contributors={contributors} />
          </div>
        )}
      </Markdown>
    </main>
  );
}

Page.propTypes = {
  title: PropTypes.string,
  contributors: PropTypes.array,
  related: PropTypes.array,
  previous: PropTypes.object,
  next: PropTypes.object,
  pages: PropTypes.array,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({
      // eslint-disable-next-line unicorn/no-thenable
      then: PropTypes.func.isRequired,
      default: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    }),
  ]),
};
