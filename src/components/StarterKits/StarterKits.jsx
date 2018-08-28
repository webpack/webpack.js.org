import React from 'react';
import Container from '../Container/Container';
import Link from '../Link/Link';
import Kits from './_starter-kits.json';
import './StarterKits.scss';

// NOTE: The table classes used in this component correspond to
// those used in the markdown utility. Ideally we will soon create
// a table component that both the markdown utility and this page
// can use. This component could even use something like griddle
// to allow sorting and such.

const StarterKits = props => (
  <Container className="starter-kits page__content markdown">
    <h1>Starter Kits</h1>

    <p>
      The following table contains a curated list of starter kits that can
      be used as a jumping off point for webpack-based projects. To add a new
      kit to the list please visit{' '}
      <Link to="https://github.com/ahfarmer/javascriptstuff-db">this repository</Link>{' '}
      and submit a PR against this file:
      <code>data/source/react-starter-projects.js</code>.
    </p>

    <blockquote className="warning">
      <div className="tip-content">
        Boilerplates should be used as <strong>Proof of Concepts</strong> to help you learn
        different webpack techniques for various frameworks. Make sure you understand
        what's going on in them and avoid copy and paste coding. Also note that none
        of these are officially supported by webpack. If you run into an issue, please
        report that to the maintainer(s) of the repository.
      </div>
    </blockquote>

    <div className="table">
      <div className="table-wrap">
        <div className="table-header">
          <div className="table-tr">
            <div className="table-th">Project Name</div>
            <div className="table-th">Maintainer</div>
            <div className="table-th">Tags</div>
          </div>
        </div>
        <div className="table-body">
          { Kits.map((kit, i) => (
            <div className="table-tr" key={ i }>
              <div className="table-td">
                <div className="table-td-title">Project Name</div>
                <div className="table-td-content">
                  <Link to={ kit.githubUrl }>{ kit.githubRepoName }</Link>
                </div>
              </div>
              <div className="table-td">
                <div className="table-td-title">Maintainer</div>
                <div className="table-td-content">{ kit.githubUserName }</div>
              </div>
              <div className="table-td">
                <div className="table-td-title">Tags</div>
                <div className="table-td-content">
                  { kit.tags.map((tag, i) => (
                    <span key={ i } className="starter-kits__tag">{ tag }</span>
                  )) }
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Container>
);

StarterKits.title = 'Starter Kits';

export default StarterKits;
