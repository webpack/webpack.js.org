import React from 'react'

import Disqus from 'antwar-helpers/components/Disqus'
import Moment from 'antwar-helpers/components/Moment'

export default React.createClass({
  displayName: 'GuidePage',
  render() {
    const section = this.props.section
    const page = this.props.page
    const config = this.props.config

    return (
      <div className="guide__wrapper">
        <h1 className="guide__heading">{page.title}</h1>

        <div className="guide">
          <div className="guide__content">
            <div dangerouslySetInnerHTML={{__html: page.content}} />

            <div id="disqus_thread" />
          </div>
        </div>

        <Disqus shortname="webpack" />
      </div>
    )
  }
})
