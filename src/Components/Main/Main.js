import React from 'react';
import * as d3 from 'd3';
import * as venn from 'venn.js';

class Main extends React.Component {
  componentDidMount() {
    const sets = [
      { sets: ['A'], size: 10 },
      { sets: ['B'], size: 10 },
      { sets: ['C'], size: 10 },
      { sets: ['A', 'B'], size: 4 },
      { sets: ['A', 'C'], size: 4 },
      { sets: ['B', 'C'], size: 4 },
      { sets: ['A', 'B', 'C'], size: 2 },
    ];
    const chart = venn.VennDiagram();
    d3.select(this.refs.venn)
      .datum(sets)
      .call(chart);
  }

  drawVenn() {
    return (
     <path
      ref="venn"
     />
    );
  }


  render() {
    return (
        <div>
          {this.drawVenn()}
        </div>
    );
  }
}

export default Main;
