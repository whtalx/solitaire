import handleMouseDown from '../handleMouseDown';

const drag = jest.fn();
const deckToWaste = jest.fn();
const testObj = {
  target: {
    classList: {
      contains: jest.fn((attribute) => {
        if (attribute === 'card' || attribute === 'opened') { return true; }
      }),
    },

    attributes: {
      getNamedItem: jest.fn((attribute) => {
        if (attribute === 'data-parent' || attribute === 'data-index') { return { value: '0123' }; }
      })
    },

    parentElement: {
      classList: {
        contains: jest.fn((attribute) => {
          if (attribute === 'deck') { return true; }
        }),
      },
    }
  },
};

handleMouseDown.bind({ drag, deckToWaste })(testObj);

test('drag called', () => {
  expect(drag).toHaveBeenCalledWith('0123', 123);
});

testObj.target.classList.contains = jest.fn(() => false);
handleMouseDown.bind({ drag, deckToWaste })(testObj);

test('deckToWaste called', () => {
  expect(drag).toHaveBeenCalled();
});
