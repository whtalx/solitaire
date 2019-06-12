export default function hoverMenu(event) {
  if (
    !event.target.classList.contains('menu-category')
    || this.props.window[this.props.parent].isBlocked
  ) {
    return;
  }

  const item = event.target.firstChild.textContent.toLowerCase();
  switch (event.type) {
    case 'mouseenter': {
        this.props.hoverMenu({
          window: this.props.parent,
          hover: item,
        });
      break;
    }

    case 'mouseleave': {
      if (
        !this.props.window[this.props.parent].menu.isShowing
        && this.props.window[this.props.parent].menu.hovered === item
      ) {
        this.props.hoverMenu({
          window: this.props.parent,
          hover: null,
        });
      }
      break;
    }
  
    default:
      break;
  }
}
