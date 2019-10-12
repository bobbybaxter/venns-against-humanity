/* eslint-disable max-len */
import React from 'react';
import base from '../../Helpers/Data/base.json';
import Diagram from '../Diagram/Diagram';

import './Main.scss';

const defaultCards = ['', ' ', '  ', '    ', '     ', '      ', '       '];

class Main extends React.Component {
  state = {
    blackCards: [],
    whiteCards: [],
    displayedCards: [],
    expansions: [],
  }

  componentDidMount() {
    const blackCardsAsArray = base.blackCards.map((card) => Object.values(card)[0]);
    this.setState({ blackCards: blackCardsAsArray, whiteCards: base.whiteCards, displayedCards: defaultCards });
  }

  selectRandomCards = () => {
    const { blackCards, whiteCards } = this.state;
    const randomCards = [];
    const circleAText = whiteCards[Math.floor(Math.random() * whiteCards.length)];
    const circleA = `c1 ${circleAText}`;
    const circleBText = whiteCards[Math.floor(Math.random() * whiteCards.length)];
    const circleB = `c1 ${circleBText}`;
    const circleCText = whiteCards[Math.floor(Math.random() * whiteCards.length)];
    const circleC = `c1 ${circleCText}`;
    const circleAB = blackCards[Math.floor(Math.random() * blackCards.length)];
    const circleAC = blackCards[Math.floor(Math.random() * blackCards.length)];
    const circleBC = blackCards[Math.floor(Math.random() * blackCards.length)];
    const circleABC = blackCards[Math.floor(Math.random() * blackCards.length)];
    randomCards.push([circleA, circleB, circleC, circleAB, circleAC, circleBC, circleABC]);
    this.setState({ displayedCards: randomCards });
  }

  setupDiagram = (cardsInput) => {
    let cards = [];
    let sets = [];
    if (cardsInput) {
      // eslint-disable-next-line prefer-destructuring
      cards = cardsInput[0] === '' ? cardsInput : cardsInput[0];
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
      sets = [
        { sets: [A], size: mainCircleSize },
        { sets: [B], size: mainCircleSize },
        { sets: [C], size: mainCircleSize },
        { sets: [A, B], size: intersectionCircleSize, label: AB },
        { sets: [A, C], size: intersectionCircleSize, label: AC },
        { sets: [B, C], size: intersectionCircleSize, label: BC },
        { sets: [A, B, C], size: centerCircleSize, label: ABC },
      ];
    }
    return sets;
  }

  updateMainExpansions = (expansions) => {
    this.setState({ expansions });
  }

  render() {
    let printDiagram = '';
    if (this.state.blackCards.length > 0) {
      printDiagram = <Diagram
          blackCards={this.state.blackCards}
          displayedCards={this.state.displayedCards}
          expansions={this.state.expansions}
          selectRandomCards={this.selectRandomCards}
          setupDiagram={this.setupDiagram}
          updateMainExpansions={this.updateMainExpansions}
          whiteCards={this.state.whiteCards}
        />;
    }

    return (
        <div>
          {printDiagram}
        </div>
    );
  }
}

export default Main;
