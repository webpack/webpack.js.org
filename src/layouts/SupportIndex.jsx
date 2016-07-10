import React from 'react'
import {Link} from 'react-router'

export default React.createClass({
  displayName: 'SupportIndex',
  render() {
    const section = this.props.section

    return (
      <div className="grid">
        <h1>{section.title}</h1>

        <ul className="support-list">{section.pages().map((page, i) => {
          return (
            <li key={`support-list-item-${i}`}>
              <h3 className="support-list__heading">
                <Link to={'/' + page.url}>{page.title}</Link>
              </h3>

              <p className="support-list__preview">{page.preview}</p>
            </li>
          )
        })}</ul>
      </div>
    )
  }
})
