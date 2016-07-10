import React from 'react'
import {Link} from 'react-router'

export default React.createClass({
  displayName: 'GuideIndex',
  render() {
    const section = this.props.section

    return (
      <div className="grid">
        <h1>{section.title}</h1>

        <ul className="guide-list">{section.pages().map((page, i) => {
          return (
            <li key={`guide-list-item-${i}`}>
              <h3 className="guide-list__heading">
                <Link to={'/' + page.url}>{page.title}</Link>
              </h3>

              <p className="guide-list__preview">{page.preview}</p>
            </li>
          )
        })}</ul>
      </div>
    )
  }
})
