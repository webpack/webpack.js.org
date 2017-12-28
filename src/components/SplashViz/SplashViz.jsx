import React from 'react';

import Cube from '../Cube/Cube';
import TextRotator from '../TextRotater/TextRotater';
import homeSVG from './SplashVizSVG';

export default class SplashViz extends React.Component {

  render() {
    return (
      <section className="splash-viz">
        <h1 className="splash-viz__heading">
          <span> bundle your</span>
          <TextRotator delay={ 5000 } repeatDelay={ 5000 } maxWidth={ 110 }>
            <span> assets </span>
            <span> scripts </span>
            <span> images </span>
            <span> styles </span>
          </TextRotator>
        </h1>
        <div className="splash-viz__modules" dangerouslySetInnerHTML={{__html: homeSVG.body}}></div>
        <Cube className="splash-viz__cube" depth={ 120 } repeatDelay={ 5000 } continuous/>
      </section>
    );
  }
}
