/* eslint-disable max-len */
import React from 'react';
import base from '../../Helpers/Data/base.json';
import CAHe1 from '../../Helpers/Data/theFirstExpansion.json';
import CAHe2 from '../../Helpers/Data/theSecondExpansion.json';
import CAHe3 from '../../Helpers/Data/theThirdExpansion.json';
import CAHe4 from '../../Helpers/Data/theFourthExpansion.json';
import CAHe5 from '../../Helpers/Data/theFifthExpansion.json';
import CAHe6 from '../../Helpers/Data/theSixthExpansion.json';
import greenbox from '../../Helpers/Data/greenBoxExpansion.json';
import nineties from '../../Helpers/Data/90sNostalgiaExpansion.json';
import Box from '../../Helpers/Data/boxExpansion.json';
import fantasy from '../../Helpers/Data/fantasyExpansion.json';
import food from '../../Helpers/Data/foodExpansion.json';
import science from '../../Helpers/Data/scienceExpansion.json';
import www from '../../Helpers/Data/worldWideWebExpansion.json';
import hillary from '../../Helpers/Data/voteForHillaryExpansion.json';
import trumpvote from '../../Helpers/Data/voteForTrumpExpansion.json';
import trumpbag from '../../Helpers/Data/trumpSurvivalExpansion.json';
import xmas2012 from '../../Helpers/Data/holiday2012Expansion.json';
import xmas2013 from '../../Helpers/Data/holiday2013Expansion.json';
import PAXE2013 from '../../Helpers/Data/paxEast2013Expansion.json';
import PAXP2013 from '../../Helpers/Data/paxPrime2013Expansion.json';
import PAXE2014 from '../../Helpers/Data/paxEast2014Expansion.json';
import PAXEP2014 from '../../Helpers/Data/paxEast2014PanelExpansion.json';
import PAXPP2014 from '../../Helpers/Data/paxPrime2014PanelExpansion.json';
import HOCAH from '../../Helpers/Data/houseOfCardsAgainstHumanityExpansion.json';
import reject from '../../Helpers/Data/rejectExpansion.json';
import reject2 from '../../Helpers/Data/reject2Expansion.json';
import Canadian from '../../Helpers/Data/canadianExpansion.json';
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
  greenbox,
  nineties,
  Box,
  fantasy,
  food,
  science,
  www,
  hillary,
  trumpvote,
  trumpbag,
  xmas2012,
  xmas2013,
  PAXE2013,
  PAXP2013,
  PAXE2014,
  PAXEP2014,
  PAXPP2014,
  HOCAH,
  reject,
  reject2,
  Canadian,
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

    // white cards are outside bubbles
    for (let i = 0; i < 3; i += 1) {
      let chosenCard = whiteCards[Math.floor(Math.random() * whiteCards.length)];
      if (randomCards.includes(chosenCard)) {
        chosenCard = whiteCards[Math.floor(Math.random() * whiteCards.length)];
      }
      const chosenCardString = `c1 ${chosenCard}`;
      console.error(chosenCardString);
      randomCards.push(chosenCardString);
    }

    // black cards are intersections
    for (let i = 0; i < 4; i += 1) {
      let chosenCard = blackCards[Math.floor(Math.random() * blackCards.length)];
      if (randomCards.includes(chosenCard)) {
        chosenCard = blackCards[Math.floor(Math.random() * blackCards.length)];
      }
      randomCards.push(chosenCard);
    }

    this.setState({ displayedCards: randomCards });
  }

  setupDiagram = (cardsInput) => {
    let cards = [];
    let sets = [];
    if (cardsInput) {
      // eslint-disable-next-line prefer-destructuring
      cards = cardsInput;
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
        <div className="diagramDiv">
          {printDiagram}
        </div>
    );
  }
}

export default Main;
