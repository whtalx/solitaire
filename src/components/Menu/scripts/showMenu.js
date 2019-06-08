export default function showMenu(event) {
  if (event.button !== 0) {
    return;
  }
  this.setState({ isShowing: !this.state.isShowing });
  document.addEventListener('mousedown', (event) => {
    if (
      !event.target.classList.contains('menu-category')
      && this.state.isShowing
    ) {
      this.setState({ hovered: null, isShowing: false });
    }

    if (
      event.target.classList.contains('menu-item')
      && event.button === 0
    ) {
      this.props[event.target.dataset.func]();
      this.setState({ hovered: null });
    }
  }, { once: true });
}
