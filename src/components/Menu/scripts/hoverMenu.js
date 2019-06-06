export default function hoverMenu(event) {
  event.target.classList.contains('menu-category') && this.props.hoverMenu(event.target.firstChild.textContent.toLowerCase());
}
