import React from 'react';
import Link from '../link/link';
import SplashFile from '../splash-file/splash-file';
import Icon from '../../assets/icon-square-big.svg';
import Modules from '../../assets/modules.png';
import './splash-viz-style';

export default class SplashViz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [
        { name: 'index.html', type: 'html', size: 2039 },
        { name: 'index.bundle.js', type: 'js', size: 20394 },
        { name: 'index.bundle.js.map', type: 'blank', size: 20459 },
        { name: 'style.bundle.css', type: 'css', size: 12948 },
        { name: 'favicon.ico', type: 'ico', size: 23794 }
      ]
    };
  }

  render() {
    return (
      <section className="splash-viz">
        <div className="splash-viz__modules">
          <img src={ Modules } />
        </div>

        <div className="splash-viz__icon">
          <img src={ Icon } />
        </div>

        <div className="splash-viz__output">
          {
            this.state.files.map((file, i) => (
              <SplashFile key={ i } { ...file } />
            ))
          }
        </div>
      </section>
    );
  }

  componentDidMount() {
    // setInterval(() => {
    //   this.setState({
    //     files: this.state.files.map(file => ({
    //       name: file.name,
    //       type: file.type,
    //       size: file.size + Math.random() * (file.type === 'js' ? 10000 : 0)
    //     }))
    //   });
    // }, 50);
  }
}