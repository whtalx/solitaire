import React from 'react';
import './index.scss';

export default function Contents(props) {
  const items = [
    {
      type: `book`,
      caption: 'Solitaire',
      id: 'book',
    },
    {
      type: 'category',
      caption: 'Solitaire overview',
      id: 'overview',
    },
    {
      type: 'topic',
      caption: 'Play Solitaire',
      id: 'play',
    },
    {
      type: 'topic',
      caption: 'Change game options',
      id: 'options',
    },
    {
      type: 'topic',
      caption: 'Choose a scoring system',
      id: 'scoring',
    },
  ];

  return (
    <div className="contents">
      {
        items.map((item, index) => {
          if (!props.isOpened && index !== 0) { return null; }
          let className = item.type;
          if (className === 'book') {
            props.isOpened
              ? className += ' opened'
              : className += ' closed';
          }
          props.selected === item.id && (className += ' selected');
          return (
            <div
              key={item.id}
              className={className}
              onMouseDown={event => event.button === 0 && props.select(item.id)}
            >
              <div className="icon" />
              <span className="caption">{item.caption}</span>
            </div>
          );
        })
      }
    </div>
  );
}
