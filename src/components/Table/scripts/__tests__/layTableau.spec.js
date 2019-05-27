import layTableau from '../layTableau';

jest.mock('../makeCard', () => (a) => a);

const testTableau = 555;
const testBack = '777';
const testArray = [
  {
    code: 'a',
    value: 'b',
    suit: 'c',
    status: 'd',
  },
  {
    code: 'w',
    value: 'z',
    suit: 'y',
    status: 'z',
  },
];

const expectedObj =
  {
    ...testArray[0],
    back: testBack,
    parent: `tableau-${testTableau}`,
    index: 0,
    children: {
      ...testArray[1],
      back: testBack,
      parent: `tableau-${testTableau}`,
      index: 1,
      children: false,
    },
  };

test('make card with childrens from array', () => {
  expect(layTableau(testArray, testTableau, testBack)).toMatchObject(expectedObj);
});
