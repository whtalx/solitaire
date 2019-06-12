export default function showMenu(event) {
  if (
    event.button !== 0
    || !event.target.classList.contains('menu-category')
    || this.props.window[this.props.parent].isBlocked
  ) {
    return;
  }

  const handleMouseDown = (event) => {
    if (
      event.target.classList.contains('drop-down-menu')
      || (
        event.target.tagName === 'HR'
        && event.target.offsetParent
        && event.target.offsetParent.classList.contains('drop-down-menu')
      )
    ) {
      return;
    } else if (
      event.target.tagName === 'SPAN'
      && event.target.offsetParent
      && event.target.offsetParent.classList.contains('menu-item')
    ) {
      if (event.button === 0) {
        this.props[event.target.offsetParent.dataset.func]();
      } else {
        return;
      }
    } else if (event.target.classList.contains('menu-item')) {
      if (
        event.button === 0
        && !event.target.classList.contains('disabled')
      ) {
        this.props[event.target.dataset.func]();
      } else {
        return;
      }
    }
    
    this.props.showMenu({
      window: this.props.parent,
      show: false,
    });
    document.removeEventListener('mousedown', handleMouseDown);
  }

  this.props.showMenu({
    window: this.props.parent,
    show: !this.props.window[this.props.parent].menu.isShowing,
  });

  if (this.props.window[this.props.parent].menu.isShowing) {
    document.addEventListener('mousedown', handleMouseDown);
  } else {
    document.removeEventListener('mousedown', handleMouseDown);
  }
}
