import handleMouseUp from '../handleMouseUp';

const drop = jest.fn();
const testObj = {
  target: {
    classList: {
      contains: jest.fn((attribute) => {
        if (attribute === 'card' || attribute === 'opened') { return true; }
      }),
    },

    attributes: {
      getNamedItem: jest.fn(() => { return { value: '0123' }}),
    },

    parentElement: {
      classList: {
        contains: jest.fn(a => a === 'foundation'),
      },
    }
  },
};

handleMouseUp.bind({ drop })(testObj);

test('drop called on tableau', () => {
  expect(drop).toHaveBeenCalledWith('0123', 123);
});

testObj.target.classList.contains = jest.fn(a => a === 'card' || a === 'empty');
testObj.target.attributes.getNamedItem = jest.fn(() => { return { value: '0555' }});
handleMouseUp.bind({ drop })(testObj);

test('drop called on foundation', () => {
  expect(drop.mock.calls[1]).toMatchObject(['0555']);
});
