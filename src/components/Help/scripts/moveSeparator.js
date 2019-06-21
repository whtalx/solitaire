export default function moveSeparator(event) {
  this.props.changeCursor({
    window: 'help',
    cursor: 'ew-resize'
  });

  this.props.freezeCursor(true);

  const separator = event.target.cloneNode();
  const parent = event.target.parentElement;
  const shiftX = event.pageX;
  let shift = this.state.shift;
  separator.style.position = 'absolute';
  separator.style.left = `${this.contentsWidth + shift}px`;
  separator.style.top = '41px';
  separator.style.zIndex = 1;
  parent.appendChild(separator);

  const move = (event) => {
    shift = event.pageX - shiftX + this.state.shift;
    separator.style.transform = `translateX(${event.pageX - shiftX}px)`;
  }

  document.addEventListener('mousemove', move);
  document.addEventListener('mouseup',() => {
    document.removeEventListener('mousemove', move);
    parent.removeChild(separator);
    this.props.freezeCursor(false);
    this.props.changeCursor({
      window: 'help',
      cursor: null,
    });

    if (this.refs.container.clientWidth - this.contentsWidth - shift < 145) {
      shift = this.refs.container.clientWidth - this.contentsWidth - 145
    } else if (this.contentsWidth + shift < 145) {
      shift = 145 - this.contentsWidth;
    }

    this.setState({ shift });
  },{ once: true });
}
