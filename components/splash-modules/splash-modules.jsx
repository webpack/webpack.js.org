import React from 'react';
import * as d3 from 'd3-interpolate';
import JSImg from '../../assets/module-js.png';
import SassImg from '../../assets/module-sass.png';
import CoffeeImg from '../../assets/module-coffee.png';
import LessImg from '../../assets/module-less.png';
import './splash-modules-style';

const images = {
  javascript: JSImg,
  sass: SassImg,
  coffee: CoffeeImg,
  less: LessImg
};

const entry = {
  name: 'index.js',
  type: 'javascript',
  size: 2349,
  deps: [
    {
      name: 'router.js',
      type: 'javascript',
      size: 2984,
      deps: [
        {
          name: 'history.js',
          type: 'javascript',
          size: 1023,
          deps: [
            {
              name: 'history-dep.js',
              type: 'javascript',
              size: 2384
            },
            {
              name: 'history-dep.coffee',
              type: 'coffee',
              size: 8974
            },
            {
              name: 'history-dep-2.js',
              type: 'javascript',
              size: 3874
            }
          ]
        }
      ]
    },
    {
      name: 'component.js',
      type: 'javascript',
      size: 2394,
      deps: [
        {
          name: 'component-style.scss',
          type: 'sass',
          size: 378
        },
        {
          name: 'utility.coffee',
          type: 'coffee',
          size: 9823
        }
      ]
    }
  ]
};

export default class SplashModules extends React.Component {
  constructor(props) {
    super(props);

    this.nodes = [];
    this.state = {
      width: 0,
      height: 0
    };
  }

	render() {
    return (
      <svg className="splash-modules" ref={ ref => this.container = ref }>
        { 
          this.nodes.map(node => (
            <g key={ node.name } 
              className="splash-modules__node" 
              transform={`translate(${node.x - 30}, ${node.y - 30})`}>
              <image href={ images[node.type] } width="60" height="60" />
              <text x="30" y="-3">{ node.name }</text>
            </g>
          ))
        }
      </svg>
    );
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        width: parseInt( getComputedStyle(this.container).width, 10 ),
        height: parseInt( getComputedStyle(this.container).height, 10)
      }, () => {
        this._addNode(entry);
        this.forceUpdate();
      });
    }, 50);
  }

  _addNode(module, level = 1, center = this.state.height / 2, siblings = 0, position = 0) {
    let { width } = this.state;
    let x = width - level * 120;
    let y = center;

    if (siblings) {
      let spread = (60 * siblings) + (20 * siblings);
      let space = module.deps ? module.deps.length * 30 : 0;
      let positions = d3.interpolate(-(spread / 2) - space, (spread / 2) + space);

      y = center + positions(position / siblings);
    }

    this.nodes.push({
      ...module,
      x, 
      y
    });

    if (module.deps) {
      module.deps.forEach((child, i) => {
        this._addNode(child, level + 1, y, module.deps.length - 1, i);
      });
    }
  }
}
