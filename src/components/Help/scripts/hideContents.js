export default function hideContents(event) {
  const target = event.target;
  document.addEventListener('mouseup', (event) => {
    if (event.target === target) {
      this.setState({ isShowingContents: !this.state.isShowingContents });
      if (!this.state.isShowingContents && !this.props.window.help.isMaximized) {
        this.props.resize({
          window: 'help',
          left: this.refs.container.parentElement.offsetLeft + this.contentsWidth + this.state.shift + 4,
          width: this.refs.container.clientWidth - this.contentsWidth - this.state.shift - 4,
        });
      } else if (this.state.isShowingContents && !this.props.window.help.isMaximized) {
        this.props.resize({
          window: 'help',
          left: this.refs.container.parentElement.offsetLeft - this.contentsWidth - this.state.shift - 3,
          width: this.contentsWidth + 3 + this.refs.container.clientWidth + this.state.shift,
        });
      }

    }
  }, { once: true });
}
