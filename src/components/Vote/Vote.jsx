import React from 'react';
import Interactive from 'antwar-interactive';
import Container from '../Container/Container';
import VoteApp from 'webpack.vote/dist/vote.bundle.js';
import 'webpack.vote/dist/style.min.css';

const Vote = ({ section, page }) => (
  <Container className="vote">
    <Interactive
      id="webpack.vote/dist/vote.bundle.js"
      component={ VoteApp }
      name={ 'todo' } />
  </Container>
);

Vote.title = 'Vote';

export default Vote;
