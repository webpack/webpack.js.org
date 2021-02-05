import { Component } from 'react';
import Container from '../Container/Container';
import 'webpack.vote/dist/style.min.css';

// Load Styling
import './Vote.scss';

export default class Vote extends Component {
  state = {
    VoteApp: null,
  };
  componentDidMount() {
    if (window && !window.__ssgrun) {
      import('webpack.vote').then((VoteApp) => {
        this.setState({ VoteApp: VoteApp.default || VoteApp });
      });
    }
  }
  render() {
    const { VoteApp } = this.state;
    return (
      <Container className="vote markdown">
        {VoteApp ? <VoteApp development={false} /> : null}
      </Container>
    );
  }
}
