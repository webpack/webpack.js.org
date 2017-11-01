import React from 'react';
import Interactive from 'antwar-interactive';
import Container from '../Container/Container';
import VoteApp from './App';
import '../../styles';
import './Vote.scss';
import './App.scss';
import './Influence.scss';
import './Button/Button.scss';

const Vote = ({ section, page }) => {
  let arr = page.url.split('/').filter(Boolean);
  let name = arr[arr.length - 1];

  return (
    <Container className="vote-list">

      <section className="vote-list__content">
        <Interactive
          id="src/components/Vote/App.jsx"
          component={ VoteApp }
          name={ name === 'vote' ? 'todo' : name }
        />
      </section>
    </Container>
  );
};

Vote.title = 'Vote';

export default Vote;
