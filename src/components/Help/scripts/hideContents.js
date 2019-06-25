export default function hideContents(event) {
  if (event.button !== 0) { return; }
  const target = event.target;
  target.classList.add('pressed');
  document.addEventListener('mouseup', (event) => {
    if (event.target === target) {
      this.setState({ isShowingContents: !this.state.isShowingContents });
      if (!this.state.isShowingContents && !this.props.window.help.isMaximized) {
        this.props.resize({
          window: 'help',
          left: this.refs.container.parentElement.offsetLeft + this.contentsWidth + this.state.shift + 3,
          width: this.refs.container.clientWidth - this.contentsWidth - this.state.shift - 3,
        });
      } else if (this.state.isShowingContents && !this.props.window.help.isMaximized) {
        this.props.resize({
          window: 'help',
          left: this.refs.container.parentElement.offsetLeft - this.contentsWidth - this.state.shift - 3,
          width: this.contentsWidth + 3 + this.refs.container.clientWidth + this.state.shift,
        });
      }
    }

    target.classList.remove('pressed');
  }, { once: true });
}
