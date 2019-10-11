/* eslint-disable max-len */
import React from 'react';
// import * as d3 from 'd3';
// import * as venn from 'venn.js';
import base from '../../Helpers/Data/base.json';
import Diagram from '../Diagram/Diagram';

import './Main.scss';

const defaultCards = ['', ' ', '  ', '    ', '     ', '      ', '       '];

class Main extends React.Component {
  state = {
    blackCards: [],
    whiteCards: [],
    displayedCards: [],
  }

  componentDidMount() {
    const blackCardsAsArray = base.blackCards.map((card) => Object.values(card)[0]);
    this.setState({ blackCards: blackCardsAsArray, whiteCards: base.whiteCards, displayedCards: defaultCards });
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
    // return randomCards;
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

  render() {
    // PUT THE VENN DIAGRAM IN ITS OWN MODULE, SO THAT YOU CAN KEEP THE VALUES IN STATE (EITHER IN MAIN OR THE VENN MODULE)
    // SO THAT IT CAN'T BE CHANGED WHEN THE WINDOW HAS BEEN RESIZED.

    let printDiagram = '';
    // eslint-disable-next-line no-constant-condition
    if (this.state.blackCards.length > 0) {
      printDiagram = <Diagram
          blackCards = {this.state.blackCards}
          whiteCards = {this.state.whiteCards}
          displayedCards = {this.state.displayedCards}
          // drawVenn = {this.drawVenn}
          // selectRandomCards = {this.selectRandomCards}
          setupDiagram = {this.setupDiagram}
          // updateWindowDimensions = {this.updateWindowDimensions}
        />;
    }

    return (
        <div>
          {printDiagram}
          <div className="d-flex flex-column justify-content-center align-items-center">
            <button className="btn btn-primary" onClick={this.selectRandomCards}>Randomize!</button>
          </div>
        </div>
    );
  }
}

export default Main;
