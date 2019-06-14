import makeCard from './makeCard'

export default function layTableau(array, parentIndex, back, index = 0) {
  return makeCard({
    ...array[0],
    back,
    parent: `tableau-${parentIndex}`,
    index: index,
    children:
      array.length > 1
        && layTableau(array.slice(1, array.length), parentIndex, back, ++index),
  });
}
