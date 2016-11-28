import React from 'react';
import Container from '../container/container';
import Contributors from '../contributors/contributors';
import Items from './projects.json';
import './organization-style';

let Shield = props => (
  <img src={
    `//img.shields.io/${props.content}.svg?label=${props.label}&style=flat-square&maxAge=3600` 
  } />
);

export default props => {
  return (
    <Container className="organization">
      <table>
        <thead>
          <tr>
            <th>project</th>
            <th>downloads/stars</th>
            <th>activity</th>
            <th>issues/prs</th>
            <th>maintainer</th>
          </tr>
        </thead>
        <tbody>
          {
            Items.map(org => (
              <tr key={ org.repo }>
                <td>
                  <a href={ `https://github.com/${org.repo}` }>{ org.repo }</a>
                </td>
                <td>
                  <Shield content={ `npm/dm/${org.npm}`} label="npm" />
                  &nbsp;
                  <Shield content={ `github/stars/${org.repo}` } label="*" />
                </td>
                <td>
                  <Shield 
                    content={ `github/commits-since/${org.repo}/${encodeURIComponent("master@{6 months ago}")}` }
                    label="6m" />
                  &nbsp;
                  <Shield 
                    content={ `github/commits-since/${org.repo}/${encodeURIComponent("master@{3 months ago}")}` }
                    label="3m" />
                  &nbsp;
                  <Shield 
                    content={ `github/commits-since/${org.repo}/${encodeURIComponent("master@{1 month ago}")}` }
                    label="1m" />
                  &nbsp;
                  <Shield 
                    content={ `github/commits-since/${org.repo}/${encodeURIComponent("master@{1 week ago}")}` }
                    label="1w" />
                </td>
                <td>
                  <Shield content={ `github/issues-raw/${org.repo}` } label="issues" />
                  &nbsp;
                  <Shield content={ `github/issues-pr-raw/${org.repo}` } label="prs" />
                </td>
                <td>
                  <Contributors contributors={[ org.maintainer ]} />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </Container>
  );
};
