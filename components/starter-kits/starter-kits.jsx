import React from 'react';
import Container from '../container/container';
import Link from '../link/link';
import Kits from './starter-kits-data.json';
import './starter-kits-style';

// NOTE: The table classes used in this component correspond to
// those used in the markdown utility. Ideally we will soon create
// a table component that both the markdown utility and this page
// can use. This component could even use something like griddle
// to allow sorting and such.

export default props => (
  <Container className="starter-kits page__content">
    <h1>Starter Kits</h1>

    <p>
      The following table contains a curated list of starter kits that can&nbsp;
      be used as a jumping off point for webpack-based projects. To add a new&nbsp;
      kit to the list please visit&nbsp;
      <Link to="https://github.com/ahfarmer/tool-list">this repository</Link>&nbsp;
      and submit a PR against this file:&nbsp;
      <code>generator/starterProjectUrls.js</code>.
    </p>

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
                <div className="table-td-content">{ kit.tags.join(' | ') }</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Container>
);
