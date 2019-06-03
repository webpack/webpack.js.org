import React from 'react';
import VoteApp from 'webpack.vote';
import Container from '../Container/Container';
import 'webpack.vote/dist/style.min.css';

const Vote = ({ section, page }) => (
  <Container className="vote markdown">
    <VoteApp
      development={ false } />
  </Container>
);

export default Vote;
