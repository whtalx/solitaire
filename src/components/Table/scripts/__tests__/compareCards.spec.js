import compareCards from '../compareCards';

const kingOfClubs = document.createElement('div');
kingOfClubs.setAttribute('data-parent', 'tableau-1');
kingOfClubs.setAttribute('data-index', '0');
kingOfClubs.className= 'card opened king clubs';

const queenOfDiamonds = document.createElement('div');
queenOfDiamonds.setAttribute('data-parent', 'tableau-2');
queenOfDiamonds.setAttribute('data-index', '0');
queenOfDiamonds.className= 'card opened queen diamonds';

const aceOfHearts = document.createElement('div');
aceOfHearts.setAttribute('data-parent', 'foundation-0');
aceOfHearts.setAttribute('data-index', '0');
aceOfHearts.className= 'card opened ace hearts';

const twoOfHearts = document.createElement('div');
twoOfHearts.setAttribute('data-parent', 'tableau-5');
twoOfHearts.setAttribute('data-index', '0');
twoOfHearts.className= 'card opened 2 hearts';

const aceOfSpades = document.createElement('div');
aceOfSpades.setAttribute('data-parent', 'tableau-4');
aceOfSpades.setAttribute('data-index', '0');
aceOfSpades.className= 'card opened ace spades';

const tableau = document.createElement('div');
tableau.className= 'tableau tableau-3';

const foundation = document.createElement('div');
foundation.className= 'foundation foundation-1';

const closedCard = document.createElement('div');
closedCard.setAttribute('data-parent', 'tableau-6');
closedCard.setAttribute('data-index', '0');
closedCard.className= 'card closed back-1';

const tableauToTableau = {
  from: {
    parent: 'tableau',
    parent_index: 2,
    index: 0,
  },
  to: {
    parent: 'tableau',
    parent_index: 1,
    index: 0,
  },
};

const kingToTableau = {
  from: {
    parent: 'tableau',
    parent_index: 1,
    index: 0,
  },
  to: {
    parent: 'tableau',
    parent_index: 3,
    index: NaN,
  },
};

const tableauToFoundation = {
  from: {
    parent: 'tableau',
    parent_index: 5,
    index: 0,
  },
  to: {
    parent: 'foundation',
    parent_index: 0,
    index: 0,
  },
};

const aceToFoundation = {
  from: {
    parent: 'tableau',
    parent_index: 4,
    index: 0,
  },
  to: {
    parent: 'foundation',
    parent_index: 1,
    index: NaN,
  },
};

test('moving to tableau if ok', () => {
  expect(compareCards(queenOfDiamonds, kingOfClubs)).toMatchObject(tableauToTableau);
});

test('not moving to tableau if not ok', () => {
  expect(compareCards(kingOfClubs, queenOfDiamonds)).toBeFalsy();
});

test('moving king to empty tableau', () => {
  expect(compareCards(kingOfClubs, tableau)).toMatchObject(kingToTableau);
});

test('not moving other cards to empty tableau', () => {
  expect(compareCards(queenOfDiamonds, tableau)).toBeFalsy();
});

test('moving to foundation if ok', () => {
  expect(compareCards(twoOfHearts, aceOfHearts)).toMatchObject(tableauToFoundation);
});

test('not moving to foundation if not ok', () => {
  expect(compareCards(kingOfClubs, aceOfHearts)).toBeFalsy();
});

test('moving ace to empty foundation', () => {
  expect(compareCards(aceOfSpades, foundation)).toMatchObject(aceToFoundation);
});

test('not moving other cards to empty foundation', () => {
  expect(compareCards(queenOfDiamonds, foundation)).toBeFalsy();
});

test('doing nothing with closed cards', () => {
  expect(compareCards(aceOfHearts, closedCard)).toBeFalsy();
});