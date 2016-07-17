import React from 'react'
import Disqus from 'antwar-helpers/components/Disqus'
import PrevNextMini from 'antwar-helpers/components/PrevNextMini'
import Toc from 'antwar-helpers/components/Toc'

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

        <div className="toc-nav__wrapper">
          <h4 className="toc-nav--header">{section.title}</h4>
          <Toc sectionPages={() => section.pages().reverse()} page={page} />
        </div>

        <PrevNextMini page={page} />

        <Disqus shortname="webpack" />
      </div>
    )
  }
})
