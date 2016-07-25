import React from 'react';
import { Link } from 'react-router';
import Container from './Container';
import Sidebar from './Sidebar';

export default props => {
  let { section } = props;

  return (
    <Container className="page">
      <Sidebar pages={ section.pages() } />
      <section className="page-content">
        <h1>{ section.title }</h1>
        <p>Filled in by a section index...</p>
      </section>
    </Container>
  );
};
