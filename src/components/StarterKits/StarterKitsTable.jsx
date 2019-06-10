import React from 'react';
import Kits from './_starter-kits.json';
import Link from '../Link/Link';

const StarterKitsTable = props => (
  <div className="table-body">
    {Kits.map((kit, i) => (
      <div className="table-tr" key={i}>
        <div className="table-td">
          <div className="table-td-title">Project Name</div>
          <div className="table-td-content">
            <Link to={kit.githubUrl}>{kit.githubRepoName}</Link>
          </div>
        </div>
        <div className="table-td">
          <div className="table-td-title">Maintainer</div>
          <div className="table-td-content">{kit.githubUserName}</div>
        </div>
        <div className="table-td">
          <div className="table-td-title">Tags</div>
          <div className="table-td-content">
            {kit.tags.map((tag, i) => (
              <span key={i} className="starter-kits__tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default StarterKitsTable;
