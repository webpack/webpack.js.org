import React from 'react'
import {Link} from 'react-router'

export default React.createClass({
  displayName: 'UsageIndex',
  render() {
    const section = this.props.section

    return (
      <div className="grid">
        <h1>{section.title}</h1>

        <ul className="usage-list">{section.pages().map((page, i) => {
          return (
            <li key={`usage-list-item-${i}`}>
              <h3 className="usage-list__heading">
                <Link to={'/' + page.url}>{page.title}</Link>
              </h3>

              <p className="usage-list__preview">{page.preview}</p>
            </li>
          )
        })}</ul>
      </div>
    )
  }
})
