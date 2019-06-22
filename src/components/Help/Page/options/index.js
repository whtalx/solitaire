import React from 'react';
import Definable from '../Definable';

const options = [
  <h1 key="heading" className="heading">To change game options</h1>,
  <ol key="ordered" className="ordered">
    <li>On the <strong>Game</strong> menu, click <strong>Options</strong>.</li>
    <li>
      <p>For a more challenging game, select the Timed game check box to have your game timed.</p>
      <p>Select the <strong>Status bar</strong> check box to display the score and time played.</p>
      <p>Select the <strong>Outline dragging</strong> check box for the outline of a card (rather than the actual card itself) to appear while you <Definable>drag</Definable> the card to a new location.</p>
    </li>
  </ol>,
  <p key="note" className="note">Note</p>,
  <ul key="unordered" className="unordered">
    <li>To specify the design of the deck you would like to play with, click the <strong>Game</strong> menu, click <strong>Deck</strong>, and then make your selection.</li>
  </ul>,
];

export default options;