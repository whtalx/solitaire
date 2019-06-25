import React from 'react';
import List from './List';

const scoring = (isPageScrollable) => [
  <h1 key="heading" className="heading">To choose a scoring system</h1>,
  <ol key="ordered" className="ordered">
    <li>On the <strong>Game</strong> menu, click <strong>Options</strong>.</li>
    <li>Under Scoring, click one of the following options:
      <List isPageScrollable={isPageScrollable} />
    </li>
  </ol>,
  <p key="note" className="note">Note</p>,
  <ul key="unordered" className="unordered">
    <li>On the <strong>Game</strong> menu, click <strong>Options</strong> to specify whether to draw one or three cards at a time. These options are scored slightly differently.</li>
  </ul>,
];

export default scoring;
