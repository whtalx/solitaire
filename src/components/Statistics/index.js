import React from 'react';
import { connect } from 'react-redux';
import './index.scss';
import Button from '../Button';

function Statistics(props) {
  const statistics = [
    {
      caption: 'Games played:',
      items: [
        ['Standard scoring:', props.game.statistics.played.standard.toString()],
        ['Vegas scoring:', props.game.statistics.played.vegas.toString()],
        ['Without scoring:', props.game.statistics.played.none.toString()],
      ],
    },

    {
      caption: 'Games won:',
      items: [
        ['Standard scoring:', props.game.statistics.won.standard.toString()],
        ['Vegas scoring:', props.game.statistics.won.vegas.toString()],
        ['Without scoring:', props.game.statistics.won.none.toString()],
      ],
    },

    {
      caption: 'Higest score:',
      items: [
        ['Standard scoring:', props.game.statistics.hiScore.standard.normal.toString()],
        ['Standard scoring with time:', props.game.statistics.hiScore.standard.timed.toString()],
        ['Vegas scoring:', props.game.statistics.hiScore.vegas.toString()],
      ],
    },

    {
      items: [
        [
          'Best time:',
          props.game.statistics.bestTime === Infinity
            ? '∞'
            : props.game.statistics.bestTime.toString()
        ],
      ],
    },
  ];

  return (
    <div className="statistics-contents">
      <div className="logo">Solitaire</div>
      {
        statistics.map((statisticsItem, statisticsIndex) => {
          return (
            <div key={`statistics${statisticsIndex}`} className="statistics-item">
              {
                statisticsItem.caption
                  ? <div className="statistics-caption">{statisticsItem.caption}</div>
                  : ''
              }
              <ul className="list">
                {
                  statisticsItem.items.map((listItem, listIndex) => {
                    return (
                      <li key={`list${listIndex}`}>
                        <span>{listItem[0]}</span>
                        <span />
                        <span>{listItem[1]}</span>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          );
        })
      }
      <Button type="ok" selected click={props.close} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  game: state.game,
});

const mapDispatchToProps = (dispatch) => ({
  close: () => dispatch({ type: 'CLOSE', payload: 'statistics' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
