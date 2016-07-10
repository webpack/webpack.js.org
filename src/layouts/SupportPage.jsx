import React from 'react'

import Disqus from 'antwar-helpers/components/Disqus'
import Moment from 'antwar-helpers/components/Moment'

export default React.createClass({
  displayName: 'SupportPage',
  render() {
    const section = this.props.section
    const page = this.props.page
    const config = this.props.config

    return (
      <div className="support__wrapper">
        <h1 className="support__heading">{page.title}</h1>

        <div className="support">
          <div className="support__content">
            <div dangerouslySetInnerHTML={{__html: page.content}} />

            <div id="disqus_thread" />
          </div>
        </div>

        <Disqus shortname="webpack" />
      </div>
    )
  }
})
