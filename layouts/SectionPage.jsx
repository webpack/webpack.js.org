import React from 'react'

import Disqus from 'antwar-helpers/components/Disqus'

export default React.createClass({
  displayName: 'SectionPage',
  render() {
    const section = this.props.section
    const page = this.props.page
    const config = this.props.config

    return (
      <div className="section-page__wrapper">
        <h1 className="section__heading">{page.title}</h1>

        <div className="section">
          <div className="section__content">
            <div dangerouslySetInnerHTML={{__html: page.content}} />

            <div id="disqus_thread" />
          </div>
        </div>

        <Disqus shortname="webpack" />
      </div>
    )
  }
})
