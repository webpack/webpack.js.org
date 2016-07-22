import React from 'react'
import {Link} from 'react-router'

export default React.createClass({
  displayName: 'SectionIndex',
  render() {
    const section = this.props.section

    return (
      <div className="section-index__wrapper">
        <h1>{section.title}</h1>

        <ul className="section-list">{section.pages().map((page, i) => {
          return (
            <li key={`section-list-item-${i}`}>
              <h3 className="section-list__heading">
                <Link to={page.url}>{page.title}</Link>
              </h3>

              <p className="section-list__preview">{page.preview}</p>
            </li>
          )
        })}</ul>
      </div>
    )
  }
})
