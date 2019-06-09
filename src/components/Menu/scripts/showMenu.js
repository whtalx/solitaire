export default function showMenu(event) {
  if (
    event.button !== 0
    || !event.target.classList.contains('menu-category')
  ) {
    return;
  }

  const handleMouseDown = (event) => {
    if (
      event.target.classList.contains('menu-item')
      && !event.target.classList.contains('disabled')
    ) {
      if (event.button === 0) {
        this.props[event.target.dataset.func]();
        this.setState({ hovered: null, isShowing: false });
        document.removeEventListener('mousedown', handleMouseDown);
      } else {
        return;
      }
    } else if (
      event.target.tagName === 'SPAN'
      && event.target.offsetParent
      && event.target.offsetParent.classList.contains('menu-item')
    ) {
      if (event.button === 0) {
        this.props[event.target.offsetParent.dataset.func]();
        this.setState({ hovered: null, isShowing: false });
        document.removeEventListener('mousedown', handleMouseDown);
      } else {
        return;
      }
    } else if (event.target.classList.contains('disabled')) {
      return;
    } else if (!event.target.classList.contains('menu-category')) {
      this.setState({ hovered: null, isShowing: false });
      document.removeEventListener('mousedown', handleMouseDown);
    }
  }

  this.setState({ isShowing: !this.state.isShowing });

  if (!this.state.isShowing) {
    document.addEventListener('mousedown', handleMouseDown);
  } else {
    document.removeEventListener('mousedown', handleMouseDown);
  }
}
