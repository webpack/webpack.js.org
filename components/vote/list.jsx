import React from 'react';
import Interactive from 'antwar-interactive';
import Container from '../container/container';
import VoteApp from './app';
import '../../styles';
import './list-style';

export default ({ section, page }) => {
  return (
    <Container className="vote-list">

      <section className="vote-list__content">
        <Interactive
          id="components/vote/app.jsx"
          component={VoteApp}
          name={page.name === "index" ? "todo" : page.name}
        />
      </section>
    </Container>
  );
};
