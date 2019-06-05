export default function moveWindow(event) {
  const currentWindow = event.target.parentElement;
  const shiftX = event.pageX;
  const shiftY = event.pageY;
  currentWindow.style.left = currentWindow.offsetLeft;
  currentWindow.style.top = currentWindow.offsetTop;
  const handleMouseMove = (event) => {
    currentWindow.style.transform = `translate(${event.pageX - shiftX}px, ${event.pageY - shiftY}px)`;
  }
  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    const coordinates = currentWindow.style.transform.split(' ').map((item) => {
      return parseInt(item.match(/\d|-/g).join(''));
    });
    this.props.move({
      window: this.props.name,
      left: currentWindow.offsetLeft + coordinates[0],
      top: currentWindow.offsetTop + coordinates[1],
    });
    currentWindow.style.transform = '';
  }

  document.addEventListener('mouseup', handleMouseUp, { once: true });
  document.addEventListener('mousemove', handleMouseMove);
}
