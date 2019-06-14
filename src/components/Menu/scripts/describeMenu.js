export default function describeMenu(event) {
  const currentWindow = this.props.window[this.props.parent];
  if (!currentWindow) { return; }
  if (
    event.target.classList.contains('menu-item')
    || event.target.offsetParent.classList.contains('menu-item')
  ) {
    let item = event.target;
    if (event.target.offsetParent.classList.contains('menu-item')) {
      item = event.target.offsetParent;
    }

    if (currentWindow.status.description !== currentWindow.menu.categories[currentWindow.menu.hovered][item.dataset.name].description) {
      this.props.describeMenu({
        window: this.props.parent,
        describe: item.dataset.name
      });
    }
  } else if (currentWindow.status.description !== '') {
    this.props.describeMenu({
      window: this.props.parent,
      describe: null
    });
  }
}
