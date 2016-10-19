import React from 'react';
import * as d3 from 'd3'; // XXX: Extract only the necessary modules
import './splash-modules-style';

const data = {
  nodes: [
    { id: "Myriel", group: 1 },
    { id: "Napoleon", group: 1 },
    { id: "Mlle.Baptistine", group: 1 },
    { id: "Mme.Magloire", group: 1 },
    { id: "CountessdeLo", group: 1 },
    { id: "Geborand", group: 1 },
    { id: "Champtercier", group: 1 },
    { id: "Cravatte", group: 1 },
    { id: "Count", group: 1 },
    { id: "OldMan", group: 1 },
    { id: "Labarre", group: 2 },
    { id: "Valjean", group: 2 },
    { id: "Mme.deR", group: 2 },
    { id: "Isabeau", group: 2 },
    { id: "Gervais", group: 2 },
    { id: "Marguerite", group: 3 },
    { id: "Tholomyes", group: 3 },
    { id: "Listolier", group: 3 },
    { id: "Fameuil", group: 3 },
    { id: "Blacheville", group: 3 },
    { id: "Favourite", group: 3 },
    { id: "Dahlia", group: 3 },
    { id: "Zephine", group: 3 },
    { id: "Fantine", group: 3 }
  ],
  links: [
    { source: "Napoleon", target: "Myriel", value: 1 },
    { source: "Mlle.Baptistine", target: "Myriel", value: 1 },
    { source: "Mme.Magloire", target: "Myriel", value: 1 },
    { source: "Mme.Magloire", target: "Mlle.Baptistine", value: 1 },
    { source: "CountessdeLo", target: "Myriel", value: 1 },
    { source: "Geborand", target: "Myriel", value: 1 },
    { source: "Champtercier", target: "Myriel", value: 1 },
    { source: "Cravatte", target: "Myriel", value: 1 },
    { source: "Count", target: "Myriel", value: 1 },
    { source: "OldMan", target: "Myriel", value: 1 },
    { source: "Valjean", target: "Labarre", value: 1 },
    { source: "Valjean", target: "Mme.Magloire", value: 1 },
    { source: "Valjean", target: "Myriel", value: 1 },
    { source: "Marguerite", target: "Valjean", value: 1 },
    { source: "Mme.deR", target: "Valjean", value: 1 },
    { source: "Isabeau", target: "Valjean", value: 1 },
    { source: "Gervais", target: "Valjean", value: 1 },
    { source: "Listolier", target: "Tholomyes", value: 1 },
    { source: "Fameuil", target: "Tholomyes", value: 1 },
    { source: "Fameuil", target: "Listolier", value: 1 },
    { source: "Blacheville", target: "Tholomyes", value: 1 },
    { source: "Blacheville", target: "Listolier", value: 1 },
    { source: "Favourite", target: "Tholomyes", value: 1 },
    { source: "Favourite", target: "Listolier", value: 1 },
    { source: "Favourite", target: "Fameuil", value: 1 },
    { source: "Favourite", target: "Blacheville", value: 1 },
    { source: "Dahlia", target: "Tholomyes", value: 1 },
    { source: "Dahlia", target: "Listolier", value: 1 },
    { source: "Zephine", target: "Tholomyes", value: 1 },
    { source: "Zephine", target: "Marguerite", value: 1 },
    { source: "Fantine", target: "Tholomyes", value: 1 },
    { source: "Fantine", target: "Listolier", value: 1 },
    { source: "Fantine", target: "Fameuil", value: 1 }
  ]
};

export default class SplashModules extends React.Component {
  constructor(props) {
    super(props);

    this.color = d3.scaleOrdinal(d3.schemeCategory20);
    this.state = {
      width: 0,
      height: 0
    };
  }

	render() {
    return (
      <svg className="splash-modules" ref={ ref => this.container = ref } />
    );
  }

  componentDidMount() {
    this.svg = d3.select(this.container);

    setTimeout(() => {
      this.setState({
        width: parseInt( getComputedStyle(this.container).width, 10 ),
        height: parseInt( getComputedStyle(this.container).height, 10)
      }, this._update.bind(this));
    }, 50);
  }

  _update() {
    let { width, height } = this.state;

    this.simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(d => d.id))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));

    this.links = this.svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(data.links)
      .enter().append('line')
      .attr('stroke-width', d => Math.sqrt(d.value));

    this.nodes = this.svg.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(data.nodes)
      .enter().append('circle')
      .attr('r', 5)
      .attr('fill', d => this.color(d.group))
      .call(
        d3.drag()
          .on('start', this._onDragStart.bind(this))
          .on('drag', this._onDrag.bind(this))
          .on('end', this._onDragEnd.bind(this))
      );

    this.nodes
      .append('title')
      .text(function(d) { return d.id; });

    this.simulation
      .nodes(data.nodes)
      .on('tick', this._tick.bind(this));

    this.simulation.force('link')
      .links(data.links);
  }

  _tick() {
    this.links
      .attr('x1', function(d) { return d.source.x; })
      .attr('y1', function(d) { return d.source.y; })
      .attr('x2', function(d) { return d.target.x; })
      .attr('y2', function(d) { return d.target.y; });

    this.nodes
      .attr('cx', function(d) { return d.x; })
      .attr('cy', function(d) { return d.y; });
  }

  _onDragStart(d) {
    if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  _onDrag(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  _onDragEnd(d) {
    if (!d3.event.active) this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
}
