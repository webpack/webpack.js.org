import React from 'react';
import Items from './projects.json';
import './organization-style';

let Shield = props => (
  <img src={
    `//img.shields.io/${props.content}.svg?label=${props.label}&style=flat-square&maxAge=3600` 
  } />
);

export default props => {
  return (
    <table className="organization">
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
            <tr>
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
                <Shield content={ `github/issues-raw/${org.repo}issues` } />
                &nbsp;
                <Shield content={ `github/issues-pr-raw/${org.repo}` } label="prs" />
              </td>
              <td>
                <a href={ `https://github.com/${org.maintainer}` }>
                  <img src={ `https://github.com/${org.maintainer}.png?size=20` } /> 
                  <span style={{ verticalAlign: 'top' }}>
                    @{ org.maintainer }
                  </span>
                </a>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};
