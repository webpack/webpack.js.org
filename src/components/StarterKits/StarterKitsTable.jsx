import React from 'react';
import Kits from './_starter-kits.json';
import Link from '../Link/Link';

const StarterKitsTable = props => (
  <tbody className="table-body">
    {Kits.map((kit, i) => (
      <tr className="table-tr" key={i}>
        <td className="table-td">
          <div className="table-td-content">
            <Link to={kit.githubUrl}>{kit.githubRepoName}</Link>
          </div>
        </td>
        <td className="table-td">
          <div className="table-td-content">{kit.githubUserName}</div>
        </td>
        <td className="table-td">
          <div className="table-td-content">
            {kit.tags.map((tag, i) => (
              <span key={i} className="starter-kits__tag">
                {tag}
              </span>
            ))}
          </div>
        </td>
      </tr>
    ))}
  </tbody>
);

export default StarterKitsTable;
