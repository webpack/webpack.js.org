import React from 'react';
import Cube from '../cube/cube';
import Link from '../link/link';
import SplashFile from '../splash-file/splash-file';
import './splash-viz-style';

export default class SplashViz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [
        { name: 'index.html', type: 'html', size: 2039 },
        { name: 'index.bundle.js', type: 'js', size: 20394803 },
        { name: 'index.bundle.js.map', type: 'blank', size: 20459821 },
        { name: 'style.bundle.css', type: 'css', size: 3294893 },
        { name: 'favicon.ico', type: 'ico', size: 23794 }
      ]
    };
  }

  render() {
    return (
      <section className="splash-viz">
        <div className="splash-viz__modules">

        </div>

        <div className="splash-viz__icon">
          <Cube className="splash-viz__cube" depth={ 100 } continuous />
        </div>

        <div className="splash-viz__output">
          {
            this.state.files.map((file, i) => (
              <SplashFile key={ i } { ...file } />
            ))
          }
        </div>

        {/*<span className="splash-viz__headline">
          webpack transforms your&nbsp;
          <Link to="/concepts/modules">modules</Link>
          &nbsp;into production-ready&nbsp;
          <Link to="/concepts/output">bundles</Link>
          &nbsp;and assets
        </span>*/}
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