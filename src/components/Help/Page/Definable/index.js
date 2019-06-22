import React from 'react';
import './index.scss';

const definitions = {
  'row stacks': 'Cards are stacked in descending order, alternating between red cards and black cards. For example, you can play the two of hearts on three of clubs.',
  'suit stacks': 'Cards are stacked in the four areas at the upper right of the screen in ascending order, beginning with aces. For example, you can play the two of hearts on the ace of hearts.',
  drag: 'To move in item on the screen by selecting the item and then pressing and holding down the mouse button while moving the mouse. For example, you can move a window to another location on the screen by dragging its title bar.',
};

export default function Definable(props) {
  const term = props.children;
  const handleMouseDown = (event) => {
    const rect = event.target.getBoundingClientRect();
    const definition = document.createElement('div');
    definition.className = 'definition';
    definition.style.left = `${rect.left}px`;
    definition.style.top = `${rect.top}px`;

    const heading = document.createElement('p');
    heading.textContent = term;
    definition.appendChild(heading);

    const paragraph = document.createElement('p');
    paragraph.textContent = definitions[term];
    definition.appendChild(paragraph);


    document.body.appendChild(definition);
    document.addEventListener('mousedown', () => {
      document.body.removeChild(definition);
    }, { once: true });
  }

  const handleMouseEnter = (event) => {
    const hint = document.createElement('div');
    hint.className = 'hint';
    hint.style.left = `${event.pageX}px`;
    hint.style.top = `${event.pageY + 22}px`;
    hint.textContent = 'View definition';

    document.body.appendChild(hint);
    event.target.addEventListener('mouseleave', () => {
      document.body.contains(hint) && document.body.removeChild(hint);
    }, { once: true });
  }

  return (
    <span className="definable" onMouseEnter={handleMouseEnter} onMouseDown={handleMouseDown}>
      {term}
    </span>
  );
}
