import React from 'react';
import makeCard from '../makeCard';
import Card from '../../../Card';

const testObj = {
  code: 'testCode',
  back: 'testBack',
  value: 'testValue',
  suit: 'testSuit',
  status: 'testStatus',
  children: <div id="testElement" />,
  parent: 'testParent',
  index: 'testIndex',
  left: 'testLeft',
  top: 'testTop',
  draw: 'testDraw',
};

test('Card is matching', () => {
  expect(makeCard(testObj)).toMatchObject(
    <Card
      key={testObj.code}
      back={testObj.back}
      value={testObj.value}
      suit={testObj.suit}
      status={testObj.status}
      children={testObj.children}
      parent={testObj.parent}
      index={testObj.index}
      left={testObj.left}
      top={testObj.top}
      draw={testObj.draw}
    />
  );
});