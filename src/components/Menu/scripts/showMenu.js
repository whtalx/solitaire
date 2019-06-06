export default function showMenu() {
  this.props.showMenu(!this.props.window.solitaire.menu.isShowing);
  document.addEventListener('mousedown', (event) => {
    if (
      !event.target.classList.contains('menu-category')
      && this.props.window.solitaire.menu.isShowing
    ) {
      this.props.showMenu(false);
    }

    if (event.target.classList.contains('menu-item')) {
      this.props[event.target.dataset.func]();
    }
  }, { once: true });
}
