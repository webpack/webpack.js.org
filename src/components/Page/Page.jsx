// Import External Dependencies
import React from 'react';

// Import Components
import PageLinks from '../PageLinks/PageLinks';
import Markdown from '../Markdown/Markdown';
import Contributors from '../Contributors/Contributors';
import Gitter from '../Gitter/Gitter';

// Load Styling
import './Page.scss';

const Page = ({
  title,
  content,
  contributors = [],
  related = [],
  ...props
}) => (
  <section className="page">
    <PageLinks page={ props } />

    <Markdown>
      <h1>{ title }</h1>

      <div dangerouslySetInnerHTML={{
        __html: content
      }} />

      { related.length > 0 && (
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

      { contributors.length > 0 && (
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

export default Page;
