import React from 'react';
import * as d3 from 'd3';
import * as venn from 'venn.js';

import './Diagram.scss';

class Diagram extends React.Component {
  state = {
    width: 0,
    height: 0,
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  drawVenn = () => {
    return (
     <div ref="venn"></div>
    );
  }

  printVenn = (setsData) => {
    const sets = setsData;
    console.error('setsData', sets);
    // const chart = venn.VennDiagram().width(700).height(700);
    const chart = venn.VennDiagram().width(this.state.width - 100).height(this.state.height - 100);
    if (this.refs.venn) {
      d3.select(this.refs.venn)
        .datum(sets)
        .call(chart);
    }
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    // const randomCards = this.selectRandomCards();
    // this.setupDiagram(randomCards[0]);
    const diagramData = this.props.setupDiagram(this.props.displayedCards);
    this.printVenn(diagramData);

    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        {this.drawVenn()}
      </div>
    );
  }
}

export default Diagram;
