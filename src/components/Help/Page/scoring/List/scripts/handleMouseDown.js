export default function handleMouseDown(event) {
  if (
    event.button !== 0
    || !event.target.classList.contains('title')
  ) {
    return;
  }

  const item = event.target.parentElement.classList[0];
  this.setState((state) => {
    state.selected = item;
    state.showing[item] = !state.showing[item];
    return state;
  });
}
