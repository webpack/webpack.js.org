import React from 'react';
import { Highlight } from 'react-instantsearch-dom';

class HitBox extends React.Component {
    render() {
        const { hit } = this.props;
        return (
        <article>
            <h1>
            <Highlight attribute="name" hit={hit} />
            </h1>
            <p>
            <Highlight attribute="description" hit={hit} />
            </p>
        </article>
        );
  }
}

export default HitBox;