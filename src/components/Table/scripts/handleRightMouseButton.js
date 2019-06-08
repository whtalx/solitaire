export default function handleRightMouseButton(event) {
  const rect = document.getElementsByClassName('table')[0].getBoundingClientRect();
  if (
    event.pageX > rect.left
    && event.pageX < rect.right
    && event.pageY > rect.top
    && event.pageY < rect.bottom
  ) {
    this.fund();
  }
}
