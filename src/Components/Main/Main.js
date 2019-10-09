/* eslint-disable max-len */
import React from 'react';
import * as d3 from 'd3';
import * as venn from 'venn.js';
import base from '../../Helpers/Data/base.json';

import './Main.scss';

class Main extends React.Component {
  state = {
    blackCards: [],
    whiteCards: [],
  }

  componentDidMount() {
    const blackCardsAsArray = base.blackCards.map((card) => Object.values(card)[0]);
    this.setState({ blackCards: blackCardsAsArray, whiteCards: base.whiteCards });
  }

  drawVenn() {
    return (
     <div ref="venn"></div>
    );
  }

  selectRandomCards = () => {
    const { blackCards, whiteCards } = this.state;
    const randomCards = [];
    const circleA = whiteCards[Math.floor(Math.random() * whiteCards.length)];
    // const label = blackCards[Math.floor(Math.random() * blackCards.length)];

    // const text = '';
    // const width = 25;
    // const words = label.split(/\s+/).reverse();
    // console.error('words', words);
    // const maxLines = 5;
    // const minChars = (label.length + words.length) / maxLines;
    // console.error('minChars', minChars);
    // let word = words.pop();
    // console.error('word', word);
    // let line = [word];
    // console.error('line', line);
    // let joined;
    // console.error('joined', joined);
    // let lineNumber = 0;
    // // const lineHeight = 1.1; // ems
    // let tspan = [];
    // tspan.push(word);
    // // console.error('tspan', tspan);
    // // eslint-disable-next-line no-constant-condition
    // while (true) {
    //   word = words.pop();
    //   if (!word) break;
    //   line.push(word);
    //   joined = line.join(' ');
    //   tspan.push(joined);
    //   if (joined.length > minChars && tspan.node().getComputedTextLength() > width) {
    //     line.pop();
    //     tspan.text(line.join(' '));
    //     line = [word];
    //     tspan = text.append('tspan').text(word);
    //     // eslint-disable-next-line no-plusplus
    //     lineNumber += 1;
    //     console.error(lineNumber);
    //   }
    // }

    const circleB = whiteCards[Math.floor(Math.random() * whiteCards.length)];
    const circleC = whiteCards[Math.floor(Math.random() * whiteCards.length)];
    const circleAB = blackCards[Math.floor(Math.random() * blackCards.length)];
    const circleAC = blackCards[Math.floor(Math.random() * blackCards.length)];
    const circleBC = blackCards[Math.floor(Math.random() * blackCards.length)];
    const circleABC = blackCards[Math.floor(Math.random() * blackCards.length)];
    randomCards.push([circleA, circleB, circleC, circleAB, circleAC, circleBC, circleABC]);
    return randomCards;
  }

  setupDiagram = (cards) => {
    const mainCircleSize = 10;
    const intersectionCircleSize = mainCircleSize * 0.4;
    const centerCircleSize = mainCircleSize * 0.2;
    const A = cards[0];
    const B = cards[1];
    const C = cards[2];
    const AB = cards[3];
    const AC = cards[4];
    const BC = cards[5];
    const ABC = cards[6];
    const sets = [
      { sets: [A], size: mainCircleSize },
      { sets: [B], size: mainCircleSize },
      { sets: [C], size: mainCircleSize },
      { sets: [A, B], size: intersectionCircleSize, label: AB },
      { sets: [A, C], size: intersectionCircleSize, label: AC },
      { sets: [B, C], size: intersectionCircleSize, label: BC },
      { sets: [A, B, C], size: centerCircleSize, label: ABC },
    ];
    const chart = venn.VennDiagram().width(700).height(700);
    d3.select(this.refs.venn)
      .datum(sets)
      .call(chart);
  }

  render() {
    if (this.state.blackCards.length) {
      const randomCards = this.selectRandomCards();
      this.setupDiagram(randomCards[0]);
    }

    return (
        <div>
          {this.drawVenn()}
        </div>
    );
  }
}

export default Main;
