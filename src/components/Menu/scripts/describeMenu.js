export default function describeMenu(event) {
  if (
    event.target.classList.contains('menu-item')
    || event.target.offsetParent.classList.contains('menu-item')
  ) {

    let item = event.target;
    if (event.target.offsetParent.classList.contains('menu-item')) {
      item = event.target.offsetParent;
    }

    if (this.props.window[this.props.parent].status.description !== this.props.window[this.props.parent].menu.categories[this.props.window[this.props.parent].menu.hovered][item.dataset.name].description) {
      this.props.describeMenu({
        window: this.props.parent,
        describe: item.dataset.name
      });
    }
  } else if (this.props.window[this.props.parent].status.description !== '') {
      this.props.describeMenu({
        window: this.props.parent,
        describe: null
      });
  }
}
