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
    const chart = venn.VennDiagram().width(1200).height(700);
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
