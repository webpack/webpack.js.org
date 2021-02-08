// Import External Dependencies
import { Component } from 'react';

// Load Images
import HomeSVG from './SplashVizSVG';

// Import Components
import Cube from '../Cube/Cube';
import TextRotator from '../TextRotater/TextRotater';

// Load Styling
import './SplashViz.scss';

export default class SplashViz extends Component {
  render() {
    return (
      <section className="splash-viz">
        <h1 className="splash-viz__heading">
<<<<<<< HEAD
          <span> 构建你的</span>
          <TextRotator delay={ 5000 } repeatDelay={ 5000 } maxWidth={ 110 }>
=======
          <span> bundle your</span>
          <TextRotator delay={5000} repeatDelay={5000} maxWidth={110}>
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5
            <span> assets </span>
            <span> scripts </span>
            <span> images </span>
            <span> styles </span>
          </TextRotator>
        </h1>
        <div
          className="splash-viz__modules"
          dangerouslySetInnerHTML={{ __html: HomeSVG.body }}
        ></div>
        <Cube
          className="splash-viz__cube"
          depth={120}
          repeatDelay={5000}
          continuous
        />
      </section>
    );
  }
}
