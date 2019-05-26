import makeCard from './makeCard'

export default function layTableau(array, tableau, back, index = 0) {
  return makeCard({
    ...array[0],
    back,
    status: array.length > 1 ? 'downturned' : 'upturned',
    parent: `tableau-${tableau}`,
    index: index,
    children:
      array.length > 1
      && layTableau(array.slice(1, array.length), tableau, back, ++index),
  });
}
