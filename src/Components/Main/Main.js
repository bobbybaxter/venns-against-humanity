/* eslint-disable max-len */
import React from 'react';
import base from '../../Helpers/Data/base.json';
import CAHe1 from '../../Helpers/Data/theFirstExpansion.json';
import CAHe2 from '../../Helpers/Data/theSecondExpansion.json';
import CAHe3 from '../../Helpers/Data/theThirdExpansion.json';
import CAHe4 from '../../Helpers/Data/theFourthExpansion.json';
import CAHe5 from '../../Helpers/Data/theFifthExpansion.json';
import CAHe6 from '../../Helpers/Data/theSixthExpansion.json';
import Diagram from '../Diagram/Diagram';

import './Main.scss';

const defaultCards = ['', ' ', '  ', '    ', '     ', '      ', '       '];

const allExpansions = [
  CAHe1,
  CAHe2,
  CAHe3,
  CAHe4,
  CAHe5,
  CAHe6,
];

class Main extends React.Component {
  state = {
    blackCards: [],
    whiteCards: [],
    displayedCards: [],
    expansions: [],
  }

  componentDidMount() {
    const blackCardsAsArray = base.blackCards.map((card) => Object.values(card)[0]);
    const whiteCardsAsArray = [...base.whiteCards];
    this.setState({ blackCards: blackCardsAsArray, whiteCards: whiteCardsAsArray, displayedCards: defaultCards });
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

  selectCards = (expansions, expansionToCheck, expansionToCheckName) => {
    const cards = [[], []];
    if (expansions.includes(expansionToCheckName)) {
      const filteredBlackCards = expansionToCheck.blackCards.map((card) => Object.values(card)[0]);
      filteredBlackCards.forEach((card) => {
        cards[0].push(card);
      });
      expansionToCheck.whiteCards.forEach((card) => {
        cards[1].push(card);
      });
    }
    return cards;
  }

  updateMainExpansions = (expansions) => {
    const pendingBlackCards = base.blackCards.map((card) => Object.values(card)[0]);
    const pendingWhiteCards = [...base.whiteCards];
    allExpansions.forEach((exp) => {
      const expansionName = exp.order[0];
      const expansionCards = this.selectCards(expansions, exp, expansionName);
      expansionCards[0].forEach((card) => pendingBlackCards.push(card));
      expansionCards[1].forEach((card) => pendingWhiteCards.push(card));
      return expansionCards;
    });
    this.setState({ expansions, blackCards: pendingBlackCards, whiteCards: pendingWhiteCards });
  }

  render() {
    let printDiagram = '';
    if (this.state.blackCards.length > 0) {
      printDiagram = <Diagram
          allExpansions={allExpansions}
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
