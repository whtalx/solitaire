export default function handleMouseEnter(event) {
  const hint = document.createElement('div');
  hint.className = 'hint';
  hint.style.left = `${event.pageX}px`;
  hint.style.top = `${event.pageY + 22}px`;
  hint.textContent = 'Expand/collapse';

  document.body.appendChild(hint);

  event.target.addEventListener('mouseleave', () => {
    document.body.contains(hint) && document.body.removeChild(hint);
  }, { once: true });

  document.addEventListener('mousedown', () => {
    document.body.contains(hint) && document.body.removeChild(hint);
  }, { once: true });
}
