import React from 'react';
import VoteApp from 'webpack.vote';
import Container from '../Container/Container';
import 'webpack.vote/dist/style.min.css';
import './Vote.scss';

const Vote = ({ section, page }) => (
  <Container className="vote">
    <VoteApp
      development={ false } />
  </Container>
);

export default Vote;
