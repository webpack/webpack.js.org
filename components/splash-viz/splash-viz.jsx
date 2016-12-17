import React from 'react';

import Cube from '../cube/cube';
import TextRotator from '../text-rotater/text-rotater';
import Modules from '../../assets/homepage-modules.svg';
import './splash-viz-style';

export default class SplashViz extends React.Component {

  render() {
    return (
      <section className="splash-viz">
        <h1 className="splash-viz__heading">
          <span> bundle your</span>
          <TextRotator repeatDelay={ 5000 }>
            <span> assets </span>
            <span> scripts </span>
            <span> images </span>
            <span> styles </span>
          </TextRotator>
        </h1>
        <div className="splash-viz__modules">
          <img src={ Modules }/>
        </div>
        <Cube className="splash-viz__cube" depth={ 140 } repeatDelay={ 5000 } continuous/>
      </section>
    );
  }
}