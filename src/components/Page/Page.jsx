// Import External Dependencies
import React from 'react';

// Import Components
import PageLinks from '../PageLinks/PageLinks';
import Gitter from '../Gitter/Gitter';
import Contributors from '../Contributors/Contributors';

// Load Styling
import './Page.scss';

const Page = ({ page }) => {
  let { contributors, title, related } = page.file.attributes;

  // TODO: This hack adds the index page to the array
  // Ideally this would be resolved at the antwar/build level
  // Index pages should just be treated normally
  // if (indexPage) {
  //   pages.unshift({
  //     url: `/${section.name}/`,
  //     group: indexPage.attributes.group,
  //     title: indexPage.attributes.title,
  //     anchors: indexPage.attributes.anchors
  //   });
  // }

  return (
    <section className="page__content">
      <h1>{ title }</h1>

      <PageLinks
        page={ page }
        section={ section.name } />

      <div dangerouslySetInnerHTML={{ __html: page.file.body }} />

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

      <Interactive
        id="src/components/Gitter/Gitter.jsx"
        component={ Gitter } />
    </section>
  );
};

export default Page;
