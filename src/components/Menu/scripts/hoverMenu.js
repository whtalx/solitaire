export default function hoverMenu(event) {
  if (event.type === 'mouseenter') {
  event.target.classList.contains('menu-category') && this.setState({ hovered: event.target.firstChild.textContent.toLowerCase() });
  } else if (event.type === 'mouseleave') {
    event.target.classList.contains('menu-category') && this.setState({ hovered: null });
  }
}
