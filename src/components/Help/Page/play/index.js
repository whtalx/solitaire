import React from 'react';
import Definable from '../Definable';

const play = [
  <h1 key="heading" className="heading">To play Solitaire</h1>,
  <ol key="ordered" className="ordered">
    <li>On the <strong>Game</strong> menu, click <strong>Deal</strong>. </li>
    <li>Double-click any aces on the seven stacks to move them to the spaces at the upper right of the screen, and then make any other plays available on the board.</li>
    <li>When you have made all available plays on the board, click the deck to begin turning over cards.</li>
  </ol>,
  <p key="note" className="note">Notes</p>,
  <ul key="unordered" className="unordered">
    <li>The card that is face up on the deck is always available for play.</li>
    <li>If you are using the <strong>Draw Three</strong> card option, click the deck to turn over the cards before you turn over any stack cards. This will give you an opportunity to see other play options that could increase your chances of winning.</li>
    <li>You will be building <Definable>row stacks</Definable> and <Definable>suit stacks</Definable>.</li>
    <li>You build row stacks to free up cards that you need to build the suit stacks.</li>
    <li>To move a card or a stack of cards, from one row stack to another, click and <Definable>drag</Definable> the card or stack.</li>
    <li>To move a card from either the deck or a row stack to a suit stack, double-click it.</li>
    <li>To move all playable cards to their respective suit stacks, right-click the game board or press CTRL+A.</li>
    <li>After moving a card from a row stack to a suit stack or a different row stack, click the next card to turn it over.</li>
    <li>When a row stack is open (no cards in the row), you can move a king (along with any cards that might be in its stack) to the open row stack.</li>
  </ul>,
];

export default play;
