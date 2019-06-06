import cursors from '../../../images/cursors';

export default function resizeCursors(event) {
  if (
    !document.elementFromPoint(event.pageX, event.pageY)
    || !document.getElementsByClassName('solitaire')
    || this.props.window.solitaire.isMaximized
    || this.props.window.solitaire.isMinimized
  ) {
    return;
  }
  const root = document.getElementsByClassName('root')[0];
  const currentWindow = document.getElementsByClassName('solitaire')[0];

  if (
    !document.elementFromPoint(event.pageX, event.pageY).isSameNode(currentWindow)
    &&
    !document.elementFromPoint(event.pageX, event.pageY).isSameNode(currentWindow.firstElementChild)
  ) {
    this.state.resize !== null && this.setState({ resize: null });
    root.style.cursor = cursors.default;
  } else if (
    (
      event.pageX > currentWindow.offsetLeft
      &&
      event.pageX < currentWindow.offsetLeft + currentWindow.clientLeft
      &&
      event.pageY > currentWindow.offsetTop + currentWindow.clientTop + currentWindow.clientHeight
      &&
      event.pageY < currentWindow.offsetTop + 2 * currentWindow.clientTop + currentWindow.clientHeight
    ) || (
      event.pageX > currentWindow.offsetLeft + currentWindow.clientLeft + currentWindow.clientWidth
      &&
      event.pageX < currentWindow.offsetLeft + 2 * currentWindow.clientLeft + currentWindow.clientWidth
      &&
      event.pageY > currentWindow.offsetTop - 26
      &&
      event.pageY < currentWindow.offsetTop - 26 + currentWindow.clientTop
    )
  ) {
    this.state.resize !== 'nesw_resize' && this.setState({ resize: 'nesw_resize' });
    root.style.cursor = cursors.nesw_resize;
  } else if (
    (
      event.pageX > currentWindow.offsetLeft + currentWindow.clientLeft + currentWindow.clientWidth
      &&
      event.pageX < currentWindow.offsetLeft + 2 * currentWindow.clientLeft + currentWindow.clientWidth
      &&
      event.pageY > currentWindow.offsetTop + currentWindow.clientTop + currentWindow.clientHeight
      &&
      event.pageY < currentWindow.offsetTop + 2 * currentWindow.clientTop + currentWindow.clientHeight
    ) || (
      event.pageX > currentWindow.offsetLeft
      &&
      event.pageX < currentWindow.offsetLeft + currentWindow.clientLeft
      &&
      event.pageY > currentWindow.offsetTop - 26
      &&
      event.pageY < currentWindow.offsetTop - 26 + currentWindow.clientTop
    )
  ) {
    this.state.resize !== 'nwse_resize' && this.setState({ resize: 'nwse_resize'});
    root.style.cursor = cursors.nwse_resize;
  } else if (
    ((
      event.pageX > currentWindow.offsetLeft
      &&
      event.pageX < currentWindow.offsetLeft + currentWindow.clientLeft
    ) || (
      event.pageX > currentWindow.offsetLeft + currentWindow.clientLeft + currentWindow.clientWidth
      &&
      event.pageX < currentWindow.offsetLeft + 2 * currentWindow.clientLeft + currentWindow.clientWidth
    )) && (
      event.pageY > currentWindow.offsetTop - 26 + currentWindow.clientTop
      &&
      event.pageY < currentWindow.offsetTop + currentWindow.clientTop * 2 + currentWindow.clientHeight
    )
  ) {
    this.state.resize !== 'ew_resize' && this.setState({ resize: 'ew_resize' });
    root.style.cursor = cursors.ew_resize
  } else if (
    ((
      event.pageY > currentWindow.offsetTop - 26
      &&
      event.pageY < currentWindow.offsetTop - 26 + currentWindow.clientTop
    ) || (
      event.pageY > currentWindow.offsetTop + currentWindow.clientTop + currentWindow.clientHeight
      &&
      event.pageY < currentWindow.offsetTop + 2 * currentWindow.clientTop + currentWindow.clientHeight
    )) && (
      event.pageX > currentWindow.offsetLeft + currentWindow.clientLeft
      &&
      event.pageX < currentWindow.offsetLeft + 2 * currentWindow.clientLeft + currentWindow.clientWidth
    )
  ) {
    this.state.resize !== 'ns_resize' && this.setState({ resize: 'ns_resize' });
    root.style.cursor = cursors.ns_resize;
  } else {
    this.state.resize !== null && this.setState({ resize: null });
    root.style.cursor = cursors.default;
  }
}
