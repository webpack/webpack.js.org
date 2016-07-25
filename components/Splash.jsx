import React from 'react';
import Container from './Container';

export default props => {
  let { page } = props;

  return (
    <Container className="section-page">
      <h1 className="section__heading">{ page.title }</h1>

      <div className="section">
        <div className="section__content">
          <div dangerouslySetInnerHTML={{ __html: page.content }} />
        </div>
      </div>
    </Container>
  );
};
