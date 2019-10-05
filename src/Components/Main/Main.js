import React from 'react';
import Venn from 'venn.js';
import * as d3 from 'd3';

class Main extends React.Component {
  sets = [
    { sets: ['A'], size: 12 },
    { sets: ['B'], size: 12 },
    { sets: ['A', 'B'], size: 2 },
  ];

  chart = Venn.VennDiagram();

  render() {
    return (
        <div>
            {d3.select('#venn').datum(this.sets).call(this.chart)}
        </div>
    );
  }
}

export default Main;
