export default function getOptions() {
  return {
    draw: localStorage.getItem('cards_draw')
      ? localStorage.getItem('cards_draw')
      : 'one',

    scoring: localStorage.getItem('scoring_type')
      ? localStorage.getItem('scoring_type')
      : 'standard',

    cumulative: localStorage.getItem('score_cumulative')
      && localStorage.getItem('score_cumulative') === 'true',

    timed: localStorage.getItem('game_timed')
      && localStorage.getItem('game_timed') === 'true',

    status: localStorage.getItem('game_statusbar')
      ? localStorage.getItem('game_statusbar') === 'true'
      : true,

    outline: localStorage.getItem('cards_outline')
      && localStorage.getItem('cards_outline') === 'true',

    back: localStorage.getItem('cards_back')
      ? parseInt(localStorage.getItem('cards_back'))
      : Math.round(Math.random() * 11),
  };
}
