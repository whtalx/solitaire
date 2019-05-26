import layTableau from '../layTableau';

jest.mock('../makeCard', () => (a) => a);

const testTableau = 555;
const testBack = '777';
const testArray = [
  {
    code: 'a',
    value: 'b',
    suit: 'c',
  },
  {
    code: 'x',
    value: 'y',
    suit: 'z',
  },
];

const expectedObj =
  {
    ...testArray[0],
    back: testBack,
    status: 'downturned',
    parent: `tableau-${testTableau}`,
    index: 0,
    children: {
      ...testArray[1],
      back: testBack,
      status: 'upturned',
      parent: `tableau-${testTableau}`,
      index: 1,
      children: false,
    },
  };

test('make card with childrens from array', () => {
  expect(layTableau(testArray, testTableau, testBack)).toMatchObject(expectedObj);
});
