import React from 'react';

export default React.createClass({
  displayName: 'SectionPage',
  render() {
    const page = this.props.page;

    return (
      <div className="section-page__wrapper">
        <h1 className="section__heading">{page.title}</h1>

        <div className="section">
          <div className="section__content">
            <div dangerouslySetInnerHTML={{__html: page.content}} />
          </div>
        </div>
      </div>
    );
  }
});
